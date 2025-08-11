import React from "react";
import { Sidebar } from "../components/Sidebar.jsx";
import { Header } from "../components/Header.jsx";

export default function DefaultLayout({ children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-muted">
      <Sidebar /> 
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header /> 
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
