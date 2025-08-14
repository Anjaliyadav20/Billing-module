import { useState } from "react";
import { ChevronUp, ChevronDown, Mail } from "lucide-react";

// ✅ relative paths (adjust if your folders differ)
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

import xero from "../assets/icon.png";
import Iicon from "../assets/I-icon.svg";
import GreenIcon from "../assets/GreenIcon.svg";

import { ACCOUNT_CODES, TAX_RATES } from "../invoice/InvoiceData";

// ✅ Default code from your central list
const DEFAULT_CODE =
  (ACCOUNT_CODES || []).find((c) => c.startsWith("310 - Cost of Goods Sold")) ||
  ACCOUNT_CODES?.[0] ||
  "310 - Cost of Goods Sold";

export const XeroDestination = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [lineItemMode, setLineItemMode] = useState("single"); // single | multiple

  const [lineItems, setLineItems] = useState([
    { name: "", description: "", quantity: 0, unitPrice: 0, accountCode: "", taxRate: "" },
  ]);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const flatField =
    "h-10 w-full text-[15px] rounded-lg border border-gray-300 bg-white " +
    "outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 " +
    "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 " +
    "data-[state=open]:ring-0 data-[state=open]:ring-offset-0 " +
    "shadow-none focus:shadow-none";

  const addLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      { name: "", description: "", quantity: 0, unitPrice: 0, accountCode: "", taxRate: "" },
    ]);
  };
  const removeLineItem = (index) => setLineItems((prev) => prev.filter((_, i) => i !== index));
  const updateLineItem = (index, field, value) =>
    setLineItems((prev) => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });

  const subtotal = lineItems.reduce(
    (sum, it) => sum + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0),
    0
  );
  const total = subtotal;

  const saveLineItems = () => {
    console.log("Saved data:", lineItems);
    setLineItemMode("single");
  };

  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
        {/* Header */}
        <div className="relative grid grid-cols-[auto,1fr,auto] grid-rows-[auto,auto,auto] gap-x-3">
          <img src={xero} alt="Xero" className="w-16 h-16 rounded-full row-span-3" />

          <div className="col-start-2 row-start-1 text-[15px] font-semibold text-gray-900 leading-5">
            Xero
          </div>

          <div className="col-start-2 row-start-2 mt-0.5 flex items-center gap-2 text-[13px] text-gray-600">
            <img src={GreenIcon} alt="greenicon" className="w-3 h-3 text-white" />
            <span>Published on Jan 8, 2022 at 11:11 AM</span>
          </div>

          <button
            onClick={toggleOpen}
            aria-label={isOpen ? "Collapse" : "Expand"}
            className="absolute right-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50 shadow-sm"
          >
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
            )}
          </button>

          <div className="col-start-2 row-start-3 mb-2 flex items-center text-[13px] mt-2.5">
            <Mail className="w-4 h-4 text-gray-600 mr-2" />
            <span>
              <span className="font-semibold text-gray-800">Vibhuti Raval</span>{" "}
              <span className="text-gray-600">(vibhuti@finsoeasy.com)</span>
            </span>
          </div>

          <button className="col-start-3 mt-1.5 row-start-3 justify-self-end inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50 shadow-sm">
            View Purchases
          </button>
        </div>

        {isOpen && <div className="mt-3 border-t border-gray-200" />}

        {isOpen && (
          <div className="space-y-6 pt-4">
            {/* Preferences */}
            <div className="flex items-center gap-2 text-[14px] font-medium text-gray-800">
              Set Preferences
              <img src={Iicon} alt="Iicon" className="text-black-800 text-s" />
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2">
              <div className="flex items-center gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4" />
                  Auto Sync
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                  Save Configuration
                </label>
              </div>
            </div>

            {/* Publish & Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm mb-1 block">
                  Publish as <span className="text-red-600">*</span>
                </Label>
                <Select defaultValue="Purchase">
                  <SelectTrigger className={flatField}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent position="popper" side="bottom" align="start" sideOffset={6}>
                    <SelectItem value="Purchase">Purchase</SelectItem>
                    <SelectItem value="Spend Money">Spend Money</SelectItem>
                    <SelectItem value="Invoice (AR)">Invoice (AR)</SelectItem>
                    <SelectItem value="Credit Note">Credit Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  Status <span className="text-red-600">*</span>
                </Label>
                <Select defaultValue="Awaiting Payment">
                  <SelectTrigger className={flatField}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent position="popper" side="bottom" align="start" sideOffset={6}>
                    <SelectItem value="Awaiting Payment">Awaiting Payment</SelectItem>
                    <SelectItem value="Awaiting Approval">Awaiting Approval</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Line Items mode switch */}
            <div className="flex items-center justify-between">
              <Label className="font-medium text-sm text-gray-800">Line Items</Label>
              <div className="flex items-center rounded-lg overflow-hidden text-sm border border-gray-300 bg-white">
                <button
                  onClick={() => setLineItemMode("single")}
                  className={`px-3 py-1.5 font-medium ${
                    lineItemMode === "single" ? "text-blue-600 bg-blue-50" : "text-gray-700"
                  }`}
                >
                  Single
                </button>
                <button
                  onClick={() => setLineItemMode("multiple")}
                  className={`px-3 py-1.5 font-medium ${
                    lineItemMode === "multiple" ? "text-blue-600 bg-blue-50" : "text-gray-700"
                  }`}
                >
                  Multiple
                </button>
              </div>
            </div>

            {/* Multiple mode modal */}
            {lineItemMode === "multiple" && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-line-items-title"
              >
                <div className="bg-white rounded-2xl shadow-2xl w-[1040px] h-[45vh] overflow-hidden">
                  <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center bg-white/90 backdrop-blur">
                    <h2 id="edit-line-items-title" className="text-sm font-semibold text-gray-900 tracking-tight">
                      Edit Line Items
                    </h2>
                  </div>

                  <div className="flex h-[calc(45vh-48px)]">
                    {/* Left: table */}
                    <div className="flex-1 overflow-hidden">
                      <div className="h-full overflow-auto">
                        <table className="w-full text-sm border-separate border-spacing-0">
                          <thead className="sticky top-0 z-10">
                            <tr className="bg-gray-50/80 backdrop-blur border-b border-gray-200">
                              <th className="px-3 py-2 text-left font-medium text-gray-700">Item</th>
                              <th className="px-3 py-2 text-left font-medium text-gray-700">Description</th>
                              <th className="px-3 py-2 text-left font-medium text-gray-700">Quantity</th>
                              <th className="px-3 py-2 text-left font-medium text-gray-700">Unit Price</th>
                              <th className="px-3 py-2 text-left font-medium text-gray-700">Account Code</th>
                              <th className="px-3 py-2 text-left font-medium text-gray-700">Tax Rate</th>
                              <th className="px-3 py-2 text-right font-medium text-gray-700">Amount</th>
                              <th className="px-2 py-2" />
                            </tr>
                          </thead>
                          <tbody>
                            {lineItems.map((item, idx) => (
                              <tr key={idx} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50/40 transition-colors">
                                {/* Item */}
                                <td className="border-t border-gray-200 px-2 py-1.5 w-44">
                                  <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => updateLineItem(idx, "name", e.target.value)}
                                    className="w-full border border-gray-300 rounded-md outline-none text-xs px-2 py-1 focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="Item name"
                                  />
                                </td>
                                {/* Description */}
                                <td className="border-t border-gray-200 px-2 py-1.5">
                                  <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => updateLineItem(idx, "description", e.target.value)}
                                    className="w-full border border-gray-300 rounded-md outline-none text-xs px-2 py-1 focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="Description"
                                  />
                                </td>
                                {/* Quantity */}
                                <td className="border-t border-gray-200 px-2 py-1.5 w-28">
                                  <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      updateLineItem(idx, "quantity", e.target.valueAsNumber ?? Number(e.target.value))
                                    }
                                    className="w-full border border-gray-300 rounded-md outline-none text-xs px-2 py-1 text-right focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="0"
                                  />
                                </td>
                                {/* Unit Price */}
                                <td className="border-t border-gray-200 px-2 py-1.5 w-32">
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={item.unitPrice}
                                    onChange={(e) =>
                                      updateLineItem(idx, "unitPrice", e.target.valueAsNumber ?? Number(e.target.value))
                                    }
                                    className="w-full border border-gray-300 rounded-md outline-none text-xs px-2 py-1 text-right focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="0.00"
                                  />
                                </td>

                                {/* Account Code (Radix Select avoids clipping) */}
                                <td className="border-t border-gray-200 px-2 py-1.5 w-48">
                                  <Select
                                    value={item.accountCode || "__choose__"}
                                    onValueChange={(v) =>
                                      updateLineItem(idx, "accountCode", v === "__choose__" ? "" : v)
                                    }
                                  >
                                    <SelectTrigger className="w-full h-[30px] text-xs border border-gray-300 rounded-md bg-white px-2">
                                      <SelectValue placeholder="Choose" />
                                    </SelectTrigger>
                                    <SelectContent
                                      position="popper"
                                      side="bottom"
                                      align="start"
                                      sideOffset={4}
                                      avoidCollisions={false}
                                      className="z-[200] w-[var(--radix-select-trigger-width)]
                                                 min-w-[var(--radix-select-trigger-width)]
                                                 max-h-[calc(100vh-160px)] overflow-auto scroll-pb-3"
                                    >
                                      <SelectItem value="__choose__">Choose</SelectItem>
                                      {ACCOUNT_CODES.filter((c) => c !== "Choose").map((code) => (
                                        <SelectItem key={code} value={code} className="text-xs">
                                          {code}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </td>

                                {/* Tax Rate */}
                                <td className="border-t border-gray-200 px-2 py-1.5 w-40">
                                  <Select
                                    value={item.taxRate || "__choose__"}
                                    onValueChange={(v) => updateLineItem(idx, "taxRate", v === "__choose__" ? "" : v)}
                                  >
                                    <SelectTrigger className="w-full h-[30px] text-xs border border-gray-300 rounded-md bg-white px-2">
                                      <SelectValue placeholder="Choose tax…" />
                                    </SelectTrigger>
                                    <SelectContent
                                      position="popper"
                                      side="bottom"
                                      align="start"
                                      sideOffset={4}
                                      avoidCollisions={false}
                                      className="z-[200] w-[var(--radix-select-trigger-width)]
                                                 min-w-[var(--radix-select-trigger-width)]
                                                 max-h-[calc(100vh-160px)] overflow-auto scroll-pb-3"
                                    >
                                      <SelectItem value="__choose__">Choose tax…</SelectItem>
                                      {TAX_RATES.map(({ value, label }) => (
                                        <SelectItem key={value} value={value} className="text-xs">
                                          {label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </td>

                                {/* Amount */}
                                <td className="border-t border-gray-200 px-2 py-1.5 text-right w-28 font-medium text-gray-900">
                                  {((Number(item.quantity) || 0) * (Number(item.unitPrice) || 0)).toFixed(2)}
                                </td>

                                {/* Remove */}
                                <td className="border-t border-gray-200 px-2 py-1.5 text-center w-10">
                                  <button
                                    type="button"
                                    onClick={() => removeLineItem(idx)}
                                    className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-red-50 text-red-600"
                                    title="Remove row"
                                  >
                                    ✕
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {lineItems.length === 0 && (
                              <tr>
                                <td colSpan={8} className="px-3 py-4 text-sm text-gray-500 text-center">
                                  No lines yet.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        {/* Add new line (sticky in left pane) */}
                        <div className="flex justify-between items-center px-3 py-2 border-t border-gray-200 bg-white sticky bottom-0">
                          <button
                            type="button"
                            onClick={addLineItem}
                            className="px-3 py-1.5 text-sm ml-auto bg-blue-600 text-white font-medium border rounded-md hover:bg-blue-700"
                          >
                            Add a new line
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right: summary + sticky actions */}
                    <div className="w-[250px] border-l border-gray-200 bg-gray-50 flex flex-col">
                      <div className="p-4 space-y-4 overflow-auto">
                        <div>
                          <label className="text-xs font-medium text-gray-600">Amounts are</label>
                          <select className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white">
                            <option>Tax Inclusive</option>
                            <option>Tax Exclusive</option>
                          </select>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Lines:</span>
                          <span className="font-medium">{lineItems.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-medium">{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold">
                          <span>Total:</span>
                          <span>{total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0 mt-auto flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setLineItemMode("single")}
                          className="px-3 py-1.5 text-sm text-gray-700 border rounded-md hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={saveLineItems}
                          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Save &amp; Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Code (main form) */}
            <div>
              <Label className="text-sm mb-1 block">
                Account Code <span className="text-red-600">*</span>
              </Label>
              <Select defaultValue={DEFAULT_CODE}>
                <SelectTrigger className={flatField}>
                  <SelectValue placeholder="Select code" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={6}
                  className="z-[120] w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]
                             max-h-[calc(100vh-160px)] overflow-auto scroll-pb-3"
                >
                  <SelectItem value="__choose__">Choose</SelectItem>
                  {ACCOUNT_CODES.filter((c) => c !== "Choose").map((code) => (
                    <SelectItem key={code} value={code}>
                      {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm mb-1 block">Description</Label>
              <textarea
                className="w-full h-28 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:outline-none focus:ring-0 focus:border-gray-300"
                defaultValue={`Your insurance policies are approaching renewal beginning in mid August. Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest.`}
              />
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-2">
              <span className="flex items-center gap-2 text-sm font-medium cursor-pointer text-gray-800">
                <i className="fa-regular fa-circle-question"></i>
                Xero Configuration Support
              </span>
              <Button size="sm" className="text-sm px-4 h-8 rounded-lg bg-white text-black border hover:bg-blue-50">
                Publish
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
