import { Link } from 'react-router-dom'

export default function SearchResultListItem(props) {
    const card = props.card;
    return (
        <div id="search-result-list-item" className="p-1">
            <Link
                id={`card ${card.id}`}
                className="flex flex-row bg-gradient-to-r from-cyan-100 to-indigo-100 p-2 max-w-max rounded-xl"
                to={`/card/${card.id}`}
                state={card}
            >
                <div id="card-details" className="mx-1">
                    <p id="card-name" className="text-3xl font-medium">
                        <i
                            id="card-set-icon"
                            title={card.set_name}
                            className={"text-4xl ss ss-" + card.set}
                        ></i>
                        {` ${card.name}`}
                    </p>
                    <p id="card-collector-details" className="text-lg">
                        {`${card.set_name} - #${card.nr} - ${card.rarity}`}
                    </p>
                </div>
                <div id="collection-details" className="flex text-center text-sm">
                    <div className="flex-col max-w-max p-2 font-bold space-y-0.5">
                        <p>&nbsp;</p>
                        <p>•</p>
                        <p>✶</p>
                    </div>
                    <div id="printings" className="flex">
                        {Object.keys(card.collected).map((language) => (
                            <div
                                id="language"
                                key={language}
                                className="p-1 flex flex-col space-y-0.5"
                            >
                                <p
                                    id="language-label"
                                    className="bg-black font-medium text-white px-1 my-0.5 rounded"
                                >
                                    {language.toUpperCase()}
                                </p>
                                <p
                                    id="nonfoil-collected"
                                    className={
                                        card.collected[language].nonfoil > 0
                                            ? "bg-green-500 rounded"
                                            : ""
                                    }
                                >
                                    {typeof card.collected[language].nonfoil === "number"
                                        ? card.collected[language].nonfoil
                                        : "\xa0"}
                                </p>
                                <p
                                    id="foil-collected"
                                    className={
                                        card.collected[language].foil > 0
                                            ? "bg-green-500 rounded"
                                            : ""
                                    }
                                >
                                    {typeof card.collected[language].foil === "number"
                                        ? card.collected[language].foil
                                        : "\xa0"}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div id="prices" className="flex max-w-max ml-4">
                        <div id="eur" className="p-1 flex flex-col space-y-0.5 mx-1">
                            <p id="eur-label" className="font-medium px-1 my-0.5">
                                €
                            </p>
                            <p id="price-eur">
                                {card.prices.eur !== null ? card.prices.eur : "\xa0"}
                            </p>
                            <p id="price-eur-foil">{card.prices.eurfoil}</p>
                        </div>
                        <div id="usd" className="p-1 flex flex-col space-y-0.5 mx-1">
                            <p id="usd-label" className="font-medium px-1 my-0.5">
                                $
                            </p>
                            <p id="price-eur">
                                {card.prices.usd !== null ? card.prices.usd : "\xa0"}
                            </p>
                            <p id="price-usd-foil">{card.prices.usdfoil}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
