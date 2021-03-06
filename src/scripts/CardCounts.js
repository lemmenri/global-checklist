import { getCardById } from "./CollectedCards";
import { getCollection } from "./Collection";

// Returns the total number of collected cards
// Returns 0 if no cards in collection or no collection is found
export const getCollectionCount = () => {
  const collection = getCollection();
  if (!collection || collection.cards.length === 0) return 0;
  let count = 0;
  collection.cards.forEach((card) => {
    card.collected.forEach((collectedCard) => {
      count += parseInt(collectedCard.quantity);
    });
  });
  return count;
};

// Returns an int with the sum of all collected copies of this card
// Returns 0 if card is not in collection
export const getCardCount = (id) => {
  const cards = getCardById(id);
  if (!cards) return 0;
  let count = 0;
  cards.collected.forEach((card) => {
    count += parseInt(card.quantity);
  });
  return count;
};

// Returns an int with the sum of all collected copies of this card with a particular finish
// Returns 0 if card is not in collection
export const getCardCountFinish = (id, finish) => {
  const cards = getCardById(id);
  if (!cards) return 0;
  let count = 0;
  cards.collected
    .filter((card) => card.finish === finish)
    .forEach((card) => {
      count += parseInt(card.quantity);
    });
  return count;
};

// Returns a count of the number of different versions a list of cards has including different finishes
export const getNumberOfDifferentVersions = (cards) => {
  let count = 0;
  cards.forEach((card) => {
    count += card.finishes.length;
  });
  return count;
};

// Returns the number of different cards collected from a specified set
export const getCardCountSet = (set) => {
  const collection = getCollection();
  if (!collection || collection.cards.length === 0) return 0;
  const count = [];
  collection.cards.forEach((card) => {
    if (card.set === set && !count.find((nr) => nr === card.nr)) {
      count.push(card.nr);
    }
  });
  return count.length;
};

// Returns the total number of cards collected in a set
export const getTotalCardCountSet = (set) => {
  const collection = getCollection();
  if (!collection || collection.cards.length === 0) return 0;
  let count = 0;
  collection.cards.forEach((card) => {
    if (card.set === set) {
      card.collected.forEach((collectedCard) => {
        count += parseInt(collectedCard.quantity);
      });
    }
  });
  return count;
};
