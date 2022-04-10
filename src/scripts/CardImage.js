// Returns the correct image url from a scryfall card object
export const getCardImage = (card) => {
  return card.hasOwnProperty("image_uris") // check if image is available
    ? card.image_uris.normal
    : card.card_faces[0].hasOwnProperty("image_uris") // check for double faced card
    ? card.card_faces[0].image_uris.normal
    : "https://c2.scryfall.com/file/scryfall-errors/soon.jpg";
};
