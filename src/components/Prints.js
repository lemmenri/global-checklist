import React from "react";
import PrintsListItem from "./PrintsListItem";

export default function Prints({ prints, setCardId, cardId }) {

    return (
        <div id="prints-list" className="py-4">
            <div
                id="prints-list-header"
                className="bg-primary text-white py-1 px-2"
            >
                Prints
            </div>
            <div className=" max-h-72 overflow-y-auto overflow-x-hidden">
                {prints.map((print) => (
                    <PrintsListItem
                        key={`${print.setName}-${print.collector_number}`}
                        collected={print.collected}
                        setName={print.setName}
                        collector_number={print.collector_number}
                        id={print.id}
                        setCardId={setCardId}
                        bold={print.id === cardId}
                    />
                ))}
            </div>
            {prints.length === 0 && (
                <div id="no-other-prints" className="py-1 px-2 border border-primary">
                    No other prints
                </div>
            )}
        </div>
    );
}
