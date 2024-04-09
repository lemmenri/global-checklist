import React from "react";
import PrintsListItem from "./PrintsListItem";

export default function OtherCardsInSet({ otherCardsInSet, setCardId, cardId, setName }) {

    return (
        <div id="otherCardsInSet-list" className="py-4">
            <div
                id="otherCardsInSet-list-header"
                className="bg-primary text-white py-1 px-2"
            >
                {setName}
            </div>
            <div className="max-h-72 overflow-y-auto overflow-x-hidden">
                {otherCardsInSet.map((card) => (
                    <PrintsListItem
                        key={`${card.setName}-${card.collector_number}`}
                        collected={card.collected}
                        setName={card.setName}
                        collector_number={card.collector_number}
                        id={card.id}
                        setCardId={setCardId}
                        bold={card.id === cardId}
                    />
                ))}
            </div>
            {otherCardsInSet.length === 0 && (
                <div id="no-other-cards-in-set" className="py-1 px-2 border border-primary">
                    No other cards in set
                </div>
            )}
        </div>
    );
}
