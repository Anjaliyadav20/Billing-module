import {
  ChevronLeft,
  ChevronRight,
  Archive as ArchiveIcon,
} from "lucide-react";
import { Summary } from "./Summary.jsx";
import { InvoiceSpecificsTable } from "./InvoiceSpecificsTable.jsx";
import { ConnectedList } from "./ConnectedList.jsx";
import { EmailList } from "./Emaillist.jsx";
import { PriceTrend } from "./PriceTrend.jsx";
 
export const InvoiceDetails = ({
  invoice,
  onNext,
  onPrev,
  activeTab,
  onTabChange,
}) => {
  if (!invoice) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-muted-foreground rounded" />
          </div>
          <p className="text-sm">Select an invoice to view details</p>
        </div>
      </div>
    );
  }
 
  const tabs = [
    "Summary",
    "Invoice Specifics",
    "PO",
    "Quotes",
    "Jobs",
    "Emails",
    "Price Trend",
  ];
 
  const statusStyles = {
    "Manual Review": "bg-yellow-50 text-yellow-800 border-yellow-100",
    Processing:
      "bg-purple-50 text-purple-600 border border-purple-200 rounded-full",
    Approved: "bg-sky-50 text-sky-600 border-sky-200 rounded-full",
    "AI Approved": "bg-green-50 text-green-800 border-green-100",
    Flagged: "bg-red-50 text-red-800 border-red-100",
  };
 
  const handlePrevTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      onTabChange(tabs[currentIndex - 1]);
    }
  };
 
  const handleNextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      onTabChange(tabs[currentIndex + 1]);
    }
  };
 
  const renderTabContent = () => {
    switch (activeTab) {
      case "Invoice Specifics":
        return <InvoiceSpecificsTable products={invoice.products || []} />;
      case "PO":
        return (
          <ConnectedList type="pos" data={invoice.pos || []} onAdd={() => {}} />
        );
      case "Quotes":
        return (
          <ConnectedList
            type="quotes"
            data={invoice.quotes || []}
            onAdd={() => {}}
          />
        );
      case "Jobs":
        return (
          <ConnectedList
            type="jobs"
            data={invoice.jobs || []}
            onAdd={() => {}}
          />
        );
      case "Emails":
        return <EmailList emails={invoice.emails || []} />;
      case "Price Trend":
        return <PriceTrend />;
      default:
        return <Summary invoice={invoice} />;
    }
  };
 
  return (
    <div className="flex flex-col h-full bg-white border-l border-border">
 
      <div className="border-b border-border">
        <div className="flex items-center justify-between px-6 pt-6 pb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">
              INV #{invoice.invoiceNumber}
            </h2>
            {invoice.status && (
              <span
                className={`text-xs px-2 py-1 rounded-full border font-medium ${
                  statusStyles[invoice.status] ||
                  "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {invoice.status}
              </span>
            )}
          </div>
          <div className="inline-flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={handlePrevTab}
              className="flex items-center justify-center w-8 h-8 bg-white hover:bg-gray-50 border-r border-gray-300 focus:outline-none"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={handleNextTab}
              className="flex items-center justify-center w-8 h-8 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>
 

        <div className="flex items-center gap-6 px-6 text-sm overflow-x-auto whitespace-nowrap custom-scroll">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`py-3 transition-colors font-medium border-b-2 ${
                activeTab === tab
                  ? "text-[#6366f1] border-[#6366f1]"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
 
  
      <div className="flex-1 overflow-y-auto custom-scroll px-6 py-4 text-sm">
        {renderTabContent()}
      </div>
 

      <div className="border-t border-border px-6 py-4 flex justify-between items-center">
        <button className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md border border-transparent">
          <ArchiveIcon className="w-4 h-4" />
          Archive
        </button>
        <div className="flex gap-2">
          <button className="text-sm border px-4 py-2 rounded-md hover:bg-gray-100">
            Mark as Paid
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Verify & Publish
          </button>
        </div>
      </div>
    </div>
  );
};
 
 