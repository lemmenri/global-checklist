import React from "react";
import {
  getCardCount,
  getCardCountFinish,
  getCardCountSet,
  getCollectionCount,
  getNumberOfDifferentVersions,
  getTotalCardCountSet,
} from "../../scripts/CardCounts";
import {
  addCard,
  getCardById,
  getCardBySetNrLanguage,
  getCardsByNameSetNr,
  getCollectedCardList,
  hasVersion,
  removeCard,
  removeCardVersion,
  updateCard,
} from "../../scripts/CollectedCards";
import {
  createCollection,
  deleteCollection,
  getCollection,
  getCollectionAsList,
  updateCollection,
} from "../../scripts/Collection";
import { exportCollection } from "../../scripts/ExportCollection";
import { groupCardsByLanguage } from "../../scripts/GroupCards";
import {
  advancedSearch,
  getArtistList,
  getCardnameList,
  getCardsInSet,
  getCreatureTypeList,
  getOtherLanguages,
  getPrintings,
  getScryfallCard,
  getSet,
  getSetList,
  getSetTypes,
  searchByCardname,
} from "../../scripts/ScryfallQueries";
import Accordion from "../Accordion";

export default function TestPage() {
  document.title = "MTG Library - Test";

  // Collection
  const handleCreateCollection = () => createCollection();
  const handleGetCollection = () => console.log(getCollection());
  const handleGetCollectionAsList = () => console.log(getCollectionAsList());
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
              quantity: 1,
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
              quantity: 1,
              condition: "EX",
            },
            {
              finish: "foil",
              quantity: 1,
              condition: "NM",
            },
            {
              finish: "nonfoil",
              quantity: 1,
              condition: "EX",
            },
          ],
        },
        {
          id: "dbc88984-0fb8-42ee-8ecb-5b8d67465b43",
          name: "Birds of Paradise",
          set: "cn2",
          nr: "176",
          language: "JA",
          collected: [
            {
              finish: "nonfoil",
              quantity: 1,
              condition: "MT",
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
    addCard({
      id: "feefe9f0-24a6-461c-9ef1-86c5a6f33b83",
      name: "Birds of Paradise",
      set: "cn2",
      nr: "176",
      language: "EN",
      finish: "nonfoil",
      quantity: 1,
      condition: "MT",
    });
  };
  const handleGetCardById = () => {
    console.log(getCardById("feefe9f0-24a6-461c-9ef1-86c5a6f33b83"));
  };
  const handleHasVersion = () => {
    console.log(
      hasVersion("feefe9f0-24a6-461c-9ef1-86c5a6f33b83", "foil", "EX")
    );
  };
  const handleGetCardBySetNrLanguage = () => {
    console.log(getCardBySetNrLanguage("cn2", "176", "EN"));
  };
  const handleGetCardsByNameSetNr = () => {
    console.log(getCardsByNameSetNr("Birds of Paradise", "cn2", "176"));
  };
  const handleGetCollectedCardList = () => {
    getCollectedCardList("feefe9f0-24a6-461c-9ef1-86c5a6f33b83").then((res) =>
      console.log(res)
    );
  };
  const handleUpdateCard = () => {
    const card = {
      id: "feefe9f0-24a6-461c-9ef1-86c5a6f33b83",
      finish: "nonfoil",
      condition: "MT",
    };
    const newCard = {
      id: "feefe9f0-24a6-461c-9ef1-86c5a6f33b83",
      name: "Birds of Paradise",
      set: "cn2",
      nr: "176",
      language: "EN",
      finish: "foil",
      quantity: 5,
      condition: "PO",
    };
    updateCard(card, newCard);
  };
  const handleRemoveCard = () => {
    removeCard("feefe9f0-24a6-461c-9ef1-86c5a6f33b83");
  };
  const handleRemoveCardVersion = () => {
    removeCardVersion("feefe9f0-24a6-461c-9ef1-86c5a6f33b83", "foil", "EX");
  };

  // CardCounts
  const handleGetCollectionCount = () => console.log(getCollectionCount());
  const handleGetCardCount = () =>
    console.log(getCardCount("feefe9f0-24a6-461c-9ef1-86c5a6f33b83"));
  const handleGetCardCountFinish = () =>
    console.log(
      getCardCountFinish("feefe9f0-24a6-461c-9ef1-86c5a6f33b83", "foil")
    );
  const handleGetNumberOfDifferentVersions = () => {
    searchByCardname("Birds of Paradise").then((res) =>
      console.log(getNumberOfDifferentVersions(res.data))
    );
  };
  const handleGetCardCountSet = () => console.log(getCardCountSet("cn2"));
  const handleGetTotalCardCountSet = () =>
    console.log(getTotalCardCountSet("cn2"));

  // ScryfallQueries
  const handleGetScryfallCard = () =>
    getScryfallCard("feefe9f0-24a6-461c-9ef1-86c5a6f33b83").then((res) =>
      console.log(res)
    );
  const handleAdvancedSearch = () => {
    advancedSearch({
      name: "Birds of Paradise",
      artist: "Mark Poole",
      creatureType: "bird",
      setCode: "sld",
    }).then((res) => console.log(res));
  };
  const handleAdvancedSearchName = () => {
    advancedSearch({
      name: "Birds of Paradise",
    }).then((res) => console.log(res));
  };
  const handleAdvancedSearchArtist = () => {
    advancedSearch({
      artist: "Mark Poole",
    }).then((res) => console.log(res));
  };
  const handleAdvancedSearchCreatureType = () => {
    advancedSearch({
      creatureType: "bird",
    }).then((res) => console.log(res));
  };
  const handleAdvancedSearchSetCode = () => {
    advancedSearch({
      setCode: "sld",
    }).then((res) => console.log(res));
  };
  const handleGetCardsInSet = () => {
    getCardsInSet("plst").then((res) => console.log(res));
  }
  const handleGetOtherLanguages = () => {
    getOtherLanguages("feefe9f0-24a6-461c-9ef1-86c5a6f33b83").then((res) =>
      console.log(res)
    );
  };
  const handleGetPrintings = () => {
    getPrintings("https://api.scryfall.com/cards/search?order=released&q=oracleid%3Ad3a0b660-358c-41bd-9cd2-41fbf3491b1a&unique=prints").then((res) =>
      console.log(res)
    );
  };
  const handleSearchByCardname = () => {
    searchByCardname("Birds of Paradise").then((res) => console.log(res));
  };
  const handleGetCardnameList = () => {
    getCardnameList().then((res) => console.log(res));
  };
  const handleGetArtistList = () => {
    getArtistList().then((res) => console.log(res));
  };
  const handleGetCreatureTypeList = () => {
    getCreatureTypeList().then((res) => console.log(res));
  };
  const handleGetSetList = () => {
    getSetList().then((res) => console.log(res));
  };
  const handleGetSet = () => {
    getSet("aer").then((res) => console.log(res));
  };
  const handleGetSetTypes = () => {
    getSetTypes().then((res) => console.log(res));
  };

  // Group Cards
  const handleGroupCards = () => {
    searchByCardname("Arid Mesa")
      .then((res) => groupCardsByLanguage(res.data))
      .then((res) => console.log(res));
  };

  // Import / Export
  const handleExportCollection = () => {
    exportCollection();
  };

  return (
    <div role="main" className="p-4 sm:p-8 flex-grow bg-light">
      <h1 className="display">Test Page</h1>
      <Accordion title="Collection:">
        <div className="flex flex-col max-w-xs">
          <button className="btn" onClick={handleCreateCollection}>
            Create Collection
          </button>
          <button className="btn" onClick={handleGetCollection}>
            Get Collection
          </button>
          <button className="btn" onClick={handleGetCollectionAsList}>
            Get Collection As List
          </button>
          <button className="btn" onClick={handleUpdateCollection}>
            Update Collection
          </button>
          <button className="btn" onClick={handleDeleteCollection}>
            Delete Collection
          </button>
        </div>
      </Accordion>
      <Accordion title="Cards:">
        <div className="flex flex-col max-w-xs">
          <button className="btn" onClick={handleAddCard}>
            Add Card
          </button>
          <button className="btn" onClick={handleGetCardById}>
            Get Card By Id
          </button>
          <button className="btn" onClick={handleHasVersion}>
            Has Version
          </button>
          <button className="btn" onClick={handleGetCardBySetNrLanguage}>
            Get Card By Set, Nr and Language
          </button>
          <button className="btn" onClick={handleGetCardsByNameSetNr}>
            Get Cards By Name, Set and Number
          </button>
          <button className="btn" onClick={handleGetCollectedCardList}>
            Get Collected Cards (List)
          </button>
          <button className="btn" onClick={handleUpdateCard}>
            Update Card
          </button>
          <button className="btn" onClick={handleRemoveCard}>
            Remove Card
          </button>
          <button className="btn" onClick={handleRemoveCardVersion}>
            Remove Card Version
          </button>
        </div>
      </Accordion>
      <Accordion title="Counts:">
        <div className="flex flex-col max-w-xs">
          <button className="btn" onClick={handleGetCollectionCount}>
            Get Collection Count
          </button>
          <button className="btn" onClick={handleGetCardCount}>
            Get Card Count (all finishes)
          </button>
          <button className="btn" onClick={handleGetCardCountFinish}>
            Get Card Count for Finish
          </button>
          <button className="btn" onClick={handleGetNumberOfDifferentVersions}>
            Get Number of Different Versions
          </button>
          <button className="btn" onClick={handleGetCardCountSet}>
            Get Number of Cards Collected from a Set
          </button>
          <button className="btn" onClick={handleGetTotalCardCountSet}>
            Get Total Number of Cards Collected in a Set
          </button>
        </div>
      </Accordion>
      <Accordion title="Scryfall queries:">
        <div className="flex flex-col max-w-xs">
          <button className="btn" onClick={handleGetScryfallCard}>
            Get Scryfall Card
          </button>
          <button className="btn" onClick={handleAdvancedSearch}>
            Scryfall Advanced Search
          </button>
          <button className="btn" onClick={handleAdvancedSearchName}>
            Scryfall Advanced Search By Name
          </button>
          <button className="btn" onClick={handleAdvancedSearchArtist}>
            Scryfall Advanced Search By Artist
          </button>
          <button className="btn" onClick={handleAdvancedSearchCreatureType}>
            Scryfall Advanced Search By Creature Type
          </button>
          <button className="btn" onClick={handleAdvancedSearchSetCode}>
            Scryfall Advanced Search By Set Code
          </button>
          <button className="btn" onClick={handleGetCardsInSet}>
            Get Cards in Set by Set Code
          </button>
          <button className="btn" onClick={handleGetOtherLanguages}>
            Get other languages
          </button>
          <button className="btn" onClick={handleGetPrintings}>
            Get printings
          </button>
          <button className="btn" onClick={handleSearchByCardname}>
            Search by cardname
          </button>
          <button className="btn" onClick={handleGetCardnameList}>
            Get all cardnames
          </button>
          <button className="btn" onClick={handleGetArtistList}>
            Get all artists
          </button>
          <button className="btn" onClick={handleGetCreatureTypeList}>
            Get all creature types
          </button>
          <button className="btn" onClick={handleGetSetList}>
            Get all sets
          </button>
          <button className="btn" onClick={handleGetSet}>
            Get set
          </button>
          <button className="btn" onClick={handleGetSetTypes}>
            Get set types
          </button>
        </div>
      </Accordion>
      <Accordion title="Group Cards:">
        <div className="flex flex-col max-w-xs">
          <button className="btn" onClick={handleGroupCards}>
            Group Cards
          </button>
        </div>
      </Accordion>
      <Accordion title="Import / Export:">
        <div className="flex flex-col max-w-xs">
          <button className="btn" onClick={handleExportCollection}>
            Export Collection
          </button>
        </div>
      </Accordion>
    </div>
  );
}
