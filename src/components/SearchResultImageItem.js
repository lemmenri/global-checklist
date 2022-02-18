export default function SearchResultImageItem(props) {
    const card = props.card;
    const countCards = (isFoil) => {
        let count = 0;
        const cardType = isFoil ? "foil" : "regular";
        Object.keys(card.collected).map(
            (language) =>
            (count +=
                typeof card.collected[language][cardType] === "number"
                    ? card.collected[language][cardType]
                    : 0)
        );
        return count;
    };
    const regular = countCards(false);
    const foil = countCards(true);
    return (
        <div className="p-1">
            <div className="relative">
                <img
                    className="rounded-xl"
                    src={card.img}
                    alt={`${card.name}-${card.set}`}
                />
                <div className="flex h-auto absolute inset-x-0 bottom-1 justify-around text-center">
                    <div
                        className={`${regular > 0
                            ? "bg-green-500 border-green-100"
                            : "bg-gray-300 border-gray-100"
                            } bg-opacity-40 backdrop-blur-sm m-4 rounded w-1/2 shadow-gray-700 shadow-md border border-opacity-30`}
                    >
                        <p>• {regular}</p>
                    </div>
                    <div
                        className={`${foil > 0
                            ? "bg-green-500 border-green-100"
                            : "bg-gray-300 border-gray-100"
                            } bg-opacity-40 backdrop-blur-sm m-4 rounded w-1/2 shadow-gray-700 shadow-md border border-opacity-30`}
                    >
                        <p>✶ {foil}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
