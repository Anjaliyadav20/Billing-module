// components/invoice/Summary.jsx
import { useState, useRef, useEffect, useMemo } from "react";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { XeroDestination } from "./XeroDestination";
import { TAX_RATES, ACCOUNT_CODES, invoices as invoiceRows } from "./InvoiceData.jsx"; // <-- bring invoices here

export const Summary = ({ invoice }) => {
  const [tags, setTags] = useState(["Defaulter", "Paid"]);
  const [inputTag, setInputTag] = useState("");

  const dateRef = useRef(null);
  const dueDateRef = useRef(null);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const defaultDate = new Date(2025, 5, 20);
  const defaultDueDate = new Date(defaultDate);
  defaultDueDate.setDate(defaultDueDate.getDate() + 7);

  const baseSuppliers = useMemo(() => {
    const set = new Set(
      (invoiceRows || []).map((r) => (r.company || "").trim()).filter(Boolean)
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const [suppliers, setSuppliers] = useState(baseSuppliers);
  const [newSupplierOpen, setNewSupplierOpen] = useState(false);
  const [newSupplierName, setNewSupplierName] = useState("");

  const ensureSupplierPresent = (name) => {
    if (!name) return;
    setSuppliers((prev) => {
      if (prev.includes(name)) return prev;
      const next = [...prev, name].sort((a, b) => a.localeCompare(b));
      return next;
    });
  };

  // ✅ UI tweak: make "Extracted amount" first and default
  const PRIORITY_TAX_VALUE = "extracted_amount";

  // Put "Extracted amount" first in the dropdown render order
  const ORDERED_TAX_RATES = useMemo(() => {
    const arr = [...(TAX_RATES || [])];
    const i = arr.findIndex((x) => x.value === PRIORITY_TAX_VALUE);
    if (i > 0) {
      const [item] = arr.splice(i, 1);
      arr.unshift(item);
    }
    return arr;
  }, []);

  const [formData, setFormData] = useState({
    documentType: "invoice",
    supplier: invoice?.company || "",
    invoiceNumber: invoice?.invoiceNumber || "",
    date: formatDate(invoice?.date ? new Date(invoice.date) : defaultDate),
    dueDate: formatDate(defaultDueDate),
    totalAmount: "$1,337.36",
    currency: "AUD",
    // ✅ default to "Extracted amount"
    taxRate: PRIORITY_TAX_VALUE,
  });

  const defaultTaxablePortion =
    TAX_RATES.find((t) => /10%/.test(t.label) && /Expenses/i.test(t.label))?.value ??
    TAX_RATES[0]?.value ??
    "";

  const UNTAXED_ONLY = TAX_RATES.filter(({ label }) =>
    /free|excluded/i.test(label) || /(^|[^0-9])0%($|[^0-9])/i.test(label)
  );

  const defaultUntaxedPortion =
    TAX_RATES.find((t) => /(Free|0%|Excluded)/i.test(t.label))?.value ??
    TAX_RATES[0]?.value ??
    "";

  const defaultAccount =
    ACCOUNT_CODES?.find((c) => /^\s*200\s*-\s*Sales/i.test(c)) ?? ACCOUNT_CODES?.[0] ?? "";

  const [autoTwoLines, setAutoTwoLines] = useState({
    taxAmount: "",
    taxablePortion: defaultTaxablePortion,
    untaxedPortion: defaultUntaxedPortion,
    account: defaultAccount,
  });
  const updateAutoTwo = (k, v) => setAutoTwoLines((prev) => ({ ...prev, [k]: v }));

  useEffect(() => {
    if (invoice) {
      const dateObj = invoice.date ? new Date(invoice.date) : defaultDate;
      const dueDateObj = invoice.dueDate
        ? new Date(invoice.dueDate)
        : new Date(dateObj.getTime() + 7 * 24 * 60 * 60 * 1000);

      const nextSupplier = invoice.company || "";
      ensureSupplierPresent(nextSupplier);

      setFormData({
        documentType: invoice.documentType || "invoice",
        supplier: nextSupplier,
        invoiceNumber: invoice.invoiceNumber || "",
        date: formatDate(dateObj),
        dueDate: formatDate(dueDateObj),
        totalAmount: invoice.totalAmount || "$1,337.36",
        currency: invoice.currency || "AUD",
        // ✅ When invoice doesn't specify, keep "Extracted amount" as default
        taxRate: invoice.taxRate || PRIORITY_TAX_VALUE,
      });

      setTags(invoice.tags || ["Defaulter", "Paid"]);
    }
  }, [invoice]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputTag.trim()) {
      e.preventDefault();
      if (!tags.includes(inputTag.trim())) {
        setTags([...tags, inputTag.trim()]);
      }
      setInputTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const flatField =
    "h-10 w-full text-sm rounded-lg border border-input bg-white pl-3 pr-8 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-input";

  const flatSelectTrigger =
    "h-10 w-full text-sm rounded-lg border border-input bg-white pl-3 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-input";

  const demoDestinations = [{ id: 1, name: "Xero" }];

  const openNewSupplier = () => {
    setNewSupplierName("");
    setNewSupplierOpen(true);
  };
  const saveNewSupplier = () => {
    const name = newSupplierName.trim();
    if (!name) return;
    ensureSupplierPresent(name);
    handleChange("supplier", name);
    setNewSupplierOpen(false);
  };

  // 🔧 UPDATED: Send a rich payload to XeroDestination and open Multiple items
  const handleGenerateLineItems = () => {
    const payload = {
      source: "summary-extracted-amount",
      taxAmount: Number(autoTwoLines.taxAmount) || 0,
      taxablePortion: autoTwoLines.taxablePortion || "",
      untaxedPortion: autoTwoLines.untaxedPortion || "",
      account: autoTwoLines.account || "",
      currency: formData.currency || "AUD",
      invoiceNumber: formData.invoiceNumber || "",
    };

    window.dispatchEvent(new CustomEvent("prefill-xero-line-items", { detail: payload }));
  };

  // 👇 new handler for manual mode
  const handleEnterManually = () => {
    const payload = { mode: "manual" };
    window.dispatchEvent(new CustomEvent("open-multiple-line-items", { detail: payload }));
  };

  return (
    <>
      <div>
        <div className="text-lg font-bold text-b mb-3">Transaction Details</div>

        <Label>Document Type</Label>
        <Select
          value={formData.documentType}
          onValueChange={(value) => handleChange("documentType", value)}
        >
          <SelectTrigger className={flatSelectTrigger + " mt-2"}>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            align="start"
            sideOffset={6}
            avoidCollisions={false}
            className="z-[80]"
          >
            <SelectItem value="choose">Choose</SelectItem>
            <SelectItem value="invoice">Invoice</SelectItem>
            <SelectItem value="statement">Statement</SelectItem>
            <SelectItem value="report">Report</SelectItem>
            <SelectItem value="receipt">Receipt</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
            <SelectItem value="check">Check</SelectItem>
            <SelectItem value="deposit">Deposit</SelectItem>
            <SelectItem value="etransfer">eTransfer</SelectItem>
            <SelectItem value="invoice_ar">Invoice (AR)</SelectItem>
            <SelectItem value="payment">Payment</SelectItem>
            <SelectItem value="credit_memo">Credit Memo</SelectItem>
            <SelectItem value="purchase_order">Purchase Order</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Supplier field */}
      <div className="mt-4">
        <Label>
          Supplier <span className="text-red-600">*</span>
        </Label>
        <Select
          value={formData.supplier || ""}
          onValueChange={(value) => {
            if (value === "_new_") {
              openNewSupplier();
            } else {
              handleChange("supplier", value);
            }
          }}
        >
          <SelectTrigger className={flatSelectTrigger + " mt-2"}>
            <SelectValue placeholder="Select supplier" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            align="start"
            sideOffset={6}
            avoidCollisions={false}
            className="z-[120] max-h-[calc(100vh-160px)] overflow-auto"
          >
            <SelectItem value="_new_"> + New supplier…</SelectItem>
            <div className="my-1 h-px bg-gray-200" />
            {suppliers.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        <Label>Invoice / Ref #</Label>
        <Input
          value={formData.invoiceNumber}
          onChange={(e) => handleChange("invoiceNumber", e.target.value)}
          className={flatField + " mt-2"}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Label>
            Date <span className="text-red-600">*</span>
          </Label>
          <div className="relative mt-2">
            <input
              ref={dateRef}
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className={
                flatField +
                " [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full"
              }
            />
            <Calendar
              onClick={() => dateRef.current?.showPicker()}
              className="absolute right-3 top-3 w-4 h-4 text-muted-foreground cursor-pointer"
            />
          </div>
        </div>

        <div>
          <Label>Due Date</Label>
          <div className="relative mt-2">
            <input
              ref={dueDateRef}
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className={
                flatField +
                " [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full"
              }
            />
            <Calendar
              onClick={() => dueDateRef.current?.showPicker()}
              className="absolute right-3 top-3 w-4 h-4 text-muted-foreground cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Total & Currency */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Label>
            Total Amount <span className="text-red-600">*</span>
          </Label>
          <Input
            value={formData.totalAmount}
            onChange={(e) => handleChange("totalAmount", e.target.value)}
            className={flatField + " mt-2"}
          />
        </div>
        <div>
          <Label>Currency</Label>
          <Select
            value={formData.currency}
            onValueChange={(value) => handleChange("currency", value)}
          >
            <SelectTrigger className={flatSelectTrigger + " mt-2"}>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              sideOffset={6}
              avoidCollisions={false}
              className="z-[80]"
            >
              <SelectItem value="AUD">AUD</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="INR">INR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tax Rate */}
      <div className="mt-4">
        <Label>Tax Rate</Label>
        <Select
          value={formData.taxRate}
          onValueChange={(value) => handleChange("taxRate", value)}
        >
          <SelectTrigger className={flatSelectTrigger + " mt-2"}>
            <SelectValue placeholder="Select tax" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            align="start"
            sideOffset={6}
            avoidCollisions={false}
            className="z-[120] w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]
                       max-h-[calc(100vh-160px)] overflow-auto scroll-pb-4"
          >
            {/* ✅ Render with Extracted amount at the top */}
            {ORDERED_TAX_RATES.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Extracted Amount Panel */}
      {formData.taxRate === "extracted_amount" && (
        <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm font-medium mb-3">Auto-calculate two line items</div>
          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Tax Amount */}
            <div className="col-span-2 sm:col-span-1">
              <Label className="text-xs">Tax Amount:</Label>
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                placeholder="10.00"
                value={autoTwoLines.taxAmount}
                onChange={(e) => updateAutoTwo("taxAmount", e.target.value)}
                className={flatField + " mt-1"}
              />
            </div>
            {/* Taxable Portion */}
            <div className="col-span-2 sm:col-span-1">
              <Label className="text-xs">Taxable Portion:</Label>
              <Select
                value={autoTwoLines.taxablePortion}
                onValueChange={(v) => updateAutoTwo("taxablePortion", v)}
              >
                <SelectTrigger className={flatSelectTrigger + " mt-1"}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={6}
                  avoidCollisions={false}
                >
                  {TAX_RATES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Untaxed Portion */}
            <div className="col-span-2 sm:col-span-1">
              <Label className="text-xs">Untaxed Portion:</Label>
              <Select
                value={autoTwoLines.untaxedPortion}
                onValueChange={(v) => updateAutoTwo("untaxedPortion", v)}
              >
                <SelectTrigger className={flatSelectTrigger + " mt-1"}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={6}
                  avoidCollisions={false}
                >
                  {UNTAXED_ONLY.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Account */}
            <div className="col-span-2 sm:col-span-1">
              <Label className="text-xs">Account:</Label>
              <Select
                value={autoTwoLines.account}
                onValueChange={(v) => updateAutoTwo("account", v)}
              >
                <SelectTrigger className={flatSelectTrigger + " mt-1"}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={6}
                  avoidCollisions={false}
                >
                  {ACCOUNT_CODES.map((code) => (
                    <SelectItem key={code} value={code}>
                      {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={handleGenerateLineItems}
              className="px-4 py-2 rounded-md bg-sky-600 text-white text-sm font-medium hover:bg-sky-700"
            >
              Generate Line Items
            </button>
            <button
                type="button"
                onClick={handleEnterManually}
                className="text-sky-700 hover:underline text-sm"
              >
                Or enter manually
              </button>
          </div>
        </div>
      )}

      {/* Subtotal & Total */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span className="text-foreground">1,215.78</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Tax</span>
          <span className="text-foreground">121.78</span>
        </div>
      </div>

      <hr className="my-3 border-border" />

      <div className="flex justify-between font-semibold text-base">
        <span>Total</span>
        <span className="font-semibold">1,337.36 AUD</span>
      </div>

      <hr className="my-3 border-border" />

      <div className="space-y-4 text-sm mt-4">
        <div>
          <Label>Tags</Label>
          <Input
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type tag & hit ↵ to add"
            className={flatField + " mt-2"}
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-2 text-xs">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-muted border border-border rounded-full flex items-center gap-1"
            >
              {tag}
              <button onClick={() => removeTag(tag)} className="text-xs font-bold">
                ✕
              </button>
            </span>
          ))}
        </div>

        <div className="max-w-[650px] mx-auto space-y-1 ">
          <h3 className="text-lg font-bold text-gray-800 pb-2 px-1">Destinations</h3>
          {demoDestinations.map((dest) => (
            <XeroDestination key={dest.id} />
          ))}
        </div>
      </div>

      {/* New Supplier Modal */}
      {newSupplierOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setNewSupplierOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-5">
              <div className="text-base font-semibold">Add New Supplier</div>
              <div className="mt-3">
                <Label className="text-sm">Supplier name</Label>
                <Input
                  autoFocus
                  value={newSupplierName}
                  onChange={(e) => setNewSupplierName(e.target.value)}
                  placeholder="e.g., Avantor Performance Pvt Ltd"
                  className="mt-2 h-10"
                />
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewSupplierOpen(false)}
                  className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveNewSupplier}
                  className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
