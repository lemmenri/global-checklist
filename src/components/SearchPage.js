import React from "react";
import SearchResults from "./SearchResults";

const cardName = "Chandra, Fire of Kaladesh";
const url = `https://api.scryfall.com/cards/search?order=released&q=%21%22${cardName.replaceAll(
    " ",
    "+"
)}%22+include%3Aextras&unique=prints`;

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.addRawDataToCardlist = this.addRawDataToCardlist.bind(this);
        this.state = {
            cardList: [],
            rawCardData: [],
            hasMore: undefined,
            totalCards: undefined,
            dataIsLoaded: false
        };
    }

    componentDidMount() {
        fetch(url)
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
            img: card.hasOwnProperty("image_uris")
                ? card.image_uris.normal
                : card.card_faces[0].image_uris.normal
        }));
        this.setState(() => ({
            cardList: cleanedCardData
        }));
    }

    render() {
        return (
            <div className="App p-1 sm:p-8 bg-gray-400">
                {this.state.dataIsLoaded ? (
                    <div>
                        <p>
                            {cardName} - found {this.state.cardList.length} cards.{" "}
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
