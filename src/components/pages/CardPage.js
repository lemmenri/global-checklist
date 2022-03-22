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
                : "https://c2.scryfall.com/file/scryfall-errors/soon.jpg",
        external_links: {
            scryfall: rawCard.scryfall_uri,
            cardmarket: rawCard.purchase_uris.cardmarket,
            tcgplayer: rawCard.purchase_uris.tcgplayer,
            gatherer: rawCard.related_uris.gatherer
        }
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
    
    if (card === null) { fetchCardDataById(cardId.id) }
    console.log(card)

    return (
        <div className="p-4 sm:p-8 flex-grow bg-light"> 
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
                    <div id='external links' className='w-96 p-2 flex flex-col space-y-1'>
                        {card.external_links.scryfall && 
                        <a 
                            href={card.external_links.scryfall} 
                            target='_blank'
                            rel="noopener noreferrer" 
                            className='flex border border-dark rounded-xl px-4 py-1 hover:underline hover:cursor-pointer'>
                                <img 
                                    scr="https://assets.scryfall.com/favicon.ico"
                                    alt='scryfall icon' 
                                />
                                Open on Scryfall
                        </a>}
                        {card.external_links.cardmarket && 
                        <a 
                            href={card.external_links.cardmarket} 
                            target='_blank'
                            rel="noopener noreferrer" 
                            className='flex border border-dark rounded-xl px-4 py-1 hover:underline hover:cursor-pointer'>
                                <img 
                                    scr="https://static.cardmarket.com/img/526dbb9ae52c5e62404fe903e9769807/static/misc/favicon-96x96.png"
                                    alt='cardmarket icon' 
                                />
                                Open on Cardmarket
                        </a>}
                        {card.external_links.tcgplayer && 
                        <a 
                            href={card.external_links.tcgplayer} 
                            target='_blank'
                            rel="noopener noreferrer" 
                            className='flex border border-dark rounded-xl px-4 py-1 hover:underline hover:cursor-pointer'>
                                <img 
                                    scr="https://www.tcgplayer.com/favicon.ico"
                                    alt='TCGPlayer icon' 
                                />
                                Open on TCGPlayer
                        </a>}
                        {card.external_links.gatherer && 
                        <a 
                            href={card.external_links.gatherer} 
                            target='_blank'
                            rel="noopener noreferrer" 
                            className='flex border border-dark rounded-xl px-4 py-1 hover:underline hover:cursor-pointer'>
                                <img 
                                    scr="https://gatherer.wizards.com/Images/favicon.ico"
                                    alt='gatherer icon' 
                                />
                                Open on Gatherer
                            </a>}
                    </div>
                </>
                :
                    <Loading />
                }
        </div>
    )
}

export default CardPage