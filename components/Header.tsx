"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0f1c]/80 border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 group z-20">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-700/50 group-hover:border-cyan-500/30 transition-all shadow-lg">
            <Image 
              src="/logo.png" 
              alt="DevArchitect Logo" 
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white tracking-tight">
              DevArchitect
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
              AI Agent
            </span>
          </div>
        </Link>
        
        {/* Center: Navigation (hidden on mobile, centered using absolute positioning) */}
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 bg-slate-900/40 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-slate-800/60 shadow-lg shadow-black/20 z-10">
          <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-all px-4 py-1.5 rounded-full hover:bg-slate-800/80">Home</Link>
          <Link href="/#about" className="text-sm font-medium text-slate-400 hover:text-white transition-all px-4 py-1.5 rounded-full hover:bg-slate-800/80">About</Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-slate-400 hover:text-white transition-all px-4 py-1.5 rounded-full hover:bg-slate-800/80">How It Works</Link>
          <Link href="/#faq" className="text-sm font-medium text-slate-400 hover:text-white transition-all px-4 py-1.5 rounded-full hover:bg-slate-800/80">FAQ</Link>
        </nav>

        {/* Right: GitHub Oval Button & Mobile Toggle */}
        <div className="z-20 flex items-center gap-3">
          <a
            href="https://github.com/Kern3Lz/dev-architect"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-300 hover:text-white transition-all px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/50 hover:bg-slate-700 hover:border-cyan-500/30 flex items-center gap-2 shadow-lg shadow-black/20"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
          
          <button 
            type="button"
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors relative z-[60] cursor-pointer pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0f1c]/95 backdrop-blur-xl border-b border-slate-800/50 flex flex-col shadow-xl z-40 animate-fade-in">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 border-b border-slate-800/50 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/30">Home</Link>
          <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 border-b border-slate-800/50 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/30">About</Link>
          <Link href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 border-b border-slate-800/50 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/30">How It Works</Link>
          <Link href="/#faq" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/30">FAQ</Link>
        </div>
      )}
    </header>
  );
}
