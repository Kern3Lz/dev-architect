"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import {
  IconCart,
  IconChat,
  IconChart,
  IconKanban,
  IconHeart,
  IconGradCap,
  IconSearch,
  IconStack,
  IconZap,
  IconDocs,
  IconCode,
  IconSparkles,
  IconArrowRight,
} from "@/components/Icons";

const EXAMPLE_PROJECTS = [
  {
    icon: IconCart,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce app with product catalog, shopping cart, Stripe payments, user accounts, and admin dashboard.",
  },
  {
    icon: IconChat,
    title: "Real-time Chat App",
    description:
      "A messaging platform with WebSocket real-time communication, group chats, file sharing, and read receipts.",
  },
  {
    icon: IconChart,
    title: "Analytics Dashboard",
    description:
      "A data visualization dashboard with interactive charts, CSV/API data import, filters, and PDF report generation.",
  },
  {
    icon: IconKanban,
    title: "Project Management Tool",
    description:
      "A Kanban-style task manager with drag-and-drop boards, team collaboration, deadlines, and notification system.",
  },
  {
    icon: IconHeart,
    title: "Healthcare Booking",
    description:
      "An appointment scheduling system for clinics with doctor profiles, calendar integration, patient records, and reminders.",
  },
  {
    icon: IconGradCap,
    title: "Learning Platform",
    description:
      "An online course platform with video lessons, progress tracking, quizzes, certificates, and instructor dashboard.",
  },
];

