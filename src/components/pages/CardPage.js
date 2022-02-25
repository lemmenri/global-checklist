import { useParams, useLocation } from 'react-router-dom'

const CardPage = (props) => {
    const cardId = useParams() // todo: fetch data from scryfall based on cardId if location prop is not provided. Maybe replace for Redux alternative?
    const card = useLocation().state;

    return (
        <div className="p-2 sm:p-8 bg-gray-400">
            <h1 className="text-xl my-4">{card.name}</h1>
            <p id="card-collector-details" className="text-lg">
                <i
                    id="card-set-icon"
                    title={card.set_name}
                    className={"text-4xl ss ss-" + card.set}
                ></i>
                {`\xa0${card.set_name} - #${card.nr} - ${card.rarity}`}
            </p>
            <img
                className="rounded-xl w-96"
                src={card.img}
                alt={`${card.name}-${card.set}`}
            />
        </div>
    )
}

export default CardPage