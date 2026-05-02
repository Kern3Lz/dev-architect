'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import StackDisplay from '@/components/StackDisplay'
import BoilerplateDisplay from '@/components/BoilerplateDisplay'
import DocumentationDisplay from '@/components/DocumentationDisplay'
import { IconDownload, IconCopy, IconCheck, IconArrowLeft } from '@/components/Icons'
import { copyToClipboard } from '@/lib/clipboard'

interface SetupResult {
  stack: Record<string, unknown>
  boilerplate: string
  documentation: { raw: string }
}

export default function ResultPage() {
  const [downloading, setDownloading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const router = useRouter()

  const [data, setData] = useState<SetupResult | null>(null)
  const [mounted, setMounted] = useState(false)

  // Use useEffect to read sessionStorage on client to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    const result = sessionStorage.getItem('setupResult')
    if (result) {
      try {
        setData(JSON.parse(result) as SetupResult)
      } catch {
        // Invalid data
      }
    } else {
      router.push('/')
    }
  }, [router])

  if (!mounted) return null

  if (!data) {
    return (
      <div className="min-h-screen mesh-bg flex flex-col items-center justify-center text-white">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-slate-700" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500 animate-spin" />
        </div>
        <p className="text-lg font-medium text-slate-300">Loading your setup...</p>
      </div>
    )
  }

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  const handleDownloadZip = async () => {
    setDownloading(true)
    try {
      const response = await fetch('/api/download-zip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boilerplate: data.boilerplate,
          documentation: data.documentation,
          stack: data.stack,
        })
      })

      if (!response.ok) throw new Error('Download failed')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'devarchitect-project.zip'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      showToast('ZIP downloaded successfully')
    } catch {
      showToast('Failed to download ZIP')
    } finally {
      setDownloading(false)
    }
  }

  const handleCopyAll = async () => {
    const fullContent = [
      '=== TECH STACK ===',
      JSON.stringify(data.stack, null, 2),
      '\n=== BOILERPLATE ===',
      data.boilerplate,
      '\n=== DOCUMENTATION ===',
      data.documentation?.raw || '',
    ].join('\n')
    await copyToClipboard(fullContent)
    showToast('All content copied to clipboard')
  }

  return (
    <div className="min-h-screen mesh-bg text-white selection:bg-cyan-500/30 pb-20">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4 animate-fade-in-up">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full">
                <IconCheck className="w-3 h-3" /> Generated
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-1">
              Your Project Setup
            </h1>
            <p className="text-slate-500 text-sm">Kira has designed your complete system.</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition-all text-sm border border-slate-700/50 hover:border-slate-600"
            >
              <IconCopy className="w-4 h-4" />
              Copy All
            </button>
            <button
              onClick={handleDownloadZip}
              disabled={downloading}
              className="btn-primary flex items-center gap-2"
            >
              {downloading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Packaging...
                </>
              ) : (
                <>
                  <IconDownload className="w-4 h-4" />
                  Download ZIP
                </>
              )}
            </button>
          </div>
        </div>

        {/* Three Sections with staggered animations */}
        <div className="space-y-10">
          <div className="animate-fade-in-up stagger-1">
            {data.stack && <StackDisplay stack={data.stack} />}
          </div>
          <div className="animate-fade-in-up stagger-2">
            {data.boilerplate && <BoilerplateDisplay boilerplate={data.boilerplate} />}
          </div>
          <div className="animate-fade-in-up stagger-3">
            {data.documentation && <DocumentationDisplay docs={data.documentation} />}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="px-8 py-3 bg-slate-800/80 hover:bg-slate-700 text-white font-medium rounded-xl transition-all border border-slate-700/50 hover:border-slate-600 flex items-center gap-2"
          >
            <IconArrowLeft className="w-4 h-4" /> Create Another Setup
          </button>
          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="btn-primary px-8 py-3 flex items-center gap-2"
          >
            <IconDownload className="w-4 h-4" /> Download Everything as ZIP
          </button>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}
    </div>
  )
}
