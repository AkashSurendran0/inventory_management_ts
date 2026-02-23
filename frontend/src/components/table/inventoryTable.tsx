import { AlertTriangle, Edit2 } from 'lucide-react'

type Item = {
    _id?:string | undefined,
    name:string,
    description:string,
    quantity:number,
    price:number
    isActive?:boolean
}

type Props = {
    items: Item[],
    handleDeleteClick:(item: Item)=>void,
    openEditModal:(item: Item)=>void
}

function InventoryTable({items, handleDeleteClick, openEditModal}: Props) {

    return (
        <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-lg overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-slate-900 border-b border-slate-700">
                <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Item Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Quantity
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody>
                {items && items.length > 0 && items.map((item, index) => (
                <tr
                    key={item._id}
                    className={`border-b border-slate-700 hover:bg-slate-750 transition-colors ${
                    index % 2 === 0 ? "bg-slate-800" : "bg-slate-800/50"
                    }`}
                >
                    <td className="px-6 py-4 text-white font-medium">
                    {item.name}
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm max-w-xs truncate">
                    {item.description}
                    </td>
                    <td className="px-6 py-4 text-white">{item.quantity}</td>
                    <td className="px-6 py-4 text-white font-medium">
                    ${item.price}
                    </td>
                    {item.isActive ? (
                        <td className="px-6 py-4 text-green-600 font-medium">
                        Active
                        </td>
                    ) : (
                        <td className="px-6 py-4 text-red-500 font-medium">
                        Inactive
                        </td>
                    )}
                    <td className="py-4">
                    <div className="flex gap-2">
                        <button 
                        className="flex items-center gap-1 px-3 py-1 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-colors text-sm font-medium"
                        onClick={()=>openEditModal(item)}
                        >
                        <Edit2 size={16} />
                        Edit
                        </button>
                        <button
                        onClick={() => handleDeleteClick(item)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600/20 text-red-400 rounded hover:bg-red-600/30 transition-colors text-sm font-medium"
                        >
                        <AlertTriangle size={16} />
                        Change Status
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Empty State */}
        {items && items.length == 0 && (
            <div className="py-12 text-center">
            <p className="text-slate-400 text-lg">
                No items found
            </p>
            </div>
        )}
        </div>
    );
}

export default InventoryTable;
