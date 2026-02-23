import { AlertTriangle, Edit2 } from "lucide-react";

type Customers = {
  _id?: string;
  name: string;
  normalizedName?: string;
  address: string;
  phone: string;
  isActive?: boolean;
};

type Props = {
  customers: Customers[];
  handleDeleteClick: (customer: Customers) => void;
  handleEditClick: (customer: Customers) => void;
};

function CustomersTable({
  customers,
  handleDeleteClick,
  handleEditClick,
}: Props) {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-lg overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Customer Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Address
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Mobile Number
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
            {customers.map((customer, index) => (
              <tr
                key={customer._id}
                className={`border-b border-slate-700 hover:bg-slate-750 transition-colors ${
                  index % 2 === 0 ? "bg-slate-800" : "bg-slate-800/50"
                }`}
              >
                <td className="px-6 py-4 text-white font-medium">
                  {customer.name}
                </td>
                <td className="px-6 py-4 text-slate-300 text-sm max-w-xs truncate">
                  {customer.address}
                </td>
                <td className="px-6 py-4 text-white text-sm">
                  {customer.phone}
                </td>
                {customer.isActive ? (
                  <td className="px-6 py-4 text-green-600 font-medium">
                    Active
                  </td>
                ) : (
                  <td className="px-6 py-4 text-red-500 font-medium">
                    Inactive
                  </td>
                )}
                <td className="px-6">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      className="flex items-center gap-1 px-3 py-1 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-colors text-sm font-medium"
                      onClick={() => handleEditClick(customer)}
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(customer)}
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
      {customers && customers.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-slate-400 text-lg">No customers found</p>
        </div>
      )}
    </div>
  );
}

export default CustomersTable;
