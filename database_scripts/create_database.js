import { writeFileSync, createReadStream } from 'fs';

// add '"type": "module",' to package.json to run this script

// info: script to process the all-cards.json with all data from scryfall into a compressed cards.json file
// todo: find a way to upload this data to a real database and update this data each night

let cardData = []
var input = createReadStream('../src/database/all-cards.json');
readLines(input, func);

function readLines(input, func) {
    var remaining = '';

    input.on('data', function (data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        var last = 0;
        while (index > -1) {
            var line = remaining.substring(last, index);
            last = index + 1;
            func(line);
            index = remaining.indexOf('\n', last);
        }

        remaining = remaining.substring(last);
    });

    input.on('end', function () {
        if (remaining.length > 0) {
            func(remaining);
        }
    });
}

let isFinalCard = false
let cardCount = 0
let cardFinishCount = 0
function func(data) {
    if (data.length <= 3) { return } // skip open and close lines

    data = data.trim()
    if (data.slice(-1) === ",") {
        data = data.slice(0, -1)
    } else {
        isFinalCard = true
    }
    processCard(JSON.parse(data))
    if (cardCount % 10000 === 0) {
        console.log(`Processing card # ${cardCount}`)
    }
    cardCount += 1;
    if (isFinalCard) {
        writeFileSync('../src/database/cards.json', JSON.stringify(cardData));
        console.log(`Done! Processed ${cardCount} cards (${cardFinishCount} including different finishes)!`)
    }
}

const processCard = (card) => {
    if (card.digital) {
        // console.log('digital card')
        return
    }

    const newCard = {
        //name, set, language and scryfall id, price, image_url
        name: card.name,
        set: card.set,
        nr: card.collector_number,
        id: card.id,
        prices: card.prices,
        lang: card.lang,
        image: card.hasOwnProperty("image_uris") // check if image is available
            ? card.image_uris.normal
            : card.card_faces[0].hasOwnProperty("image_uris") // check for double faced card
                ? card.card_faces[0].image_uris.normal
                : "https://c2.scryfall.com/file/scryfall-errors/soon.jpg"
    }

    cardData.push(newCard)
}
