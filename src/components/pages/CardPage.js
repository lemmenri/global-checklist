import { useParams, useLocation } from 'react-router-dom'
import { useState } from 'react'
import CardImage from '../CardImage'
import { Loading } from '../Loading'

const processRawCardData = (rawCard) => {
    return {
        name: rawCard.name,
        id: rawCard.id,
        set: rawCard.set,
        set_name: rawCard.set_name,
        nr: rawCard.collector_number,
        rarity: rawCard.rarity,
        collected: {
            [rawCard.lang]: {
                ...(rawCard.finishes.includes("nonfoil")) && { nonfoil: 0 },
                ...(rawCard.finishes.includes("foil")) && { foil: 0 },
                ...(rawCard.finishes.includes("etched")) && { etched: 0 },
                ...(rawCard.finishes.includes("glossy")) && { glossy: 0 },
            }
        },
        prices: {
            eur: rawCard.prices.eur,
            eur_foil: rawCard.prices.eur_foil,
            usd: rawCard.prices.usd,
            usd_foil: rawCard.prices.usd_foil,
            usd_etched: rawCard.prices.usd_etched
        },
        img: rawCard.hasOwnProperty("image_uris") // check if image is available
            ? rawCard.image_uris.normal
            : rawCard.card_faces[0].hasOwnProperty("image_uris")// check for double faced card
                ? rawCard.card_faces[0].image_uris.normal
                : "https://c2.scryfall.com/file/scryfall-errors/soon.jpg"

    }
}

const CardPage = () => {
    const cardId = useParams()
    const [card, setCard] = useState(useLocation().state)
    const [isDataLoaded, setIsDataLoaded] = useState(card === null ? false : true)
    
    const fetchCardDataById = (id) => {
        fetch(`https://api.scryfall.com/cards/${id}`)
        .then((res) => res.json())
        .then((json) => setCard(processRawCardData(json)))
        .then(() => setIsDataLoaded(true))
    }
    
    if(card === null) {fetchCardDataById(cardId.id)}

    return (
        <div className="p-2 sm:p-8 bg-gray-400"> 
            {isDataLoaded
                ? <>
                    <h1 className="text-xl my-4">{card.name}</h1>
                    <p id="card-collector-details" className="text-lg">
                        <i
                            id="card-set-icon"
                            title={card.set_name}
                            className={"text-4xl ss ss-" + card.set}
                            ></i>
                        {`\xa0${card.set_name} - #${card.nr} - ${card.rarity}`}
                    </p>
                    <CardImage
                        className="rounded-2xl w-96"
                        src={card.img}
                        alt={`${card.name}-${card.set}`}
                    />
                </>
                :
                    <Loading />
                }
        </div>
    )
}

export default CardPage