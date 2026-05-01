import { NextRequest, NextResponse } from "next/server";
import {
  STACK_ADVISOR_PROMPT,
  SCAFFOLDER_PROMPT,
  DOCUMENTER_PROMPT,
} from "@/lib/prompts";

const API_KEY = process.env.OPENROUTER_API_KEY || process.env.ANTHROPIC_API_KEY;

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 45000,
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
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

  if (!API_KEY) {
    return NextResponse.json(
      { error: "API key not configured." },
      { status: 500 },
    );
  }

  try {
    // Agent 1: Stack Advisor
    const stackResponse = await fetchWithTimeout(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // model: "meta-llama/llama-3.3-70b-instruct:free",
          model: "openrouter/free",
          messages: [
            {
              role: "user",
              content: STACK_ADVISOR_PROMPT(projectDescription),
            },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      },
    );

    if (!stackResponse.ok) {
      const errText = await stackResponse.text();
      console.error("Stack API error:", errText);
      throw new Error(`Stack API error: ${stackResponse.statusText}`);
    }

    const stackData = await stackResponse.json();
    const stackContent = stackData.choices?.[0]?.message?.content;

    if (!stackContent) {
      throw new Error("No stack content returned");
    }

    // Parse stack JSON (find { and } to ensure no markdown text breaks it)
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

    // Run Scaffolder and Documenter in parallel to save time
    const [boilerplateResponse, docResponse] = await Promise.all([
      // Agent 2: Scaffolder
      fetchWithTimeout("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // model: "qwen/qwen3-coder:free",
          model: "openrouter/free",
          messages: [
            {
              role: "user",
              content: SCAFFOLDER_PROMPT(projectDescription, stack),
            },
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
      }),

      // Agent 3: Documenter
      fetchWithTimeout("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // model: "meta-llama/llama-3.3-70b-instruct:free",
          model: "openrouter/free",
          messages: [
            {
              role: "user",
              content: DOCUMENTER_PROMPT(
                projectDescription,
                stack,
                "Will be generated",
              ),
            },
          ],
          temperature: 0.7,
          max_tokens: 3000,
        }),
      }),
    ]);

    let boilerplate = "Failed to generate boilerplate.";
    if (boilerplateResponse.ok) {
      const boilerplateData = await boilerplateResponse.json();
      boilerplate =
        boilerplateData.choices?.[0]?.message?.content || boilerplate;
    } else {
      console.error("Boilerplate API error:", await boilerplateResponse.text());
    }

    let docContent = "Failed to generate documentation.";
    if (docResponse.ok) {
      const docData = await docResponse.json();
      docContent = docData.choices?.[0]?.message?.content || docContent;
    } else {
      console.error("Doc API error:", await docResponse.text());
    }

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
