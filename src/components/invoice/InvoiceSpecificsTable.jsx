import { useState } from "react";
import { Check, X } from "lucide-react";

export const InvoiceSpecificsTable = ({ products = [] }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const startEditing = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const saveEdit = (index) => {
    products[index].name = editValue;
    setEditIndex(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  if (!products.length) {
    return (
      <div className="text-sm text-muted-foreground py-8 text-center">
        No product details available.
      </div>
    );
  }

  return (
    <div className="border border-border overflow-x-scroll overflow-y-hidden rounded-md bg-white custom-scrollbar">
      <table
        className="w-full text-sm border-collapse"
        style={{ minWidth: "700px" }} // Force wider than container so scroll always shows
      >
        <thead className="bg-[#f9fafb] text-[#6b7280] border-b">
          <tr>
            <th className="text-left px-5 py-3 font-medium whitespace-nowrap"># Product</th>
            <th className="text-left px-5 py-3 font-medium whitespace-nowrap">Product Name</th>
            <th className="text-left px-5 py-3 font-medium whitespace-nowrap">Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50 transition">
              <td className="px-5 py-3 text-sm text-gray-900 whitespace-nowrap">{item.code}</td>
              <td className="px-5 py-3 text-sm text-gray-900 whitespace-nowrap">
                {editIndex === idx ? (
                  <div className="relative">
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border border-border rounded-md px-3 py-2 text-sm w-full bg-white shadow-sm focus:border-border focus:ring-0 outline-none"
                      autoFocus
                    />
                    <div className="absolute top-full right-0 mt-1 z-10 bg-white border rounded-md shadow-md flex">
                      <button
                        onClick={() => saveEdit(idx)}
                        className="p-1.5 text-green-600 hover:text-green-800"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1.5 text-red-600 hover:text-red-800"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => startEditing(idx, item.name)}
                  >
                    {item.name}
                  </div>
                )}
              </td>
              <td className="px-5 py-3 text-sm text-gray-900 whitespace-nowrap">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
