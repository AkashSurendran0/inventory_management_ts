export default function Navbar() {
  return (
    <nav className="hidden md:block fixed top-0 left-64 right-0 h-16 bg-slate-800 border-b border-slate-700 z-30 print:hidden">
      <div className="h-full flex items-center justify-between px-8">
        <div className="text-white font-semibold text-lg">InventPro</div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
            JD
          </div>
        </div>
      </div>
    </nav>
  )
}
