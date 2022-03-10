import React from "react";
import SearchResults from "../SearchResults";
import { Loading } from "../Loading";

// const cardName = "Snap";
// const url = `https://api.scryfall.com/cards/search?order=released&q=%22${cardName.replaceAll(
//     " ",
//     "+"
// )}%22+include%3Aextras&unique=prints`;

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.addRawDataToCardlist = this.addRawDataToCardlist.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.processRawCardData = this.processRawCardData.bind(this)
        this.state = {
            search: "",
            cardList: [],
            rawCardData: [],
            hasMore: undefined,
            totalCards: undefined,
            dataIsLoaded: undefined
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
        this.setState(() => ({
            dataIsLoaded: false
        }))
        this.setState({ search: event.target.q.value }, () => {
            fetch(`https://api.scryfall.com/cards/search?order=released&q=%22${this.state.search.replaceAll(
                " ",
                "+"
            )}%22+include%3Aextras+-is%3Adigital+lang%3Aany&unique=prints`)
                .then((res) => res.json())
                .then((json) => {
                    if (json.object === "error") {
                        this.setState(() => ({
                            cardList: [],
                            rawCardData: [],
                            hasMore: undefined,
                            totalCards: undefined,
                            dataIsLoaded: true
                        }))
                        return
                    }
                    this.setState(() => ({
                        rawCardData: json.data,
                        hasMore: json.has_more,
                        totalCards: json.total_cards
                    }));
                })
                .then(() => this.processRawCardData())
                .then(() => this.setState(() => ({
                    dataIsLoaded: true
                })))
        })
    }

    // TODO: clean up this file
    // DONE: handle if no cards are found on second search
    // TODO: move cardSearch to separate component
    // DONE: get card languages for found cards
    // TODO: add collection state
    // DONE: remove initial loading state (use React Query?)
    // TODO: add autocomplete / suggestions to card search (using headlessUI combobox?)
    // DONE: update foil / non-foil to include etched foil and glossy and new setup of scryfall api. Use finishes field
    // TODO: handle multiple pages in search results
    // TODO: handle going back from card details to search results
    // TODO: handle opening card details page in new window

    processRawCardData() {
        let cleanedCardData = []
        this.state.rawCardData.forEach((rawCard) => {

            const index = cleanedCardData.findIndex((cleanedCard) => (
                cleanedCard.name === rawCard.name &&
                cleanedCard.set_name === rawCard.set_name &&
                cleanedCard.nr === rawCard.collector_number
            ))

            if (index !== -1) {
                //card already exists
                cleanedCardData[index] = {
                    ...cleanedCardData[index],
                    collected: {
                        ...cleanedCardData[index].collected,
                        [rawCard.lang]: {
                            ...(rawCard.finishes.includes("nonfoil")) && { nonfoil: 0 },
                            ...(rawCard.finishes.includes("foil")) && { foil: 0 },
                            ...(rawCard.finishes.includes("etched")) && { etched: 0 },
                            ...(rawCard.finishes.includes("glossy")) && { glossy: 0 },
                        }
                    }
                }
            }
            else {
                //card new to list
                cleanedCardData.push({
                    name: rawCard.name,
                    id: rawCard.id,
                    set: rawCard.set,
                    set_name: rawCard.set_name,
                    nr: rawCard.collector_number,
                    rarity: rawCard.rarity,
                    collected: {
                        [rawCard.lang]: {
                            ...(rawCard.finishes.includes("nonfoil")) && { nonfoil: 0 },
                            ...(rawCard.finishes.includes("foil")) && { foil: 0 },
                            ...(rawCard.finishes.includes("etched")) && { etched: 0 },
                            ...(rawCard.finishes.includes("glossy")) && { glossy: 0 },
                        }
                    },
                    prices: {
                        eur: rawCard.prices.eur,
                        eur_foil: rawCard.prices.eur_foil,
                        usd: rawCard.prices.usd,
                        usd_foil: rawCard.prices.usd_foil,
                        usd_etched: rawCard.prices.usd_etched
                    },
                    img: rawCard.hasOwnProperty("image_uris") // check if image is available
                        ? rawCard.image_uris.normal
                        : rawCard.card_faces[0].hasOwnProperty("image_uris")// check for double faced card
                            ? rawCard.card_faces[0].image_uris.normal
                            : "https://c2.scryfall.com/file/scryfall-errors/soon.jpg"
                })
            }
        })
        this.setState(() => ({
            cardList: cleanedCardData
        }));
    }

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
                    nonfoil: card.finishes.includes("nonfoil") ? 0 : "",
                    foil: card.finishes.includes("foil") ? 0 : ""
                },
                de: {
                    nonfoil: card.finishes.includes("nonfoil") ? 0 : "",
                    foil: card.finishes.includes("foil") ? 0 : ""
                },
                fr: {
                    nonfoil: card.finishes.includes("nonfoil") ? 0 : "",
                    foil: card.finishes.includes("foil") ? 0 : ""
                },
                it: {
                    nonfoil: card.finishes.includes("nonfoil") ? 0 : "",
                    foil: card.finishes.includes("foil") ? 0 : ""
                },
                sp: {
                    nonfoil: card.finishes.includes("nonfoil") ? 0 : "",
                    foil: card.finishes.includes("foil") ? 0 : ""
                },
                pt: {
                    nonfoil: card.finishes.includes("nonfoil") ? 0 : "",
                    foil: card.finishes.includes("foil") ? 0 : ""
                },
                jp: {
                    nonfoil: card.finishes.includes("nonfoil") ? 0 : "",
                    foil: card.finishes.includes("foil") ? 0 : ""
                },
                cs: {
                    nonfoil: card.finishes.includes("nonfoil") ? 0 : "",
                    foil: card.finishes.includes("foil") ? 0 : ""
                },
                ct: {
                    nonfoil: card.finishes.includes("nonfoil") ? 0 : "",
                    foil: card.finishes.includes("foil") ? 0 : ""
                },
                ru: {
                    nonfoil: card.finishes.includes("nonfoil") ? 0 : "",
                    foil: card.finishes.includes("foil") ? 0 : ""
                },
                ko: {
                    nonfoil: card.finishes.includes("nonfoil") ? 0 : "",
                    foil: card.finishes.includes("foil") ? 0 : ""
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
                            <label htmlFor="cardSearch">Search by card name:</label><br />
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
                {this.state.dataIsLoaded && (
                    <div>
                        <p>
                            "{this.state.search}" - found {this.state.rawCardData?.length} cards.{" "}
                            {this.state.hasMore
                                ? `More cards are available (${this.state.totalCards}). Limit your search.`
                                : ""}
                        </p>
                        <SearchResults cardList={this.state.cardList} />
                    </div>
                )}
                {this.state.dataIsLoaded === false && (
                    <Loading />
                )}
            </div>
        );
    }
}
