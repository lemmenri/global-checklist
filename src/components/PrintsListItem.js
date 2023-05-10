import { useNavigate } from "react-router";
import CardImage from "./CardImage";
import React, { useState } from "react";

export default function PrintsListItem({ collected, setName, collector_number, id, image, setCardId }) {
    const [isShown, setIsShown] = useState(false)
    const navigate = useNavigate();
    const goToPrinting = () => {
        setCardId({ id })
        navigate({
            pathname: `/card/${id}`,
        });
    };

    return (
        <div className="flex flex-wrap space-x-4 px-2 border border-t-0 border-primary justify-between relative">
            <div
                id={`link-printing-${setName.replaceAll(" ", "-")}`}
                className="max-w-[255px]"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >
                <dialog open={isShown} className="bg-transparent absolute z-10 inset-y-0 right-0 translate-x-24 w-64">
                    <CardImage
                        className="rounded-[9px] w-64 shadow-dark shadow-md"
                        src={image}
                        alt={`cardimage-${setName.replaceAll(" ", "-")}`}
                    />
                </dialog>
                <button onClick={goToPrinting} className="text-left hover:underline" id="cardName">
                    {setName} - #{collector_number}
                </button>
            </div>
            <div id="finishes"
                className="flex space-x-2">
                {collected.find(({ finish }) => finish === "nonfoil") && finishCollected("nonfoil", collected.find(({ finish }) => finish === "nonfoil").count)}
                {collected.find(({ finish }) => finish === "foil") && finishCollected("foil", collected.find(({ finish }) => finish === "foil").count)}
                {collected.find(({ finish }) => finish === "etched") && finishCollected("etched", collected.find(({ finish }) => finish === "etched").count)}
                {collected.find(({ finish }) => finish === "glossy") && finishCollected("glossy", collected.find(({ finish }) => finish === "glossy").count)}
            </div>
        </div>
    );
}

function finishCollected(finish, count) {
    let finishSign
    if (finish === "foil") finishSign = "✶"
    if (finish === "nonfoil") finishSign = "•"
    if (finish === "etched") finishSign = "E"
    if (finish === "glossy") finishSign = "G"
    return (
        <div
            id={`${finish}-collected`}
            className={`w-10 h-6 m-0.5 text-center ${count > 0 && "bg-collected"} rounded`}
        >
            {finishSign} {count}
        </div>
    );
}