'use client'

interface StackDisplayProps {
  stack: any
}

export default function StackDisplay({ stack }: StackDisplayProps) {
  if (!stack || stack.error) {
    return <div className="p-4 bg-red-900/50 text-red-200 border border-red-500/50 rounded-lg">Failed to generate stack</div>
  }

  return (
    <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-4">
        <div className="p-2 bg-blue-500/10 rounded-lg text-2xl">
          ✅
        </div>
        <h2 className="text-2xl font-bold text-white">Recommended Tech Stack</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(stack).map(([key, value]: any) => {
          if (Array.isArray(value)) return null // Skip arrays like keyLibraries
          
          return (
            <div key={key} className="bg-slate-900/50 p-5 rounded-lg border border-slate-700/50 hover:border-blue-500/30 transition-colors">
              <h3 className="font-semibold text-blue-400 capitalize mb-1 flex items-center gap-2">
                {key}
              </h3>
              <p className="text-xl text-white font-mono mb-3">{value.framework || value.name || value.solution || value.platform}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{value.reason}</p>
            </div>
          )
        })}
      </div>

      {stack.keyLibraries && (
        <div className="mt-8 pt-6 border-t border-slate-700">
          <h3 className="font-semibold text-blue-400 mb-4 flex items-center gap-2">
            Key Libraries
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stack.keyLibraries.map((lib: any, i: number) => (
              <li key={i} className="bg-slate-900/30 p-3 rounded-lg border border-slate-700/30 flex flex-col gap-1">
                <span className="font-mono text-white text-sm">{lib.name}</span>
                <span className="text-slate-400 text-sm">{lib.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
