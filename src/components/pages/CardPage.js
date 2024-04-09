import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import CardImage from "../CardImage";
import { Loading } from "../Loading";
import { ExternalLink } from "../ExternalLink";
import CollectedList from "../CollectedList";
import AddToCollection from "../AddToCollection";
import { getCardImage } from "../../scripts/CardImage";
import { getCollectedCardList } from "../../scripts/CollectedCards";
import {
  getOtherLanguages,
  convertLanguageData,
  getScryfallCard,
  getPrintings,
  getCardsInSet,
} from "../../scripts/ScryfallQueries";
import Language from "../Language";
import Prints from "../Prints";
import CardnameSearchForm from "../CardnameSearchForm";
import OtherCardsInSet from "../OtherCardsInSet";

const CardPage = () => {
  const displayPrice = true; // featureflag

  const [cardId, setCardId] = useState(useParams());
  const [card, setCard] = useState(useLocation().state);
  const [isDataLoaded, setIsDataLoaded] = useState(card === null ? false : true);
  const [collected, setCollected] = useState({});
  const [isCollectedLoaded, setIsCollectedLoaded] = useState(null);
  const [otherLanguages, setOtherLanguages] = useState([]);
  const [printings, setPrintings] = useState([]);
  const [otherCardsInSet, setOtherCardsInSet] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (card !== null) {
        setPrintings(await getPrintings(card.prints_search_uri))
        setOtherCardsInSet(await getCardsInSet(card.set))
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataLoaded, collected]);

  useEffect(() => {
    updateCollectedCards()
    setIsDataLoaded(false)
    setCard(null)
    setCardData()
    getOtherLanguages(cardId.id)
      .then((res) => setOtherLanguages(convertLanguageData(res)))
    setPrintings([])
    setOtherCardsInSet([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId])

  function updateCollectedCards() {
    setIsCollectedLoaded(false);
    getCollectedCardList(cardId.id)
      .then((res) => setCollected(res))
      .then(() => setIsCollectedLoaded(true));
  }

  if (isCollectedLoaded === null) {
    updateCollectedCards()
  }

  async function setCardData() {
    if (card === null) {
      getScryfallCard(cardId.id)
        .then((res) => setCard(res))
        .then(() => setIsDataLoaded(true));
    }
  }
  setCardData()

  const navigate = useNavigate();
  const goToSet = () => {
    navigate({
      pathname: "/search",
      search: `?set=${card.set}`,
    });
  };
  const goToCardname = () => {
    navigate({
      pathname: "/search",
      search: `?name=${card.name}`,
    });
  };

  document.title = `MTG Library - ${card ? card.name : ""}`;

  return (
    <div role="main" className="p-4 sm:p-8 flex-grow bg-light">
      {isDataLoaded ? (
        <>
          <div id="title" className="flex flex-col-reverse sm:flex-row flex-wrap-reverse justify-between">
            <button onClick={goToCardname} className="hover:underline" id="cardName">
              <h1 className="display font-semibold mb-1 text-left">
                {`${card.name}${card.printed_name ? `  (${card.printed_name})` : ""}`}
              </h1>
            </button>
            <div className="self-center">
              <CardnameSearchForm />
            </div>
          </div>
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
          {otherLanguages.length > 0 && (
            <div id="languages" className="flex space-x-1 max-[475px]:overflow-auto">
              {otherLanguages.map((language) => (
                <Language
                  key={language.id}
                  language={language.name}
                  imageOnHover={language.image}
                  cardId={language.id}
                  setCardId={setCardId}
                  isActive={card.lang === language.value ? true : false}
                />
              ))}
            </div>
          )}
          <div id="card-content" className="flex flex-col md:flex-row gap-0 md:gap-8">
            <div className="flex flex-col">
              <Card />
              <Prices />
            </div>

            <div className="flex flex-auto flex-col xl:flex-row gap-0 xl:gap-8">
              <div className="flex flex-col flex-auto min-w-fit">
                {isCollectedLoaded ? (
                  <CollectedList collected={collected} handleDeleteCard={updateCollectedCards} />
                ) : (
                  <Loading />
                )}

                {otherLanguages.length > 0 && (
                  <AddToCollection card={card} languages={otherLanguages} handleAddCard={updateCollectedCards} />
                )}
              </div>

              <div className="flex flex-col flex-auto">
                {(printings.length > 0) ? (
                  <Prints prints={printings} setCardId={setCardId} cardId={card.id} />
                ) : (
                  <Loading />
                )}
                {(otherCardsInSet.length > 0) ? (
                  <OtherCardsInSet otherCardsInSet={otherCardsInSet} setCardId={setCardId} cardId={card.id} setName={card.set_name} />
                ) : (
                  <Loading />
                )}

                <ExternalLinks />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );

  function Card() {
    const [isDoubleSided] = useState(getCardImage(card).hasOwnProperty('back'))
    const [showFace, setShowFace] = useState('front');
    const [faces] = useState(getCardImage(card))

    return (
      <div className="flex flex-col justify-center">
        <CardImage
          className="rounded-[18px] w-96 shadow-dark shadow-md my-2"
          src={showFace === 'front' ? faces.front : faces.back}
          alt={`${card.name}-${card.set}`}
        />
        {isDoubleSided &&
          <button
            className="btn bg-light text-dark border border-1 border-dark mx-8"
            onClick={() => setShowFace(showFace === 'front' ? "back" : "front")}
          >
            Show {`${showFace === 'front' ? "back" : "front"}`}
          </button>
        }
      </div>
    )
  }

  function Prices() {
    const [cardHasFinish] = useState({
      nonfoil: (card && card.finishes && card.finishes.includes("nonfoil")),
      foil: (card && card.finishes && card.finishes.includes("foil")),
      etched: (card && card.finishes && card.finishes.includes("etched"))
    })


    return (
      displayPrice ? (

        <div
          id="prices-container"
          className="flex flex-col px-2 py-4 "
        >
          <div className="border border-dark rounded-xl px-4 py-1">

            {cardHasFinish.nonfoil && (
              <div className="flex justify-between">
                <div className="w-1/3">{`Price •`}</div>
                <div className="w-1/3">{`€\xa0${card.prices.eur ? card.prices.eur : " - "}`}</div>
                <div className="w-1/3">{`$\xa0${card.prices.usd ? card.prices.usd : " - "}`}</div>
              </div>
            )}
            {cardHasFinish.foil && (
              <div className="flex justify-between">
                <div className="w-1/3">{`Price ★`}</div>
                <div className="w-1/3">{`€\xa0${card.prices.eur_foil ? card.prices.eur_foil : " - "}`}</div>
                <div className="w-1/3">{`$\xa0${card.prices.usd_foil ? card.prices.usd_foil : " - "}`}</div>
              </div>
            )}
            {cardHasFinish.etched && (
              <div className="flex justify-between">
                <div className="w-1/3">{`Price E`}</div>
                <div className="w-1/3">{`$\xa0${card.prices.usd_etched ? card.prices.usd_etched : " - "}`}</div>
              </div>
            )}
          </div>
        </div>
      ) : <></>
    )
  }

  function ExternalLinks() {
    return (
      <div
        id="external links"
        className="w-full px-2 py-4 flex flex-col space-y-1"
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
    )
  }
};

export default CardPage;
