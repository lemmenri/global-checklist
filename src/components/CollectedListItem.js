import { PencilAltIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { removeCardVersion } from "../scripts/CollectedCards";
import Condition from "./Condition";
import Language from "./Language";

export default function CollectedListItem({
  id,
  finish,
  quantity,
  condition,
  language,
}) {
  const [edit, setEdit] = useState(false);

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

  const handleToggleEdit = () => {
    setEdit(!edit);
  };

  const handleRemoveFromCollection = () => {
    console.log(id + finish + condition);
    console.log(removeCardVersion(id, finish, condition));
    handleToggleEdit();
  };

  const handleEditCard = () => {
    console.log("save edit");
    handleToggleEdit();
  };

  return (
    <>
      <div className="flex flex-wrap px-2 border border-t-0 border-primary justify-between items-center">
        <div className="flex flex-wrap space-x-4 items-center">
          <div
            id="finish"
            className="font-bold w-10 text-center border border-dark rounded"
            title={finish}
          >
            {finishSign}
          </div>
          <div
            id="quantity"
            className="w-10 text-center border border-dark rounded"
          >
            {quantity}x
          </div>
          <div id="condition" className="w-10">
            <Condition condition={condition} />
          </div>
          <div id="language" className="w-10">
            <Language language={language} />
          </div>
        </div>
        <div id="edit" className="w-6 flex justify-center items-center">
          <button
            className="p-0.5 rounded hover:border-dark hover:border-2"
            onClick={handleToggleEdit}
          >
            <PencilAltIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div
        className={`transition-all duration-200 ease-in-out border-primary ${
          edit
            ? "h-20 visible opacity-100 border border-t-0"
            : "h-0 invisible opacity-0 border-none"
        }`}
      >
        Edit
        <div className="flex justify-center items-center w-full">
          <div id="add" className="text-center px-2">
            <button
              onClick={handleRemoveFromCollection}
              className="btn bg-light text-dark border border-1 border-dark"
            >
              Delete
            </button>
          </div>
          <div id="add" className="text-center px-2">
            <button
              onClick={handleEditCard}
              className="btn border border-1 border-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
