// Returns a array of arrays with cards grouped together based on name, collector number and set
export const groupCardsByLanguage = (cards) => {
  const groupedCards = [];
  cards.forEach((card) => {
    // check if card has a group
    const groupIndex = groupedCards.findIndex(
      (group) =>
        group[0].name === card.name &&
        group[0].collector_number === card.collector_number &&
        group[0].set === card.set
    );

    if (groupIndex !== -1) {
      // add to group
      groupedCards[groupIndex].push(card);
    } else {
      // add as new group
      groupedCards.push([card]);
    }
  });
  return groupedCards;
};
