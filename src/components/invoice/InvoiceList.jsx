import { useState } from "react";
import { Search, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input.jsx";
import { Badge } from "@/components/ui/badge.jsx";

const getStatusClass = (status) => {
  switch (status) {
    case "Processing":
      return "bg-purple-50 text-purple-600 border border-purple-200 rounded-full";
    case "Manual Review":
      return "bg-yellow-50 text-yellow-600 border border-yellow-200 rounded-full";
    case "Approved":
      return "bg-sky-50 text-sky-600 border border-sky-200 rounded-full"; 
    case "AI Approved":
      return "bg-green-50 text-green-600 border border-green-200 rounded-full";
    case "Flagged":
      return "bg-red-50 text-red-600 border border-red-200 rounded-full";
    default:
      return "bg-gray-50 text-gray-600 border border-gray-200 rounded-full";
  }
};

export const InvoiceList = ({
  invoices,
  onSelectInvoice,
  selectedInvoiceId,
  activeTab, 
}) => {
  const [searchTerm, setSearchTerm] = useState("");

 
  const tabFilteredInvoices = invoices.filter((invoice) => {
    const status = (invoice.status || "").toLowerCase().trim();

    if (!activeTab || activeTab === "All") return true;

    if (activeTab === "Review") {
     
      return (
        status === "manual review" ||
        status.includes("manual review") ||
        (status.includes("manual") && status.includes("review"))
      );
    }

    if (activeTab === "Approved") {
      
      return status.includes("approved");
    }

    if (activeTab === "Archived") {
      return status.includes("archived");
    }


    return true;
  });

  const filteredInvoices = tabFilteredInvoices.filter((invoice) => {
    const term = searchTerm.toLowerCase();
    return (
      invoice.company?.toLowerCase().includes(term) ||
      invoice.poNumber?.toLowerCase().includes(term) ||
      invoice.jobNumber?.toLowerCase().includes(term) ||
      invoice.status?.toLowerCase().includes(term) ||
      invoice.date?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col h-full bg-white">
  <div className="px-4 pt-3 pb-2">
    <div className="relative w-full max-w-[280px]"> 
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        placeholder="Search..."
        className="pl-8 pr-2 py-1 h-8 text-sm rounded-md" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>

      <div className="flex-1 overflow-y-auto pb-6 pr-2 scrollbar-hide">
  {filteredInvoices.length === 0 ? (
    <div className="text-sm text-muted-foreground text-center pt-4">
      No results found.
    </div>
  ) : (
    filteredInvoices.map((invoice) => (
      <div
        key={invoice.id}
        onClick={() => onSelectInvoice(invoice)}
        className={`flex flex-col cursor-pointer transition-colors ${
          selectedInvoiceId === invoice.id
            ? "border-l-4 border-blue-600 bg-gray-100 pl-3 pr-4 py-3 "
            : "pl-4 pr-4 py-3 border border-border hover:bg-muted/50"
        }`}
      >
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-1">
            <Badge
              variant="secondary"
              className={`text-xs px-2 py-1 ${getStatusClass(invoice.status)}`}
            >
              {invoice.status}
            </Badge>
            {invoice.warning && (
              <AlertTriangle className="text-yellow-600 w-4 h-4 ml-1" />
            )}
          </div>
          <span className="text-xs text-muted-foreground">{invoice.date}</span>
        </div>

        <h3 className="font-medium text-sm text-foreground mb-1">
          {invoice.company}
        </h3>

        <div className="text-xs text-muted-foreground space-x-4">
          <span>📋 {invoice.poNumber}</span>
          <span>💼 {invoice.jobNumber}</span>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
};