import { getCollection, updateCollection } from "./Collection";
import { getOtherLanguages } from "./ScryfallQueries";

// Adds card to collection
// Card objects requires an id, name, set, nr, language and a collected array
export const addCard = (card) => {
  // TODO
};

// Returns an Card object for the provided id
// Returns null if card is not found in collection
export const getCardById = (id) => {
  const collection = getCollection().cards;
  if (collection.length === 0) return null;
  return collection.cards.filter((card) => card.id === id);
};

// Returns an Card object for the provided set, nr, language combination
// Returns null if card is not found in collection
export const getCardBySetNrLanguage = (set, nr, language) => {
  const collection = getCollection().cards;
  if (collection.length === 0) return null;
  return collection.cards.filter(
    (card) =>
      card.set === set &&
      card.nr === nr &&
      card.language.toLowCase() === language.toLowCase()
  );
};

// List of all collected finishes / languages / conditions of provided card
// Returns empty array if card is not in collection
export const getCollectedCardList = (id) => {
  const collected = [];
  const otherLanguages = getOtherLanguages(id);
  otherLanguages.forEach((card) => {
    const cardObject = getCardById(card.id);
    // Check if card is in collection
    if (cardObject) {
      cardObject.collected.forEach((collectedCard) => {
        collected.push({
          finish: collectedCard.finish,
          quantity: collectedCard.quantity,
          condition: collectedCard.condition,
          language: cardObject.language,
        });
      });
    }
  });
  return collected;
};

// Replaces existing card data with new card data
export const updateCard = (card) => {
  // TODO
};

// Removes all versions of provided card from collection
export const removeCard = (id) => {
  const collection = getCollection();
  const index = collection.cards.indexOf(getCardById(id));
  if (index > -1) {
    collection.cards.splice(index, 1);
    updateCollection(collection);
  }
};

// Removes specific version of a card from collection
export const removeCardVersion = (id, finish, condition) => {
  // TODO
};
