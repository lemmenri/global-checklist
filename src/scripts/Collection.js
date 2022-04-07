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

// Update collection or create one of none exist already
export const updateCollection = (collection) =>
  localStorage.setItem("collection", JSON.stringify(collection));

// Delete collection
export const deleteCollection = () => localStorage.removeItem("collection");
