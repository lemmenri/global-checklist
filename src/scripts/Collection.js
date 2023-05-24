// Create empty collection
export const createCollection = () => {
  const collection = {
    user: "",
    cards: [],
  };
  updateCollection(collection);
};

// Returns complete collection
// Returns null if no collection is found
export const getCollection = () =>
  JSON.parse(localStorage.getItem("collection"));

// Returns complete collection in list form
// Returns null if no collection is found
export const getCollectionAsList = () => {
  const collection = JSON.parse(localStorage.getItem("collection"));
  const cardlist = []
  collection.cards.forEach(card => {
    card.collected.forEach(version => {
      cardlist.push({
        id: card.id,
        name: card.name,
        set: card.set,
        nr: card.nr,
        language: card.language,
        finish: version.finish,
        quantity: version.quantity,
        condition: version.condition
      })
    })
  })
  return cardlist
}

// Update collection or create one of none exist already
export const updateCollection = (collection) =>
  localStorage.setItem("collection", JSON.stringify(collection));

// Delete collection
export const deleteCollection = () => localStorage.removeItem("collection");
