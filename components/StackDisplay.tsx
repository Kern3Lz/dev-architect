'use client'

import { IconFrontend, IconBackend, IconDatabase, IconDeploy, IconShield, IconPackage, IconStack } from './Icons'

interface StackItem {
  framework?: string
  name?: string
  solution?: string
  platform?: string
  reason?: string
}

interface KeyLibrary {
  name: string
  reason: string
}

interface StackData {
  frontend?: StackItem
  backend?: StackItem
  database?: StackItem
  deployment?: StackItem
  authentication?: StackItem
  keyLibraries?: KeyLibrary[]
  [key: string]: unknown
}

interface StackDisplayProps {
  stack: StackData
}

const CATEGORY_META: Record<string, { icon: typeof IconFrontend; label: string }> = {
  frontend: { icon: IconFrontend, label: 'Frontend' },
  backend: { icon: IconBackend, label: 'Backend' },
  database: { icon: IconDatabase, label: 'Database' },
  deployment: { icon: IconDeploy, label: 'Deployment' },
  authentication: { icon: IconShield, label: 'Auth' },
}

export default function StackDisplay({ stack }: StackDisplayProps) {
  if (!stack || ('error' in stack && stack.error)) {
    return (
      <div className="glass-card rounded-xl p-6 text-red-400 text-center">
        Failed to generate stack recommendation. Try again.
      </div>
    )
  }

  const mainEntries = Object.entries(stack).filter(
    ([key, value]) => !Array.isArray(value) && key !== 'error' && key !== 'raw' && typeof value === 'object' && value !== null
  )

  return (
    <div className="glass-card rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-700/50 pb-4">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center">
          <IconStack className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Recommended Tech Stack</h2>
          <p className="text-xs text-slate-500">Curated by Agent 1 — Stack Advisor</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mainEntries.map(([key, value]) => {
          const item = value as StackItem
          const displayName = item.framework || item.name || item.solution || item.platform || 'N/A'
          const meta = CATEGORY_META[key]
          const CategoryIcon = meta?.icon || IconPackage
          
          return (
            <div
              key={key}
              className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/30 hover:border-cyan-500/20 transition-all group"
            >
              <div className="flex items-center gap-2 mb-2">
                <CategoryIcon className="w-4 h-4 text-cyan-400" />
                <h3 className="font-semibold text-cyan-400 capitalize text-sm">{meta?.label || key}</h3>
              </div>
              <p className="text-lg text-white font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                {displayName}
              </p>
              {item.reason && (
                <p className="text-slate-500 text-sm leading-relaxed">{item.reason}</p>
              )}
            </div>
          )
        })}
      </div>

      {stack.keyLibraries && stack.keyLibraries.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <h3 className="font-semibold text-cyan-400 mb-4 flex items-center gap-2 text-sm">
            <IconPackage className="w-4 h-4" /> Key Libraries
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stack.keyLibraries.map((lib: KeyLibrary, i: number) => (
              <div key={i} className="flex items-start gap-3 bg-slate-900/30 p-3 rounded-lg border border-slate-700/20">
                <span className="text-cyan-500 mt-0.5 text-xs font-bold">▸</span>
                <div>
                  <span className="font-mono text-white text-sm">{lib.name}</span>
                  <p className="text-slate-500 text-xs mt-0.5">{lib.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
