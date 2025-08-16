import { useState } from "react";
import { ChevronUp, ChevronDown, Mail } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import xero from "../assets/Images/companies_logo/Xero.svg";
import Iicon from "../assets/I-icon.svg";
import GreenIcon from "../assets/GreenIcon.svg";


import { ACCOUNT_CODES, invoices as INVOICES } from "./InvoiceData";

import MultipleLineItems from "./MutipleLineItems";

export const XeroDestination = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [lineItemMode, setLineItemMode] = useState("single");
  const [jobId, setJobId] = useState("");

  const jobOptions = [
    { id: "101", label: "Job ID 101" },
    { id: "102", label: "Job ID 102" },
    { id: "103", label: "Job ID 103" },
    { id: "103", label: "Job ID 104" },
    { id: "103", label: "Job ID 103" },
  ];

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const flatField =
    "h-10 w-full text-[15px] rounded-lg border border-gray-300 bg-white " +
    "outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 " +
    "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 " +
    "data-[state=open]:ring-0 data-[state=open]:ring-offset-0 " +
    "shadow-none focus:shadow-none";

  const [lineItems, setLineItems] = useState([
    { name: "", description: "", quantity: 0, unitPrice: 0, accountCode: "", taxRate: "" },
  ]);

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
    setLineItemMode("single");
  };


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
                    <SelectItem value="Bill">Spend Money</SelectItem>
                    <SelectItem value="Bill">Invoice (AR)</SelectItem>
                    <SelectItem value="Bill">Credit Note</SelectItem>
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
                    <SelectItem value="Paid">Awaiting Approved</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t border-gray-200" />

            <div className="flex items-center justify-between">
              <Label className="font-medium text-sm text-gray-800">Line Items</Label>
              <div className="flex items-center rounded-lg overflow-hidden text-sm border border-gray-300 bg-white">
                <button
                  onClick={() => setLineItemMode("single")}
                  className={`px-3 py-1.5 font-medium ${lineItemMode === "single" ? "text-blue-600 bg-blue-50" : "text-gray-700"
                    }`}
                >
                  Single
                </button>
                <button
                  onClick={() => setLineItemMode("multiple")}
                  className={`px-3 py-1.5 font-medium ${lineItemMode === "multiple" ? "text-blue-600 bg-blue-50" : "text-gray-700"
                    }`}
                >
                  Multiple
                </button>
              </div>
            </div>

            {/* Single mode */}
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

                  <Select value={jobId} onValueChange={setJobId}>
                    <SelectTrigger className="w-full">
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

            {/* Multiple mode */}
            {lineItemMode === "multiple" && (
              <MultipleLineItems
                lineItems={lineItems}
                updateLineItem={updateLineItem}
                addLineItem={addLineItem}
                removeLineItem={removeLineItem}
                subtotal={subtotal}
                total={total}
                setLineItemMode={setLineItemMode}
                saveLineItems={saveLineItems}
              />
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
                defaultValue="Your insurance policies are approaching renewal beginning in mid August. Please find attached all current schedules for your review. Could you please check each one and notify me if there are any changes or updates that need to be made at your earliest."
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

      {/*  New Contact modal */}
      {showNewContact && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900">New Contact</h3>
            <p className="text-sm text-gray-600 mt-1">Add a contact to your list.</p>

            <div className="mt-4">
              <Label className="text-sm mb-1 block">Contact name</Label>
              <Input
                autoFocus
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                placeholder="e.g., Avantor Performance Pvt Ltd"
                className={flatField}
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" className="h-9" onClick={() => setShowNewContact(false)}>
                Cancel
              </Button>
              <Button className="h-9" onClick={saveNewContact}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
