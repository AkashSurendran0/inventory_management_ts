
type Data = {
    _id?:string,
    name:string,
    description:string,
    quantity:number,
    price:number,
    createdAt?:Date
}

type Props = {
    itemsData: Data[]
}

function ItemsTable({itemsData}: Props) {
  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 print:text-black">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800">
              <th className="px-6 py-3 text-left font-semibold text-white print:text-black">
                Item Name
              </th>
              <th className="px-6 py-3 text-right font-semibold text-white print:text-black">
                Current Stock
              </th>
              <th className="px-6 py-3 text-right font-semibold text-white print:text-black">
                Price
              </th>
              <th className="px-6 py-3 text-right font-semibold text-white print:text-black">
                Total Value
              </th>
              <th className="px-6 py-3 text-center font-semibold text-white print:text-black">
                Stock Status
              </th>
            </tr>
          </thead>
          <tbody>
            {itemsData.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-slate-700 transition-colors duration-200 hover:bg-slate-800 print:text-black ${
                  index % 2 === 0 ? "bg-slate-900" : "bg-slate-800/50"
                }`}
              >
                <td className="px-6 py-4 text-slate-300 print:text-black">{item.name}</td>
                <td className="px-6 py-4 text-right text-slate-300 print:text-black">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 text-right text-slate-300 print:text-black">
                  ${item.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right font-semibold text-blue-400 print:text-black">
                  ${item.quantity * item.price}
                </td>
                <td className="px-6 py-4 text-center print:text-black">
                    {item.quantity <= 3 ? (
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300`}
                        >
                            Low Stock
                        </span>
                    ):(
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300`}
                        >
                            In Stock
                        </span>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemsTable;
