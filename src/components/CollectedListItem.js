import { Transition } from "@headlessui/react";
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
  handleDeleteCard
}) {
  const [showEdit, setShowEdit] = useState(false);

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
    setShowEdit(!showEdit);
  };

  const handleRemoveFromCollection = () => {
    removeCardVersion(id, finish, condition);
    handleToggleEdit();
    handleDeleteCard()
  };

  const handleEditCard = () => {
    console.log("save edit");
    handleToggleEdit();
  };

  return (
    <>
      <div
        id="collected-list-item"
        className="flex flex-wrap px-2 border border-t-0 border-primary justify-between items-center"
      >
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
      <Transition
        show={showEdit}
        enter="duration-500"
        enterFrom="opacity-0 max-h-0"
        enterTo="opacity-100 max-h-40"
        leave="duration-500"
        leaveFrom="opacity-100 max-h-40"
        leaveTo="opacity-0 max-h-0"
      >
        <div id="editContainer" className="border-primary border border-t-0">
          Edit
          <div className="flex justify-center items-center w-full">
            <div id="delete" className="text-center px-2">
              <button
                onClick={handleRemoveFromCollection}
                className="btn bg-light text-dark border border-1 border-dark"
              >
                Delete
              </button>
            </div>
            <div id="save" className="text-center px-2">
              <button
                onClick={handleEditCard}
                className="btn border border-1 border-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}
