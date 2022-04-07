import { getAmountOfCard } from "./CollectionOld";

export const mapDataToCardObject = (card) => {
  return {
    name: card.name,
    id: card.id,
    set: card.set,
    set_name: card.set_name,
    nr: card.collector_number,
    rarity: card.rarity,
    collected: {
      [card.lang]: {
        ...(card.finishes.includes("nonfoil") && {
          nonfoil: getAmountOfCard(card.id, "nonfoil"),
        }),
        ...(card.finishes.includes("foil") && {
          foil: getAmountOfCard(card.id, "foil"),
        }),
        ...(card.finishes.includes("etched") && {
          etched: getAmountOfCard(card.id, "etched"),
        }),
        ...(card.finishes.includes("glossy") && {
          glossy: getAmountOfCard(card.id, "glossy"),
        }),
      },
    },
    prices: {
      eur: card.prices.eur,
      eur_foil: card.prices.eur_foil,
      usd: card.prices.usd,
      usd_foil: card.prices.usd_foil,
      usd_etched: card.prices.usd_etched,
    },
    img: card.hasOwnProperty("image_uris") // check if image is available
      ? card.image_uris.normal
      : card.card_faces[0].hasOwnProperty("image_uris") // check for double faced card
      ? card.card_faces[0].image_uris.normal
      : "https://c2.scryfall.com/file/scryfall-errors/soon.jpg",
    external_links: {
      scryfall: card.scryfall_uri,
      cardmarket: card.purchase_uris.cardmarket,
      tcgplayer: card.purchase_uris.tcgplayer,
      gatherer: card.related_uris.gatherer,
    },
  };
};
