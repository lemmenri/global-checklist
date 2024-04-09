import { Link } from "react-router-dom";
import { getCardImage } from "../scripts/CardImage";
import { getCardCountFinish } from "../scripts/CardCounts";
import CardImage from "./CardImage";
import Language from "./Language";
import { useState } from "react";

export default function SearchResultListItem({ group }) {
  const hasNonfoil = group.find((card) => card.finishes.includes("nonfoil"));
  const hasFoil = group.find((card) => card.finishes.includes("foil"));
  const hasEtched = group.find((card) => card.finishes.includes("etched"));
  const [isShown, setIsShown] = useState(false)

  return (
    <div id="search-result-list-item" className="p-1 w-full break-inside-avoid">
      <div className="flex flex-col sm:flex-row border border-dark p-2 w-full rounded-lg">
        <Link
          id={`card ${group[0].id}`}
          className="flex flex-row w-full sm:w-1/3"
          to={`/card/${group[0].id}`}
          state={group[0]}
        >
          <ImagePreview />
          <CardDetails />
        </Link>

        <div className="flex max-w-full grow overflow-x-auto">
          <Printings />
          <Prices />
        </div>
      </div>
    </div>
  );

  function ImagePreview() {
    return (
      <div
        id="image-preview"
        className="hidden lg:block"
      >
        <CardImage
          className="rounded-[3px] w-16 shadow-dark shadow-sm"
          src={getCardImage(group[0]).front}
          alt={`${group[0].name}-${group[0].set}`}
        />
      </div>
    )
  }

  function CardDetails() {
    return (
      <div
        id="card-details"
        className="mx-1 relative"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <dialog open={isShown} className="bg-transparent absolute z-10 inset-y-0 right-0 translate-x-0 sm:translate-x-40 w-80">
          <CardImage
            className="rounded-[18px] w-96 shadow-dark shadow-md"
            src={getCardImage(group[0]).front}
            alt={`${group[0].name}-${group[0].set}`}
          />
        </dialog>
        <p id="card-name" className="text-xl font-medium">
          <i
            id="card-set-icon"
            title={group[0].set_name}
            className={"text-xl ss ss-" + group[0].set}
          ></i>
          {` ${group[0].name}`}
        </p>
        <p id="card-collector-details" className="small">
          {`${group[0].set_name} - #${group[0].collector_number} - ${group[0].rarity}`}
        </p>
      </div>
    )
  }

  function Printings() {
    return (
      <div id="collection-details" className="flex text-center small grow print:text-xs overflow-x-auto">
        <div className="flex-col w-8 p-2 font-bold space-y-0.5">
          <p>&nbsp;</p>
          {hasNonfoil && <p title="nonfoil">•</p>}
          {hasFoil && <p title="foil">★</p>}
          {hasEtched && <p title="etched">E</p>}
        </div>

        <div id="printings" className="flex">
          {group.map((language) => (
            <div id="languages" key={language.lang} className="flex">
              <div
                id={`language-${language.lang}`}
                key={language.lang}
                className="p-1 flex flex-col space-y-0.5"
              >
                <Language language={language.lang} cardId={language.id} isActive={false} />
                {language.finishes.includes("nonfoil") &&
                  printQuantityCollected(
                    language.lang,
                    "nonfoil",
                    getCardCountFinish(language.id, "nonfoil")
                  )}
                {language.finishes.includes("foil") &&
                  printQuantityCollected(
                    language.lang,
                    "foil",
                    getCardCountFinish(language.id, "foil")
                  )}
                {language.finishes.includes("etched") &&
                  printQuantityCollected(
                    language.lang,
                    "etched",
                    getCardCountFinish(language.id, "etched")
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function Prices() {
    return (
      <div id="prices" className="flex ml-4 justify-end">
        <div
          id="eur"
          className="p-1 flex flex-col space-y-0.5 mx-1 w-auto sm:w-16 print:w-12"
        >
          <p id="eur-label" className="font-medium px-1 my-0.5">
            €
          </p>
          {hasNonfoil && printPrice(group[0].prices.eur, "price-eur")}
          {hasFoil && printPrice(group[0].prices.eur_foil, "price-eur-foil")}
        </div>
        <div
          id="usd"
          className="p-1 flex flex-col space-y-0.5 mx-1 w-auto sm:w-16 print:w-12"
        >
          <p id="usd-label" className="font-medium px-1 my-0.5">
            $
          </p>
          {hasNonfoil && printPrice(group[0].prices.usd, "price-usd")}
          {hasFoil && printPrice(group[0].prices.usd_foil, "price-usd-foil")}
          {hasEtched && printPrice(group[0].prices.usd_etched, "price-usd-etched")}
        </div>
      </div>
    )
  }

  function printQuantityCollected(language, finish, count) {
    return (
      <p
        id={`${language}-${finish}-collected`}
        className={count > 0 ? "bg-collected rounded" : ""}
      >
        {count}
      </p>
    );
  }

  function printPrice(price, id) {
    return <p id={id}>{price !== null ? price : "\xa0"}</p>;
  }
}
