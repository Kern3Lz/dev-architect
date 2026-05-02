'use client'

import { useState } from 'react'
import { IconDocs, IconCopy, IconCheck } from './Icons'
import { copyToClipboard } from '@/lib/clipboard'

interface DocumentationDisplayProps {
  docs: {
    raw: string
  }
}

// SVG icons for tabs (inline, small)
function TabReadmeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function TabSetupIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function TabArchIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

const TAB_CONFIG = [
  { key: 'readme' as const, label: 'README', icon: TabReadmeIcon },
  { key: 'setup' as const, label: 'SETUP', icon: TabSetupIcon },
  { key: 'architecture' as const, label: 'ARCHITECTURE', icon: TabArchIcon },
]

export default function DocumentationDisplay({ docs }: DocumentationDisplayProps) {
  const [activeTab, setActiveTab] = useState<'readme' | 'setup' | 'architecture'>('readme')
  const [copied, setCopied] = useState(false)

  // Robust multi-pattern parser
  const parseDoc = (rawText: string, type: string): string => {
    const markers = [
      `==== DOCUMENT: ${type.toUpperCase()}.md ====`,
      `==== DOCUMENT: ${type}.md ====`,
      `## ${type.toUpperCase()}.md`,
      `# ${type.toUpperCase()}.md`,
      `--- ${type.toUpperCase()}.md ---`,
      `**${type.toUpperCase()}.md**`,
    ]

    for (const marker of markers) {
      const start = rawText.indexOf(marker)
      if (start === -1) continue

      const contentStart = start + marker.length
      const nextPatterns = [
        '==== DOCUMENT:',
        '## README', '## SETUP', '## ARCHITECTURE',
        '# README', '# SETUP', '# ARCHITECTURE',
        '--- README', '--- SETUP', '--- ARCHITECTURE',
        '**README', '**SETUP', '**ARCHITECTURE',
      ]

      let end = rawText.length
      for (const pattern of nextPatterns) {
        const idx = rawText.indexOf(pattern, contentStart)
        if (idx !== -1 && idx < end) {
          end = idx
        }
      }

      const content = rawText.substring(contentStart, end).trim()
      if (content.length > 10) return content
    }

    return ''
  }

  const raw = docs.raw || ''
  const content = {
    readme: parseDoc(raw, 'README'),
    setup: parseDoc(raw, 'SETUP'),
    architecture: parseDoc(raw, 'ARCHITECTURE'),
  }

  // Fallback
  if (!content.readme && !content.setup && !content.architecture) {
    content.readme = raw
  }

  if (!content.architecture) {
    content.architecture = 'Architecture documentation was not generated in this run. Try generating again for a complete output.'
  }

  const activeContent = content[activeTab] || 'Content not available for this section.'

  const handleCopy = async () => {
    await copyToClipboard(activeContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-card rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-8 border-b border-slate-700/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center">
            <IconDocs className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Documentation</h2>
            <p className="text-xs text-slate-500">Written by Agent 3 &mdash; Documenter</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-all border border-slate-700/50 hover:border-slate-600"
        >
          {copied ? (<><IconCheck className="w-3.5 h-3.5 text-emerald-400" /> Copied</>) : (<><IconCopy className="w-3.5 h-3.5" /> Copy {activeTab.toUpperCase()}</>)}
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-900/50 p-1 rounded-xl border border-slate-800/50">
        {TAB_CONFIG.map(tab => {
          const TabIcon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.key
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="bg-[#0d1117] p-5 md:p-6 rounded-xl border border-slate-800 text-slate-300 max-h-150 overflow-y-auto custom-scrollbar">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
          {activeContent}
        </pre>
      </div>
    </div>
  )
}
