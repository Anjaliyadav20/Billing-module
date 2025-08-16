import { useState, useRef, useEffect, useMemo } from "react";
import { InvoiceList } from "../components/invoice/InvoiceList.jsx";
import { InvoiceDocument } from "../components/invoice/InvoiceDocument.jsx";
import { InvoiceDetails } from "../components/invoice/InvoiceDetails.jsx";
import { InvoiceTabs } from "../components/invoice/InvoiceTabs.jsx";
import { invoices as rawInvoices } from "../components/invoice/InvoiceData.jsx";
import FoldersPanel from "../components/invoice/FolderPannel.jsx";
import { Folder } from "lucide-react";
import MultipleLineItems from "../components/invoice/MutipleLineItems.jsx"; 

const InvoicePages = () => {
  const containerRef = useRef(null);

  // resize guards
  const isResizingFolders = useRef(false);
  const isResizingList = useRef(false);
  const isResizingDoc = useRef(false);

  // widths
  const [foldersWidth, setFoldersWidth] = useState(300);
  const [listWidth, setListWidth] = useState(300);
  const [docWidth, setDocWidth] = useState(600);
  const baseDocWidthRef = useRef(600);

  // selections / tabs
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [detailsTab, setDetailsTab] = useState("Summary");
  const [invoiceTab, setInvoiceTab] = useState("All");

  // folders
  const [foldersOpen, setFoldersOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("All Documents");
  const [selectedDocUrl, setSelectedDocUrl] = useState(null);

  // when folders open, details should collapse
  const [detailsCollapsed, setDetailsCollapsed] = useState(false);

  const RAIL_WIDTH = 26; // old rail width

  const invoices = useMemo(
    () =>
      (rawInvoices || []).map((inv) => ({
        ...inv,
        previewUrl: inv.previewUrl || `/invoices/${encodeURIComponent(inv.id)}.pdf`,
      })),
    []
  );

  const tabFilteredAll = useMemo(() => {
    const norm = (s = "") => s.toLowerCase().trim();
    if (invoiceTab === "All") return invoices;

    if (invoiceTab === "Review") {
      return invoices.filter((inv) => {
        const s = norm(inv.status);
        return (
          s === "manual review" ||
          s.includes("manual review") ||
          (s.includes("manual") && s.includes("review"))
        );
      });
    }
    if (invoiceTab === "Approved")
      return invoices.filter((inv) => norm(inv.status).includes("approved"));
    if (invoiceTab === "Archived")
      return invoices.filter((inv) => norm(inv.status).includes("archived"));
    return invoices;
  }, [invoices, invoiceTab]);

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

  const [foldersTree, setFoldersTree] = useState(() => {
    const total = tabFilteredAll.length;
    return [
      { name: "All Documents", count: total, children: [] },
      { name: "Uploads", count: total, children: companyChildren },
      { name: "Trash", count: 0, children: [] },
    ];
  });

  useEffect(() => {
    const total = tabFilteredAll.length;
    setFoldersTree((prev) => {
      const updated = [...prev];
      const uploadsIndex = updated.findIndex((f) => f.name === "Uploads");
      if (uploadsIndex !== -1) {
        updated[uploadsIndex] = {
          ...updated[uploadsIndex],
          count: total,
          children: companyChildren,
        };
      }
      const allDocsIndex = updated.findIndex((f) => f.name === "All Documents");
      if (allDocsIndex !== -1) {
        updated[allDocsIndex] = { ...updated[allDocsIndex], count: total };
      }
      return updated;
    });
  }, [tabFilteredAll, companyChildren]);

  const allDocuments = useMemo(() => {
    return invoices.map((inv) => ({
      company: inv.company,
      date: inv.date || "",
      amount: inv.totalAmount || "—",
      status: "note",
      folder: inv.company || "Unknown",
      fileUrl: inv.previewUrl,
      _invoiceId: inv.id,
    }));
  }, [invoices]);

  const documentsForFolders = useMemo(() => {
    if (selectedFolder === "All Documents" || selectedFolder === "Uploads") return allDocuments;
    return allDocuments.filter((d) => d.folder === selectedFolder);
  }, [allDocuments, selectedFolder]);

  const invoicesForList = useMemo(() => {
    if (selectedFolder === "All Documents" || selectedFolder === "Uploads") return tabFilteredAll;
    return tabFilteredAll.filter((inv) => inv.company === selectedFolder);
  }, [tabFilteredAll, selectedFolder]);

  useEffect(() => {
    if (invoices.length > 0) {
      setSelectedInvoice(invoices[0]);
      setSelectedDocUrl(invoices[0].previewUrl);
    }
  }, [invoices]);

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

  const handleUpload = (file) => {
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setSelectedDocUrl(fileUrl);
  };

  const handleSelectDocument = (doc) => {
    setSelectedDocUrl(doc.fileUrl);
    const inv = invoices.find((i) => i.id === doc._invoiceId);
    if (inv) setSelectedInvoice(inv);
  };

  // folder actions
  const handleRenameFolder = (folderToRename) => {
    const newName = prompt("Enter new folder name:", folderToRename.name);
    if (!newName || newName === folderToRename.name) return;

    const renameRecursive = (folders) =>
      folders.map((f) =>
        f.name === folderToRename.name
          ? { ...f, name: newName }
          : { ...f, children: renameRecursive(f.children || []) }
      );

    setFoldersTree((prev) => renameRecursive(prev));

    if (selectedFolder === folderToRename.name) {
      setSelectedFolder(newName);
    }
  };

  const handleDeleteFolder = (folderToDelete) => {
    if (!window.confirm(`Delete folder "${folderToDelete.name}"?`)) return;

    const deleteRecursive = (folders) =>
      folders
        .filter((f) => f.name !== folderToDelete.name)
        .map((f) => ({ ...f, children: deleteRecursive(f.children || []) }));

    setFoldersTree((prev) => deleteRecursive(prev));

    if (selectedFolder === folderToDelete.name) {
      setSelectedFolder("All Documents");
    }
  };

  const handleAddFolder = () => {
    const folderName = prompt("Enter new folder name:");
    if (!folderName) return;
    setFoldersTree((prev) => {
      const updated = [...prev];
      const uploadsIndex = updated.findIndex((f) => f.name === "Uploads");
      if (uploadsIndex !== -1) {
        updated[uploadsIndex] = {
          ...updated[uploadsIndex],
          children: [...updated[uploadsIndex].children, { name: folderName, count: 0, children: [] }],
        };
      }
      return updated;
    });
  };

  const handleDownloadFolderFiles = (folder) => {
    const docs = documentsForFolders.filter(
      (doc) => folder.name === "All Documents" || doc.folder === folder.name
    );
    if (docs.length === 0) {
      alert("No files to download.");
      return;
    }
    docs.forEach((doc) => {
      const link = document.createElement("a");
      link.href = doc.fileUrl;
      link.download = `${doc.company}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const csvEscape = (val = "") => {
    const s = String(val ?? "");
    // Wrap in quotes and escape inner quotes
    return `"${s.replace(/"/g, '""')}"`;
  };

  const handleExportFolderCSV = (folder) => {
    const docs = documentsForFolders.filter(
      (doc) => folder.name === "All Documents" || doc.folder === folder.name
    );
    if (docs.length === 0) {
      alert("No data to export.");
      return;
    }
    const csvRows = ["Company,Date,Amount,Status"];
    docs.forEach((d) => {
      csvRows.push(
        [csvEscape(d.company), csvEscape(d.date), csvEscape(d.amount), csvEscape(d.status)].join(",")
      );
    });
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${folder.name}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const left = containerRef.current.getBoundingClientRect().left;

      if (isResizingFolders.current) {
        const newWidth = e.clientX - left;
        const min = 180;
        const max = 420;
        if (newWidth >= min && newWidth <= max) setFoldersWidth(newWidth);
      }

      if (isResizingList.current) {
        const start = foldersOpen ? foldersWidth : 0;
        const newWidth = e.clientX - left - start;
        if (newWidth >= 200 && newWidth <= 500) setListWidth(newWidth);
      }

      if (isResizingDoc.current) {
        const start = (foldersOpen ? foldersWidth : 0) + listWidth + 5;
        const newDocWidth = e.clientX - left - start;
        if (newDocWidth >= 400 && newDocWidth <= 1200) setDocWidth(newDocWidth);
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

  useEffect(() => {
    if (foldersOpen) {
      setDetailsCollapsed(true);
    } else {
      setDetailsCollapsed(false);
    }
  }, [foldersOpen]);

  useEffect(() => {
    if (detailsCollapsed) {
      baseDocWidthRef.current = docWidth;
      setDocWidth((w) => Math.min(w + 360, 1200));
    } else {
      setDocWidth(baseDocWidthRef.current || 600);
    }
  }, [detailsCollapsed]);

  // MultipleLineItems modal
  const [showMultipleLineItems, setShowMultipleLineItems] = useState(false);
  const [lineItems, setLineItems] = useState([]);

  const updateLineItem = (index, newItem) => {
    setLineItems((prev) => {
      const updated = [...prev];
      updated[index] = newItem;
      return updated;
    });
  };

  const addLineItem = (item) => setLineItems((prev) => [...prev, item]);
  const removeLineItem = (index) => setLineItems((prev) => prev.filter((_, i) => i !== index));

  const saveLineItems = () => {
    console.log("Saved line items:", lineItems);
    setShowMultipleLineItems(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.items) {
        setLineItems(e.detail.items);
      } else {
        setLineItems([]);
      }
      setShowMultipleLineItems(true);
    };
    window.addEventListener("open-multiple-line-items", handler);
    return () => window.removeEventListener("open-multiple-line-items", handler);
  }, []);

  const calcTotal = useMemo(
    () =>
      lineItems.reduce((sum, i) => {
        const qty = Number(i?.quantity ?? 0);
        const price = Number(i?.unitPrice ?? 0);
        return sum + qty * price;
      }, 0),
    [lineItems]
  );

  return (
    <div className="flex h-full w-full overflow-hidden" ref={containerRef}>
      {/* Folders panel */}
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
        onSelectDocument={handleSelectDocument}
        activeFolder={selectedFolder}
        onAddFolder={handleAddFolder}
        onDownloadFolderFiles={handleDownloadFolderFiles}
        onExportFolderCSV={handleExportFolderCSV}
        onRenameFolder={handleRenameFolder}
        onDeleteFolder={handleDeleteFolder}
      />

      {foldersOpen && (
        <div
          onMouseDown={() => (isResizingFolders.current = true)}
          className="w-[3px] cursor-col-resize bg-transparent hover:bg-gray-200"
          title="Resize folders"
        />
      )}

      <div
        className="flex flex-col bg-white border-r border-border overflow-hidden"
        style={{
          width: listWidth + docWidth + 10,
        }}
      >
        <div className="border-b border-border bg-white flex items-center ">
          <button
            onClick={() => setFoldersOpen(true)}
            className="p-2 hover:bg-gray-100 rounded   pt-4 pl-4"
            title="Show folders"
          >
            <Folder size={20} />
          </button>
          <InvoiceTabs activeTab={invoiceTab} onTabChange={setInvoiceTab} invoices={invoices} />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Invoice List */}
          <div style={{ width: listWidth, flexShrink: 0 }}>
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

          <div
            onMouseDown={() => (isResizingList.current = true)}
            className="w-1 cursor-col-resize bg-transparent"
            title="Resize list"
          />

          {/* Document area */}
          <div style={{ width: docWidth, maxWidth: "100%", padding: "0 10px" }} className="overflow-y-auto">
            <InvoiceDocument invoice={selectedInvoice} fileUrl={selectedDocUrl} />
          </div>
        </div>
      </div>

      {!detailsCollapsed && (
        <div onMouseDown={() => (isResizingDoc.current = true)} className="relative" title="Resize document">
          <div className="absolute top-0 left-[-3px] w-[7px] h-full cursor-col-resize bg-transparent" />
        </div>
      )}

      {detailsCollapsed ? (
        <button
          onClick={() => {
            setDetailsCollapsed(false);
            setFoldersOpen(false);
          }}
          className="h-full text-white-700 bg-blue-500 hover:bg-blue-600 transition-colors"
          style={{
            width: RAIL_WIDTH,
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            letterSpacing: "0.04em",
            fontWeight: 600,
          }}
          title="Edit Document"
        >
          Edit Document
        </button>
      ) : (
        <div className="flex flex-1 overflow-y-auto">
          <InvoiceDetails
            invoice={selectedInvoice}
            onNext={() => {}}
            onPrev={() => {}}
            activeTab={detailsTab}
            onTabChange={setDetailsTab}
          />
        </div>
      )}

      {/* MultipleLineItems modal */}
      {showMultipleLineItems && (
        <MultipleLineItems
          lineItems={lineItems}
          updateLineItem={updateLineItem}
          addLineItem={addLineItem}
          removeLineItem={removeLineItem}
          subtotal={calcTotal}
          total={calcTotal}
          setLineItemMode={() => setShowMultipleLineItems(false)}
          saveLineItems={saveLineItems}
        />
      )}
    </div>
  );
};

export default InvoicePages;
