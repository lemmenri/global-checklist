
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

    let collection = getCollectionFromStorage()

    // check if collection exists
    if (!getCollectionFromStorage()) {
        console.log("scenario 1")
        collection = [newCard]
    }
    // check if card is in collection
    else if (!getCardById(id)) {
        console.log("scenario 2")

        collection.push(newCard)
    }
    // check if finish is on card
    else if (!getAmountOfCard(id, finish) > 0) {
        console.log("scenario 3")

        getCardById(id).cards.push(newCard.cards[0])
    }
    // check if condition is on finish
    else if (!doesCardHaveCondition(id, finish, condition)) {
        console.log("scenario 4")

        // add condition to finish
        getCardByFinish(id, finish).conditions.push(newCard.cards[0].conditions[0])
    }
    // add amount to existing condition
    else {
        console.log("scenario 5")

        getCardByFinish(id, finish).conditions.find(card => card.condition === condition).amount += amount
    }
        
    saveCollectionToStorage(collection)
}

export const getAmountOfCard = (id, finish) => {
    const card = getCardById(id)
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

export const getCardById = (id) => getCollectionFromStorage().find(card => card.id === id)

const getCardByFinish = (id, finish) => 
    getCardById(id).cards.find(card => card.finish === finish)

const doesCardHaveCondition = (id, finish, condition) => 
    getCardByFinish(id, finish).conditions.find(card => card.condition === condition)

const getCollectionFromStorage = () => JSON.parse(localStorage.getItem('collection'))

const saveCollectionToStorage = (collection) => {
    localStorage.setItem('collection', JSON.stringify(collection))
}

// TODO: update
// TODO: delete