import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip';

export default function SearchResultListItem(props) {
    const card = props.card;

    const hasFinish = (finish) => {
        let hasFinish = false
        Object.keys(card.collected).map(
            (language) => {
                if (card.collected[language].hasOwnProperty(finish)) {
                    hasFinish = true
                }
            }
        )
        return hasFinish
    }

    const hasNonfoil = hasFinish("nonfoil");
    const hasFoil = hasFinish("foil");
    const hasEtched = hasFinish("etched");
    const hasGlossy = hasFinish("glossy");

    return (
        <div id="search-result-list-item" className="p-1 w-full">
            <Link
                id={`card ${card.id}`}
                className="flex flex-row bg-gradient-to-r from-cyan-100 to-indigo-100 p-2 w-full rounded-xl"
                to={`/card/${card.id}`}
                state={card}
            >
                <div data-tip data-for={card.id} id="card-details" className="mx-1 w-1/3">
                    <p id="card-name" className="text-xl font-medium">
                        <i
                            id="card-set-icon"
                            title={card.set_name}
                            className={"text-xl ss ss-" + card.set}
                        ></i>
                        {` ${card.name}`}
                    </p>
                    <p id="card-collector-details" className="text-sm">
                        {`${card.set_name} - #${card.nr} - ${card.rarity}`}
                    </p>
                </div>
                {/* TODO: fix the image. Now all images are displayed the same. Seems like the links are set correct   */}
                <ReactTooltip id={card.id} place="right" effect="solid" backgroundColor="transparent">
                    <img
                        className="rounded-2xl w-52"
                        src={card.img}
                        alt={`${card.name}-${card.set}`}
                    />
                </ReactTooltip>

                <div id="collection-details" className="flex text-center text-sm grow">
                    <div className="flex-col w-8 p-2 font-bold space-y-0.5">
                        <p>&nbsp;</p>
                        {hasNonfoil && <p title="nonfoil">•</p>}
                        {hasFoil && <p title="foil">✶</p>}
                        {hasEtched && <p title="etched">E</p>}
                        {hasGlossy && <p title="glossy">G</p>}
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
                                {hasNonfoil && nrCollected(language, "nonfoil")}
                                {hasFoil && nrCollected(language, "foil")}
                                {hasEtched && nrCollected(language, "etched")}
                                {hasGlossy && nrCollected(language, "glossy")}
                            </div>
                        ))}
                    </div>
                    <div id="prices" className="flex ml-4 grow justify-end">
                        <div id="eur" className="p-1 flex flex-col space-y-0.5 mx-1 w-20">
                            <p id="eur-label" className="font-medium px-1 my-0.5">
                                €
                            </p>
                            {hasNonfoil && <p id="price-eur">
                                {card.prices.eur !== null ? card.prices.eur : "\xa0"}
                            </p>}
                            {hasFoil && <p id="price-eur-foil">{card.prices.eur_foil}</p>}
                        </div>
                        <div id="usd" className="p-1 flex flex-col space-y-0.5 mx-1 w-20">
                            <p id="usd-label" className="font-medium px-1 my-0.5">
                                $
                            </p>
                            {hasNonfoil && <p id="price-usd">
                                {card.prices.usd !== null ? card.prices.usd : "\xa0"}
                            </p>}
                            {hasFoil && <p id="price-usd-foil">
                                {card.prices.usd_foil !== null ? card.prices.usd_foil : "\xa0"}
                            </p>}
                            {hasEtched && <p id="price-usd-etched">{card.prices.usd_etched}</p>}
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
