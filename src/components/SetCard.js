import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getCardCountSet, getTotalCardCountSet } from "../scripts/CardCounts";
import Language from "./Language";

export function SetCardExtended({ setData }) {
  const [activeLanguage, setActiveLanguage] = useState(setData ? setData.languages[0].language : "en");
  if (!setData) return (<></>)

  return (
    <div id={`setCard-${setData.setCode}`} className="overflow-hidden p-1">
      <div
        id={`setCard-title-${setData.setCode}`}
        className="flex bg-dark text-white p-2 rounded-t-lg items-center space-x-2 print:text-dark print:border print:border-1 print:border-dark"
      >
        <i
          id={`setCard-icon-${setData.setCode}`}
          title={setData.setCode}
          className={`ss ss-${setData.setCode}`}
        ></i>
        <Link
          id={`setCard-name-${setData.setCode}`}
          className="hover:underline text-left"
          to={`/search/?set=${setData.setCode}`}
        >
          {setData.setName}
        </Link>
      </div>

      <div
        id="setCard-details"
        className="border border-1 border-dark p-2 rounded-b-lg space-y-1"
      >

        <div id="setCard-text-collected">
          {`${setData.uniqueCardsCollected}/${setData.setSize} (${setData.totalCardsCollected} total card${setData.totalCardsCollected !== 1 ? "s" : ""} collected)`}
        </div>

        <div id="setCard-text-value" className="small">
          {`Value indication: $${setData.estimatedValue.usd}, €${setData.estimatedValue.eur}`}
        </div>

        <div id="languageContainer" className="flex space-x-1 overflow-x-auto">
          {
            setData.languages.map((lang) => (
              <button key={`btn-lang-${lang.language}`} className="" onClick={() => setActiveLanguage(lang.language)}>
                <Language language={lang.language} isActive={lang.language === activeLanguage} />
              </button>
            ))
          }
        </div>

        <div id="collectedContainer" className="flex flex-col space-y-1">
          {
            setData.languages.find((lang) => (lang.language === activeLanguage)).finishes.map((finish) => (
              <div id={`collected-${finish.finish}`} key={finish.finish} className="flex">
                <div className="w-6 text-center self-center">
                  {finish.finish === "nonfoil" && <p title="nonfoil">•</p>}
                  {finish.finish === "foil" && <p title="foil">★</p>}
                  {finish.finish === "etched" && <p title="etched">E</p>}
                </div>
                <PercentageBar collectedCards={finish.collectedCards} totalCards={finish.totalCards} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

function PercentageBar({ collectedCards, totalCards }) {
  const percentageCompleted = calculatePercentage(collectedCards, totalCards)
  return (
    <div
      id="setCard-percentagebar-container"
      className="mx-2 my-0.5 border border-1 border-dark small w-full"
    >
      <div id="percentagebar" className="relative w-full text-center">
        <p className="z-40 relative">{`${percentageCompleted}% - ${collectedCards}/${totalCards}`}</p>
        <div
          id="percentagebar-background"
          style={{ width: percentageCompleted + "%" }}
          className={`absolute h-full bottom-0 bg-collected`}
        ></div>
      </div>
    </div>
  )
}

function calculatePercentage(collectedCards, totalCards) {
  return totalCards === 0
    ? 0
    : Math.round((collectedCards / totalCards) * 100);
}


export default function SetCard({ set }) {
  const uniqueCardsCollected = getCardCountSet(set.code);
  const totalCardsCollected = getTotalCardCountSet(set.code);
  const percentageCompleted =
    set.card_count === 0
      ? 0
      : Math.round((uniqueCardsCollected / set.card_count) * 100);

  return (
    <div id={`setCard-${set.code}`} className="overflow-hidden p-1">
      <div
        id={`setCard-title-${set.code}`}
        className="flex bg-dark text-white p-2 rounded-t-lg items-center print:text-dark print:border print:border-1 print:border-dark"
      >
        <i
          id={`setCard-icon-${set.code}`}
          title={set.code}
          className={`ss ss-${set.hasOwnProperty("parent_set_code")
            ? set.parent_set_code
            : set.code
            }`}
        ></i>
        <Link
          id={`setCard-name-${set.code}`}
          className="pl-2 hover:underline text-left"
          to={`/search/?set=${set.code}`}
        >
          {set.name}
        </Link>
      </div>
      <div
        id={`setCard-details-${set.code}`}
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
