import React, { useState } from "react";
import { Combobox } from "@headlessui/react";

const maxDisplayedResults = 5;
const noResultsMessage = "No results found.";

export default function SearchCombobox({ itemList, id, placeholder, codeMap }) {
  const [selectedItem, setSelectedItem] = useState("");
  const [code, setCode] = useState(undefined);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(true);

  const filteredItems =
    query && itemList
      ? itemList.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <Combobox
      value={selectedItem}
      onChange={(value) => {
        setSelectedItem(value);
        setQuery(value);
        setCode(
          codeMap ? codeMap.find((item) => item.name === value).code : undefined
        );
        setShowResults(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setShowResults(false);
        }
      }}
      as="div"
      className="rounded-lg overflow-hidden border border-dark border-1 max-w-xs"
    >
      <div className="flex items-center">
        <Combobox.Input
          onChange={(event) => {
            setSelectedItem(undefined);
            setQuery(event.target.value);
            setShowResults(true);
          }}
          className="text-sm w-full bg-light border-0 ml-0.5 rounded-l-md focus:ring-0"
          placeholder={placeholder}
          id={id}
          name={id}
          data-code={code}
          autoComplete="off"
        />
      </div>
      {filteredItems.length > 0 && showResults && (
        <Combobox.Options static className="text-sm max-h-72 overflow-y-auto">
          {Object.values(filteredItems.slice(0, maxDisplayedResults)).map(
            (cardName, index) => (
              <Combobox.Option key={index} value={cardName} name={cardName}>
                {({ active }) => (
                  <div
                    className={`px-4 py-2 ${
                      active ? "bg-dark text-light" : ""
                    } hover:cursor-pointer`}
                  >
                    {cardName}
                  </div>
                )}
              </Combobox.Option>
            )
          )}
        </Combobox.Options>
      )}
      {query && itemList && filteredItems.length === 0 && showResults && (
        <p className="text-sm px-4 py-2" name="noSearchResults">
          {noResultsMessage}
        </p>
      )}
      {query && !itemList && <p className="text-sm px-4 py-2">Loading...</p>}
    </Combobox>
  );
}
