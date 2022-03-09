import { Link } from "react-router-dom";

export default function SearchResultImageItem(props) {
    const card = props.card;
    const countCards = (isFoil) => {
        let count = 0;
        const cardType = isFoil ? "foil" : "nonfoil";
        Object.keys(card.collected).map(
            (language) =>
            (count +=
                typeof card.collected[language][cardType] === "number"
                    ? card.collected[language][cardType]
                    : 0)
        );
        return count;
    };
    const nonfoil = countCards(false);
    const foil = countCards(true);
    return (
        <div className="p-1 relative">
            <Link
                id={`card ${card.id}`}
                className=""
                to={`/card/${card.id}`}
                state={card}
            >
                <img
                    className="rounded-xl shadow-gray-700 shadow-md"
                    src={card.img}
                    alt={`${card.name}-${card.set}`}
                />
                <div className="flex h-auto absolute inset-x-0 bottom-1 justify-around text-center">
                    
                    {card.collected[Object.keys(card.collected)[0]].nonfoil !== "" 
                        ? <div
                            className={`${nonfoil > 0
                                ? "bg-green-500 border-green-100"
                                : "bg-gray-300 border-gray-100"
                                } bg-opacity-40 backdrop-blur-sm ml-4 mr-2 my-8 rounded w-1/2 shadow-gray-700 shadow-md border border-opacity-30`}
                        >
                            <p>• {nonfoil}</p>
                        </div>
                        : <div className="w-1/2"></div>
                        }
                    {card.collected[Object.keys(card.collected)[0]].foil !== "" 
                        ? <div
                            className={`${foil > 0
                                ? "bg-green-500 border-green-100"
                                : "bg-gray-300 border-gray-100"
                                } bg-opacity-40 backdrop-blur-sm ml-2 mr-4 my-8 rounded w-1/2 shadow-gray-700 shadow-md border border-opacity-30`}
                        >
                            <p>✶ {foil}</p>
                        </div>
                        : <div className="w-1/2"></div>
                    }
                </div>
            </Link>
        </div>
    );
}
