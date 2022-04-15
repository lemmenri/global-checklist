import {
  createCollection,
  getCollection,
  updateCollection,
} from "./Collection";
import { getOtherLanguages } from "./ScryfallQueries";

// Adds card to collection
// Card objects requires an id, name, set, nr, language and a collected array
export const addCard = (newCard) => {
  let collection = getCollection();
  // Check if collection exists
  if (!collection) {
    createCollection();
    collection = getCollection();
  }

  // Check if card id exists
  if (!getCardById(newCard.id)) {
    collection.cards.push({
      id: newCard.id,
      name: newCard.name,
      set: newCard.set,
      nr: newCard.nr,
      language: newCard.language,
      collected: [],
    });
  }

  const cardIndex = collection.cards.findIndex(
    (card) => card.id === newCard.id
  );

  // Check if version exists
  if (!hasVersion(newCard.id, newCard.finish, newCard.condition)) {
    collection.cards[cardIndex].collected.push({
      finish: newCard.finish,
      quantity: newCard.quantity,
      condition: newCard.condition,
    });
  } else {
    // Only update amount
    const versionIndex = collection.cards[cardIndex].collected.findIndex(
      (version) =>
        version.finish === newCard.finish &&
        version.condition === newCard.condition
    );
    collection.cards[cardIndex].collected[versionIndex].quantity =
      parseInt(collection.cards[cardIndex].collected[versionIndex].quantity) +
      parseInt(newCard.quantity);
  }

  updateCollection(collection);
};

// Returns an Card object for the provided id
// Returns undefined if no collection or no cards incollection
// Returns undefined if card is not found in collection
export const getCardById = (id) => {
  const collection = getCollection();
  if (!collection || collection.cards.length === 0) return undefined;
  return collection.cards.find((card) => card.id === id);
};

// Returns if a card has a specific version in the collection
export const hasVersion = (id, finish, condition) => {
  const collection = getCollection();
  if (!collection || !getCardById(id)) return false;
  const cardIndex = collection.cards.findIndex((card) => card.id === id);
  if (
    !collection.cards[cardIndex].collected.find(
      (version) => version.finish === finish && version.condition === condition
    )
  )
    return false;
  return true;
};

// Returns an Card object for the provided set, nr, language combination
// Returns undefined if no collection or no cards incollection
// Returns undefined if card is not found in collection
export const getCardBySetNrLanguage = (set, nr, language) => {
  const collection = getCollection();
  if (!collection || collection.cards.length === 0) return undefined;
  return collection.cards.find(
    (card) =>
      card.set === set &&
      card.nr === nr &&
      card.language.toLowerCase() === language.toLowerCase()
  );
};

// List of all collected finishes / languages / conditions of provided card
// Returns empty array if card is not in collection
export const getCollectedCardList = async (id) => {
  const collected = [];

  await getOtherLanguages(id).then((languages) => {
    languages.forEach((card) => {
      const cardObject = getCardById(card.id);
      // Check if card is in collection
      if (cardObject) {
        cardObject.collected.forEach((collectedCard) => {
          collected.push({
            id: card.id,
            finish: collectedCard.finish,
            quantity: collectedCard.quantity,
            condition: collectedCard.condition,
            language: cardObject.language,
          });
        });
      }
    });
  });
  return collected;
};

// Replaces existing card data with new card data
// Adds new card if existing card doesn't exist
// Merges with other already existing versions
// Note not usable to change language of a card
export const updateCard = (card, newCard) => {
  removeCardVersion(card.id, card.finish, card.condition);
  addCard(newCard);
};

// Removes all versions of provided card from collection
export const removeCard = (id) => {
  const collection = getCollection();
  if (!collection) return;
  collection.cards = collection.cards.filter((card) => card.id !== id);
  updateCollection(collection);
  return true;
};

// Removes specific version of a card from collection
export const removeCardVersion = (id, finish, condition) => {
  const collection = getCollection();
  if (!collection || !collection.cards.find((card) => card.id === id)) return;
  const cardIndex = collection.cards.findIndex((card) => card.id === id);
  collection.cards[cardIndex].collected = collection.cards[
    cardIndex
  ].collected.filter(
    (version) => !(version.finish === finish && version.condition === condition)
  );
  updateCollection(collection);
};
