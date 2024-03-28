import { Link } from "react-router-dom";
import { getCardCountFinish } from "../scripts/CardCounts";
import { getCardImage } from "../scripts/CardImage";
import CardImage from "./CardImage";

export default function SearchResultImageItem(props) {
  const card = props.card;

  const hasNonfoil = card.finishes.includes("nonfoil");
  const hasFoil = card.finishes.includes("foil");
  const hasEtched = card.finishes.includes("etched");

  function showCount(finish, hasFinish, finishCount, label) {
    return hasFinish ? (
      <div
        id={finish}
        className={`${finishCount > 0
          ? "bg-collected border-collected/25"
          : "bg-light border-light/25"
          } bg-opacity-40 backdrop-blur-sm mx-2 my-8 rounded w-1/2 shadow-dark shadow-md border border-opacity-30 print:shadow-none`}
      >
        <p id={`${card.lang}-${finish}-collected`}>
          {`${label} ${finishCount}`}
        </p>
      </div>
    ) : (
      (finish === "nonfoil" || finish === "foil") && (
        <div className="w-1/2"></div>
      )
    );
  }

  return (
    <div
      id="search-result-image-item"
      className="p-0.5 lg:p-1 relative break-inside-avoid"
    >
      <Link
        id={`card ${card.id}`}
        className=""
        to={`/card/${card.id}`}
        state={card}
      >
        <CardImage
          className="rounded-xl shadow-dark shadow-md print:shadow-none"
          src={getCardImage(card)}
          alt={`${card.name}-${card.set}`}
        />
        <div className="flex h-auto absolute inset-x-0 bottom-1 justify-around text-center">
          {showCount(
            "nonfoil",
            hasNonfoil,
            getCardCountFinish(card.id, "nonfoil"),
            "•"
          )}
          {showCount("foil", hasFoil, getCardCountFinish(card.id, "foil"), "★")}
          {showCount(
            "etched",
            hasEtched,
            getCardCountFinish(card.id, "etched"),
            "E"
          )}

        </div>
      </Link>
    </div>
  );
}
