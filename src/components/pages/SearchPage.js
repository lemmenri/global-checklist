import React, { useEffect, useState } from "react";
import SearchResults from "../SearchResults";
import { Loading } from "../Loading";
import { advancedSearch } from "../../scripts/ScryfallQueries";
import { groupCardsByLanguage } from "../../scripts/GroupCards";
import { getNumberOfDifferentVersions } from "../../scripts/CardCounts";
import CardnameSearch from "../CardnameSearch";
import ArtistSearch from "../ArtistSearch";
import CreatureTypeSearch from "../CreatureTypeSearch";
import SetSearch from "../SetSearch";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  document.title = "MTG Library - Search";

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(undefined);
  const [dataIsLoaded, setDataIsLoaded] = useState(undefined);
  const [groupedCards, setGroupedCards] = useState(undefined);
  const [nextPage, setNextPage] = useState(undefined);
  const [searchParams] = useSearchParams();

  const hasSearchParams = () => {
    return (
      searchParams.get("name") !== null ||
      searchParams.get("artist") !== null ||
      searchParams.get("creatureType") !== null ||
      searchParams.get("set") !== null
    );
  };

  useEffect(() => {
    if (hasSearchParams()) {
      const form = document.getElementById("searchForm");
      form.requestSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchParameters = {
      name: e.target.cardnameSearch.value,
      artist: e.target.artistSearch.value,
      creatureType: e.target.creatureTypeSearch.value,
      setCode:
        searchParams.get("set") !== undefined &&
          searchParams.get("set") !== null
          ? searchParams.get("set")
          : e.target.setSearch.dataset.code,
    };

    setDataIsLoaded(false);
    setNextPage(undefined);
    setSearch(e.target.cardnameSearch.value);

    advancedSearch(searchParameters).then((json) => {
      if (json.object === "error") {
        setSearchResults(undefined);
        setDataIsLoaded(true);
        return;
      }
      setSearchResults(json);
      setGroupedCards(groupCardsByLanguage(json.data));
      setDataIsLoaded(true);
      if (json.has_more) {
        setNextPage(json.next_page);
      }
    });
  };

  const handleLoadNextPage = () => {
    fetch(nextPage)
      .then((res) => res.json())
      .then((json) => {
        let newSearchResults = searchResults;
        newSearchResults.data = searchResults.data.concat(json.data);
        setSearchResults(newSearchResults);
        setGroupedCards(groupCardsByLanguage(newSearchResults.data));
        setNextPage(json.has_more ? json.next_page : undefined);
      });
  };

  return (
    <div className="p-4 sm:p-8 flex-grow bg-light">
      <h1 className="display">Search</h1>
      <div id="cardSearchContainer" className="my-2 print:hidden">
        <form id="searchForm" role="search" onSubmit={handleSearchSubmit}>
          <div>
            <CardnameSearch defaultCardnameValue={searchParams.get("name")} />
            <ArtistSearch defaultArtistValue={searchParams.get("artist")} />
            <CreatureTypeSearch
              defaultCreatureTypeValue={searchParams.get("creatureType")}
            />
            <SetSearch defaultSetValue={searchParams.get("set")} />
            <button id="searchButton" className="btn">
              Search
            </button>
          </div>
        </form>
      </div>
      {dataIsLoaded && searchResults && (
        <>
          <p id="seachResultsDescription">
            {`Showing results for "${search}". Found ${groupedCards?.length
              } different card(s) with ${searchResults?.data?.length
              } different print(s) and ${getNumberOfDifferentVersions(
                searchResults?.data
              )} different version(s).`}
            {nextPage &&
              ` More printings are available (${searchResults.total_cards}).`}
          </p>
          <SearchResults
            searchResults={searchResults.data}
            groupedCards={groupedCards}
          />
        </>
      )}
      {dataIsLoaded && searchResults && nextPage && (
        <button id="loadMore" onClick={handleLoadNextPage} className="btn">
          Load more...
        </button>
      )}
      {dataIsLoaded && !searchResults && (
        <p name="noCardsFound">
          Your query didn't match any cards. Adjust your search terms.
        </p>
      )}
      {dataIsLoaded === false && <Loading />}
    </div>
  );
}
