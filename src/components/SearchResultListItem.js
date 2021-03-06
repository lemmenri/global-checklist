import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { getCardImage } from "../scripts/CardImage";
import { getCardCountFinish } from "../scripts/CardCounts";
import CardImage from "./CardImage";
import Language from "./Language";

export default function SearchResultListItem({ group }) {
  const hasNonfoil = group.find((card) => card.finishes.includes("nonfoil"));
  const hasFoil = group.find((card) => card.finishes.includes("foil"));
  const hasEtched = group.find((card) => card.finishes.includes("etched"));
  const hasGlossy = group.find((card) => card.finishes.includes("glossy"));

  return (
    <div id="search-result-list-item" className="p-1 w-full break-inside-avoid">
      <Link
        id={`card ${group[0].id}`}
        className="flex flex-row border border-dark p-2 w-full rounded-lg"
        to={`/card/${group[0].id}`}
        state={group[0]}
      >
        <div
          data-tip
          data-for={group[0].id}
          id="card-details"
          className="mx-1 w-1/3"
        >
          <p id="card-name" className="text-xl font-medium">
            <i
              id="card-set-icon"
              title={group[0].set_name}
              className={"text-xl ss ss-" + group[0].set}
            ></i>
            {` ${group[0].name}`}
          </p>
          <p id="card-collector-details" className="text-sm">
            {`${group[0].set_name} - #${group[0].collector_number} - ${group[0].rarity}`}
          </p>
        </div>
        <ReactTooltip
          id={group[0].id}
          place="right"
          effect="solid"
          backgroundColor="transparent"
        >
          <CardImage
            className="rounded-2xl w-52"
            src={getCardImage(group[0])}
            alt={`${group[0].name}-${group[0].set}`}
          />
        </ReactTooltip>

        <div
          id="collection-details"
          className="flex text-center text-sm grow print:text-xs"
        >
          <div className="flex-col w-8 p-2 font-bold space-y-0.5">
            <p>&nbsp;</p>
            {hasNonfoil && <p title="nonfoil">???</p>}
            {hasFoil && <p title="foil">???</p>}
            {hasEtched && <p title="etched">E</p>}
            {hasGlossy && <p title="glossy">G</p>}
          </div>

          <div id="printings" className="flex">
            {group.map((language) => (
              <div id="languages" key={language.lang} className="flex">
                <div
                  id={`language-${language.lang}`}
                  key={language.lang}
                  className="p-1 flex flex-col space-y-0.5"
                >
                  <Language language={language.lang} />
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
                  {language.finishes.includes("glossy") &&
                    printQuantityCollected(
                      language.lang,
                      "glossy",
                      getCardCountFinish(language.id, "glossy")
                    )}
                </div>
              </div>
            ))}
          </div>

          <div id="prices" className="flex ml-4 grow justify-end">
            <div
              id="eur"
              className="p-1 flex flex-col space-y-0.5 mx-1 w-20 print:w-12"
            >
              <p id="eur-label" className="font-medium px-1 my-0.5">
                ???
              </p>
              {hasNonfoil && printPrice(group[0].prices.eur, "price-eur")}
              {hasFoil &&
                printPrice(group[0].prices.eur_foil, "price-eur-foil")}
            </div>
            <div
              id="usd"
              className="p-1 flex flex-col space-y-0.5 mx-1 w-20 print:w-12"
            >
              <p id="usd-label" className="font-medium px-1 my-0.5">
                $
              </p>
              {hasNonfoil && printPrice(group[0].prices.usd, "price-usd")}
              {hasFoil &&
                printPrice(group[0].prices.usd_foil, "price-usd-foil")}
              {hasEtched &&
                printPrice(group[0].prices.usd_etched, "price-usd-etched")}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );

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
