import { Link } from "react-router-dom";
import CardImage from "./CardImage";

export default function SearchResultImageItem(props) {
    const card = props.card;

    const hasFinish = (finish) => {
        let hasFinish = false
        Object.keys(card.collected).forEach(
            (language) => {
                if (card.collected[language].hasOwnProperty(finish)) {
                    hasFinish = true
                }
            }
        )
        return hasFinish
    }

    const countCards = (finish) => {
        let count = 0;
        Object.keys(card.collected).forEach(
            (language) => (
                count +=
                typeof card.collected[language][finish] === "number"
                    ? card.collected[language][finish]
                    : 0
            )
        );
        return count;
    };
    const hasNonfoil = hasFinish("nonfoil");
    const hasFoil = hasFinish("foil");
    const hasEtched = hasFinish("etched");
    const hasGlossy = hasFinish("glossy");

    const nonfoilCount = countCards("nonfoil");
    const foilCount = countCards("foil");
    const etchedCount = countCards("etched");
    const glossyCount = countCards("glossy");

    return (
        <div title={card.set_name} className="p-1 relative">
            <Link
                id={`card ${card.id}`}
                className=""
                to={`/card/${card.id}`}
                state={card}
            >
                <CardImage
                    className="rounded-xl shadow-gray-700 shadow-md"
                    src={card.img}
                    alt={`${card.name}-${card.set}`}
                />
                <div className="flex h-auto absolute inset-x-0 bottom-1 justify-around text-center">

                    {showCount("nonfoil", hasNonfoil, nonfoilCount, "•")}
                    {showCount("foil", hasFoil, foilCount, "✶")}
                    {showCount("etched", hasEtched, etchedCount, "E")}
                    {showCount("glossy", hasGlossy, glossyCount, "G")}
                </div>
            </Link>
        </div>
    );

    function showCount(finish, hasFinish, finishCount, label) {
        return hasFinish
            ? <div
                title={finish}
                className={`${finishCount > 0
                    ? "bg-collected border-collected/25"
                    : "bg-light border-light/25"} bg-opacity-40 backdrop-blur-sm mx-2 my-8 rounded w-1/2 shadow-dark shadow-md border border-opacity-30`}
            >
                <p>{label} {finishCount}</p>
            </div>
            : (finish === "nonfoil" || finish === "foil") && <div className="w-1/2"></div>
    }
}
