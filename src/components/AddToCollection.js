import React, { useState } from "react";
import { addCard } from "../scripts/CollectedCards";
import { getOtherLanguages } from "../scripts/ScryfallQueries";
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

export default function AddToCollection({ card, languages }) {
  const [finish, setFinish] = useState(finishes[0]);
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState(conditions[1]);
  const [language, setLanguage] = useState(
    languages.find((language) => card.lang === language.value)
  );

  const handleAddToCollection = (e) => {
    getOtherLanguages(card.id).then((res) =>
      addCard({
        id: res.find((card) => card.language === language.value).id,
        name: card.name,
        set: card.set,
        nr: card.collector_number,
        language: language.value,
        finish: finish.value,
        quantity: parseInt(quantity),
        condition: condition.value,
      })
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
            defaultValue={1}
          />
        </div>
        <div className="flex items-center">
          <TextListBox
            id="language"
            values={languages}
            label="Language"
            onChange={setLanguage}
            defaultValue={languages.findIndex(
              (language) => card.lang === language.value
            )}
          />
        </div>
        <div id="add" className="text-center">
          <button
            onClick={handleAddToCollection}
            className="bg-primary text-light my-2 px-8 rounded-lg hover:underline"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
