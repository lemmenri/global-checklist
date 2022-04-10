import React from "react";
import SearchResultListItem from "./SearchResultListItem";
import SearchResultImageItem from "./SearchResultImageItem";
import { Toggle } from "react-toggle-component";

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
          <>
            <label htmlFor="toggle-list-view">Image view</label>
            <Toggle
              name="toggle-list-view"
              width="32px"
              height="16px"
              leftBackgroundColor="#06746B"
              rightBackgroundColor="#E7EAEE"
              borderWidth="1px"
              borderColor="#042A33"
              knobWidth="12px"
              knobHeight="12px"
              knobGap="18px"
              leftKnobColor="#E7EAEE"
              rightKnobColor="#042A33"
              checked={true}
              onToggle={() => {
                this.setState({ listView: !this.state.listView });
              }}
            />
          </>
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
