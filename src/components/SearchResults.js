import React from "react";
import SearchResultListItem from "./SearchResultListItem";
import SearchResultImageItem from "./SearchResultImageItem";
import SimpleToggle from "./Toggle";

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: true,
    };
    console.log(this.props.searchResults);
  }
  render() {
    if (!this.props.searchResults) return <p>Loading...</p>;
    return (
      <div>
        {this.props.searchResults.length > 0 && (
          <SimpleToggle
            label="Image view"
            onToggle={() => {
              this.setState({ listView: !this.state.listView });
            }}
          />
        )}

        <div
          className={
            !this.state.listView
              ? "grid gap-1 sm:gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
              : ""
          }
        >
          {this.state.listView
            ? this.props.searchResults.map((card) => (
                <SearchResultListItem key={card.id} card={card} />
              ))
            : this.props.searchResults.map((card) => (
                <SearchResultImageItem key={card.id} card={card} />
              ))}
        </div>
      </div>
    );
  }
}
