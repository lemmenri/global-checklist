import React from "react";

export default function SetCard({ set }) {
  const uniqueCardsCollected = 97;
  const totalCardsCollected = 0;
  const percentageCompleted = Math.round(
    (uniqueCardsCollected / set.card_count) * 100
  );

  console.log(uniqueCardsCollected);
  console.log(set.card_count);
  console.log(percentageCompleted);
  return (
    <div id="setCard" className="overflow-hidden">
      <div
        id="setCard-title"
        className="flex bg-dark text-white p-2 rounded-t-lg items-center"
      >
        <i
          id="setCard-icon"
          title={set.code}
          className={"ss ss-" + set.code}
        ></i>
        <p id="setCard-name" className="pl-2">
          {set.name}
        </p>
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
            <p className="z-50 relative">{`${percentageCompleted}% - ${uniqueCardsCollected}/${set.card_count}`}</p>
            <div
              id="percentagebar-background"
              className={`absolute h-full bottom-0 bg-collected w-[${percentageCompleted}%]`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}