import React from "react";
import { useNavigate } from "react-router";
import { getCardCountSet, getTotalCardCountSet } from "../scripts/CardCounts";

export default function SetCard({ set }) {
  const uniqueCardsCollected = getCardCountSet(set.code);
  const totalCardsCollected = getTotalCardCountSet(set.code);
  const percentageCompleted =
    set.card_count === 0
      ? 0
      : Math.round((uniqueCardsCollected / set.card_count) * 100);

  const navigate = useNavigate();
  const goToSet = () => {
    navigate({
      pathname: "/search",
      search: `?set=${set.code}`,
    });
  };

  return (
    <div id="setCard" className="overflow-hidden p-1">
      <div
        id="setCard-title"
        className="flex bg-dark text-white p-2 rounded-t-lg items-center print:text-dark print:border print:border-1 print:border-dark"
      >
        <i
          id="setCard-icon"
          title={set.code}
          className={`ss ss-${
            set.hasOwnProperty("parent_set_code")
              ? set.parent_set_code
              : set.code
          }`}
        ></i>
        <button
          id="setCard-name"
          className="pl-2 hover:underline text-left"
          onClick={goToSet}
        >
          {set.name}
        </button>
      </div>
      <div
        id="setCard-details"
        className="border border-1 border-dark p-2 rounded-b-lg"
      >
        <div id="setCard-text-collected">
          {`${uniqueCardsCollected}/${set.card_count} (${totalCardsCollected} total cards collected)`}
        </div>
        <div
          id="setCard-percentagebar-container"
          className="m-2 border border-1 border-dark"
        >
          <div id="percentagebar" className="relative w-full text-center">
            <p className="z-40 relative">{`${percentageCompleted}% - ${uniqueCardsCollected}/${set.card_count}`}</p>
            <div
              id="percentagebar-background"
              style={{ width: percentageCompleted + "%" }}
              className={`absolute h-full bottom-0 bg-collected`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
