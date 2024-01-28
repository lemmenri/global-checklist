/// <reference types="cypress" />

import { addCard } from "../../src/scripts/CollectedCards";

describe("Collectionpage", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/collection");
    });

    it("Renders all components", () => {
        addCard({
            id: "46652ae3-6572-4296-939b-0789923180d5",
            name: "Zodiac Dragon",
            set: "ptk",
            nr: "131",
            language: "EN",
            finish: "nonfoil",
            quantity: 1,
            condition: "MT",
        });
        cy.get('#header').should('be.visible')
        cy.get("h1").should("contain.text", "Collection");
        cy.get('#cardnameSearch').should('be.visible')
        cy.get('#collectedCardCount').should('be.visible')
        cy.get('#collectedCardCount').should('contain.text', '1 card in collection')
        cy.get('#searchForm').should('be.visible')
        cy.get('#collectionTable').should('be.visible')
        cy.get('#footer').should('be.visible')
        cy.location().should((location) => {
            expect(location.pathname).to.eq("/collection");
        });
    });

    it("Empty collection shows no cards with message", () => {
        cy.get('#header').should('be.visible')
        cy.get("h1").should("contain.text", "Collection");
        cy.get('#cardnameSearch').should('be.visible')
        cy.get('#collectedCardCount').should('be.visible')
        cy.get('#collectedCardCount').should('contain.text', '0 cards in collection')
        cy.get('#searchForm').should('be.visible')
        cy.get('#noCardsInCollectionText').should('be.visible')
        cy.get('#collectionTable').should('not.exist')
        cy.get('#footer').should('be.visible')
        cy.location().should((location) => {
            expect(location.pathname).to.eq("/collection");
        });
    });

});
