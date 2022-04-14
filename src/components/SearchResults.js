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
  }
  render() {
    if (!this.props.searchResults) return <p>Loading...</p>;
    return (
      <div>
        {this.props.searchResults.length > 0 && (
          <div className="print:hidden">
            <SimpleToggle
              label="Image view"
              onToggle={() => {
                this.setState({ listView: !this.state.listView });
              }}
            />
          </div>
        )}

        <div
          className={
            !this.state.listView
              ? "grid gap-1 sm:gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 print:grid-cols-3"
              : ""
          }
        >
          {this.state.listView
            ? this.props.groupedCards.map((group) => (
                <SearchResultListItem key={group[0].id} group={group} />
              ))
            : this.props.searchResults.map((card) => (
                <SearchResultImageItem key={card.id} card={card} />
              ))}
        </div>
      </div>
    );
  }
}
