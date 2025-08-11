import React from "react";
import { Sidebar } from "../components/Sidebar.jsx";
import { Header } from "../components/Header.jsx";

export default function DefaultLayout({ children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F1F3FD]">
      {/* Sidebar */}
      <div className="flex-shrink-0 bg-[#F1F3FD]">
        <Sidebar />
      </div>

      {/* Main floating content */}
      <div className="flex-1 h-full overflow-hidden pr-3 pt-3 pb-3"> {/* Removed left padding */}
        <div
          className="
            h-full
            w-full
            bg-white
            border border-gray-200
            rounded-2xl
            shadow-[0_10px_35px_rgba(17,24,39,0.07)]
            overflow-hidden
          "
        >
          <div className="flex h-full flex-col bg-white">
            <Header />
            <main className="flex-1 overflow-auto bg-white">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
