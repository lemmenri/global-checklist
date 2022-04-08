import React from "react";
import {
  getCardCount,
  getCardCountFinish,
  getCollectionCount,
} from "../../scripts/CardCounts";
import {
  getCardById,
  getCardBySetNrLanguage,
  getCollectedCardList,
  removeCard,
} from "../../scripts/CollectedCards";
import {
  createCollection,
  deleteCollection,
  getCollection,
  updateCollection,
} from "../../scripts/Collection";
import {
  getOtherLanguages,
  getScryfallCard,
} from "../../scripts/ScryfallQueries";

export default function TestPage() {
  const buttonStyling =
    "bg-primary text-light my-2 px-8 rounded-lg hover:underline";

  // Collection
  const handleCreateCollection = () => createCollection();
  const handleGetCollection = () => console.log(getCollection());
  const handleUpdateCollection = () => {
    const newCollection = {
      user: "name",
      cards: [
        {
          id: "bd43d44b-de27-4139-9cb8-b1f4c04fb87e",
          name: "Blightbeetle",
          set: "M20",
          nr: "87",
          language: "EN",
          collected: [
            {
              finish: "nonfoil",
              quantity: "1",
              condition: "NM",
            },
          ],
        },
        {
          id: "feefe9f0-24a6-461c-9ef1-86c5a6f33b83",
          name: "Birds of Paradise",
          set: "cn2",
          nr: "176",
          language: "EN",
          collected: [
            {
              finish: "foil",
              quantity: "1",
              condition: "EX",
            },
          ],
        },
      ],
    };
    updateCollection(newCollection);
  };
  const handleDeleteCollection = () => deleteCollection();

  // CollectedCards
  const handleAddCard = () => {
    console.log("TODO: handleAddCard");
  };
  const handleGetCardById = () => {
    console.log(getCardById("feefe9f0-24a6-461c-9ef1-86c5a6f33b83"));
  };
  const handleGetCardBySetNrLanguage = () => {
    console.log(getCardBySetNrLanguage("cn2", "176", "EN"));
  };
  const handleGetCollectedCardList = () => {
    console.log(
      "TODO: fix getOtherLanguages and rewrite to support async request"
    );
    console.log(getCollectedCardList("feefe9f0-24a6-461c-9ef1-86c5a6f33b83"));
  };
  const handleUpdateCard = () => {
    console.log("TODO: handleUpdateCard");
  };
  const handleRemoveCard = () => {
    removeCard("feefe9f0-24a6-461c-9ef1-86c5a6f33b83");
  };
  const handleRemoveCardVersion = () => {
    console.log("TODO: handleRemoveCardVersion");
  };

  // CardCounts
  const handleGetCollectionCount = () => console.log(getCollectionCount());
  const handleGetCardCount = () =>
    console.log(getCardCount("feefe9f0-24a6-461c-9ef1-86c5a6f33b83"));
  const handleGetCardCountFinish = () =>
    console.log(
      getCardCountFinish("feefe9f0-24a6-461c-9ef1-86c5a6f33b83", "foil")
    );

  // ScryfallQueries
  const handleGetScryfallCard = () =>
    getScryfallCard("feefe9f0-24a6-461c-9ef1-86c5a6f33b83").then((res) =>
      console.log(res)
    );
  const handleGetOtherLanguages = () => {
    getOtherLanguages("feefe9f0-24a6-461c-9ef1-86c5a6f33b83").then((res) =>
      console.log(res)
    );
  };

  return (
    <div className="p-4 sm:p-8 flex-grow bg-light">
      <h1 className="text-3xl my-4">Test Page</h1>
      <p>Collection:</p>
      <div className="flex flex-col max-w-xs">
        <button className={buttonStyling} onClick={handleCreateCollection}>
          Create Collection
        </button>
        <button className={buttonStyling} onClick={handleGetCollection}>
          Get Collection
        </button>
        <button className={buttonStyling} onClick={handleUpdateCollection}>
          Update Collection
        </button>
        <button className={buttonStyling} onClick={handleDeleteCollection}>
          Delete Collection
        </button>
      </div>
      <p>Cards:</p>
      <div className="flex flex-col max-w-xs">
        <button className={buttonStyling} onClick={handleAddCard}>
          Add Card
        </button>
        <button className={buttonStyling} onClick={handleGetCardById}>
          Get Card By Id
        </button>
        <button
          className={buttonStyling}
          onClick={handleGetCardBySetNrLanguage}
        >
          Get Card By Set, Nr and Language
        </button>
        <button className={buttonStyling} onClick={handleGetCollectedCardList}>
          Get Collected Cards (List)
        </button>
        <button className={buttonStyling} onClick={handleUpdateCard}>
          Update Card
        </button>
        <button className={buttonStyling} onClick={handleRemoveCard}>
          Remove Card
        </button>
        <button className={buttonStyling} onClick={handleRemoveCardVersion}>
          Remove Card Version
        </button>
      </div>
      <p>Counts:</p>
      <div className="flex flex-col max-w-xs">
        <button className={buttonStyling} onClick={handleGetCollectionCount}>
          Get Collection Count
        </button>
        <button className={buttonStyling} onClick={handleGetCardCount}>
          Get Card Count (all finishes)
        </button>
        <button className={buttonStyling} onClick={handleGetCardCountFinish}>
          Get Card Count for Finish
        </button>
      </div>
      <p>Scryfall queries:</p>
      <div className="flex flex-col max-w-xs">
        <button className={buttonStyling} onClick={handleGetScryfallCard}>
          Get Scryfall Card
        </button>
        <button className={buttonStyling} onClick={handleGetOtherLanguages}>
          Get other languages
        </button>
      </div>
    </div>
  );
}