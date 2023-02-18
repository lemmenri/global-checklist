import { getCollection } from "./Collection";

export const exportCollection = () => {
  const collection = getCollection();
  let csv = `name;set;nr;language;condition;finish;quanity;scryfall_id\r\n`;
  collection.cards.forEach((card) => {
    card.collected.forEach((entry) => {
      csv += `"${card.name}";${card.set};${card.nr};${card.language};${entry.condition};${entry.finish};${entry.quantity};${card.id}\r\n`;
    });
  });

  downloadBlob(csv, "export.csv", "text/csv;charset=utf-8;");
};

/** Download contents as a file
 * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
 */
function downloadBlob(content, filename, contentType) {
  // Create a blob
  var blob = new Blob([content], { type: contentType });
  var url = URL.createObjectURL(blob);

  // Create a link to download it
  var pom = document.createElement("a");
  pom.href = url;
  pom.setAttribute("download", filename);
  pom.click();
}
