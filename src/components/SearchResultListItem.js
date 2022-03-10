import { Link } from 'react-router-dom'

export default function SearchResultListItem(props) {
    const card = props.card;

    return (
        <div id="search-result-list-item" className="p-1 w-full">
            <Link
                id={`card ${card.id}`}
                className="flex flex-row bg-gradient-to-r from-cyan-100 to-indigo-100 p-2 w-full rounded-xl"
                to={`/card/${card.id}`}
                state={card}
            >
                <div id="card-details" className="mx-1 w-1/3">
                    <p id="card-name" className="text-xl font-medium">
                        <i
                            id="card-set-icon"
                            title={card.set_name}
                            className={"text-2xl ss ss-" + card.set}
                        ></i>
                        {` ${card.name}`}
                    </p>
                    <p id="card-collector-details" className="text-sm">
                        {`${card.set_name} - #${card.nr} - ${card.rarity}`}
                    </p>
                </div>
                <div id="collection-details" className="flex text-center text-sm grow">
                    <div className="flex-col max-w-max p-2 font-bold space-y-0.5">
                        <p>&nbsp;</p>
                        <p>•</p>
                        <p>✶</p>
                        <p>E</p>
                        <p>G</p>
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
                                {nrCollected(language, "nonfoil")}
                                {nrCollected(language, "foil")}
                                {nrCollected(language, "etched")}
                                {nrCollected(language, "glossy")}
                            </div>
                        ))}
                    </div>
                    <div id="prices" className="flex ml-4 grow justify-end">
                        <div id="eur" className="p-1 flex flex-col space-y-0.5 mx-1 w-20">
                            <p id="eur-label" className="font-medium px-1 my-0.5">
                                €
                            </p>
                            <p id="price-eur">
                                {card.prices.eur !== null ? card.prices.eur : "\xa0"}
                            </p>
                            <p id="price-eur-foil">{card.prices.eur_foil}</p>
                        </div>
                        <div id="usd" className="p-1 flex flex-col space-y-0.5 mx-1 w-20">
                            <p id="usd-label" className="font-medium px-1 my-0.5">
                                $
                            </p>
                            <p id="price-eur">
                                {card.prices.usd !== null ? card.prices.usd : "\xa0"}
                            </p>
                            <p id="price-usd-foil">
                                {card.prices.usd_foil !== null ? card.prices.usd_foil : "\xa0"}
                            </p>
                            <p id="price-usd-etched">{card.prices.usd_etched}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );

    function nrCollected(language, finish) {
        return <p
            id={`${finish}-collected`}
            className={card.collected[language][finish] > 0
                ? "bg-green-500 rounded"
                : ""}
        >
            {typeof card.collected[language][finish] === "number"
                ? card.collected[language][finish]
                : "\xa0"}
        </p>;
    }
}
