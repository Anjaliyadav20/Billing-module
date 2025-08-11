import { Upload, LayoutGrid, AlignJustify, Layout } from "lucide-react";
import { useRef, useState } from "react";

export const Header = () => {
  const fileInputRef = useRef(null);
  const [activeView, setActiveView] = useState("grid");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 h-16 border-b border-border bg-white">
      <h1 className="text-xl font-semibold text-foreground">AI Invoicing</h1>

      <div className="flex items-center gap-4">
   
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveView("grid")}
            className={`w-9 h-9 flex items-center justify-center ${
              activeView === "grid"
                ? "bg-indigo-50 text-indigo-600"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <div className="w-px bg-gray-300" />
          <button
            onClick={() => setActiveView("list")}
            className={`w-9 h-9 flex items-center justify-center ${
              activeView === "list"
                ? "bg-indigo-50 text-indigo-600"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <AlignJustify className="w-4 h-4" />
          </button>
          <div className="w-px bg-gray-300" />
          <button
            onClick={() => setActiveView("board")}
            className={`w-9 h-9 flex items-center justify-center ${
              activeView === "board"
                ? "bg-indigo-50 text-indigo-600"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Layout className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleUploadClick}
          className="flex items-center gap-2 px-4 h-9 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition text-sm font-medium"
        >
          <Upload className="w-4 h-4" />
          Upload Invoice
        </button>


        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};
