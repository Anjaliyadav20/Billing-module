import { useEffect, useRef, useState } from "react";
import {
  X,
  FileUp,
  UploadCloud,
  CheckCircle2,
  Trash2,
  Image as ImageIcon,
  FileText,
  Loader2,
} from "lucide-react";

export const UploadModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("document");
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);
  const backdropRef = useRef(null);

  const handleBrowseClick = () => fileInputRef.current?.click();

  const handleFiles = (fileList) => {
    if (!fileList?.length) return;
    const selected = Array.from(fileList).map((f) => ({
      id: `${f.name}-${f.size}-${f.lastModified}-${Math.random()}`,
      file: f,
    }));
    setFiles((prev) => [...prev, ...selected]);
  };

  const handleFileChange = (e) => handleFiles(e.target.files);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const formatBytes = (bytes) => {
    if (!+bytes) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    const idx = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, idx)).toFixed(1)} ${units[idx]}`;
  };

  const handleUpload = async () => {
    if (!files.length) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setFiles([]);
    }, 1200);
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose?.();
  };

  const TabButton = ({ value, title, subtitle }) => {
    const active = activeTab === value;
    return (
      <button
        onClick={() => setActiveTab(value)}
        className={`flex-1 px-4 py-2.5 text-left transition-colors border-b-2 ${
          active
            ? "border-indigo-500 text-indigo-700 bg-indigo-50/40"
            : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
        }`}
      >
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-[11px] text-gray-400">{subtitle}</div>
      </button>
    );
  };

  const fileTypeIcon = (file) => {
    const t = (file.type || "").toLowerCase();
    if (t.includes("image")) return <ImageIcon className="w-4 h-4" />;
    if (t.includes("pdf") || file.name?.toLowerCase().endsWith(".pdf"))
      return <FileText className="w-4 h-4" />;
    return <FileUp className="w-4 h-4" />;
  };

  return (
    <div
      ref={backdropRef}
      onMouseDown={onBackdropClick}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-3"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white w-full max-w-[640px] max-h-[75vh] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b bg-gradient-to-r from-white to-gray-50">
          <h2 className="text-base font-semibold">Upload</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-white">
          <TabButton
            value="document"
            title="Document Upload"
            subtitle="Upload single documents or in bulk."
          />
          <TabButton
            value="split"
            title="Multi‑Page PDF Split"
            subtitle="Split each page into a new document."
          />
        </div>

        {/* Body (shorter height) */}
        <div className="p-4 h-64 overflow-auto">
          {/* Dropzone (compact padding) */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              dragActive ? "border-indigo-500 bg-indigo-50/40" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pointer-events-none select-none">
              <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-700 mb-1">Drag and drop files here</p>
              <p className="text-xs text-gray-400 mb-3">JPG, PNG, PDF, etc.</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleBrowseClick}
                className="pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white text-sm px-4 py-2 shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300"
              >
                <FileUp className="w-4 h-4" />
                Browse files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={activeTab === "document" ? ".pdf,.png,.jpg,.jpeg" : ".pdf"}
                onChange={handleFileChange}
                className="hidden"
              />
              {activeTab === "split" && (
                <span className=" flex flex-2 text-[11px] text-gray-500 ">
                  (Only PDF allowed in split mode)
                </span>
              )}
            </div>
          </div>

          {/* Selected files list (smaller max height) */}
          {!!files.length && (
            <div className="mt-4">
              <div className="text-xs font-semibold text-gray-500 mb-2">
                Selected files ({files.length})
              </div>
              <ul className="space-y-2 max-h-36 overflow-auto pr-1">
                {files.map(({ id, file }) => (
                  <li
                    key={id}
                    className="flex items-center justify-between rounded-lg border bg-white px-3 py-2 shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                        {fileTypeIcon(file)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-800 truncate">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatBytes(file.size)} · {file.type || "Unknown"}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(id)}
                      className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action bar (compact) */}
        <div className="px-5 py-3 bg-gray-50 border-t flex items-center justify-between">
          <div className="text-[11px] text-gray-500">
            {activeTab === "split"
              ? "Each page of a multi‑page PDF will be split into a separate document."
              : "You can upload multiple files at once."}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-white"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!files.length || isUploading}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading…
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Upload
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
