import React from "react";
import SearchResults from "../SearchResults";
import { Loading } from "../Loading";
import { advancedSearch } from "../../scripts/ScryfallQueries";
import { groupCardsByLanguage } from "../../scripts/GroupCards";
import { getNumberOfDifferentVersions } from "../../scripts/CardCounts";
import CardnameSearch from "../CardnameSearch";
import ArtistSearch from "../ArtistSearch";
import CreatureTypeSearch from "../CreatureTypeSearch";
import SetSearch from "../SetSearch";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleLoadNextPage = this.handleLoadNextPage.bind(this);
    this.state = {
      search: "",
      searchResults: undefined,
      dataIsLoaded: undefined,
      groupedCards: undefined,
      nextPage: undefined,
    };
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    const searchParameters = {
      name: e.target.cardnameSearch.value,
      artist: e.target.artistSearch.value,
      creatureType: e.target.creatureTypeSearch.value,
      setCode: e.target.setSearch.dataset.code,
    };
    this.setState(() => ({
      dataIsLoaded: false,
      nextPage: undefined,
    }));
    this.setState({ search: e.target.cardnameSearch.value }, () => {
      advancedSearch(searchParameters).then((json) => {
        if (json.object === "error") {
          this.setState(() => ({
            searchResults: undefined,
            dataIsLoaded: true,
          }));
          return;
        }
        this.setState(() => ({
          searchResults: json,
          groupedCards: groupCardsByLanguage(json.data),
          dataIsLoaded: true,
        }));
        if (json.has_more) {
          this.setState(() => ({
            nextPage: json.next_page,
          }));
        }
      });
    });
  }

  handleLoadNextPage() {
    fetch(this.state.nextPage)
      .then((res) => res.json())
      .then((json) => {
        let newSearchResults = this.state.searchResults;
        newSearchResults.data = this.state.searchResults.data.concat(json.data);
        const newGroupedCards = groupCardsByLanguage(newSearchResults.data);
        const nextPage = json.has_more ? json.next_page : undefined;
        this.setState(() => ({
          searchResults: newSearchResults,
          groupedCards: newGroupedCards,
          nextPage: nextPage,
        }));
      });
  }

  render() {
    return (
      <div className="p-4 sm:p-8 flex-grow bg-light">
        <div id="cardSearchContainer" className="my-2 print:hidden">
          <form role="search" onSubmit={this.handleSearchSubmit}>
            <div>
              <CardnameSearch />
              <ArtistSearch />
              <CreatureTypeSearch />
              <SetSearch />
              <button id="searchButton" className="btn">
                Search
              </button>
            </div>
          </form>
        </div>
        {this.state.dataIsLoaded && this.state.searchResults && (
          <>
            <p id="seachResultsDescription">
              {`Showing results for "${this.state.search}". Found ${
                this.state.groupedCards?.length
              } different card(s) with ${
                this.state.searchResults?.data?.length
              } different print(s) and ${getNumberOfDifferentVersions(
                this.state.searchResults?.data
              )} different version(s).`}
              {this.state.nextPage &&
                ` More printings are available (${this.state.searchResults.total_cards}).`}
            </p>
            <SearchResults
              searchResults={this.state.searchResults.data}
              groupedCards={this.state.groupedCards}
            />
          </>
        )}
        {this.state.dataIsLoaded &&
          this.state.searchResults &&
          this.state.nextPage && (
            <button
              id="loadMore"
              onClick={this.handleLoadNextPage}
              className="btn"
            >
              Load more...
            </button>
          )}
        {this.state.dataIsLoaded && !this.state.searchResults && (
          <p name="noCardsFound">
            Your query didn't match any cards. Adjust your search terms.
          </p>
        )}
        {this.state.dataIsLoaded === false && <Loading />}
      </div>
    );
  }
}
