import React, { useEffect, useState } from "react";
import { addCard } from "../scripts/CollectedCards";
import TextListBox from "./ListBox";
import { conditions } from "../enums/conditions";
import { finishes } from "../enums/finishes";

export default function AddToCollection({ card, languages, handleAddCard }) {
  const [validFinishes, setFinishes] = useState(finishes);
  const [finish, setFinish] = useState(
    finishes.find((element) => element.value === card.finishes[0])
  );
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState(conditions[1]);
  const [language, setLanguage] = useState(
    languages.find((language) => card.lang === language.value)
  );

  useEffect(() => {
    filterFinishes(card.finishes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterFinishes = (availableFinishes) => {
    const filteredFinishes = [];
    availableFinishes.forEach((finish) => {
      const i = finishes.findIndex((element) => element.value === finish);
      filteredFinishes.push(finishes[i]);
    });
    setFinishes(filteredFinishes);

    if (!filteredFinishes.find((element) => element.value === finish.value)) {
      setFinish(filteredFinishes[0]);
    }
  };

  const handleAddToCollection = (e) => {
    addCard({
      id: languages.find((card) => card.value === language.value).id,
      name: card.name,
      set: card.set,
      nr: card.collector_number,
      language: language.value,
      finish: finish.value,
      quantity: parseInt(quantity),
      condition: condition.value,
    });
    handleAddCard();
  };

  const handleSetLanguage = (e) => {
    setLanguage(e);
    filterFinishes(e.finishes);
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
            values={validFinishes}
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
            className="w-14 text-center border border-dark rounded bg-transparent py-0.5 px-0 focus:border-2 focus:ring-0 focus:border-dark"
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
            onChange={handleSetLanguage}
            defaultValue={languages.findIndex(
              (language) => card.lang === language.value
            )}
          />
        </div>
        <div id="add" className="text-center">
          <button onClick={handleAddToCollection} className="btn">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
