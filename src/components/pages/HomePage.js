import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCardnameList } from "../../scripts/ScryfallQueries";
import SearchCombobox from "../SearchCombobox";


export default function HomePage() {
  document.title = "MTG Library";

  const [cardNames, setCardNames] = useState(undefined);

  useEffect(() => {
    getCardnameList().then((json) => setCardNames(json.data));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    goToCardname(e.target.cardnameSearch.value)
  }

  const navigate = useNavigate();
  const goToCardname = (cardName) => {
    navigate({
      pathname: "/search",
      search: `?name=${cardName}`,
    });
  };

  const goToPage = (page) => {
    navigate({
      pathname: page,
    });
  };

  return (
    <div className="flex flex-col p-4 sm:p-8 flex-grow bg-light w-full place-items-center space-y-12 my-6">
      <h1 className="display font-semibold text-center">Welcome to MTG Library</h1>
      <p className="text-center">
        Keeping track of <span className="font-bold">all</span> your Magic: The
        Gathering cards has never been easier.
      </p>
      <form id="searchForm" role="search" onSubmit={handleSearchSubmit}>
        <div id="searchFormItemsContainer" className="flex flex-col place-items-center">
          <SearchCombobox
            itemList={cardNames}
            id="cardnameSearch"
            placeholder="Search cards..."
            withSearchButton={true}
          />
        </div>
      </form>
      <div id="actions" className="flex flex-wrap space-x-2 max-w-screen-sm place-content-center">
        <button id="goToAdvancedSearchButton" className="btn bg-light text-dark border border-1 border-dark" onClick={() => goToPage("search")}>Advanced Search</button>
        <button id="goToSetsButton" className="btn bg-light text-dark border border-1 border-dark" onClick={() => goToPage("sets")}>Sets</button>
        <button id="goToImportExport" className="btn bg-light text-dark border border-1 border-dark" onClick={() => goToPage("import-export")}>Import/Export</button>
      </div>
    </div>
  );
}
