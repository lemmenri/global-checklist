import React from "react";
import SearchResults from "../SearchResults";
import { Loading } from "../Loading";
import CardnameSearch from "../CardnameSearch";
import { addCardToCollection, getAmountOfCard } from "../../scripts/Collection";
import { mapDataToCardObject } from "../../scripts/MapDataToCardObject";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.processRawCardData = this.processRawCardData.bind(this);
    this.countVersions = this.countVersions.bind(this);
    this.state = {
      search: "",
      cardList: [],
      rawCardData: [],
      hasMore: undefined,
      totalCards: undefined,
      versionCount: 0,
      dataIsLoaded: undefined,
    };

    addCardToCollection(
      "fe3a415f-5649-4d74-9ef7-803ac11169d4",
      "foil",
      "EX",
      3
    );
    addCardToCollection(
      "fe3a415f-5649-4d74-9ef7-803ac11169d4",
      "nonfoil",
      "MT",
      2
    );
    addCardToCollection(
      "64a6c831-18a5-44d1-aac4-afb018bc93c7",
      "foil",
      "NM",
      1
    );
    addCardToCollection(
      "64a6c831-18a5-44d1-aac4-afb018bc93c7",
      "foil",
      "PO",
      1
    );
    addCardToCollection(
      "64a6c831-18a5-44d1-aac4-afb018bc93c7",
      "foil",
      "PO",
      2
    );
    addCardToCollection(
      "716c415e-5eb8-4644-ac64-5ba7c3f0ea65",
      "etched",
      "NM",
      1
    );
    addCardToCollection(
      "54ced5cf-b51a-4dab-97f7-50fb18e5c463",
      "nonfoil",
      "NM",
      1
    );

    // const card = getCardFromCollection("54ced5cf-b51a-4dab-97f7-50fb18e5c463")
    // console.log(card)
    // const amount = getAmountOfCard("54ced5cf-b51a-4dab-97f7-50fb18e5c463", "nonfoil")
    // console.log(`Amount: ${amount}`)
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    this.setState(() => ({
      dataIsLoaded: false,
    }));
    this.setState({ search: event.target.q.value }, () => {
      fetch(
        `https://api.scryfall.com/cards/search?order=released&q=%22${this.state.search.replaceAll(
          " ",
          "+"
        )}%22+include%3Aextras+-is%3Adigital+lang%3Aany&unique=prints`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.object === "error") {
            this.setState(() => ({
              cardList: [],
              rawCardData: [],
              hasMore: undefined,
              totalCards: undefined,
              dataIsLoaded: true,
            }));
            return;
          }
          this.setState(() => ({
            rawCardData: json.data,
            hasMore: json.has_more,
            totalCards: json.total_cards,
          }));
        })
        .then(() => this.processRawCardData())
        .then(() =>
          this.setState(() => ({
            versionCount: this.countVersions(),
          }))
        )
        .then(() =>
          this.setState(() => ({
            dataIsLoaded: true,
          }))
        );
    });
  }

  processRawCardData() {
    let cleanedCardData = [];
    this.state.rawCardData.forEach((rawCard) => {
      const index = cleanedCardData.findIndex(
        (cleanedCard) =>
          cleanedCard.name === rawCard.name &&
          cleanedCard.set_name === rawCard.set_name &&
          cleanedCard.nr === rawCard.collector_number
      );

      if (index !== -1) {
        //card already exists
        cleanedCardData[index] = {
          ...cleanedCardData[index],
          collected: {
            ...cleanedCardData[index].collected,
            [rawCard.lang]: {
              ...(rawCard.finishes.includes("nonfoil") && {
                nonfoil: getAmountOfCard(rawCard.id, "nonfoil"),
              }),
              ...(rawCard.finishes.includes("foil") && {
                foil: getAmountOfCard(rawCard.id, "foil"),
              }),
              ...(rawCard.finishes.includes("etched") && {
                etched: getAmountOfCard(rawCard.id, "etched"),
              }),
              ...(rawCard.finishes.includes("glossy") && {
                glossy: getAmountOfCard(rawCard.id, "glossy"),
              }),
            },
          },
        };
      } else {
        //card new to list
        cleanedCardData.push(mapDataToCardObject(rawCard));
      }
    });
    this.setState(() => ({
      cardList: cleanedCardData,
    }));
  }

  countVersions() {
    let count = 0;
    this.state.cardList.forEach((card) => {
      Object.entries(card.collected).forEach((language) => {
        count += Object.entries(language[1]).length;
      });
    });
    return count;
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
              {`Showing results for "${this.state.search}". Found ${this.state.cardList?.length} different card(s), ${this.state.rawCardData?.length} printing(s) and ${this.state.versionCount} total version(s).`}
              {this.state.hasMore &&
                ` More printings are available (${this.state.totalCards}). Limit your search.`}
            </p>
            <SearchResults cardList={this.state.cardList} />
          </div>
        )}
        {this.state.dataIsLoaded === false && <Loading />}
      </div>
    );
  }
}
