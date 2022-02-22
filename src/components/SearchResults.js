import React from "react";
import SearchResultListItem from "./SearchResultListItem";
import SearchResultImageItem from "./SearchResultImageItem";
import { Toggle } from "react-toggle-component";

export default class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: true
        };
    }
    render() {
        return (
            <div>
                {this.props.cardList.length > 0 &&
                    <>
                        <label htmlFor="toggle-list-view">List view</label>
                        <Toggle
                            name="toggle-list-view"
                            onToggle={() => {
                                this.setState({ listView: !this.state.listView });
                            }}
                        />
                    </>}

                <div
                    className={
                        !this.state.listView
                            ? "grid gap-1 sm:gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
                            : ""
                    }
                >
                    {this.state.listView
                        ? this.props.cardList.map((card) => (
                            <SearchResultListItem key={card.id} card={card} />
                        ))
                        : this.props.cardList.map((card) => (
                            <SearchResultImageItem key={card.id} card={card} />
                        ))}
                </div>
            </div>
        );
    }
}
