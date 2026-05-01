import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏗️</span>
          <h1 className="text-xl font-bold text-white">DevArchitect</h1>
        </div>
        <nav>
          <Link href="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
        </nav>
      </div>
    </header>
  )
}
