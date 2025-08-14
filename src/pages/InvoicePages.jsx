import { useState, useRef, useEffect, useMemo } from "react";
import { InvoiceList } from "../components/invoice/InvoiceList.jsx";
import { InvoiceDocument } from "../components/invoice/InvoiceDocument.jsx";
import { InvoiceDetails } from "../components/invoice/InvoiceDetails.jsx";
import { InvoiceTabs } from "../components/invoice/InvoiceTabs.jsx";
import { invoices as rawInvoices } from "../components/invoice/InvoiceData.jsx";
import FoldersPanel from "../components/invoice/FolderPannel.jsx";

/**
 * Company folders are nested under "Uploads":
 *  - All Documents (N)
 *  - Uploads (N)
 *      - <Company A> (x)
 *      - <Company B> (y)
 *  - Trash (0)
 *
 * New:
 *  - Folders panel is CLOSED by default.
 *  - A thin blue left rail is shown; clicking it slides the folder panel open.
 *  - Folders panel is still resizable when open.
 */
const Index = () => {
  const containerRef = useRef(null);
  const isResizingFolders = useRef(false);
  const isResizingList = useRef(false);
  const isResizingDoc = useRef(false);

  // widths for panels (folders is adjustable)
  const [foldersWidth, setFoldersWidth] = useState(260);
  const [listWidth, setListWidth] = useState(300);
  const [docWidth, setDocWidth] = useState(460);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [detailsTab, setDetailsTab] = useState("Summary");
  const [invoiceTab, setInvoiceTab] = useState("All");

  // Folders CLOSED by default; blue rail opens it
  const [foldersOpen, setFoldersOpen] = useState(false);

  // Selected folder: "All Documents" | "Uploads" | <Company>
  const [selectedFolder, setSelectedFolder] = useState("All Documents");

  // File being previewed
  const [selectedDocUrl, setSelectedDocUrl] = useState(null);

  // Width of the blue rail when folders are closed
  const RAIL_WIDTH = 6;

  // Normalize invoices – ensure previewUrl
  const invoices = useMemo(
    () =>
      (rawInvoices || []).map((inv) => ({
        ...inv,
        previewUrl: inv.previewUrl || `/invoices/${encodeURIComponent(inv.id)}.pdf`,
      })),
    []
  );

  // Apply the Tab filter once (so folder counts reflect the active tab)
  const tabFilteredAll = useMemo(() => {
    const norm = (s = "") => s.toLowerCase().trim();
    if (invoiceTab === "All") return invoices;
    if (invoiceTab === "Review") {
      return invoices.filter((inv) => {
        const s = norm(inv.status);
        return s === "manual review" || s.includes("manual review") || (s.includes("manual") && s.includes("review"));
      });
    }
    if (invoiceTab === "Approved") return invoices.filter((inv) => norm(inv.status).includes("approved"));
    if (invoiceTab === "Archived") return invoices.filter((inv) => norm(inv.status).includes("archived"));
    return invoices;
  }, [invoices, invoiceTab]);

  // Build company list + counts FROM the tab-filtered set
  const companyChildren = useMemo(() => {
    const counts = new Map();
    tabFilteredAll.forEach((inv) => {
      const key = inv.company || "Unknown";
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return Array.from(counts.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count, children: [] }));
  }, [tabFilteredAll]);

  // Final folders tree (companies nested under "Uploads")
  const foldersTree = useMemo(() => {
    const total = tabFilteredAll.length;
    return [
      { name: "All Documents", count: total, children: [] },
      { name: "Uploads", count: total, children: companyChildren },
      { name: "Trash", count: 0, children: [] },
    ];
  }, [tabFilteredAll, companyChildren]);

  // "Documents" list for the left panel (each invoice = one doc under its company)
  const allDocuments = useMemo(() => {
    return invoices.map((inv) => ({
      company: inv.company,
      date: inv.date || "",
      amount: inv.totalAmount || "—",
      status: "note",
      folder: inv.company || "Unknown", // company name is treated as the folder for the doc row
      fileUrl: inv.previewUrl,
      _invoiceId: inv.id,
    }));
  }, [invoices]);

  // Docs to pass to Folder panel:
  // - If a company is active, only that company's docs.
  // - If "All Documents" or "Uploads", pass ALL (so expanding companies shows their docs).
  const documentsForFolders = useMemo(() => {
    if (selectedFolder === "All Documents" || selectedFolder === "Uploads") return allDocuments;
    return allDocuments.filter((d) => d.folder === selectedFolder);
  }, [allDocuments, selectedFolder]);

  // Invoices for center list:
  // - If a company is active => just that company.
  // - If "All Documents" or "Uploads" => tab-filtered set.
  const invoicesForList = useMemo(() => {
    if (selectedFolder === "All Documents" || selectedFolder === "Uploads") return tabFilteredAll;
    return tabFilteredAll.filter((inv) => inv.company === selectedFolder);
  }, [tabFilteredAll, selectedFolder]);

  // Initial selection
  useEffect(() => {
    if (invoices.length > 0) {
      setSelectedInvoice(invoices[0]);
      setSelectedDocUrl(invoices[0].previewUrl);
    }
  }, [invoices]);

  // Keep selection valid when folder/tab filters change
  useEffect(() => {
    if (!selectedInvoice) {
      if (invoicesForList.length > 0) {
        setSelectedInvoice(invoicesForList[0]);
        setSelectedDocUrl(invoicesForList[0].previewUrl);
      }
      return;
    }
    const stillVisible = invoicesForList.some((inv) => inv.id === selectedInvoice.id);
    if (!stillVisible && invoicesForList.length > 0) {
      setSelectedInvoice(invoicesForList[0]);
      setSelectedDocUrl(invoicesForList[0].previewUrl);
    }
  }, [selectedFolder, invoiceTab, invoicesForList, selectedInvoice]);

  // Upload (simple preview)
  const handleUpload = (file) => {
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setSelectedDocUrl(fileUrl);
  };

  // Click doc inside folder panel: open it and sync selection
  const handleSelectDocument = (doc) => {
    setSelectedDocUrl(doc.fileUrl);
    const inv = invoices.find((i) => i.id === doc._invoiceId);
    if (inv) setSelectedInvoice(inv);
  };

  const handleDelete = () => {
    // No-op placeholder
  };

  // Resizers
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const left = containerRef.current.getBoundingClientRect().left;

      if (isResizingFolders.current) {
        // distance from container's left edge = new folders width
        const newWidth = e.clientX - left;
        const min = 180;
        const max = 420;
        if (newWidth >= min && newWidth <= max) setFoldersWidth(newWidth);
      }

      if (isResizingList.current) {
        const start = foldersOpen ? foldersWidth : RAIL_WIDTH;
        const newWidth = e.clientX - left - start;
        if (newWidth >= 200 && newWidth <= 400) setListWidth(newWidth);
      }

      if (isResizingDoc.current) {
        const start = (foldersOpen ? foldersWidth : RAIL_WIDTH) + listWidth + 5;
        const newDocWidth = e.clientX - left - start;
        if (newDocWidth >= 300 && newDocWidth <= 700) setDocWidth(newDocWidth);
      }
    };

    const stopResizing = () => {
      isResizingFolders.current = false;
      isResizingList.current = false;
      isResizingDoc.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [listWidth, foldersOpen, foldersWidth]);

  return (
    <div className="flex h-full w-full overflow-hidden" ref={containerRef}>
      {/* BLUE OPEN RAIL (visible only when folders are closed) */}
      {!foldersOpen && (
        <button
          className="h-full w-20 bg-blue-600 hover:bg-blue-500 transition-colors"
          style={{ width: RAIL_WIDTH }}
          onClick={() => setFoldersOpen(true)}
          title="Open folders"
        />
      )}

      {/* LEFT FOLDERS PANEL (slides open) */}
      <FoldersPanel
        open={foldersOpen}
        width={foldersWidth}
        onClose={() => setFoldersOpen(false)}
        onUpload={handleUpload}
        invoice={null}
        folders={foldersTree}
        documents={documentsForFolders}
        tags={["statement (2)"]}
        onSelectFolder={setSelectedFolder}
        onDelete={handleDelete}
        onSelectDocument={handleSelectDocument}
        activeFolder={selectedFolder}
      />

      {/* Resizer between folders and list (only when open) */}
      {foldersOpen && (
        <div
          onMouseDown={() => (isResizingFolders.current = true)}
          className="w-[3px] cursor-col-resize bg-transparent hover:bg-gray-200"
          title="Resize folders"
        />
      )}

      {/* LIST + DOC container */}
      <div
        className="flex flex-col bg-white border-r border-border overflow-hidden"
        style={{
          width: (foldersOpen ? foldersWidth : RAIL_WIDTH) + listWidth + docWidth + 10,
        }}
      >
        {/* Tabs reflect the currently filtered set */}
        <div className="border-b border-border bg-white">
          <InvoiceTabs
            activeTab={invoiceTab}
            onTabChange={setInvoiceTab}
            invoices={invoicesForList}
          />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* INVOICE LIST */}
          <div style={{ width: listWidth }} className="overflow-y-auto bg-white">
            <InvoiceList
              invoices={invoicesForList}
              activeTab={invoiceTab}
              selectedInvoiceId={selectedInvoice?.id}
              onSelectInvoice={(inv) => {
                setSelectedInvoice(inv);
                setSelectedDocUrl(inv.previewUrl);
              }}
              onOpenFolders={() => setFoldersOpen(true)}
            />
          </div>

          {/* resizer between list and doc */}
          <div
            onMouseDown={() => (isResizingList.current = true)}
            className="w-1 cursor-col-resize bg-transparent"
          />

          {/* DOCUMENT PREVIEW */}
          <div style={{ width: docWidth }} className="overflow-y-auto">
            <InvoiceDocument invoice={selectedInvoice} fileUrl={selectedDocUrl} />
          </div>
        </div>
      </div>

      {/* resizer between doc and details */}
      <div onMouseDown={() => (isResizingDoc.current = true)} className="relative">
        <div className="absolute top-0 left-[-3px] w-[7px] h-full cursor-col-resize bg-transparent" />
        <div className="w-px h-full bg-transparent" />
      </div>

      {/* RIGHT DETAILS */}
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
