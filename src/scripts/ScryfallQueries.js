// Returns the raw scryfall data for the provided card id
export const getScryfallCard = (id) => {
  return fetch(`https://api.scryfall.com/cards/${id}`).then((res) =>
    res.json()
  );
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
