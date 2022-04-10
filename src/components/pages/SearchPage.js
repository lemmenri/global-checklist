import React from "react";
import SearchResults from "../SearchResults";
import { Loading } from "../Loading";
import CardnameSearch from "../CardnameSearch";
import { searchByCardname } from "../../scripts/ScryfallQueries";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.state = {
      search: "",
      searchResults: undefined,
      dataIsLoaded: undefined,
    };
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    this.setState(() => ({
      dataIsLoaded: false,
    }));
    this.setState({ search: e.target.q.value }, () => {
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
              <label htmlFor="cardSearch">Search by card name:</label>
              <br />
              <CardnameSearch />
              <button className="bg-primary text-light my-4 px-8 rounded-lg hover:underline">
                Search
              </button>
            </div>
          </form>
        </div>
        {this.state.dataIsLoaded && (
          <div>
            <p>
              {`Showing results for "${this.state.search}". Found ${this.state.searchResults?.data?.length} different card(s).`}
              {this.state.searchResults.has_more &&
                ` More printings are available (${this.state.searchResults.total_cards}). Limit your search.`}
            </p>
            <SearchResults searchResults={this.state.searchResults.data} />
          </div>
        )}
        {this.state.dataIsLoaded === false && <Loading />}
      </div>
    );
  }
}
