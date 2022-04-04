export const addCardToCollection = (id, finish, condition, amount) => {
  const newCard = {
    id,
    cards: [
      {
        finish,
        conditions: [{ condition, amount }],
      },
    ],
  };

  let collection = getCollectionFromStorage();

  // check if collection exists
  if (!getCollectionFromStorage()) {
    collection = [newCard];
  }
  // check if card is in collection
  else if (!getCardById(id)) {
    collection.push(newCard);
  }
  // check if card has finish
  else if (!(getAmountOfCard(id, finish) > 0)) {
    const cardIndex = collection.findIndex((card) => card.id === id);
    collection[cardIndex].cards.push(newCard.cards[0]);
  }
  // check if finish has condition
  else if (!doesCardHaveCondition(id, finish, condition)) {
    // add condition to finish
    const cardIndex = collection.findIndex((card) => card.id === id);
    const finishIndex = collection[cardIndex].cards.findIndex(
      (card) => card.finish === finish
    );
    collection[cardIndex].cards[finishIndex].conditions.push(
      newCard.cards[0].conditions[0]
    );
  }
  // add amount to existing condition
  else {
    const cardIndex = collection.findIndex((card) => card.id === id);
    const finishIndex = collection[cardIndex].cards.findIndex(
      (card) => card.finish === finish
    );
    const conditionIndex = collection[cardIndex].cards[
      finishIndex
    ].conditions.findIndex((card) => card.condition === condition);
    collection[cardIndex].cards[finishIndex].conditions[
      conditionIndex
    ].amount += parseInt(amount);
  }

  saveCollectionToStorage(collection);
};

export const getAmountOfCard = (id, finish) => {
  const card = getCardById(id);
  if (!card) {
    return 0;
  }
  let amount = 0;
  card.cards.forEach((card) => {
    if (card.finish === finish) {
      card.conditions.forEach((condition) => {
        amount += parseInt(condition.amount);
      });
    }
  });
  return amount;
};

export const getCardById = (id) =>
  getCollectionFromStorage().find((card) => card.id === id);

const getCardByFinish = (id, finish) =>
  getCardById(id).cards.find((card) => card.finish === finish);

const doesCardHaveCondition = (id, finish, condition) =>
  getCardByFinish(id, finish).conditions.find(
    (card) => card.condition === condition
  );

const getCollectionFromStorage = () =>
  JSON.parse(localStorage.getItem("collection"));

const saveCollectionToStorage = (collection) => {
  localStorage.setItem("collection", JSON.stringify(collection));
};

// TODO: update
// TODO: delete
