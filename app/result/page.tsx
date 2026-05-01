'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import StackDisplay from '@/components/StackDisplay'
import BoilerplateDisplay from '@/components/BoilerplateDisplay'
import DocumentationDisplay from '@/components/DocumentationDisplay'

export default function ResultPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const result = sessionStorage.getItem('setupResult')
    if (result) {
      setData(JSON.parse(result))
      setLoading(false)
    } else {
      router.push('/')
    }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <span className="text-4xl animate-pulse mb-4">✨</span>
        <p className="text-xl font-medium animate-pulse">Loading your setup...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-blue-500/30 pb-20">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">Your Project Setup</h1>
            <p className="text-slate-400">The Architect has designed your system.</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
          >
            <span className="text-lg">⬅️</span>
            New Setup
          </button>
        </div>

        {/* Three Sections */}
        <div className="space-y-12">
          {data.stack && <StackDisplay stack={data.stack} />}
          {data.boilerplate && <BoilerplateDisplay boilerplate={data.boilerplate} />}
          {data.documentation && <DocumentationDisplay docs={data.documentation} />}
        </div>

        <div className="mt-16 flex justify-center">
          <button
            onClick={() => router.push('/')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20"
          >
            Create Another Setup
          </button>
        </div>
      </main>
    </div>
  )
}
