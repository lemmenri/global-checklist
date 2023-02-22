import React, { useState } from "react";
import SearchResultListItem from "./SearchResultListItem";
import SearchResultImageItem from "./SearchResultImageItem";
import SimpleToggle from "./Toggle";
import { getCollection } from "../scripts/Collection";

const filterByCollected = (list, isGrouped) => {
  if (getCollection() === null) return [];
  const collection = getCollection();
  const filteredList = [];

  isGrouped
    ? list.forEach((item) => {
      if (collection.cards.find((card) => item.id === card.id)) {
        filteredList.push(item);
      }
    })
    : list.forEach((group) => {
      let groupHasItem = false;
      group.forEach((item) => {
        if (collection.cards.find((card) => item.id === card.id)) {
          groupHasItem = true;
        }
      });
      groupHasItem && filteredList.push(group);
    });

  return filteredList;
};

export default function SearchResults({ searchResults, groupedCards }) {
  const [listView, setListView] = useState(true);
  const [filterCollected, setFilterCollected] = useState(false);
  const [filteredSearchResults] = useState(
    filterByCollected(searchResults, true)
  );
  const [filteredGroupedCards] = useState(
    filterByCollected(groupedCards, false)
  );

  return (
    <div>
      {searchResults.length > 0 && (
        <div className="flex flex-col py-2 space-y-1 print:hidden">
          <SimpleToggle
            name="toggle-list-view"
            label="Image view"
            onToggle={() => {
              setListView(!listView);
            }}
          />
          <SimpleToggle
            name="toggle-filter-collected"
            label="Only show collected"
            onToggle={() => {
              setFilterCollected(!filterCollected);
            }}
          />
        </div>
      )}

      <div
        id="search-results"
        className={
          !listView
            ? "grid gap-1 sm:gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 print:grid-cols-3"
            : ""
        }
      >
        {filterCollected
          ? listView
            ? filteredGroupedCards.map((group) => (
              <SearchResultListItem key={group[0].id} group={group} />
            ))
            : filteredSearchResults.map((card) => (
              <SearchResultImageItem key={card.id} card={card} />
            ))
          : listView
            ? groupedCards.map((group) => (
              <SearchResultListItem key={group[0].id} group={group} />
            ))
            : searchResults.map((card) => (
              <SearchResultImageItem key={card.id} card={card} />
            ))}
        {filterCollected && filteredSearchResults.length === 0 && (
          <p name="noCardsInCollection">No cards in collection</p>
        )}
      </div>
    </div>
  );
}
