import { useState, useRef, useEffect, useMemo } from "react";
import { InvoiceList } from "../components/invoice/InvoiceList.jsx";
import { InvoiceDocument } from "../components/invoice/InvoiceDocument.jsx";
import { InvoiceDetails } from "../components/invoice/InvoiceDetails.jsx";
import { InvoiceTabs } from "../components/invoice/InvoiceTabs.jsx";
import { invoices as rawInvoices } from "../components/invoice/InvoiceData.jsx";

const Index = () => {
  const containerRef = useRef(null);
  const isResizingList = useRef(false);
  const isResizingDoc = useRef(false);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [listWidth, setListWidth] = useState(300);
  const [docWidth, setDocWidth] = useState(460);
  const [detailsTab, setDetailsTab] = useState("Summary");
  const [invoiceTab, setInvoiceTab] = useState("All");

  const invoices = useMemo(
    () =>
      (rawInvoices || []).map((inv) => ({
        ...inv,
        previewUrl: inv.previewUrl || `/invoices/${encodeURIComponent(inv.id)}.pdf`,
      })),
    []
  );

  useEffect(() => {
    if (invoices.length > 0) setSelectedInvoice(invoices[0]);
  }, [invoices]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      if (isResizingList.current) {
        const newWidth = e.clientX - containerRef.current.getBoundingClientRect().left;
        if (newWidth >= 200 && newWidth <= 400) setListWidth(newWidth);
      }
      if (isResizingDoc.current) {
        const left = containerRef.current.getBoundingClientRect().left;
        const newDocStart = listWidth + 5;
        const newDocWidth = e.clientX - left - newDocStart;
        if (newDocWidth >= 300 && newDocWidth <= 700) setDocWidth(newDocWidth);
      }
    };
    const stopResizing = () => {
      isResizingList.current = false;
      isResizingDoc.current = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [listWidth]);

  return (
   
    <div className="flex h-full w-full overflow-hidden" ref={containerRef}>
    
      <div
        className="flex flex-col bg-white border-r border-border overflow-hidden"
        style={{ width: listWidth + docWidth + 10 }}
      >
       
        <div className="border-b border-border bg-white">
          <InvoiceTabs
            activeTab={invoiceTab}
            onTabChange={setInvoiceTab}
            invoices={invoices}
          />
        </div>

        <div className="flex flex-1 overflow-hidden">
       
          <div
            style={{ width: listWidth }}
            className="overflow-y-auto bg-white"
          >
            <InvoiceList
              invoices={invoices}
              activeTab={invoiceTab}
              selectedInvoiceId={selectedInvoice?.id}
              onSelectInvoice={(inv) => setSelectedInvoice(inv)}
            />
          </div>

          <div
            onMouseDown={() => (isResizingList.current = true)}
            className="w-1 cursor-col-resize bg-transparent"
          />

          <div style={{ width: docWidth }} className="overflow-y-auto">
            <InvoiceDocument invoice={selectedInvoice} />
          </div>
        </div>
      </div>
    
      <div
  onMouseDown={() => (isResizingDoc.current = true)}
  className="relative"
>
  
  <div className="absolute top-0 left-[-3px] w-[7px] h-full cursor-col-resize bg-transparent" />

  
  <div className="w-px h-full bg-transparent" />
</div>

      <div className="flex-1 overflow-y-auto">
        <InvoiceDetails
          invoice={selectedInvoice}
          onNext={() => {}}
          onPrev={() => {}}
          activeTab={detailsTab}
          onTabChange={setDetailsTab}
        />
      </div>
    </div>
  );
};

export default Index;
