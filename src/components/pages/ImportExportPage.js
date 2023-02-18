import React from "react";
import { exportCollection } from "../../scripts/ExportCollection";
import { addCard } from "../../scripts/CollectedCards";

export default function SetsPage() {
  document.title = "MTG Library - Import - Export";

  const handleDownload = () => {
    exportCollection();
  };

  const handleImport = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const reader = new FileReader();
   
    reader.addEventListener("load", () => {
      // Process uploaded file
      const cards = reader.result.split(/\r?\n/);
      cards.forEach((line, index) => {
        if (line.charAt(0) === '"') {
          console.log(index + ", " + line);
          const card = line.split(';');
          addCard({
            id: card[7],
            name: card[0].replaceAll('"', ''),
            set: card[1],
            nr: card[2],
            language: card[3],
            finish: card[5],
            quantity: card[6],
            condition: card[4],
          });
        }
      });
    }, false);
  
    if (file) {
      reader.readAsText(file);
    }
  }

  return (
    <div className="p-4 sm:p-8 flex-grow bg-light">
      <h1 className="display">Import and Export</h1>
      <h2 className="h1">Import</h2>
      <p className="pb-4">Please note importing is still in experimental phase. To succesfully upload your collection use the export collection below to get a template and expand from there. The id in the last field is the scryfall id. No fields can be left blank at the moment.</p>
      <form id="import" onSubmit={handleImport}>
        <input type="file" id="csvFile" accept=".csv" />
        <br />
        <input className="btn" type="submit" value="Upload" />
      </form>

      <h2 className="h1">Export</h2>
      <p className="pb-4">Export your collection in .csv format.</p>
      <button className="btn" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
}
