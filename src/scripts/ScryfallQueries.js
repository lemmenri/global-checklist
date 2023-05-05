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
        (scryfallUrl = `${baseUrl}cards/search?q=set%3A${scryfallCardData.set}+cn%3A%22${scryfallCardData.collector_number}%22&unique=prints&include_multilingual=true`)
    )
    .then(() =>
      fetch(scryfallUrl)
        .then((res) => res.json())
        .then((json) => {
          json.data.forEach((card) => {
            cardList.push({
              language: card.lang,
              id: card.id,
              finishes: card.finishes,
            });
          });
        })
    );
  return cardList;
};

// Takes the data returned from getOtherLanguages and convertes it to a
// cleaned up list
export const convertLanguageData = (languages) => {
  const newList = [];
  languages.forEach((language) =>
    newList.push({
      id: language.id,
      name: language.language,
      value: language.language,
      type: "language",
      finishes: language.finishes,
    })
  );
  return newList;
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
    `${name ? `"${name}" ` : ""}${creatureType ? `type:${creatureType} ` : ""}${setCode ? `set:${setCode} ` : ""
    }${artist ? `artist:"${artist}" ` : ""}-is:digital`
  )
    .replaceAll("%20", "+")
    .replaceAll("%22", '"');

  const orderBy = setCode ? "set" : "released"

  const uri = `${baseUrl}cards/search?order=released&q=${searchQuery}&unique=prints&include_multilingual=true&include_extras=true&order=${orderBy}&dir=dec`;

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

// Returns a list of all sets with meta data about the set
export const getSetList = async () => {
  const res = await fetch(`${baseUrl}sets`);
  return await res.json();
};

// Returns specific data about a set
export const getSet = async (set) => {
  const res = await fetch(`${baseUrl}sets/${set}`);
  return await res.json();
};

// Returns a list of all possible set types
export const getSetTypes = async () => {
  const setTypes = [];
  await getSetList().then((sets) => {
    sets.data.forEach((set) => {
      if (!setTypes.find((type) => type === set.set_type)) {
        setTypes.push(set.set_type);
      }
    });
  });
  return setTypes.sort((a, b) => a.localeCompare(b));
};
