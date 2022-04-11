import React from "react";
import SearchResults from "../SearchResults";
import { Loading } from "../Loading";
import { searchByCardname } from "../../scripts/ScryfallQueries";
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
    this.state = {
      search: "",
      searchResults: undefined,
      dataIsLoaded: undefined,
      groupedCards: undefined,
    };
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    console.log(e.target.artistSearch.value);
    console.log(e.target.cardnameSearch.value);
    console.log(e.target.creatureTypeSearch.value);
    console.log(e.target.setSearch.value);
    this.setState(() => ({
      dataIsLoaded: false,
    }));
    this.setState({ search: e.target.cardnameSearch.value }, () => {
      searchByCardname(this.state.search).then((json) => {
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
      });
    });
  }

  render() {
    return (
      <div className="p-4 sm:p-8 flex-grow bg-light">
        <div id="cardSearchContainer" className="my-2 ">
          <form role="search" onSubmit={this.handleSearchSubmit}>
            <div>
              <CardnameSearch />
              <ArtistSearch />
              <CreatureTypeSearch />
              <SetSearch />
              <button className="bg-primary text-light my-4 px-8 rounded-lg hover:underline">
                Search
              </button>
            </div>
          </form>
        </div>
        {this.state.dataIsLoaded && (
          <div>
            <p>
              {`Showing results for "${this.state.search}". Found ${
                this.state.groupedCards?.length
              } different card(s) with ${
                this.state.searchResults?.data?.length
              } different print(s) and ${getNumberOfDifferentVersions(
                this.state.searchResults?.data
              )} different version(s).`}
              {this.state.searchResults.has_more &&
                ` More printings are available (${this.state.searchResults.total_cards}). Limit your search.`}
            </p>
            <SearchResults
              searchResults={this.state.searchResults.data}
              groupedCards={this.state.groupedCards}
            />
          </div>
        )}
        {this.state.dataIsLoaded === false && <Loading />}
      </div>
    );
  }
}
