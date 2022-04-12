const baseUrl = "https://api.scryfall.com/";

// Returns the raw scryfall data for the provided card id
export const getScryfallCard = async (id) => {
  const res = await fetch(`${baseUrl}cards/${id}`);
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
        (scryfallUrl = `${baseUrl}cards/search?q=set%3A${scryfallCardData.set}+cn%3A${scryfallCardData.collector_number}&unique=prints&include_multilingual=true`)
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
    `${baseUrl}cards/search?order=released&q=%22${searchString.replaceAll(
      " ",
      "+"
    )}%22+include%3Aextras+-is%3Adigital+lang%3Aany&unique=prints`
  );
  return await res.json();
};

// Returns a list of scryfall card object matching the search parameters
export const advancedSearch = async (searchParameters) => {
  const name =
    searchParameters.hasOwnProperty("name") && searchParameters.name !== ""
      ? searchParameters.name
      : undefined;
  const artist =
    searchParameters.hasOwnProperty("artist") && searchParameters.artist !== ""
      ? searchParameters.artist
      : undefined;
  const creatureType =
    searchParameters.hasOwnProperty("creatureType") &&
    searchParameters.creatureType !== ""
      ? searchParameters.creatureType
      : undefined;
  const setCode =
    searchParameters.hasOwnProperty("setCode") &&
    searchParameters.setCode !== ""
      ? searchParameters.setCode
      : undefined;

  const searchQuery = encodeURIComponent(
    `${name ? `"${name}" ` : ""}${creatureType ? `type:${creatureType} ` : ""}${
      setCode ? `set:${setCode} ` : ""
    }${artist ? `artist:"${artist}" ` : ""}-is:digital`
  )
    .replaceAll("%20", "+")
    .replaceAll("%22", '"');

  const uri = `${baseUrl}cards/search?order=released&q=${searchQuery}&unique=prints&include_multilingual=true&include_extras=true`;

  const res = await fetch(uri);
  return await res.json();
};

// Returns a list of all card names
export const getCardnameList = async () => {
  const res = await fetch(`${baseUrl}catalog/card-names`);
  return await res.json();
};

// Returns a list of all artist names
export const getArtistList = async () => {
  const res = await fetch(`${baseUrl}catalog/artist-names`);
  return await res.json();
};

// Returns a list of all creature types
export const getCreatureTypeList = async () => {
  const res = await fetch(`${baseUrl}catalog/creature-types`);
  return await res.json();
};

// Returns a list of all set names
export const getSetList = async () => {
  const res = await fetch(`${baseUrl}sets`);
  return await res.json();
};
