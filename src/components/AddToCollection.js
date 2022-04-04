import React from "react";
import { addCardToCollection } from "../scripts/Collection";
import Condition from "./Condition";
import Language from "./Language";
import MyListbox from "./ListBox";

const finishes = [
  { id: 1, name: "•", value: "nonfoil" },
  { id: 2, name: "✶", value: "foil" },
  { id: 3, name: "E", value: "etched" },
  { id: 4, name: "G", value: "glossy" },
];

export default function AddToCollection({ id }) {
  const handleAddToCollection = () => {
    addCardToCollection(id, "nonfoil", "NM", 1);
  };

  return (
    <div className="py-4 max-w-sm">
      <div
        id="add to collection header"
        className="bg-primary text-white py-1 px-2"
      >
        Add to collection
      </div>
      <div className="flex flex-wrap py-1 px-4 border border-primary justify-between items-center">
        <div className="flex flex-wrap space-x-4 items-center">
          <MyListbox values={finishes} label="Finish" />

          {/* <div id='amount' className='w-10 text-center outline outline-1 rounded'>{"1"}x</div> */}
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="99"
            className="w-14 text-center outline outline-1 rounded bg-transparent border-none p-0"
          ></input>
          <div id="condition" className="w-10">
            <Condition condition={"NM"} />
          </div>
          <div id="language" className="w-10">
            <Language language={"EN"} />
          </div>
        </div>
        <div id="edit" className="w-10 text-center">
          <button
            onClick={handleAddToCollection}
            className="px-2 rounded-lg bg-primary text-light hover:underline"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
