import { PencilAltIcon } from "@heroicons/react/outline";
import React from "react";
import Condition from "./Condition";
import Language from "./Language";

export default function CollectedListItem({
  finish,
  amount,
  condition,
  language,
}) {
  let finishSign = "";
  switch (finish) {
    case "nonfoil":
      finishSign = "•";
      break;
    case "foil":
      finishSign = "✶";
      break;
    case "etched":
      finishSign = "E";
      break;
    case "glossy":
      finishSign = "G";
      break;
    default:
      finishSign = "•";
  }
  return (
    <div className="flex flex-wrap py-1 px-2 border border-primary justify-between items-center">
      <div className="flex flex-wrap space-x-4 items-center">
        <div
          id="finish"
          className="font-bold w-10 text-center outline outline-1 rounded"
        >
          {finishSign}
        </div>
        <div id="amount" className="w-10 text-center outline outline-1 rounded">
          {amount}x
        </div>
        <div id="condition" className="w-10">
          <Condition condition={condition} />
        </div>
        <div id="language" className="w-10">
          <Language language={language} />
        </div>
      </div>
      <div id="edit" className="text-center">
        <button className="p-1 rounded hover:text-light hover:bg-dark">
          <PencilAltIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
