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

  const fileUrl = invoice?.previewUrl || "/invoices/sample_invoice.pdf";

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

        const firstPage = await loadedPdf.getPage(1);
        const viewport = firstPage.getViewport({ scale: 1, rotation: 0 });
        const parent = pdfContainerRef.current?.parentElement;
        if (parent) {
          const width = parent.clientWidth - 20;
          const fitScale = width / viewport.width;
          setZoom(fitScale);
          renderAllPages(loadedPdf, fitScale, 0);
        }
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [fileUrl]);

  useEffect(() => {
    const handleResize = () => {
      if (!pdf || !pdfContainerRef.current) return;
      pdf.getPage(1).then((page) => {
        const base = page.getViewport({ scale: 1, rotation });
        const parent = pdfContainerRef.current?.parentElement;
        if (!parent) return;
        const width = parent.clientWidth - 20;
        const fitScale = width / base.width;
        setZoom(fitScale);
        renderAllPages(pdf, fitScale, rotation);
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pdf, rotation]);

  useEffect(() => {
    if (pdf) renderAllPages(pdf, zoom, rotation);
  }, [zoom, pdf, isPageless, rotation]);

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

      pdfContainerRef.current.appendChild(canvas);
      await page.render({ canvasContext: ctx, viewport }).promise;
    }
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
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
  ];

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-3 border-l border-r border-gray-200 bg-white text-sm">
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
            <span className="text-center text-gray-800 text-l">
              {Math.round(zoom * 100)}%
            </span>
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
            {actionButtons.map((btn, idx) => (
              <button
                key={idx}
                onClick={btn.onClick}
                className="flex items-center justify-center w-8 h-8 bg-gray-50 hover:bg-gray-200 rounded-[7px] transition-colors"
                title={btn.title}
              >
                {btn.kind === "icon" ? (
                  <btn.Icon className="w-4 h-4 text-gray-700" strokeWidth={2.4} />
                ) : (
                  <img src={btn.src} alt={btn.title} className="w-5 h-5" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 p-5 bg-muted overflow-auto custom-scroll"
      >
        <div ref={pdfContainerRef} className="flex flex-col items-center" />
      </div>

      <button
        onClick={togglePageless}
        className="absolute bottom-6 right-6 bg-white rounded-xl shadow-md border border-gray-200 p-3 hover:shadow-lg transition-all"
        title={isPageless ? "Switch to Page View" : "Switch to Pageless View"}
      >
        <img src={FileIcon} className="h-5 w-5 text-muted-foreground" alt="fileicon" />
      </button>
    </div>
  );
};
