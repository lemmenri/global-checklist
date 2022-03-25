import { getAmountOfCard } from "./Collection";

export const mapDataToCardObject = (rawCard) => {
    return {
        name: rawCard.name,
        id: rawCard.id,
        set: rawCard.set,
        set_name: rawCard.set_name,
        nr: rawCard.collector_number,
        rarity: rawCard.rarity,
        collected: {
            [rawCard.lang]: {
                ...(rawCard.finishes.includes("nonfoil")) && { nonfoil: getAmountOfCard(rawCard.id, "nonfoil") },
                ...(rawCard.finishes.includes("foil")) && { foil: getAmountOfCard(rawCard.id, "foil") },
                ...(rawCard.finishes.includes("etched")) && { etched: getAmountOfCard(rawCard.id, "etched") },
                ...(rawCard.finishes.includes("glossy")) && { glossy: getAmountOfCard(rawCard.id, "glossy") },
            }
        },
        prices: {
            eur: rawCard.prices.eur,
            eur_foil: rawCard.prices.eur_foil,
            usd: rawCard.prices.usd,
            usd_foil: rawCard.prices.usd_foil,
            usd_etched: rawCard.prices.usd_etched
        },
        img: rawCard.hasOwnProperty("image_uris") // check if image is available
            ? rawCard.image_uris.normal
            : rawCard.card_faces[0].hasOwnProperty("image_uris")// check for double faced card
                ? rawCard.card_faces[0].image_uris.normal
                : "https://c2.scryfall.com/file/scryfall-errors/soon.jpg",
        external_links: {
            scryfall: rawCard.scryfall_uri,
            cardmarket: rawCard.purchase_uris.cardmarket,
            tcgplayer: rawCard.purchase_uris.tcgplayer,
            gatherer: rawCard.related_uris.gatherer
        }
    }
}