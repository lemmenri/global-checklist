
export const addCardToCollection = (id, finish, condition, amount) => {
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

    let collection = getCollection()

    // check if collection exists
    if (!collection) {
        localStorage.setItem('collection', JSON.stringify([newCard]))
        return
    }

    // check if card is in collection
    if (!getCardFromCollection(id)) {
        collection.push(newCard)
        localStorage.setItem('collection', JSON.stringify(collection))
        return
    }

    // check if finish is in collection
    if (!getAmountOfCard(id, finish) > 0) {
        collection.find(card => card.id === id).cards.push(newCard.cards[0])
        localStorage.setItem('collection', JSON.stringify(collection))
        return
    }

    // check if condition is in collection
    if (collection.find(card => card.id === id).cards
        .find(card => card.finish === finish).conditions
        .find(card => card.condition === condition)
    ) {
        // add amount to existing condition
        collection.find(card => card.id === id).cards
            .find(card => card.finish === finish).conditions
            .find(card => card.condition === condition)
            .amount += amount
        localStorage.setItem('collection', JSON.stringify(collection))
        return
    } 

    // add condition to card
    collection.find(card => card.id === id).cards
        .find(card => card.finish === finish).conditions
        .push(newCard.cards[0].conditions[0])
    localStorage.setItem('collection', JSON.stringify(collection))
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