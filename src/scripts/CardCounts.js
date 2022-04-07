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
