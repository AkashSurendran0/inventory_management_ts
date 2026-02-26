
type Sale = {
    _id?:string,
    date:Date,
    productId:string,
    customerId:string,
    quantity:number,
    pricePerUnit:number,
    totalAmount:number
}

type ProductDetails = {
    _id:string,
    productName:string
}

type CustomerDetails = {
    _id:string,
    customerName:string
}

type SaleData = Sale & {
    productDetails:ProductDetails,
    customerDetails?:CustomerDetails
}

type Props = {
    customerLedgerData: SaleData[] | null
}

function LedgerTable({customerLedgerData}: Props) {
  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 mb-6 print:text-black">
      {customerLedgerData!.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800">
                <th className="px-6 py-3 text-left font-semibold text-white print:text-black">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-semibold text-white print:text-black">
                  Product
                </th>
                <th className="px-6 py-3 text-right font-semibold text-white print:text-black">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right font-semibold text-white print:text-black">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {customerLedgerData!.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-slate-700 transition-colors duration-200 hover:bg-slate-800 print:text-black ${
                    index % 2 === 0 ? "bg-slate-900" : "bg-slate-800/50"
                  }`}
                >
                  <td className="px-6 py-4 text-slate-300 print:text-black">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-slate-300 print:text-black">{item.productDetails.productName}</td>
                  <td className="px-6 py-4 text-right text-slate-300 print:text-black">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-blue-400 print:text-black">
                    ${item.totalAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-slate-400">
            No transactions found for this customer
          </p>
        </div>
      )}
    </div>
  );
}

export default LedgerTable;
