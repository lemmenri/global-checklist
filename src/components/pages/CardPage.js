import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import CardImage from "../CardImage";
import { Loading } from "../Loading";
import { ExternalLink } from "../ExternalLink";
import { mapDataToCardObject } from "../../scripts/MapDataToCardObject";
import CollectedList from "../CollectedList";
import AddToCollection from "../AddToCollection";
import { getCardById } from "../../scripts/Collection";

const CardPage = () => {
  const cardId = useParams();
  const [card, setCard] = useState(useLocation().state);
  const [isDataLoaded, setIsDataLoaded] = useState(
    card === null ? false : true
  );
  const [collected, setCollected] = useState({});

  const fetchCardDataById = (id) => {
    fetch(`https://api.scryfall.com/cards/${id}`)
      .then((res) => res.json())
      .then((json) => setCard(mapDataToCardObject(json)))
      .then(() => setIsDataLoaded(true))
      .then(() => setCollected(getCardById(id)))
      .then(() => console.log(collected))
      .then(() => console.log(card));
  };

  if (card === null) {
    setCard({});
    fetchCardDataById(cardId.id);
  }

  return (
    <div className="p-4 sm:p-8 flex-grow bg-light">
      {isDataLoaded ? (
        <>
          <h1 className="text-xl my-4">{card.name}</h1>
          <p id="card-collector-details" className="text-lg">
            <i
              id="card-set-icon"
              title={card.set_name}
              className={"text-4xl ss ss-" + card.set}
            ></i>
            {`\xa0${card.set_name} - #${card.nr} - ${card.rarity}`}
          </p>
          <CardImage
            className="rounded-2xl w-96 shadow-dark shadow-md my-2"
            src={card.img}
            alt={`${card.name}-${card.set}`}
          />
          <CollectedList collected={card.collected} />
          <AddToCollection
            id={cardId.id}
            onChange={() => {
              setIsDataLoaded(false);
              setCard(null);
            }}
          />
          <div id="external links" className="w-96 p-2 flex flex-col space-y-1">
            {card.external_links.scryfall && (
              <ExternalLink
                href={card.external_links.scryfall}
                externalParty="Scryfall"
                imageLocation={"https://assets.scryfall.com/favicon.ico"}
              />
            )}
            {card.external_links.cardmarket && (
              <ExternalLink
                href={card.external_links.cardmarket}
                externalParty="Cardmarket"
                imageLocation={
                  "https://static.cardmarket.com/img/526dbb9ae52c5e62404fe903e9769807/static/misc/favicon-96x96.png"
                }
              />
            )}
            {card.external_links.tcgplayer && (
              <ExternalLink
                href={card.external_links.tcgplayer}
                externalParty="TCGPlayer"
                imageLocation={"https://www.tcgplayer.com/favicon.ico"}
              />
            )}
            {card.external_links.gatherer && (
              <ExternalLink
                href={card.external_links.gatherer}
                externalParty="Gatherer"
                imageLocation={
                  "https://gatherer.wizards.com/Images/favicon.ico"
                }
              />
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CardPage;
