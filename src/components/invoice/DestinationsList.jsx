import { useState } from "react";
import DestinationCard from "./DestinationCard.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select.jsx";
import xero from "../assets/icon.png";

const flatField =
  "h-10 w-full text-[15px] rounded-md border border-gray-300 bg-white pl-3 pr-3 outline-none focus:ring-0 focus:border-gray-300";
const flatTrigger =
  "h-10 w-full text-[15px] rounded-md border border-gray-300 bg-white pl-3 outline-none focus:ring-0 focus:border-gray-300";

const demoDestinations = [
  {
    id: "xero-1",
    title: "Xero",
    logoSrc: xero,
    publishedText: "Published on Jan 8, 2022 at 11:11 AM",
    contactName: "Vibhuti Raval",
    contactEmail: "vibhuti@finsoeasy.com",
  },
  {
    id: "xero-2",
    title: "Xero (AU)",
    logoSrc: xero,
    publishedText: "Published on May 15, 2023 at 10:05 AM",
    contactName: "Demo User",
    contactEmail: "demo@allstyled.com",
  },
  {
    id: "xero-3",
    title: "Xero (NZ)",
    logoSrc: xero,
    publishedText: "Draft configuration",
    contactName: "John Smith",
    contactEmail: "john@company.com",
  },
];

function DestinationForm() {
  return (
    <div className="space-y-6">
      {/* Set Preferences */}
      <div className="flex items-center gap-3 text-[13px] font-medium text-gray-800">
        <span>Set Preferences</span>
      </div>

      {/* Checkboxes row */}
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" defaultChecked className="accent-blue-600" />
          Auto Sync
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-blue-600" />
          Save Configuration
        </label>
      </div>

      {/* Publish as / Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm mb-1 block">
            Publish as <span className="text-red-600">*</span>
          </Label>
          <Select defaultValue="Purchase">
            <SelectTrigger className={flatTrigger}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Purchase">Purchase</SelectItem>
              <SelectItem value="Bill">Bill</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm mb-1 block">
            Status <span className="text-red-600">*</span>
          </Label>
          <Select defaultValue="Awaiting Payment">
            <SelectTrigger className={flatTrigger}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Awaiting Payment">Awaiting Payment</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Line Items toggle */}
      <div className="flex items-center justify-between">
        <Label className="font-medium text-sm text-gray-800">Line Items</Label>
        <div className="flex items-center rounded-md overflow-hidden text-sm border border-gray-300 bg-white">
          <button className="px-3 py-1.5 font-medium text-blue-600 bg-blue-50">
            Single
          </button>
          <button className="px-3 py-1.5 text-gray-700">Multiple</button>
        </div>
      </div>

      {/* Contact / Customer */}
      <div>
        <Label className="flex items-center gap-1 text-sm mb-1">
          Contact<span className="text-red-600">*</span>
        </Label>
        <Input defaultValue="Eye Dream" className={flatField} />
      </div>

      <div>
        <Label className="flex items-center gap-1 text-sm mb-1">Customer</Label>
        <Input defaultValue="Eye Dream" className={flatField} />
      </div>

      {/* Account Code */}
      <div>
        <Label className="text-sm mb-1 block">
          Account Code <span className="text-red-600">*</span>
        </Label>
        <Select defaultValue="310 - Cost of Goods Sold">
          <SelectTrigger className={flatTrigger}>
            <SelectValue placeholder="Select code" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="310 - Cost of Goods Sold">
              310 - Cost of Goods Sold
            </SelectItem>
            <SelectItem value="320 - Operating Costs">
              320 - Operating Costs
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div>
        <Label className="text-sm mb-1 block">Description</Label>
        <textarea
          className="w-full h-28 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-0"
          defaultValue={`Your insurance policies are approaching renewal beginning in mid August. 
Please find attached all current schedules for your review. Could you please 
check each one and notify me if there are any changes or updates that need to 
be made at your earliest.`}
        />
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between pt-2">
        <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
          <span className="text-gray-500">ⓘ</span>
          Xero Configuration Support
        </span>
        <button className="text-sm px-4 h-8 rounded-md bg-white text-black border hover:bg-blue-50">
          Publish
        </button>
      </div>
    </div>
  );
}

export default function DestinationsList() {
  const [openId, setOpenId] = useState(demoDestinations[0]?.id || null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-800 px-1">Destinations</h3>

      {/* spacing between multiple rows */}
      <div className="space-y-3">
        {demoDestinations.map((d) => (
          <DestinationCard
            key={d.id}
            logoSrc={d.logoSrc}
            title={d.title}
            publishedText={d.publishedText}
            contactName={d.contactName}
            contactEmail={d.contactEmail}
            onViewPurchases={() => {}}
            isOpen={openId === d.id}
            onToggle={() => toggle(d.id)}
            form={<DestinationForm />}
          />
        ))}
      </div>
    </div>
  );
}
