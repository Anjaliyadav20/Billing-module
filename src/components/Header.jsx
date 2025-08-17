import { Upload, } from "lucide-react";
import { useRef, useState } from "react";
import Vector1 from "./assets/vector1.svg"
import LayoutGrid from "./assets/layout-grid.svg"
import TableRow from "./assets/table-row.svg"
import { UploadModal } from "./invoice/UploadModal"

export const Header = () => {

  const [activeView, setActiveView] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <div className="flex items-center justify-between px-6 h-16 border-b border-border bg-white">
        <h1 className="text-xl font-semibold text-foreground">AI Invoicing</h1>

        <div className="flex items-center gap-4">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveView("grid")}
              className={`w-9 h-9 flex items-center justify-center ${activeView === "grid"
                  ? "bg-indigo-50 text-indigo-600"
                  : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
            >
              <img src={LayoutGrid} alt="layout" className="w-4 h-4" />
            </button>
            <div className="w-px bg-gray-300" />
            <button
              onClick={() => setActiveView("list")}
              className={`w-9 h-9 flex items-center justify-center ${activeView === "list"
                  ? "bg-indigo-50 text-indigo-600"
                  : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
            >
              <img src={TableRow} alt="tablerow" className="w-4 h-4" />
            </button>
            <div className="w-px bg-gray-300" />
            <button
              onClick={() => setActiveView("board")}
              className={`w-9 h-9 flex items-center justify-center ${activeView === "board"
                  ? "bg-indigo-50 text-indigo-600"
                  : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
            >
              <img src={Vector1} alt="vector" className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 h-9 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium"
          >
            <Upload className="w-4 h-4" />
            Upload Invoice
          </button>
        </div>
      </div>
      {isModalOpen && <UploadModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};
