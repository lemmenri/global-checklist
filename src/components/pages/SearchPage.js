import React from "react";
import SearchResults from "../SearchResults";

// const cardName = "Snap";
// const url = `https://api.scryfall.com/cards/search?order=released&q=%22${cardName.replaceAll(
//     " ",
//     "+"
// )}%22+include%3Aextras&unique=prints`;

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.addRawDataToCardlist = this.addRawDataToCardlist.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
        this.state = {
            search: "",
            cardList: [],
            rawCardData: [],
            hasMore: undefined,
            totalCards: undefined,
            dataIsLoaded: false
        };
    }

    // componentDidMount() {
    // fetch(url)
    //     .then((res) => res.json())
    //     .then((json) => {
    //         this.setState(() => ({
    //             rawCardData: json.data,
    //             hasMore: json.has_more,
    //             totalCards: json.total_cards,
    //             dataIsLoaded: true
    //         }));
    //     })
    //     .then(() => this.addRawDataToCardlist());
    // }

    handleSearchSubmit(event) {
        event.preventDefault()
        this.setState({ search: event.target.q.value }, () => {
            fetch(`https://api.scryfall.com/cards/search?order=released&q=%22${this.state.search.replaceAll(
                " ",
                "+"
            )}%22+include%3Aextras&unique=prints`)
                .then((res) => res.json())
                .then((json) => {
                    this.setState(() => ({
                        rawCardData: json.data,
                        hasMore: json.has_more,
                        totalCards: json.total_cards,
                        dataIsLoaded: true
                    }));
                })
                .then(() => this.addRawDataToCardlist());
        })
    }

    // TODO: clean up this file
    // TODO: handle if no cards are found on second search
    // TODO: move cardSearch to separate component
    // TODO: get card languages for found cards
    // TODO: add collection state

    addRawDataToCardlist() {
        let cleanedCardData = this.state.rawCardData.map((card) => ({
            name: card.name,
            id: card.id,
            set: card.set,
            set_name: card.set_name,
            nr: card.collector_number,
            rarity: card.rarity,
            collected: {
                en: {
                    regular: card.nonfoil ? 0 : "",
                    foil: card.foil ? 0 : ""
                },
                de: {
                    regular: card.nonfoil ? 0 : "",
                    foil: card.foil ? 0 : ""
                },
                fr: {
                    regular: card.nonfoil ? 0 : "",
                    foil: card.foil ? 0 : ""
                },
                it: {
                    regular: card.nonfoil ? 0 : "",
                    foil: card.foil ? 0 : ""
                },
                sp: {
                    regular: card.nonfoil ? 0 : "",
                    foil: card.foil ? 0 : ""
                },
                pt: {
                    regular: card.nonfoil ? 0 : "",
                    foil: card.foil ? 0 : ""
                },
                jp: {
                    regular: card.nonfoil ? 0 : "",
                    foil: card.foil ? 0 : ""
                },
                cs: {
                    regular: card.nonfoil ? 0 : "",
                    foil: card.foil ? 0 : ""
                },
                ct: {
                    regular: card.nonfoil ? 0 : "",
                    foil: card.foil ? 0 : ""
                },
                ru: {
                    regular: card.nonfoil ? 0 : "",
                    foil: card.foil ? 0 : ""
                },
                ko: {
                    regular: card.nonfoil ? 0 : "",
                    foil: card.foil ? 0 : ""
                }
            },
            prices: {
                eur: card.prices.eur,
                eurfoil: card.prices.eur_foil,
                usd: card.prices.usd,
                usdfoil: card.prices.usd_foil
            },
            img: card.hasOwnProperty("image_uris") // check if image is available
                ? card.image_uris.normal
                : card.card_faces[0].hasOwnProperty("image_uris")// check for double faced card
                    ? card.card_faces[0].image_uris.normal
                    : "https://c2.scryfall.com/file/scryfall-errors/soon.jpg"
        }));
        this.setState(() => ({
            cardList: cleanedCardData
        }));
    }

    render() {
        return (
            <div className="p-1 sm:p-8 bg-gray-400">
                <div id="cardSearchContainer" className="my-2 ">
                    <form role="search" onSubmit={this.handleSearchSubmit}>
                        <div>
                            <input
                                className="p-1"
                                type="search"
                                id="cardSearch"
                                name="q"
                                placeholder="Search cards..."
                                aria-label="Search for Magic cards" />
                            <button className="bg-green-300 text-black m-4 px-4 rounded-xl hover:bg-green-500">Search</button>
                        </div>
                    </form>
                </div>
                {this.state.dataIsLoaded ? (
                    <div>
                        <p>
                            "{this.state.search}" - found {this.state.cardList.length} cards.{" "}
                            {this.state.hasMore
                                ? `More cards are available (${this.state.totalCards}). Limit your search.`
                                : ""}
                        </p>
                        <SearchResults cardList={this.state.cardList} />
                    </div>
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        );
    }
}
