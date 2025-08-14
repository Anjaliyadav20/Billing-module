// components/invoice/FolderPannel.jsx
import { useEffect, useRef, useState } from "react";
import {
  Folder,
  Upload,
  ChevronLeft,
  Plus,
  Tag,
  FileWarning,
  CheckCircle,
  StickyNote,
  ChevronDown,
  ChevronRight,
  Trash2,
  Cloud,
} from "lucide-react";

export default function FoldersPanel({
  open,
  width = 260,
  onClose,
  onUpload,
  onSelectFolder,
  onSelectDocument,
  onDelete,
  invoice,
  folders = [],
  documents = [],
  tags = [],
  activeFolder,
  onAddFolder,
  onRenameFolder,
  onDeleteFolder,
  onDownloadFolderFiles,
  onExportFolderCSV,
}) {
  const inputRef = useRef(null);

  const [expandedFolders, setExpandedFolders] = useState({});
  const [menuOpenFor, setMenuOpenFor] = useState(null);

  useEffect(() => {
    const close = () => setMenuOpenFor(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const toggleExpand = (name) => {
    setMenuOpenFor(null);
    setExpandedFolders((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // ===== Uniform sizes (no flex shrinking) =====
  const ICON_WRAPPER = "flex-none inline-flex items-center justify-center w-4 h-4 min-w-[16px] min-h-[16px]";
  const ICON_SVG = "w-4 h-4";
  const CARET_WRAPPER = "flex-none inline-flex items-center justify-center w-4 h-4 min-w-[16px] min-h-[16px] mr-1 rounded hover:bg-gray-200";
  const MENU_BTN = "flex-none inline-flex items-center justify-center w-5 h-5 min-w-[20px] min-h-[20px] rounded hover:bg-gray-200";
  // ============================================

  const statusIcon = (status) => {
    switch (status) {
      case "warning":
        return <FileWarning className={`${ICON_SVG} text-yellow-500`} />;
      case "check":
        return <CheckCircle className={`${ICON_SVG} text-green-600`} />;
      case "note":
        return <StickyNote className={`${ICON_SVG} text-gray-500`} />;
      default:
        return null;
    }
  };

  const Caret = ({ isOpen, onClick }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={CARET_WRAPPER}
      title={isOpen ? "Collapse" : "Expand"}
    >
      {isOpen ? (
        <ChevronDown className={`${ICON_SVG} text-gray-600`} />
      ) : (
        <ChevronRight className={`${ICON_SVG} text-gray-600`} />
      )}
    </button>
  );

  const Row = ({ f, level }) => {
    const isExpanded = !!expandedFolders[f.name];
    const isActive = activeFolder === f.name;

    const folderDocs = documents.filter((doc) => doc.folder === f.name);
    const hasChildren = (f.children && f.children.length > 0) || folderDocs.length > 0;

    const IconComp = f.name === "All Documents" ? Cloud : f.name === "Trash" ? Trash2 : Folder;
    const iconColor =
      f.name === "All Documents" ? "text-green-600" :
      f.name === "Trash" ? "text-red-600" :
      "text-orange-500";

    const isAllDocs = f.name === "All Documents";
    const showRightMenu = isAllDocs || level === 1; // All Docs + company folders under Uploads

    return (
      <div className="relative">
        {/* Row */}
        <div
          className={`w-full flex items-center justify-between gap-1 px-2 py-1 rounded text-[13px] ${
            isActive ? "bg-gray-100" : "hover:bg-gray-100"
          }`}
          style={{ paddingLeft: 4 + level * 12 }}
          onClick={() => {
            setMenuOpenFor(null);
            onSelectFolder?.(f.name);
          }}
        >
          {/* Left: caret, icon, label (all non-shrinking) */}
          <div className="flex items-center min-w-0">
            {hasChildren ? (
              <Caret isOpen={isExpanded} onClick={() => toggleExpand(f.name)} />
            ) : (
              <span className="inline-block w-4 h-4 min-w-[16px] min-h-[16px] mr-1" />
            )}

            <span className={`${ICON_WRAPPER} mr-2`}>
              <IconComp className={`${ICON_SVG} ${iconColor}`} />
            </span>

            <span className="truncate" title={f.name}>
              {f.name}
            </span>
          </div>

          {/* Right: (count) + dropdown toggle (fixed size) */}
          <div className="flex items-center gap-1">
            <span className="text-[12px] text-gray-600 whitespace-nowrap">({f.count})</span>

            {showRightMenu && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpenFor((prev) => (prev === f.name ? null : f.name));
                }}
                className={MENU_BTN}
                title="Menu"
              >
                <ChevronDown className={`${ICON_SVG} text-gray-600`} />
              </button>
            )}
          </div>
        </div>

        {/* Right dropdown menu */}
        {showRightMenu && menuOpenFor === f.name && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-1 top-full mt-1 z-50 w-48 rounded-md border border-gray-200 bg-white shadow-lg"
          >
            <button
              className="w-full text-left px-3 py-2 text-[13px] hover:bg-gray-50"
              onClick={() => {
                setMenuOpenFor(null);
                onAddFolder?.(f);
              }}
            >
              Add New Folder
            </button>
            {!isAllDocs && (
              <>
                <button
                  className="w-full text-left px-3 py-2 text-[13px] hover:bg-gray-50"
                  onClick={() => {
                    setMenuOpenFor(null);
                    onRenameFolder?.(f);
                  }}
                >
                  Rename Folder
                </button>
                <button
                  className="w-full text-left px-3 py-2 text-[13px] hover:bg-gray-50"
                  onClick={() => {
                    setMenuOpenFor(null);
                    onDeleteFolder?.(f);
                  }}
                >
                  Delete Folder
                </button>
              </>
            )}
            <div className="h-px bg-gray-200 my-1" />
            <button
              className="w-full text-left px-3 py-2 text-[13px] hover:bg-gray-50"
              onClick={() => {
                setMenuOpenFor(null);
                onDownloadFolderFiles?.(f);
              }}
            >
              Download All Files
            </button>
            <button
              className="w-full text-left px-3 py-2 text-[13px] hover:bg-gray-50"
              onClick={() => {
                setMenuOpenFor(null);
                onExportFolderCSV?.(f);
              }}
            >
              Export To CSV
            </button>
          </div>
        )}

        {/* Docs under a company folder */}
        {isExpanded && folderDocs.length > 0 && (
          <div style={{ paddingLeft: 26 }}>
            {folderDocs.map((doc, idx) => (
              <div
                key={idx}
                className="px-2 py-1 flex justify-between items-center border-b hover:bg-gray-50 text-[12.5px]"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  onClick={() => onSelectDocument?.(doc)}
                  className="cursor-pointer flex-1"
                >
                  <div className="font-medium truncate">{doc.company}</div>
                  <div className="text-xs text-gray-500">Date: {doc.date}</div>
                  <div className="text-xs text-gray-700">{doc.amount}</div>
                </div>

                <span className="flex-none inline-flex items-center justify-center w-4 h-4 min-w-[16px] min-h-[16px]">
                  {statusIcon(doc.status)}
                </span>

                <button
                  onClick={() => onDelete?.(idx)}
                  className="ml-2 text-red-500 hover:text-red-700 flex-none inline-flex items-center justify-center w-4 h-4 min-w-[16px] min-h-[16px]"
                  title="Move to Trash"
                >
                  <Trash2 className={`${ICON_SVG}`} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Recurse for children */}
        {isExpanded &&
          f.children?.length > 0 &&
          f.children.map((child, i) => (
            <Row key={`${f.name}-${i}`} f={child} level={level + 1} />
          ))}
      </div>
    );
  };

  return (
    <div
      className={`h-full flex flex-col bg-white border-r transition-all duration-200 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ width: open ? width : 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 h-11 border-b bg-gray-50">
        <span className="text-[13px] font-semibold">Folders</span>
        <div className="flex gap-1">
          <button
            className="flex items-center gap-1 px-2 py-1 rounded border text-[11.5px] hover:bg-gray-100"
            title="New Folder"
            onClick={(e) => {
              e.stopPropagation();
              onAddFolder?.({ context: "header" });
            }}
          >
            <Plus className="w-4 h-4" /> New Folder
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded border hover:bg-gray-100"
            onClick={onClose}
            title="Close"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-auto p-1">
        {folders.map((f, i) => (
          <Row key={`${f.name}-${i}`} f={f} level={0} />
        ))}
      </div>

      {/* TAGS + upload */}
      <div className="border-t">
        <div className="px-2 py-2 bg-blue-50 flex items-center justify-between">
          <div className="text-[11.5px] uppercase tracking-wide text-gray-700 flex items-center gap-2">
            <Tag className="w-4 h-4" /> TAGS
          </div>
          <button
            className="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11.5px] hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onAddFolder?.({ context: "tags" });
            }}
          >
            <Plus className="w-4 h-4" /> New Tag
          </button>
        </div>

        <div className="p-2">
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11.5px] bg-gray-50"
              >
                <Tag className="w-4 h-4" />
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={() => inputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 h-8 text-[12.5px] rounded bg-blue-600 text-white hover:bg-blue-500"
          >
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={(e) => onUpload?.(e.target.files?.[0] || null)}
          />
        </div>
      </div>
    </div>
  );
}
