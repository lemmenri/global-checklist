import React from "react";
import { useNavigate } from "react-router";
import PrintsListItem from "./PrintsListItem";

export default function Prints({ prints, cardname, setCardId, cardId }) {
    const navigate = useNavigate();
    const goToAllPrints = () => {
        navigate({
            pathname: "/search",
            search: `?name=${cardname}`,
        });
    };

    return (
        <div id="prints-list" className="py-4 max-w-sm">
            <div
                id="prints-list-header"
                className="bg-primary text-white py-1 px-2"
            >
                Prints
            </div>
            {prints.slice(0, 10).map((print) => (
                <PrintsListItem
                    key={`${print.setName}-${print.collector_number}`}
                    collected={print.collected}
                    setName={print.setName}
                    collector_number={print.collector_number}
                    id={print.id}
                    image={print.image}
                    setCardId={setCardId}
                    bold={print.id === cardId}
                />
            ))}
            {prints.length > 10 && (
                <div id="all-prints" className="py-1 px-2 border border-t-0 border-primary">
                    <button onClick={goToAllPrints} className="hover:underline" id="cardName">
                        View all prints...
                    </button>
                </div>
            )}
            {prints.length === 0 && (
                <div id="no-other-prints" className="py-1 px-2 border border-primary">
                    No other prints
                </div>
            )}
        </div>
    );
}
