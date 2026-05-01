'use client'

import { useState } from 'react'

interface BoilerplateDisplayProps {
  boilerplate: string
}

export default function BoilerplateDisplay({ boilerplate }: BoilerplateDisplayProps) {
  const [expandedFiles, setExpandedFiles] = useState<Record<number, boolean>>({ 0: true })
  const [copied, setCopied] = useState(false)
  const [showAll, setShowAll] = useState(false)

  // Extract file structure if present
  let fileStructure = ''

  const structureMatch = boilerplate.match(/==== FILE STRUCTURE ====\n([\s\S]*?)(?=\n==== FILE:|$)/)
  if (structureMatch) {
    fileStructure = structureMatch[1].trim()
  }

  // Parse boilerplate into files
  const files = boilerplate.split('==== FILE:').slice(1).map(section => {
    const lines = section.trim().split('\n')
    const filename = lines[0].replace(/====/g, '').trim()
    const content = lines.slice(1).join('\n')
    return { filename, content }
  })

  const visibleFiles = showAll ? files : files.slice(0, 3)

  const toggleFile = (index: number) => {
    setExpandedFiles(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const handleCopyAll = () => {
    navigator.clipboard.writeText(boilerplate)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-2xl">
            💻
          </div>
          <h2 className="text-2xl font-bold text-white">Project Boilerplate</h2>
        </div>
        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
        >
          {copied ? <span className="text-sm">✅</span> : <span className="text-sm">📋</span>}
          {copied ? 'Copied!' : 'Copy All'}
        </button>
      </div>
      
      {fileStructure && (
        <div className="mb-8 bg-slate-900/80 rounded-lg border border-slate-700/50 overflow-hidden">
          <div className="px-4 py-2 bg-slate-800/80 border-b border-slate-700/50 text-sm font-medium text-slate-300">
            Folder Structure
          </div>
          <pre className="p-4 text-indigo-300 text-sm overflow-x-auto">
            <code>{fileStructure}</code>
          </pre>
        </div>
      )}

      <div className="space-y-4">
        {visibleFiles.map((file, i) => (
          <div key={i} className="bg-slate-900/80 rounded-lg border border-slate-700/50 overflow-hidden shadow-sm">
            <button
              onClick={() => toggleFile(i)}
              className="w-full text-left px-4 py-3 hover:bg-slate-800/80 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                {expandedFiles[i] ? (
                  <span className="text-slate-400 text-xs">▼</span>
                ) : (
                  <span className="text-slate-400 text-xs">▶</span>
                )}
                <code className="text-indigo-300 font-mono text-sm">{file.filename}</code>
              </div>
            </button>
            
            {expandedFiles[i] && (
              <div className="border-t border-slate-700/50 relative group">
                <button
                  onClick={() => navigator.clipboard.writeText(file.content)}
                  className="absolute right-4 top-4 p-2 bg-slate-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white"
                  title="Copy file content"
                >
                  📋
                </button>
                <pre className="p-4 text-slate-300 text-sm overflow-x-auto max-h-96 custom-scrollbar">
                  <code>{file.content}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {files.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full py-3 bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 text-slate-300 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
        >
          {showAll ? 'Show Less' : `Show All ${files.length} Files`}
        </button>
      )}
    </div>
  )
}
