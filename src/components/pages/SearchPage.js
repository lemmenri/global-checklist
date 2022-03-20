import React from "react";
import SearchResults from "../SearchResults";
import { Loading } from "../Loading";
import CardnameSearch from "../CardnameSearch";

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
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

    render() {
        return (
            <div className="p-4 sm:p-8 flex-grow bg-light">
                <div id="cardSearchContainer" className="my-2 ">
                    <form role="search" onSubmit={this.handleSearchSubmit}>
                        <div>
                            <label htmlFor="cardSearch">Search by card name:</label><br />
                            <CardnameSearch />
                            <button className="bg-primary text-light my-4 px-8 rounded-lg hover:underline">Search</button>
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
