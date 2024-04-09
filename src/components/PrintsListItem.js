import { useNavigate } from "react-router";
import React from "react";

export default function PrintsListItem({ collected, setName, collector_number, id, setCardId, bold = false }) {
    const navigate = useNavigate();
    const goToPrinting = () => {
        setCardId({ id })
        navigate({
            pathname: `/card/${id}`,
        });
    };

    return (
        <div className="flex space-x-4 px-2 border border-t-0 border-primary justify-between relative">
            <div
                id={`link-printing-${setName.replaceAll(" ", "-")}`}
                className="flex flex-wrap overflow-visible"
            >

                <button onClick={goToPrinting} className={`text-left hover:underline ${bold && "font-semibold"}`} id="cardName">
                    #{collector_number} - {setName}
                </button>
            </div>
            <div id="finishes"
                className="flex space-x-2">
                {collected.find(({ finish }) => finish === "nonfoil") && finishCollected("nonfoil", collected.find(({ finish }) => finish === "nonfoil").count)}
                {collected.find(({ finish }) => finish === "foil") && finishCollected("foil", collected.find(({ finish }) => finish === "foil").count)}
                {collected.find(({ finish }) => finish === "etched") && finishCollected("etched", collected.find(({ finish }) => finish === "etched").count)}
            </div>
        </div>
    );
}

function finishCollected(finish, count) {
    let finishSign
    if (finish === "foil") finishSign = "★"
    if (finish === "nonfoil") finishSign = "•"
    if (finish === "etched") finishSign = "E"
    return (
        <div
            id={`${finish}-collected`}
            className={`w-10 h-6 my-0.5 text-center ${count > 0 && "bg-collected"} rounded overflow-hidden`}
        >
            {finishSign} {count}
        </div>
    );
}