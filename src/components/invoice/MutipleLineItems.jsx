// components/MultipleLineItems.jsx
import React from "react";
import { ACCOUNT_CODES, TAX_RATES } from "./InvoiceData";

const MultipleLineItems = ({
  lineItems,
  updateLineItem,
  addLineItem,
  removeLineItem,
  subtotal,
  total,
  setLineItemMode,
  saveLineItems
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-200 rounded-lg shadow-xl w-[1200px] max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Top Bar */}
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-800 tracking-wide">
            Edit Line Items
          </h2>
        </div>

        <div className="flex flex-1">
          {/* Left Table Section */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-3 py-3 text-left font-medium text-gray-600">Item</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-600">Description</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-600">Job ID</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-600">Quantity</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-600">Unit Price</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-600">Account Code</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-600">Tax Rate</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-600">Amount</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateLineItem(idx, "name", e.target.value)}
                        className="w-full border-none outline-none text-xs px-1 py-1"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateLineItem(idx, "description", e.target.value)}
                        className="w-full border-none outline-none text-xs px-1 py-1"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1 w-24">
                      <input
                        type="text"
                        value={item.jobId}
                        onChange={(e) => updateLineItem(idx, "jobId", e.target.value)}
                        placeholder="e.g., J-1023"
                        className="w-full border-none outline-none text-xs px-1 py-1"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(idx, "quantity", e.target.value)}
                        className="w-full border-none outline-none text-xs px-1 py-1 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateLineItem(idx, "unitPrice", e.target.value)}
                        className="w-full border-none outline-none text-xs px-1 py-1 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1 w-40">
                      <select
                        value={item.accountCode}
                        onChange={(e) => updateLineItem(idx, "accountCode", e.target.value)}
                        className="w-full border-none outline-none text-xs px-1 py-1"
                      >
                        {ACCOUNT_CODES.map((code) => (
                          <option key={code} value={code}>
                            {code}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <select
                        value={item.taxRate}
                        onChange={(e) => updateLineItem(idx, "taxRate", e.target.value)}
                        className="w-full border-none outline-none text-xs px-1 py-1"
                      >
                        {TAX_RATES.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-right font-medium">
                      {(item.quantity * item.unitPrice).toFixed(2)}
                    </td>
                    <td
                      onClick={() => removeLineItem(idx)}
                      className="border border-gray-300 px-2 py-1 text-center text-gray-500 hover:text-red-500 cursor-pointer"
                    >
                      ✕
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer under table */}
            <div className="flex justify-end items-center px-4 py-3 border-t border-gray-200 bg-gray-50">
              <button
                onClick={addLineItem}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                + Add Line Items
              </button>
            </div>
          </div>

          {/* Right Side Summary */}
          <div className="w-[250px] border-l border-gray-200 p-4 bg-gray-50 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600">Amounts are</label>
                <select className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-sm">
                  <option>Tax Inclusive</option>
                  <option>Tax Exclusive</option>
                </select>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>Total:</span>
                <span>{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setLineItemMode("single")}
                className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveLineItems}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save &amp; Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleLineItems;