// Returns the raw scryfall data for the provided card id
export const getScryfallCard = async (id) => {
  const res = await fetch(`https://api.scryfall.com/cards/${id}`);
  return await res.json();
};

// Returns a list of id's of other languages of provided card
export const getOtherLanguages = async (id) => {
  const cardList = [];
  let scryfallCardData = {};
  let scryfallUrl = "";

  await getScryfallCard(id)
    .then((res) => (scryfallCardData = res))
    .then(
      () =>
        (scryfallUrl = `https://api.scryfall.com/cards/search?q=set%3A${scryfallCardData.set}+cn%3A${scryfallCardData.collector_number}&unique=prints&include_multilingual=true`)
    )
    .then(() =>
      fetch(scryfallUrl)
        .then((res) => res.json())
        .then((json) => {
          json.data.forEach((card) => {
            cardList.push({
              language: card.lang,
              id: card.id,
            });
          });
        })
    );
  return cardList;
};

// Returns a list of scryfall card objects matching the search string
export const searchByCardname = async (searchString) => {
  const res = await fetch(
    `https://api.scryfall.com/cards/search?order=released&q=%22${searchString.replaceAll(
      " ",
      "+"
    )}%22+include%3Aextras+-is%3Adigital+lang%3Aany&unique=prints`
  );
  return await res.json();
};

export const getCardnameList = async () => {
  const res = await fetch("https://api.scryfall.com/catalog/card-names");
  return await res.json();
};

export const getArtistList = async () => {
  const res = await fetch("https://api.scryfall.com/catalog/artist-names");
  return await res.json();
};

export const getCreatureTypeList = async () => {
  const res = await fetch("https://api.scryfall.com/catalog/creature-types");
  return await res.json();
};

export const getSetList = async () => {
  const res = await fetch("https://api.scryfall.com/sets");
  return await res.json();
};
