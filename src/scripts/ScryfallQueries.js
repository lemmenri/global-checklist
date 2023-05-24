import { getCardImage } from "./CardImage";
import { getCardsByNameSetNr } from "./CollectedCards";

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
              image: getCardImage(card),
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
      image: language.image,
    })
  );
  return newList;
};

// Get printings of card based on oracle id
export const getPrintings = async (prints_search_uri) => {
  const printings = []
  await fetch(prints_search_uri.replace("&unique=prints", "+-is%3Adigital&unique=prints"))
    .then((res) => res.json())
    .then((json) => {
      json.data.forEach(card => {
        const collected = []
        const inCollection = getCardsByNameSetNr(card.name, card.set, card.collector_number)
        card.finishes.forEach(finish => {
          let cardCount = 0
          if (inCollection && inCollection.length > 0) {
            inCollection.forEach(lang => {
              lang.collected.forEach(entry => {
                if (entry.finish === finish) {
                  cardCount += entry.quantity
                }
              })
            })
          }
          const obj = {
            finish: finish,
            count: cardCount
          }
          collected.push(obj)
        })

        printings.push({
          setName: card.set_name,
          collector_number: card.collector_number,
          id: card.id,
          collected: collected,
          image: getCardImage(card)
        })

      })
    })
  return printings
}

// Returns a list of scryfall card objects matching the search string
export const searchByCardname = async (searchString) => {
  const res = await fetch(
    `${baseUrl}cards/search?order=released&q%21%22${searchString.replaceAll(
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
    `${name ? `!"${name}" ` : ""}${creatureType ? `type:${creatureType} ` : ""}${setCode ? `set:${setCode} ` : ""
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
  const res = await fetch(`${baseUrl}catalog/card-names`)
    .then((res) => res.json())
    .then((res) => res.data.filter(name => !name.startsWith('A-')))
  return res;
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
  const sets = await fetch(`${baseUrl}sets`)
    .then((res) => res.json())
    .then((res) => res.data.filter(set => set.digital === false))
  return sets;
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
    sets.forEach((set) => {
      if (!setTypes.find((type) => type === set.set_type)) {
        setTypes.push(set.set_type);
      }
    });
  });
  return setTypes.sort((a, b) => a.localeCompare(b));
};
