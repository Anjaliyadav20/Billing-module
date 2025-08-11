import { useState } from "react";
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
import xero from "../assets/icon.png";
import { CheckCircle } from "lucide-react";


export const XeroDestination = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const flatField =
    "h-10 w-full text-[15px] rounded-md border border-gray-300 bg-white " +
    "outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 " +
    "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 " +
    "data-[state=open]:ring-0 data-[state=open]:ring-offset-0 " +
    "shadow-none focus:shadow-none";


  return (
    <div className="space-y-3">

      <h3 className="text-lg font-bold text-gray-800 px-1">Destinations</h3>


      <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200">

        <div className="relative grid grid-cols-[auto,1fr,auto] grid-rows-[auto,auto,auto] gap-x-3">
          <img
            src={xero}
            alt="Xero"
            className="w-11 h-11 rounded-full row-span-3"
          />

          <div className="col-start-2 row-start-1 text-[15px] font-semibold text-gray-900 leading-5">
            Xero
          </div>

          <div className="col-start-2 row-start-2 mt-0.5 flex items-center gap-2 text-[13px] text-gray-600">
            <div className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_0_1px_rgba(16,185,129,0.35)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
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

          <div className="col-start-2 row-start-3 mb-2 flex items-center text-[13px]">
            <Mail className="w-4 h-4 text-gray-600 mr-2" />
            <span>
              <span className="font-semibold text-gray-800">Vibhuti Raval</span>{" "}
              <span className="text-gray-600">(vibhuti@finsoeasy.com)</span>
            </span>
          </div>

          <button className="col-start-3 mt-2 row-start-3 justify-self-end inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50 shadow-sm">
            View Purchases
          </button>
        </div>

        <div className="mt-3 border-t border-gray-200" />

        {isOpen && (
          <div className="space-y-6 pt-4">

            <div className="flex items-center gap-2 text-[13px] font-medium text-gray-800">
              Set Preferences <span className="text-black-800 text-s">ⓘ</span>
            </div>


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
                    <SelectItem value="Bill">Bill</SelectItem>
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
                  <SelectContent>
                    <SelectItem value="Awaiting Payment">Awaiting Payment</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t border-gray-200" />


            <div className="flex items-center justify-between">
              <Label className="font-medium text-sm text-gray-800">Line Items</Label>
              <div className="flex items-center rounded-md overflow-hidden text-sm border border-gray-300 bg-white">
                <button className="px-3 py-1.5 font-medium text-blue-600 bg-blue-50">
                  Single
                </button>
                <button className="px-3 py-1.5 text-gray-700">Multiple</button>
              </div>
            </div>


            <div>
              <Label className="flex items-center gap-1 text-sm mb-1">
                Contact<span className="text-red-600">*</span>
                <span className="text-black-800 text-s">ⓘ</span>
              </Label>
              <Input defaultValue="Eye Dream" className={flatField} />
            </div>


            <div>
              <Label className="flex items-center gap-1 text-sm mb-1">
                Customer<span className="text-black-800 text-s">ⓘ</span>
              </Label>
              <Input defaultValue="Eye Dream" className={flatField} />
            </div>


            <div>
              <Label className="text-sm mb-1 block">
                Account Code <span className="text-red-600">*</span>
              </Label>
              <Select defaultValue="310 - Cost of Goods Sold">
                <SelectTrigger className={flatField}>
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

            <div>
              <Label className="text-sm mb-1 block">Description</Label>
              <textarea
                className="w-full h-28 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:outline-none focus:ring-0 focus:border-gray-300"
                defaultValue={`Your insurance policies are approaching renewal beginning in mid August. 
Please find attached all current schedules for your review. Could you please 
check each one and notify me if there are any changes or updates that need to 
be made at your earliest.`}
              />
            </div>


            <div className="flex items-center justify-between pt-2">
              <span className="flex items-center gap-2 text-sm font-medium cursor-pointer text-gray-800">
                <i className="fa-regular fa-circle-question"></i>
                Xero Configuration Support
              </span>
              <Button
                size="sm"
                className="text-sm px-4 h-8 rounded-md bg-white text-black border hover:bg-blue-50"
              >
                Publish
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
