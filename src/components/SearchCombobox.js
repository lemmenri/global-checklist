import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";

const maxDisplayedResults = 100;
const noResultsMessage = "No results found.";

export default function SearchCombobox({
  itemList,
  id,
  placeholder,
  codeMap,
  defaultValue,
  withSearchButton = false
}) {
  const [selectedItem, setSelectedItem] = useState(
    defaultValue ? defaultValue : ""
  );
  const [code, setCode] = useState("");
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(true);

  const filteredItems =
    query && itemList
      ? itemList.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      )
      : [];

  return (
    <div className="flex">
      <Combobox
        value={selectedItem}
        onChange={(value) => {
          setSelectedItem(value);
          setQuery(value);
          setCode(
            codeMap ? codeMap.find((item) => item.name === value).code : ""
          );
          setShowResults(false);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setShowResults(false);
          }
        }}
        as="div"
        className={`rounded-lg overflow-hidden border border-dark border-1 max-w-xs ${withSearchButton ? "rounded-r-none" : ""}`}
      >
        <div className="flex items-center ">
          <Combobox.Input
            onChange={(event) => {
              setSelectedItem("");
              setQuery(event.target.value);
              setShowResults(true);
            }}
            className="small w-full bg-light border-0 ml-0. py-1 rounded-l-md focus:ring-0"
            placeholder={placeholder}
            id={id}
            name={id}
            data-code={code}
            autoComplete="off"
          />
        </div>
        {filteredItems.length > 0 && showResults && (
          <Combobox.Options static className="small max-h-72 overflow-y-auto absolute bg-light z-10 border border-dark ml-0.5 rounded-lg focus:ring-0">
            {Object.values(filteredItems.slice(0, maxDisplayedResults)).map(
              (cardName, index) => (
                <Combobox.Option key={index} value={cardName} name={cardName}>
                  {({ active }) => (
                    <div
                      className={`px-4 py-2 sm:py-0.5 ${active ? "bg-dark text-light" : ""
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
          <p className="small px-4 py-2" name="noSearchResults">
            {noResultsMessage}
          </p>
        )}
        {query && !itemList && <p className="small px-4 py-2">Loading...</p>}
      </Combobox>
      {withSearchButton && (
        <button id="searchButton" aria-label="search" className="inset-y-0 right-0 flex items-center bg-dark text-light px-2 rounded-r-lg">
          <SearchIcon
            className="h-5 w-5 hover:border-b"
          />
        </button>
      )}
    </div>
  );
}
