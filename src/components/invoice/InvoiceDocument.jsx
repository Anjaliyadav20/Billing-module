import {
  ChevronUp,
  ChevronDown,
  Download,
  Printer,
  ExternalLink,
  CirclePlus,
  CircleMinus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

import LeftRotate from "../assets/left-rotate.svg";
import RightRotate from "../assets/right-rotate.svg";
import FileIcon from "../assets/sticker-square.svg";

export const InvoiceDocument = ({ invoice }) => {
  const scrollContainerRef = useRef(null);
  const pdfContainerRef = useRef(null);
  const renderIdRef = useRef(0);

  const [pdf, setPdf] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageless, setIsPageless] = useState(false);
  const [rotation, setRotation] = useState(0);

  // --- Notes state ---
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const autosaveTimer = useRef(null);

  const baseScaleRef = useRef(1);

  const fileUrl = invoice?.previewUrl || "/invoices/sample_invoice.pdf";
  const invoiceKey = `invoiceNotes:${invoice?.id ?? fileUrl}`;

  const getParentWidth = () => {
    const parent = pdfContainerRef.current?.parentElement;
    if (!parent) return 0;
    const styles = window.getComputedStyle(parent);
    const padL = parseFloat(styles.paddingLeft || "0");
    const padR = parseFloat(styles.paddingRight || "0");
    const gutter = 20;
    return Math.max(0, parent.clientWidth - padL - padR - gutter);
  };

  const computeFitScale = async (doc, rot = 0) => {
    const firstPage = await doc.getPage(1);
    const baseViewport = firstPage.getViewport({ scale: 1, rotation: rot });
    const width = getParentWidth();
    if (!width || !baseViewport.width) return 1;
    return width / baseViewport.width;
  };

  const renderAllPages = async (pdfDoc, scale, rot = 0) => {
    if (!pdfContainerRef.current) return;

    const thisRenderId = ++renderIdRef.current;
    pdfContainerRef.current.innerHTML = "";

    for (let n = 1; n <= pdfDoc.numPages; n++) {
      if (thisRenderId !== renderIdRef.current) return;

      const page = await pdfDoc.getPage(n);
      const viewport = page.getViewport({ scale, rotation: rot });

      const canvas = document.createElement("canvas");
      canvas.className = "pdf-page";
      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      if (!isPageless) {
        canvas.style.marginBottom = "20px";
        canvas.style.boxShadow = "0 0 8px rgba(0,0,0,.12)";
        canvas.style.borderRadius = "6px";
        canvas.style.background = "#fff";
      } else {
        canvas.style.marginBottom = "8px";
        canvas.style.boxShadow = "none";
        canvas.style.background = "#fff";
      }

      canvas.style.maxWidth = "100%";
      canvas.style.height = "auto";
      canvas.style.display = "block";

      pdfContainerRef.current.appendChild(canvas);
      await page.render({ canvasContext: ctx, viewport }).promise;
    }
  };

  const fitAndRender = async (doc, rot = rotation) => {
    const fitScale = await computeFitScale(doc, rot);
    baseScaleRef.current = fitScale;
    setZoom(fitScale);
    await renderAllPages(doc, fitScale, rot);
  };

  // ---------- Load PDF ----------
  useEffect(() => {
    let cancelled = false;
    if (!fileUrl) return;

    setCurrentPage(1);
    setPageCount(1);
    setPdf(null);
    setRotation(0);

    const loadingTask = pdfjsLib.getDocument(fileUrl);
    loadingTask.promise
      .then(async (loadedPdf) => {
        if (cancelled) return;
        setPdf(loadedPdf);
        setPageCount(loadedPdf.numPages);
        await fitAndRender(loadedPdf, 0);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [fileUrl]);

  useEffect(() => {
    if (pdf) renderAllPages(pdf, zoom, rotation);
  }, [zoom, isPageless, rotation, pdf]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current || !pdfContainerRef.current) return;
      const pageElems = pdfContainerRef.current.querySelectorAll(".pdf-page");
      if (!pageElems.length) return;

      let newCurrent = currentPage;
      const containerTop = scrollContainerRef.current.scrollTop;
      let smallestDiff = Infinity;

      pageElems.forEach((el, index) => {
        const diff = Math.abs(el.offsetTop - containerTop);
        if (diff < smallestDiff) {
          smallestDiff = diff;
          newCurrent = index + 1;
        }
      });
      setCurrentPage(newCurrent);
    };

    const scrollEl = scrollContainerRef.current;
    if (scrollEl) scrollEl.addEventListener("scroll", handleScroll);
    return () => {
      if (scrollEl) scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, [pdf]);

  // ---------- Resize handling ----------
  useEffect(() => {
    if (!pdfContainerRef.current) return;

    const parent = pdfContainerRef.current.parentElement;
    if (!parent) return;

    const ro = new ResizeObserver(async () => {
      if (!pdf) return;
      const newFit = await computeFitScale(pdf, rotation);
      baseScaleRef.current = newFit;

      const hadCustomZoom = Math.abs(zoom - baseScaleRef.current) > 1e-6;
      const updatedZoom = hadCustomZoom ? newFit * (zoom / (zoom || newFit)) : newFit;

      setZoom(updatedZoom);
      await renderAllPages(pdf, updatedZoom, rotation);
    });

    ro.observe(parent);
    return () => ro.disconnect();
  }, [pdf, rotation, zoom]);

  useEffect(() => {
    const onWinResize = async () => {
      if (!pdf) return;
      await fitAndRender(pdf, rotation);
    };
    window.addEventListener("resize", onWinResize);
    return () => window.removeEventListener("resize", onWinResize);
  }, [pdf, rotation]);

  // ---------- Zoom/rotate ----------
  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.1, baseScaleRef.current * 4));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.1, baseScaleRef.current * 0.1));
  const handleRotateLeft = () => setRotation((r) => (r - 90 + 360) % 360);
  const handleRotateRight = () => setRotation((r) => (r + 90) % 360);
  const handleReload = () => {
    if (pdf) renderAllPages(pdf, zoom, rotation);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = `invoice-${invoice?.id || "sample"}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const jumpToPage = (pageNum) => {
    if (!pdfContainerRef.current || !scrollContainerRef.current) return;
    const pageElems = pdfContainerRef.current.querySelectorAll(".pdf-page");
    if (pageNum < 1 || pageNum > pageCount) return;
    const el = pageElems[pageNum - 1];
    if (el) {
      scrollContainerRef.current.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handlePageChange = (dir) => {
    const targetPage = dir === "up" ? currentPage - 1 : currentPage + 1;
    if (targetPage >= 1 && targetPage <= pageCount) {
      jumpToPage(targetPage);
    }
  };

  const openExternal = () => window.open(fileUrl, "_blank");
  const togglePageless = () => setIsPageless((v) => !v);
  const handlePrint = () => window.print();

  useEffect(() => {
    const saved = localStorage.getItem(invoiceKey);
    setNoteText(saved ?? "");
    const open = localStorage.getItem(`${invoiceKey}:open`) === "1";
    setIsNotesOpen(open);
  }, [invoiceKey]);

  const saveNote = (text = noteText) => {
    localStorage.setItem(invoiceKey, text);
  };

  // 🆕 Clear/cancel notes (removes from localStorage too)
  const handleCancelNote = () => {
    setNoteText("");
    localStorage.removeItem(invoiceKey); // remove stored note
  };

  const handleNoteChange = (e) => {
    const val = e.target.value;
    setNoteText(val);

    // Debounced autosave
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      saveNote(val);
    }, 500);
  };

  const handleToggleNotes = () => {
    const next = !isNotesOpen;
    setIsNotesOpen(next);
    localStorage.setItem(`${invoiceKey}:open`, next ? "1" : "0");
  };

  if (!invoice) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-muted-foreground rounded" />
          </div>
          <p className="text-sm">Select an invoice to view the document</p>
        </div>
      </div>
    );
  }

  const actionButtons = [
    { onClick: handleRotateLeft, kind: "img", src: LeftRotate, title: "Rotate counterclockwise" },
    { onClick: handleRotateRight, kind: "img", src: RightRotate, title: "Rotate clockwise" },
    { onClick: handlePrint, kind: "icon", Icon: Printer, title: "Print" },
    { onClick: handleDownload, kind: "icon", Icon: Download, title: "Download" },
    { onClick: openExternal, kind: "icon", Icon: ExternalLink, title: "Open in new tab" },
    { onClick: handleToggleNotes, kind: "text", label: "Notes", title: "Notes" },
  ];

  const percent = Math.round((zoom / (baseScaleRef.current || 1)) * 100);

  return (
    <div className="relative flex flex-col h-full ">
      {/* Top toolbar */}
      <div className="flex items-center justify-between px-3 py-3 border-l border-r border-gray-200 bg-white text-sm flex-wrap gap-2">
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange("up")}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          <div className="mx-2 text-sm text-gray-700 font-medium min-w-[40px] text-center">
            {currentPage} of {pageCount}
          </div>

          <button
            onClick={() => handlePageChange("down")}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          <div className="mx-2 self-stretch w-px bg-gray-300" />

          <div className="flex items-center">
            <button
              onClick={handleZoomOut}
              className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-50 rounded-l-full transition-colors"
              title="Zoom out"
            >
              <CircleMinus className="w-4 h-4" />
            </button>
            <span className="text-center text-gray-800 text-l">{percent}%</span>
            <button
              onClick={handleZoomIn}
              className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-50 rounded-r-full transition-colors"
              title="Zoom in"
            >
              <CirclePlus className="w-4 h-4" />
            </button>
          </div>

          <div className="mx-2 h-10 w-px bg-gray-300" />

          <div className="flex items-center gap-2">
            {actionButtons.map((btn, idx) => {
              const isLast = idx === actionButtons.length - 1;
              const activeNotes = isLast && isNotesOpen;

              return (
                <button
                  key={idx}
                  onClick={btn.onClick}
                  className={`flex items-center justify-center ${
                    isLast ? "h-8 px-3 w-auto" : "w-8 h-8"
                  } ${activeNotes ? "bg-blue-100" : "bg-gray-50"} hover:bg-gray-200 rounded-[7px] transition-colors`}
                  title={btn.title}
                >
                  {btn.kind === "icon" ? (
                    <btn.Icon className="w-4 h-4 text-gray-700" strokeWidth={2.4} />
                  ) : btn.kind === "img" ? (
                    <img src={btn.src} alt={btn.title} className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium text-gray-700">{btn.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll area */}
      <div ref={scrollContainerRef} className="flex-1 p-5 bg-muted overflow-auto custom-scroll">
        {isNotesOpen && (
          <div className="mb-4 border rounded-lg bg-white shadow-sm">
            <div className="px-3 py-2  flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Notes for INV #{invoice?.id ?? "—"}</span>
              </div>
              <div className="flex items-center gap-2">
                {/* 🆕 Cancel button to remove notes */}
                <button
                  onClick={handleCancelNote}
                  className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-red-300 text-red-700 bg-red-50 hover:bg-red-100"
                  title="Clear Note"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    saveNote();
                  }}
                  className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white hover:opacity-90"
                  title="Save Note"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="px-3 py-2">
              <textarea
                value={noteText}
                onChange={handleNoteChange}
                placeholder="Add a note"
                className="w-full min-h-[110px] max-h-[320px] resize-y rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>
        )}

        {/* PDF container */}
        <div ref={pdfContainerRef} className="flex flex-col items-center" />
      </div>

      {/* Pageless toggle button */}
      <button
        onClick={() => setIsPageless((v) => !v)}
        className="absolute bottom-6 right-6 bg-white rounded-xl shadow-md border border-gray-200 p-3 hover:shadow-lg transition-all"
        title={isPageless ? "Switch to Page View" : "Switch to Pageless View"}
      >
        <img src={FileIcon} className="h-5 w-5 text-muted-foreground" alt="fileicon" />
      </button>
    </div>
  );
};
