import React, { useState } from "react";
import { addCardToCollection } from "../scripts/Collection";
import TextListBox from "./ListBox";

const finishes = [
  { id: 1, name: "•", value: "nonfoil" },
  { id: 2, name: "✶", value: "foil" },
  { id: 3, name: "E", value: "etched" },
  { id: 4, name: "G", value: "glossy" },
];

const conditions = [
  { id: 1, name: "MT", value: "MT", type: "condition" },
  { id: 2, name: "NM", value: "NM", type: "condition" },
  { id: 3, name: "EX", value: "EX", type: "condition" },
  { id: 4, name: "GD", value: "GD", type: "condition" },
  { id: 5, name: "LP", value: "LP", type: "condition" },
  { id: 6, name: "PL", value: "PL", type: "condition" },
  { id: 7, name: "PO", value: "PO", type: "condition" },
];

const languages = [
  { id: 1, name: "EN", value: "EN", type: "language" },
  { id: 2, name: "DE", value: "DE", type: "language" },
  { id: 3, name: "ES", value: "ES", type: "language" },
  { id: 4, name: "FR", value: "FR", type: "language" },
  { id: 5, name: "IT", value: "IT", type: "language" },
  { id: 6, name: "JA", value: "JA", type: "language" },
  { id: 7, name: "KO", value: "KO", type: "language" },
  { id: 8, name: "PT", value: "PT", type: "language" },
  { id: 9, name: "RU", value: "RU", type: "language" },
  { id: 10, name: "ZHS", value: "ZHS", type: "language" },
  { id: 11, name: "ZHT", value: "ZHT", type: "language" },
];

export default function AddToCollection({ id }) {
  const [finish, setFinish] = useState(finishes[0]);
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState(conditions[1]);

  const handleAddToCollection = () => {
    addCardToCollection(id, finish.value, condition.value, quantity);
    console.log(
      `Added ${quantity} ${condition.value} ${finish.value} copies of card ${id}`
    );
  };

  return (
    <div className="py-4 max-w-sm">
      <div
        id="add to collection header"
        className="bg-primary text-white py-1 px-2"
      >
        Add to collection
      </div>
      <div className="flex flex-col py-2 px-2 border border-primary space-y-2">
        <div className="flex items-center">
          <TextListBox
            id="finish"
            values={finishes}
            label="Finish"
            onChange={setFinish}
          />
        </div>
        <div className="flex items-center">
          <label id="quantity-label" className="w-1/2">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="999"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            aria-labelledby="quantity-label"
            className="w-14 text-center outline outline-1 rounded bg-transparent border-none py-0.5 px-0 focus:outline-dark focus:outline-2 focus:ring-0 focus:outline-offset-0 hover:outline-2"
          />
        </div>
        <div className="flex items-center">
          <TextListBox
            id="condition"
            values={conditions}
            label="Condition"
            onChange={setCondition}
          />
        </div>
        <div className="flex items-center">
          <TextListBox id="language" values={languages} label="Language" />
        </div>
        <div id="add" className="text-center">
          <button
            onClick={handleAddToCollection}
            className="px-6 py-0.5 rounded bg-primary text-light hover:underline"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
