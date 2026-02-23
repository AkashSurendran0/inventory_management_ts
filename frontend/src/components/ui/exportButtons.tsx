import { Printer, Download, Mail } from 'lucide-react'

type Props = {
    handleExport:(type:string)=>void
}

function ExportButtons({handleExport}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6 print:hidden">
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200"
      >
        <Printer size={18} />
        Print
      </button>
      <button
        onClick={() => handleExport("excel")}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200"
      >
        <Download size={18} />
        Export to Excel
      </button>
      <button
        onClick={() => handleExport("pdf")}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200"
      >
        <Download size={18} />
        Export to PDF
      </button>
      <button
        onClick={() => handleExport("email")}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors duration-200"
      >
        <Mail size={18} />
        Send via Email
      </button>
    </div>
  );
}

export default ExportButtons;
