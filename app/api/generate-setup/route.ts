import { NextRequest, NextResponse } from "next/server";
import {
  STACK_ADVISOR_PROMPT,
  SCAFFOLDER_PROMPT,
  DOCUMENTER_PROMPT,
} from "@/lib/prompts";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Gemini 2.5 Flash Lite: 10 RPM, 250K TPM, 20 RPD
const PRIMARY_MODEL = "gemini-2.5-flash-lite";
const FALLBACK_MODEL = "gemini-2.5-flash";

function getGeminiUrl(model: string): string {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
}

async function callGemini(prompt: string, maxTokens: number): Promise<string> {
  const models = [PRIMARY_MODEL, FALLBACK_MODEL];

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    console.log(`[Agent] Trying model: ${model}...`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    try {
      const response = await fetch(getGeminiUrl(model), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: maxTokens,
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 429 && i < models.length - 1) {
        console.warn(`Model ${model} rate-limited, trying fallback...`);
        continue;
      }

      if (!response.ok) {
        const errText = await response.text();
        console.error(`Gemini API error (${model}):`, errText);
        if (i < models.length - 1) continue;
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error(`No content returned from ${model}`);
      }

      console.log(`[Agent] Success with ${model}`);
      return text;
    } catch (error) {
      clearTimeout(timeoutId);
      if (i < models.length - 1) {
        console.warn(`Model ${model} failed, trying fallback...`);
        continue;
      }
      throw error;
    }
  }

  throw new Error("All models exhausted");
}

export async function POST(request: NextRequest) {
  const { projectDescription } = await request.json();

  if (!projectDescription || projectDescription.trim().length < 10) {
    return NextResponse.json(
      {
        error:
          "Project description too short. Please provide at least a few words.",
      },
      { status: 400 },
    );
  }

  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY not configured." },
      { status: 500 },
    );
  }

  try {
    // ═══════════════════════════════════════
    // Agent 1: Stack Advisor
    // ═══════════════════════════════════════
    console.log("\n🏗️  Agent 1: Stack Advisor starting...");
    const stackContent = await callGemini(
      STACK_ADVISOR_PROMPT(projectDescription),
      1500,
    );

    // Parse stack JSON
    let stack;
    try {
      const jsonStr = stackContent.substring(
        stackContent.indexOf("{"),
        stackContent.lastIndexOf("}") + 1,
      );
      stack = JSON.parse(jsonStr);
    } catch {
      stack = {
        error: "Failed to parse stack recommendation",
        raw: stackContent,
      };
    }

    // ═══════════════════════════════════════
    // Agent 2: Scaffolder (must run first)
    // ═══════════════════════════════════════
    console.log("\n💻 Agent 2: Scaffolder starting...");
    let boilerplate = "Failed to generate boilerplate.";
    try {
      boilerplate = await callGemini(
        SCAFFOLDER_PROMPT(projectDescription, stack),
        6000,
      );
    } catch (err) {
      console.error("Scaffolder error:", err);
    }

    // ═══════════════════════════════════════
    // Agent 3: Documenter (uses real boilerplate from Agent 2)
    // ═══════════════════════════════════════
    console.log("\n📚 Agent 3: Documenter starting...");
    let docContent = "Failed to generate documentation.";
    try {
      // Pass the real boilerplate so folder structure & files are consistent
      const boilerplateSummary = boilerplate.slice(0, 3000); // trim to avoid prompt overflow
      docContent = await callGemini(
        DOCUMENTER_PROMPT(projectDescription, stack, boilerplateSummary),
        8000,
      );
    } catch (err) {
      console.error("Documenter error:", err);
    }

    console.log("✅ All agents completed!\n");

    return NextResponse.json({
      stack,
      boilerplate,
      documentation: {
        raw: docContent,
      },
    });
  } catch (error: unknown) {
    console.error("API Error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to generate setup due to server error";
    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
