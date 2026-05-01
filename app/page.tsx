'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'

export default function Home() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/generate-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectDescription: input })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Failed to generate setup')
        setLoading(false)
        return
      }
      
      sessionStorage.setItem('setupResult', JSON.stringify(data))
      router.push('/result')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Try again.'
      setError(msg)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white selection:bg-blue-500/30">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 py-20 flex flex-col items-center">
        {/* Hero Section */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full mb-4">
            <span className="text-xl mr-2">✨</span>
            <span className="text-sm font-medium text-blue-400">AI-Powered Project Setup</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            DevArchitect
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Describe your project. Get a complete setup—tech stack, boilerplate, docs. 
            Ready to code in seconds.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-xl p-2 shadow-2xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What are you building? 
E.g., 'A SaaS task management platform with real-time collaboration, user authentication, mobile support...'"
              className="w-full h-48 p-4 bg-transparent text-white text-lg placeholder:text-slate-500 focus:outline-none resize-none"
              disabled={loading}
            />
            
            <div className="flex items-center justify-between mt-2 p-2 border-t border-slate-800">
              <div className="text-sm text-slate-400 flex items-center">
                <span className="mr-2">🤖</span>
                <span>The Architect is ready</span>
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold rounded-lg transition-all shadow-lg flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Architecting...
                  </>
                ) : 'Generate Setup'}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 w-full text-center">
            {error}
          </div>
        )}

        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-center">
          <div>
            <div className="text-3xl mb-3">🛠️</div>
            <h3 className="font-semibold text-lg mb-2">Tech Stack</h3>
            <p className="text-slate-400 text-sm">Optimal framework, DB, and tools tailored to your needs.</p>
          </div>
          <div>
            <div className="text-3xl mb-3">💻</div>
            <h3 className="font-semibold text-lg mb-2">Boilerplate</h3>
            <p className="text-slate-400 text-sm">Production-ready folder structure and key setup files.</p>
          </div>
          <div>
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-lg mb-2">Documentation</h3>
            <p className="text-slate-400 text-sm">Comprehensive README, SETUP, and ARCHITECTURE guides.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