const LOADING_STEPS = [
  { icon: IconSearch, text: "Analyzing your requirements..." },
  { icon: IconStack, text: "Selecting optimal tech stack..." },
  { icon: IconZap, text: "Generating production-ready code..." },
  { icon: IconDocs, text: "Writing comprehensive documentation..." },
  { icon: IconSparkles, text: "Polishing your project setup..." },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 3000);

    try {
      const response = await fetch("/api/generate-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectDescription: input }),
      });

      const data = await response.json();
      clearInterval(interval);

      if (!response.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Failed to generate setup",
        );
        setLoading(false);
        return;
      }

      sessionStorage.setItem("setupResult", JSON.stringify(data));
      router.push("/result");
    } catch (err: unknown) {
      clearInterval(interval);
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Try again.";
      setError(msg);
      setLoading(false);
    }
  };

  const handleExampleClick = (description: string) => {
    setInput(description);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const CurrentLoadingIcon = LOADING_STEPS[loadingStep].icon;

  return (
    <div className="min-h-screen mesh-bg text-white selection:bg-cyan-500/30">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
        {/* Hero Section: Two Columns (60/40 Split) */}
        <div className="w-full flex flex-col-reverse lg:flex-row items-center lg:items-start gap-8 lg:gap-12 mb-20 animate-fade-in-up">
          {/* Left Column: Intro & Form (60%) */}
          <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/5 border border-cyan-500/15 rounded-full mb-8 mt-4 lg:mt-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-cyan-300">
                Arch is online and ready
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-5">
              Hi, I&apos;m <span className="gradient-text">Arch.</span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-slate-300 mt-2 block">
                Your AI Lead Developer.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
              I orchestrate 3 specialized AI Agents to deliver your complete
              project setup — tech stack, production code, and documentation —
              in under 60 seconds.
            </p>

            {/* Chatbox Form */}
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-3xl relative group"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/15 via-sky-500/10 to-cyan-500/15 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative glass-card rounded-2xl p-1.5 shadow-2xl flex flex-col">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    "What are you building?\n\nE.g., 'A SaaS platform for team task management with real-time collaboration, user authentication, and mobile support...'"
                  }
                  className="w-full h-48 md:h-56 lg:h-64 p-6 bg-transparent text-white text-base md:text-lg placeholder:text-slate-500 focus:outline-none resize-none leading-relaxed"
                  disabled={loading}
                />

                <div className="flex items-center justify-between p-4 border-t border-slate-800/50 bg-[#0a0f1c]/30 rounded-b-xl">
                  <div className="text-sm text-slate-500 flex items-center gap-2">
                    <IconSparkles className="w-4 h-4 text-cyan-500" />
                    <span className="italic text-slate-500 hidden sm:inline">
                      &quot;Describe your idea in detail...&quot;
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="btn-primary flex items-center gap-2 py-2.5 px-8 shadow-lg shadow-cyan-500/20 text-sm font-semibold"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Architecting...
                      </>
                    ) : (
                      <>
                        <span>Generate Setup</span>
                        <IconArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Uncropped Mascot (40% shifted right) */}
          <div className="w-full lg:w-[40%] flex justify-end relative min-h-[300px] md:min-h-[400px] lg:min-h-[650px] pointer-events-none lg:-mr-16 mb-8 lg:mb-0">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full top-20" />

            {/* Big Mascot Image with Bottom Fade Only */}
            <div
              className="absolute inset-0 z-10"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
              }}
            >
              <Image
                src="/mascot.png"
                alt="Arch Mascot"
                fill
                className="object-contain object-top drop-shadow-[0_0_40px_rgba(6,182,212,0.15)] md:scale-110 lg:scale-[1.3] origin-top animate-float"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1c]/90 backdrop-blur-sm">
            <div className="text-center space-y-6 animate-fade-in">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 rounded-full border-2 border-slate-700" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500 animate-spin" />
                <div
                  className="absolute inset-2 rounded-full border-2 border-transparent border-b-sky-500 animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "1.5s",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center animate-float">
                  <CurrentLoadingIcon className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold text-white mb-1">
                  {LOADING_STEPS[loadingStep].text}
                </p>
                <p className="text-sm text-slate-500">
                  This usually takes 30–60 seconds
                </p>
              </div>
              {/* Progress bar */}
              <div className="flex items-center justify-center gap-1.5">
                {LOADING_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i <= loadingStep
                        ? "w-6 bg-cyan-500"
                        : "w-1.5 bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 w-full text-center animate-fade-in text-sm">
            {error}
          </div>
        )}

        {/* Example Projects */}
        <div className="w-full mt-16 animate-fade-in-up stagger-3">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Try an example
            </span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXAMPLE_PROJECTS.map((project, i) => {
              const ProjectIcon = project.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleExampleClick(project.description);
                  }}
                  className="example-card text-left relative z-20 pointer-events-auto"
                  disabled={loading}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <ProjectIcon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm mb-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* About Section */}
        <div
          id="about"
          className="w-full mt-24 scroll-mt-20 animate-fade-in-up stagger-4"
        >
          <h2 className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-10">
            About DevArchitect
          </h2>
          <div className="glass-card rounded-xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">What is this?</h3>
                <p className="text-slate-400 leading-relaxed">
                  DevArchitect is an AI-powered project bootstrapping tool that
                  eliminates the &quot;blank canvas syndrome.&quot; Instead of a
                  single chatbot, it uses a{" "}
                  <span className="text-cyan-400 font-medium">
                    multi-agent pipeline
                  </span>{" "}
                  where each AI agent specializes in one task — creating a
                  system that&apos;s smarter than any single model.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  <span className="text-white font-medium">Arch</span>, the AI
                  Lead Developer, orchestrates three specialized agents to
                  deliver a complete project setup: optimal tech stack
                  selection, production-ready boilerplate code, and
                  comprehensive documentation — all in under 60 seconds.
                </p>
              </div>
              <div className="space-y-5">
                <h3 className="text-2xl font-bold text-white">Tech Stack</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Framework", value: "Next.js 14" },
                    { label: "AI Model", value: "Gemini 2.5 Flash" },
                    { label: "Styling", value: "Tailwind CSS v4" },
                    { label: "Deploy", value: "Vercel" },
                    { label: "Language", value: "TypeScript" },
                    { label: "Architecture", value: "Multi-Agent" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30"
                    >
                      <p className="text-xs text-slate-500 mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm text-white font-medium">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div
          id="how-it-works"
          className="w-full mt-20 scroll-mt-20 animate-fade-in-up stagger-4"
        >
          <h2 className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-10">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: IconStack,
                title: "Stack Advisor",
                desc: "Agent 1 analyzes your project and recommends the optimal tech stack with justifications.",
              },
              {
                step: "02",
                icon: IconCode,
                title: "Scaffolder",
                desc: "Agent 2 generates production-ready boilerplate code, folder structure, and config files.",
              },
              {
                step: "03",
                icon: IconDocs,
                title: "Documenter",
                desc: "Agent 3 writes comprehensive README, setup guide, and architecture documentation.",
              },
            ].map((item, i) => {
              const StepIcon = item.icon;
              return (
                <div key={i} className="glass-card rounded-xl p-6 text-center">
                  <div className="text-xs font-bold text-cyan-500 mb-3">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center">
                    <StepIcon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="w-full mt-24 scroll-mt-20">
          <h2 className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: "How is DevArchitect different from ChatGPT or Copilot?",
                a: "DevArchitect uses a multi-agent architecture where three specialized AI agents collaborate sequentially. Agent 1 picks the optimal stack, Agent 2 generates boilerplate that matches that exact stack, and Agent 3 reads the generated code to write accurate documentation. This pipeline produces far more consistent and coherent results than a single model prompt.",
              },
              {
                q: "What AI model powers the agents?",
                a: "DevArchitect uses Google Gemini 2.5 Flash as the primary model, with automatic fallback to Gemini 2.5 Flash Lite when rate-limited. This ensures reliable performance even under heavy load.",
              },
              {
                q: "Can I use the generated code in production?",
                a: "Yes! The boilerplate is designed to be production-ready with proper TypeScript types, configuration files, environment variable templates, and best-practice patterns. However, you should always review and customize the generated code for your specific use case.",
              },
              {
                q: "Is there a cost to use this?",
                a: "DevArchitect is free to use. It runs on Google Gemini\u0027s free tier API with intelligent rate-limit handling and automatic model fallback to maximize availability.",
              },
              {
                q: "What kind of projects can I generate?",
                a: "Any web application — from e-commerce platforms and SaaS dashboards to chat apps and content management systems. The AI adapts its stack recommendations and code generation to match your specific project requirements.",
              },
            ].map((item, i) => (
              <details key={i} className="glass-card rounded-xl group">
                <summary className="px-6 py-4 cursor-pointer text-white font-medium text-sm flex items-center justify-between list-none">
                  {item.q}
                  <svg
                    className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform shrink-0 ml-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-10 border-t border-slate-800/50 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <p>Built for Human &bull; Powered by Gemini AI</p>
            <div className="flex items-center gap-4">
              <Link
                href="/#about"
                className="hover:text-slate-400 transition-colors"
              >
                About
              </Link>
              <Link
                href="/#faq"
                className="hover:text-slate-400 transition-colors"
              >
                FAQ
              </Link>
              <a
                href="https://github.com/Kern3Lz/dev-architect"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-400 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
