import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState } from "react";
import CardImage from "../CardImage";
import { Loading } from "../Loading";
import { ExternalLink } from "../ExternalLink";
import CollectedList from "../CollectedList";
import AddToCollection from "../AddToCollection";
import { getCardImage } from "../../scripts/CardImage";
import { getCollectedCardList } from "../../scripts/CollectedCards";
import {
  getOtherLanguages,
  getScryfallCard,
} from "../../scripts/ScryfallQueries";
import Language from "../Language";

const convertLanguageData = (languages) => {
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

const CardPage = () => {
  const cardId = useParams();
  const [card, setCard] = useState(useLocation().state);
  const [isDataLoaded, setIsDataLoaded] = useState(
    card === null ? false : true
  );
  const [collected, setCollected] = useState({});
  const [isCollectedLoaded, setIsCollectedLoaded] = useState(null);
  const [otherLanguages, setOtherLanguages] = useState({});
  const [isOtherLanguagesLoaded, setIsOtherLanguagesLoaded] = useState(null);

  if (isCollectedLoaded === null) {
    setIsCollectedLoaded(false);
    getCollectedCardList(cardId.id)
      .then((res) => setCollected(res))
      .then(() => setIsCollectedLoaded(true));
  }

  if (card === null) {
    getScryfallCard(cardId.id)
      .then((res) => setCard(res))
      .then(() => setIsDataLoaded(true));
  }

  if (isOtherLanguagesLoaded === null) {
    setIsOtherLanguagesLoaded(false);
    getOtherLanguages(cardId.id)
      .then((res) => setOtherLanguages(convertLanguageData(res)))
      .then(() => setIsOtherLanguagesLoaded(true));
  }

  const navigate = useNavigate();
  const goToSet = () => {
    navigate({
      pathname: "/search",
      search: `?set=${card.set}`,
    });
  };

  document.title = `MTG Library - ${card ? card.name : ""}`;

  return (
    <div className="p-4 sm:p-8 flex-grow bg-light">
      {isDataLoaded ? (
        <>
          <h1 className="display">{card.name}</h1>
          <p id="card-collector-details" className="text-lg">
            <i
              id="card-set-icon"
              title={card.set_name}
              className={"text-4xl pr-2 ss ss-" + card.set}
            ></i>
            <button onClick={goToSet} className="hover:underline" id="setName">
              {card.set_name}
            </button>
            {` - #${card.collector_number} - ${card.rarity}`}
          </p>
          {isOtherLanguagesLoaded && (
            <div id="languages" className="flex space-x-2">
              {otherLanguages.map((language) => (
                <Language key={language.id} language={language.name} />
              ))}
            </div>
          )}
          <CardImage
            className="rounded-[18px] w-96 shadow-dark shadow-md my-2"
            src={getCardImage(card)}
            alt={`${card.name}-${card.set}`}
          />

          {isCollectedLoaded ? (
            <CollectedList collected={collected} />
          ) : (
            <Loading />
          )}

          {isOtherLanguagesLoaded && (
            <AddToCollection card={card} languages={otherLanguages} />
          )}

          <div
            id="external links"
            className="w-full md:w-96 p-2 flex flex-col space-y-1"
          >
            {card.scryfall_uri && (
              <ExternalLink
                href={card.scryfall_uri}
                externalParty="Scryfall"
                imageLocation={"https://assets.scryfall.com/favicon.ico"}
              />
            )}
            {card.purchase_uris.cardmarket && (
              <ExternalLink
                href={card.purchase_uris.cardmarket}
                externalParty="Cardmarket"
                imageLocation={
                  "https://static.cardmarket.com/img/526dbb9ae52c5e62404fe903e9769807/static/misc/favicon-96x96.png"
                }
              />
            )}
            {card.purchase_uris.tcgplayer && (
              <ExternalLink
                href={card.purchase_uris.tcgplayer}
                externalParty="TCGPlayer"
                imageLocation={"https://www.tcgplayer.com/favicon.ico"}
              />
            )}
            {card.related_uris.gatherer && (
              <ExternalLink
                href={card.related_uris.gatherer}
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
