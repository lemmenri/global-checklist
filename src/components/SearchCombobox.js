import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";

const maxDisplayedResults = 5;
const noResultsMessage = "No results found.";

export default function SearchCombobox({ itemList, id, placeholder }) {
  const [selectedItem, setSelectedItem] = useState(void 0);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(true);

  const filteredItems = query
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
        setShowResults(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setShowResults(false);
        }
      }}
      as="div"
      className="rounded-lg overflow-hidden outline outline-dark outline-1 max-w-xs"
    >
      <div className="flex items-center">
        <Combobox.Input
          onChange={(event) => {
            setSelectedItem(undefined);
            setQuery(event.target.value);
            setShowResults(true);
          }}
          className="text-sm w-full bg-light border-0 focus:ring-2 focus:ring-dark ml-0.5 rounded-l-md"
          placeholder={placeholder}
          id={id}
          name={id}
          autoComplete="off"
        />
        <div className="text-light bg-dark p-2">
          <SearchIcon className="h-6 w-6" />
        </div>
      </div>
      {filteredItems.length > 0 && showResults && (
        <Combobox.Options static className=" text-sm max-h-72 overflow-y-auto">
          {Object.values(filteredItems.slice(0, maxDisplayedResults)).map(
            (cardName, index) => (
              <Combobox.Option key={index} value={cardName}>
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
      {query && filteredItems.length === 0 && (
        <p className="text-sm px-4 py-2">{noResultsMessage}</p>
      )}
    </Combobox>
  );
}
