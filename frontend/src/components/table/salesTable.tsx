import { Eye, Trash2 } from 'lucide-react'

type Sale = {
    _id?:string,
    date:Date,
    productName:string,
    customerName:string,
    quantity:number,
    pricePerUnit:number,
    totalAmount:number
}

type Props = {
    sales: Sale[],
    handleDeleteClick:(data: Sale)=>void
}

function SalesTable({sales, handleDeleteClick}: Props) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-700">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Customer Name / Cash
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                Quantity
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                Price per Unit
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                Total Amount
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr
                key={sale._id}
                className={`border-b border-slate-700 transition-colors hover:bg-slate-700/50 ${
                  index % 2 === 0 ? "bg-slate-800/50" : "bg-slate-800"
                }`}
              >
                <td className="px-6 py-4 text-sm text-slate-300">
                  {new Date(sale.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-white font-medium">
                  {sale.productName}
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">
                  {sale.customerName}
                </td>
                <td className="px-6 py-4 text-sm text-slate-300 text-center">
                  {sale.quantity}
                </td>
                <td className="px-6 py-4 text-sm text-slate-300 text-right">
                  ${sale.pricePerUnit.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-right">
                  ${sale.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-blue-400">
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(sale)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sales.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-slate-400">
            No sales found. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default SalesTable;
