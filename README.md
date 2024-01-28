# MTG Library

## Overview

This is a project to create a collection layer over the [scryfall.com api](https://scryfall.com). The goal is to support all available cards, languages and finishes scryfall has to offer.
At the moment collections are only stored locally in the browser. One of the next main goals is to add account and database support so collections can be stored and accessed everywhere.
At the moment the project is still in early developement. See the TODO.txt file for a rough backlog.

## Pages

### Searching cards:

Search for cardnames, artists, creature types and sets. You'll get an overview of all available printings, languages and finishes (nonfoil, foil and etched). Also prices are shown if available. Switch to image view to see the cards in all different languages as well.

![search page](./screenshots/searchpage_list.png?raw=true)

### Card details:

Get some details about the card. Add or remove the card from your collection.

![card page](./screenshots/cardpage.png?raw=true)

### Collection:

Get an overview of all sets in existence and see how many cards are already in your collection.

![sets page](./screenshots/setspage.png?raw=true)

## Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Styling is done with [Tailwindcss](https://tailwindcss.com/).
Prototyping and Design System is made in [Figma](https://figma.com/).
Testing is done with [Cypress](https://www.cypress.io/).
