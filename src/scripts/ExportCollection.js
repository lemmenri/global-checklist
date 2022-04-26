import { getCollection } from "./Collection";

export const exportCollection = () => {
  const collection = getCollection();
  let csv = `"name", "set", "language", "condition", "finish", "quanity"\r\n`;
  collection.cards.forEach((card) => {
    card.collected.forEach((entry) => {
      csv += `"${card.name}", "${card.set}", "${card.language}", "${entry.condition}", "${entry.finish}", "${entry.quantity}"\r\n`;
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
