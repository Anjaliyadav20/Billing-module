import { useState, useRef, useEffect } from "react";
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
 
export const Summary = ({ invoice }) => {
  const [tags, setTags] = useState(["Defaulter", "Paid"]);
  const [inputTag, setInputTag] = useState("");
 
  const dateRef = useRef(null);
  const dueDateRef = useRef(null);
 
  const formatDate = (date) => date.toISOString().split("T")[0];
 
  // Default values same as original code
  const defaultDate = new Date(2025, 5, 20); // 20 June 2025
  const defaultDueDate = new Date(defaultDate);
  defaultDueDate.setDate(defaultDueDate.getDate() + 7);
 
  const [formData, setFormData] = useState({
    documentType: "invoice",
    supplier: invoice?.company || "",
    invoiceNumber: invoice?.invoiceNumber || "",
    date: formatDate(invoice?.date ? new Date(invoice.date) : defaultDate),
    dueDate: formatDate(defaultDueDate),
    totalAmount: "$1,337.36",
    currency: "AUD",
    taxRate: "GST on Expenses 10%",
  });
 
  // Update when a new invoice is selected
  useEffect(() => {
    if (invoice) {
      const dateObj = invoice.date ? new Date(invoice.date) : defaultDate;
      const dueDateObj = invoice.dueDate
        ? new Date(invoice.dueDate)
        : new Date(dateObj.getTime() + 7 * 24 * 60 * 60 * 1000);
 
      setFormData({
        documentType: invoice.documentType || "invoice",
        supplier: invoice.company || "",
        invoiceNumber: invoice.invoiceNumber || "",
        date: formatDate(dateObj),
        dueDate: formatDate(dueDateObj),
        totalAmount: invoice.totalAmount || "$1,337.36",
        currency: invoice.currency || "AUD",
        taxRate: invoice.taxRate || "GST on Expenses 10%",
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
          <SelectContent>
            <SelectItem value="invoice">Invoice</SelectItem>
            <SelectItem value="quote">Quote</SelectItem>
            <SelectItem value="receipt">Receipt</SelectItem>
          </SelectContent>
        </Select>
      </div>
 
      <div className="mt-4">
        <Label>
          Supplier <span className="text-red-600">*</span>
        </Label>
        <Input
          value={formData.supplier}
          onChange={(e) => handleChange("supplier", e.target.value)}
          className={flatField + " mt-2"}
        />
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
            <SelectContent>
              <SelectItem value="AUD">AUD</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="INR">INR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
 
      <div className="mt-4">
        <Label>Tax Rate</Label>
        <Select
          value={formData.taxRate}
          onValueChange={(value) => handleChange("taxRate", value)}
        >
          <SelectTrigger className={flatSelectTrigger + " mt-2"}>
            <SelectValue placeholder="Select tax" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GST on Expenses 10%">
              GST on Expenses 10%
            </SelectItem>
            <SelectItem value="GST Free">GST Free</SelectItem>
          </SelectContent>
        </Select>
      </div>
 
    
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
          <div className="flex flex-wrap gap-2 mt-2 text-xs">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-muted border border-border rounded-full flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="text-xs font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
 
        <div className="max-w-[650px] mx-auto space-y-1 ">
          <h3 className="text-lg font-bold text-gray-800 pb-2 px-1">
            Destinations
          </h3>
          {demoDestinations.map((dest) => (
            <XeroDestination key={dest.id} />
          ))}
        </div>
      </div>
    </>
  );
};
 