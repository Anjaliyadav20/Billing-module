// components/invoice/XeroDestination.jsx
import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { ChevronUp, ChevronDown, Mail } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import xero from "../assets/Images/companies_logo/Xero.svg";
import Iicon from "../assets/I-icon.svg";
import GreenIcon from "../assets/GreenIcon.svg";

import { ACCOUNT_CODES, invoices as INVOICES } from "./InvoiceData";

// Keep your filename spelling to match your repo
import MultipleLineItems from "./MutipleLineItems";

export const XeroDestination = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [lineItemMode, setLineItemMode] = useState("single");
  const [jobId, setJobId] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  // ✅ stateful job options (as requested)
  const [jobOptions, setJobOptions] = useState([
    { id: "101", label: "Job ID 101" },
    { id: "102", label: "Job ID 102" },
    { id: "103", label: "Job ID 103" },
    { id: "104", label: "Job ID 104" },
  ]);

  // New Job flow
  const [showNewJob, setShowNewJob] = useState(false);
  const [newJobText, setNewJobText] = useState("");

  const flatField =
  "h-10 w-full text-[15px] rounded-lg border border-gray-300 bg-white " +
  "outline-none focus:outline-none focus:ring-0 focus:border-gray-300 " + // 👈 keep gray border, no blue ring
  "focus-visible:outline-none focus-visible:ring-0 focus-visible:border-gray-300 " + // 👈 disable visible ring
  "shadow-none focus:shadow-none";


  // Line items state (for MultipleLineItems)
  const [lineItems, setLineItems] = useState([
    { name: "", description: "", quantity: 0, unitPrice: 0, accountCode: "", taxRate: "" },
  ]);

  // ✅ re-mount key for MultipleLineItems
  const [multiKey, setMultiKey] = useState(0);

  // Description bound to textarea
  const [description, setDescription] = useState(
    "Your insurance policies are approaching renewal beginning in mid August. Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest."
  );

  const addLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      { name: "", description: "", quantity: 0, unitPrice: 0, accountCode: "", taxRate: "" },
    ]);
  };

  const removeLineItem = (index) => {
    setLineItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateLineItem = (index, field, value) => {
    setLineItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const subtotal = lineItems.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
    0
  );
  const total = subtotal;

  const saveLineItems = () => {
    console.log("Saved data:", lineItems);
    // Keep Multiple mode visible; just close popup
    setShowEditor(false);
  };

  // Contacts pulled from invoices (unchanged behavior)
  const initialContacts = Array.from(
    new Set((INVOICES || []).map((inv) => (inv.company || "").trim()).filter(Boolean))
  ).sort();

  const [contacts, setContacts] = useState(initialContacts);
  const [contact, setContact] = useState(initialContacts[0] || "");
  const [showNewContact, setShowNewContact] = useState(false);
  const [newContactName, setNewContactName] = useState("");

  const handleContactChange = (value) => {
    if (value === "_new_") setShowNewContact(true);
    else setContact(value);
  };

  const saveNewContact = () => {
    const name = (newContactName || "").trim();
    if (!name) return;
    setContacts((prev) => Array.from(new Set([name, ...prev])).sort());
    setContact(name);
    setNewContactName("");
    setShowNewContact(false);
  };

  const handleJobSelectChange = (value) => {
    if (value === "new") {
      setNewJobText("");
      setShowNewJob(true);
    } else {
      setJobId(value);
    }
  };

  const saveNewJobId = () => {
    const txt = (newJobText || "").trim();
    if (!txt) return;
    setJobOptions((prev) => {
      if (prev.some((j) => j.id.toLowerCase() === txt.toLowerCase())) return prev;
      return [{ id: txt, label: txt }, ...prev];
    });
    setJobId(txt);
    setShowNewJob(false);
    setNewJobText("");
  };

  // 👉 Ref for scrolling to Line Items
  const lineItemsRef = useRef(null);

  // 🔊 Listen to Summary's payload and APPEND items into Multiple view + open editor
useEffect(() => {
  const handler = (evt) => {
    const d = evt?.detail || {};
    const { taxAmount = 0, taxablePortion = "", account = "" } = d;

    const selectedJobId = jobId || "";
    const itemDescription = description || "";

    const newItem = {
      name: "Auto from Summary",
      description: itemDescription,
      quantity: 1,
      unitPrice: Number(taxAmount) || 0, // Amount
      accountCode: account,               // Account
      taxRate: taxablePortion,            // Tax rate
      jobId: selectedJobId,               // Job ID from dropdown
    };

    // ✅ Keep panel open, switch to Multiple, open popup
    flushSync(() => setIsOpen(true));
    flushSync(() => setLineItemMode("multiple"));

    // ✅ Append instead of replace; if the only row is a blank default, replace that one
    flushSync(() =>
      setLineItems((prev) => {
        const isBlankDefault =
          Array.isArray(prev) &&
          prev.length === 1 &&
          !prev[0]?.name &&
          !prev[0]?.description &&
          (Number(prev[0]?.quantity) || 0) === 0 &&
          (Number(prev[0]?.unitPrice) || 0) === 0 &&
          !prev[0]?.accountCode &&
          !prev[0]?.taxRate;

        return isBlankDefault ? [newItem] : [...(prev || []), newItem];
      })
    );

    // force editor re-mount so it reflects the newly appended rows immediately
    flushSync(() => setMultiKey((k) => k + 1));

    // open the editor popup (inline table is visible behind it)
    setShowEditor(true);

    // 👇 scroll into view smoothly
    setTimeout(() => {
      lineItemsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  window.addEventListener("prefill-xero-line-items", handler);
  return () => window.removeEventListener("prefill-xero-line-items", handler);
}, [jobId, description]);


  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
        <div className="relative grid grid-cols-[auto,1fr,auto] grid-rows-[auto,auto,auto] gap-x-3">
          <img src={xero} alt="Xero" className="w-16 h-16 rounded-full row-span-3" />

          <div className="col-start-2 row-start-1 text-[15px] font-semibold text-gray-900 leading-5">
            Xero
          </div>

          <div className="col-start-2 row-start-2 mt-0.5 flex items-center gap-2 text-[13px] text-gray-600">
            <img src={GreenIcon} alt="connected" className="w-3 h-3" />
            <span>Published on Jan 8, 2022 at 11:11 AM</span>
          </div>

          <button
            onClick={() => setIsOpen((p) => !p)}
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
            <div className="flex items-center gap-2 text-[14px] font-medium text-gray-800">
              Set Preferences
              <img src={Iicon} alt="info" className="w-4 h-4" />
            </div>

            <div className="grid grid-cols-2">
              <div className="flex items-center gap-6 text-sm">
                <label className="flex items-center gap-2 whitespace-nowrap">
                  <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4" />
                  Auto Sync
                </label>
                <label className="flex items-center gap-2 whitespace-nowrap">
                  <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                  Save Configuration
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm mb-1 block">
                  Publish as <span className="text-red-600">*</span>
                </Label>
                <Select defaultValue="Purchase">
                  <SelectTrigger className={flatField}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Purchase">Purchase</SelectItem>
                    <SelectItem value="Spend">Spend Money</SelectItem>
                    <SelectItem value="InvoiceAR">Invoice (AR)</SelectItem>
                    <SelectItem value="CreditNote">Credit Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  Status <span className="text-red-600">*</span>
                </Label>
                <Select defaultValue="Draft">
                  <SelectTrigger className={flatField}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Awaiting Payment">Awaiting Payment</SelectItem>
                    <SelectItem value="Awaiting Approval">Awaiting Approval</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* 👇 Added ref here for scroll target */}
            <div className="flex items-center justify-between" ref={lineItemsRef}>
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

            {lineItemMode === "single" && (
              <>
                <div>
                  <Label className="flex items-center gap-1 text-sm mb-1">
                    Contact<span className="text-red-600">*</span>
                    <img src={Iicon} alt="info" className="w-4 h-4" />
                  </Label>
                  <Select value={contact || ""} onValueChange={handleContactChange}>
                    <SelectTrigger className={flatField}>
                      <SelectValue placeholder="Choose contact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_new_">+ New Contact</SelectItem>
                      <div className="my-1 h-px bg-gray-200" />
                      {contacts.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="flex items-center gap-1 text-sm mb-1">
                    Customer
                    <img src={Iicon} alt="info" className="w-4 h-4" />
                  </Label>
                  <Input defaultValue="Eye Dream" className={flatField} />
                </div>

                <div>
                  <Label className="flex items-center gap-1 text-sm mb-1">
                    Job ID
                    <img src={Iicon} alt="info" className="w-4 h-4" />
                  </Label>

                  <Select value={jobId} onValueChange={handleJobSelectChange}>
                    <SelectTrigger className={flatField}>
                      <SelectValue placeholder="Select Job ID" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">+ New Job ID…</SelectItem>
                      {jobOptions.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {lineItemMode === "multiple" && (
              <div className="mt-2">
                <div className="overflow-auto border rounded">
                  <table className="w-full text-sm border-collapse min-w-[720px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-3 py-2 text-left">Description</th>
                        <th className="px-3 py-2 text-left">Account</th>
                        <th className="px-3 py-2 text-left">Tax</th>
                        <th className="px-3 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lineItems.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-200">
                          <td className="px-3 py-2 truncate">{item.name || item.description}</td>
                          <td className="px-3 py-2">{item.accountCode}</td>
                          <td className="px-3 py-2">{item.taxRate}</td>
                          <td className="px-3 py-2 text-right">
                            {((Number(item.quantity) || 0) * (Number(item.unitPrice) || 0)).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary + Edit button row */}
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div />
                  <div className="justify-self-end w-full max-w-[360px] text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-1">
                      <span>Total</span>
                      <span>{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        onClick={() => setShowEditor(true)}
                        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Edit Line Items
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label className="text-sm mb-1 block">
                Account Code <span className="text-red-600">*</span>
              </Label>
              <Select defaultValue="310 - Cost of Goods Sold">
                <SelectTrigger className={flatField}>
                  <SelectValue placeholder="Select code" />
                </SelectTrigger>
                <SelectContent>
                  {ACCOUNT_CODES.map((code) => (
                    <SelectItem key={code} value={code}>
                      {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm mb-1 block">Description</Label>
              <textarea
                className="w-full h-28 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:outline-none focus:ring-0 focus:border-gray-300"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="flex items-center gap-2 text-sm font-medium cursor-pointer text-gray-800">
                <i className="fa-regular fa-circle-question" />
                Xero Configuration Support
              </span>
              <Button size="sm" className="text-sm px-4 h-8 rounded-lg bg-white text-black border hover:bg-blue-50">
                Publish
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* New Job ID modal */}
      {showNewJob && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-xl bg-white shadow-xl border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="text-sm font-semibold">Add New Job ID</div>
              <button
                onClick={() => setShowNewJob(false)}
                className="p-1.5 rounded hover:bg-gray-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              <Label className="text-xs">Job ID</Label>
              <Input
                autoFocus
                value={newJobText}
                onChange={(e) => setNewJobText(e.target.value)}
                placeholder="e.g. JO-2045"
                className="mt-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveNewJobId();
                }}
              />
            </div>

            <div className="px-4 pb-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewJob(false)}>
                Cancel
              </Button>
              <Button onClick={saveNewJobId}>Save</Button>
            </div>
          </div>
        </div>
      )}

      {/* New Contact modal (unchanged behavior) */}
      {showNewContact && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-xl bg-white shadow-xl border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="text-sm font-semibold">Add New Contact</div>
              <button
                onClick={() => setShowNewContact(false)}
                className="p-1.5 rounded hover:bg-gray-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              <Label className="text-xs">Contact name</Label>
              <Input
                autoFocus
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                placeholder="e.g. Eye Dream"
                className="mt-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveNewContact();
                }}
              />
            </div>

            <div className="px-4 pb-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewContact(false)}>
                Cancel
              </Button>
              <Button onClick={saveNewContact}>Save</Button>
            </div>
          </div>
        </div>
      )}

      {/* Multiple line items editor modal (kept as a modal, shows over inline table) */}
      {showEditor && (
        <MultipleLineItems
          key={multiKey}
          lineItems={lineItems}
          updateLineItem={updateLineItem}
          addLineItem={addLineItem}
          removeLineItem={removeLineItem}
          subtotal={subtotal}
          total={total}
          setLineItemMode={() => setShowEditor(false)} // Cancel closes popup only
          saveLineItems={saveLineItems}               // Save closes popup only
        />
      )}
    </div>
  );
};
