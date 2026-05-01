'use client'

import { useState } from 'react'

interface DocumentationDisplayProps {
  docs: any
}

export default function DocumentationDisplay({ docs }: DocumentationDisplayProps) {
  const [activeTab, setActiveTab] = useState<'readme' | 'setup' | 'architecture'>('readme')
  const [copied, setCopied] = useState(false)

  // Parse documentation into sections
  const parseDoc = (rawText: string, type: string) => {
    const marker = `==== DOCUMENT: ${type.toUpperCase()}.md ====`
    const start = rawText.indexOf(marker)
    if (start === -1) return ''
    
    // Find the next marker or end of string
    const nextMarkerIndex = rawText.indexOf('==== DOCUMENT:', start + marker.length)
    const end = nextMarkerIndex !== -1 ? nextMarkerIndex : rawText.length
    
    return rawText.substring(start + marker.length, end).trim()
  }

  const raw = docs.raw || ''
  let content = {
    readme: parseDoc(raw, 'README'),
    setup: parseDoc(raw, 'SETUP'),
    architecture: parseDoc(raw, 'ARCHITECTURE'),
  }

  // Fallback if formatting failed
  if (!content.readme && !content.setup && !content.architecture) {
    content.readme = raw
  }

  const activeContent = content[activeTab] || 'Content not available for this section.'

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-2xl">
            📚
          </div>
          <h2 className="text-2xl font-bold text-white">Documentation</h2>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
        >
          {copied ? <span className="text-sm">✅</span> : <span className="text-sm">📋</span>}
          {copied ? 'Copied!' : `Copy ${activeTab.toUpperCase()}`}
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-700">
        {(['readme', 'setup', 'architecture'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 capitalize font-medium text-sm transition-colors relative ${
              activeTab === tab
                ? 'text-emerald-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-slate-900/80 p-6 rounded-lg border border-slate-700/50 text-slate-300 max-h-[600px] overflow-y-auto custom-scrollbar">
        <pre className="whitespace-pre-wrap font-sans">
          {activeContent}
        </pre>
      </div>
    </div>
  )
}
