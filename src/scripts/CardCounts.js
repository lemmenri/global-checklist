import { getCardById } from "./CollectedCards";
import { getCollection } from "./Collection";

// Returns the total number of collected cards
// Returns 0 if no cards in collection
export const getCollectionCount = () => {
  const cards = getCollection().cards;
  if (cards === null) return 0;
  let count = 0;
  cards.forEach((card) => {
    card.collected.forEach((collectedCard) => {
      count += collectedCard.quantity;
    });
  });
  return count;
};

// Returns an int with the sum of all collected copies of this card
// Returns 0 if card is not in collection
export const getCardCount = (id) => {
  const cards = getCardById(id);
  if (cards === null) return 0;
  let count = 0;
  cards.collected.forEach((card) => {
    count += card.quantity;
  });
  return count;
};

// Returns an int with the sum of all collected copies of this card with a particular finish
// Returns 0 if card is not in collection
export const getCardCountFinish = (id, finish) => {
  const cards = getCardById(id);
  if (cards === null) return 0;
  let count = 0;
  cards.collected
    .filter((card) => card.finish === finish)
    .forEach((card) => {
      count += card.quantity;
    });
  return count;
};
