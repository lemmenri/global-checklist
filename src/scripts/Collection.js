
export const addCardToCollection = (id, finish, amount, condition) => {
    const newCard = {
        id,
        "cards": [
            {
                finish,
                "conditions": [
                    { condition, amount}
                ]
            }
        ]
    }

    //check if collection exists
    if (getCollection()) {
        //collection exists
    } else {
        //no collection yet
        localStorage.setItem('collection', JSON.stringify([newCard]))
    }
    //check if card is in collection

}

export const getCardFromCollection = (id) => {
    const collection = getCollection()
    if (collection) {
        return collection.find(card => card.id === id)
    }
    else {
        return undefined
    }
}

export const getAmountOfCard = (id, finish) => {
    const card = getCardFromCollection(id)
    if (!card) {return 0}
    let amount = 0
    card.cards.forEach(card => {
        if (card.finish === finish) {
            card.conditions.forEach(condition => {
                amount += condition.amount
            })
        }
    })
    return amount
}

const getCollection = () => {
    return JSON.parse(localStorage.getItem('collection'))
}

// TODO: update
// TODO: delete