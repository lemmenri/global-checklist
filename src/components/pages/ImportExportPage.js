import React from "react";
import { exportCollection } from "../../scripts/ExportCollection";

export default function SetsPage() {
  document.title = "MTG Library - Import - Export";

  const handleDownload = () => {
    exportCollection();
  };

  return (
    <div className="p-4 sm:p-8 flex-grow bg-light">
      <h1 className="display">Import and Export</h1>
      <h2 className="h1">Import</h2>
      <p>work in progress...</p>
      <h2 className="h1">Export</h2>
      <p>Export your collection in .csv format.</p>
      <button className="btn" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
}
