/// <reference types="cypress" />

import { addCard, removeCard } from "../../src/scripts/CollectedCards";

describe("Search page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/search");
  });

  it("Navigate to search page", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").should("contain.text", "Welcome to MTG Library");
    cy.get("#header").within(() => {
      cy.get("#search").click();
    });
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/search");
    });
  });

  it("Search card by cardname", () => {
    cy.searchCard("bird", "Birds of Paradise", "cardnameSearch");
    cy.get("#searchButton").click();
    cy.get("#seachResultsDescription").should(
      "contain.text",
      'Showing results for "Birds of Paradise".'
    );
  });

  it("Search card by artist", () => {
    cy.searchCard("john", "John Avon", "artistSearch");
    cy.get("#searchButton").click();
    cy.get("#seachResultsDescription").should(
      "contain.text",
      'Showing results for "John Avon".'
    );
  });

  it("Search card by creature type", () => {
    cy.searchCard("Sliv", "Sliver", "creatureTypeSearch");
    cy.get("#searchButton").click();
    cy.get("#seachResultsDescription").should(
      "contain.text",
      'Showing results for "Sliver".'
    );
  });

  it("Search card by set", () => {
    cy.searchCard("legions", "Legions", "setSearch");
    cy.get("#searchButton").click();
    cy.get("#seachResultsDescription").should(
      "contain.text",
      'Showing results for "lgn".'
    );
    cy.get("#card-details > #card-collector-details").should(
      "contain.text",
      "Legions"
    );
  });

  it("Search card by all search parameters", () => {
    cy.searchCard("Spell Queller", "Spell Queller", "cardnameSearch");
    cy.searchCard("adam", "Adam Paquette", "artistSearch");
    cy.searchCard("Spirit", "Spirit", "creatureTypeSearch");
    cy.searchCard("pioneer", "Pioneer Challenger Decks 2021", "setSearch");

    cy.get("#searchButton").click();
    cy.get("#seachResultsDescription").should(
      "contain.text",
      'Showing results for "Spell Queller Adam Paquette Spirit q06".'
    );
    cy.get("[id='search-result-list-item']").should("have.lengthOf", 1);
  });

  it("Load more search results", () => {
    cy.searchCard("Evolving Wilds", "Evolving Wilds", "cardnameSearch");
    cy.get("#searchButton").click();
    cy.get("#loadMore").click().should("not.exist");
    cy.get("[id='search-result-list-item']").should("have.lengthOf", 50);
  });

  it("Toggle image view", () => {
    cy.searchCard("Zodiac Dragon", "Zodiac Dragon", "cardnameSearch");
    cy.get("#searchButton").click();
    cy.get("#toggle-list-view").click({ force: true });
    cy.get("#search-result-list-item").should("not.exist");
    cy.get("[id='search-result-image-item']").should("have.lengthOf", 4);
    cy.get("#toggle-list-view").click({ force: true });
    cy.get("#search-result-image-item").should("not.exist");
    cy.get("[id='search-result-list-item']").should("have.lengthOf", 1);
  });

  it("No search results message", () => {
    cy.get(`[name='cardnameSearch']`).type("hgfd");
    cy.get('[name="noSearchResults"]').should("be.visible");
  });

  it("No cards found for query", () => {
    cy.searchCard("Zodiac Dragon", "Zodiac Dragon", "cardnameSearch");
    cy.searchCard("adam", "Adam Paquette", "artistSearch");
    cy.get("#searchButton").click();
    cy.get('[name="noCardsFound"]').should("be.visible");
    cy.get("#search-result-list-item").should("not.exist");
  });

  it("Show cardimage on hover", () => {
    cy.searchCard("Zodiac Dragon", "Zodiac Dragon", "cardnameSearch");
    cy.get("#searchButton").click();
    cy.get("#card-details").trigger("mouseenter");
    cy.get('[name="cardImage"]').should("exist");
  });

  it("Show collected card in list view", () => {
    removeCard("46652ae3-6572-4296-939b-0789923180d5");
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
    cy.searchCard("Zodiac Dragon", "Zodiac Dragon", "cardnameSearch");
    cy.get("#searchButton").click();
    cy.get('[id="en-nonfoil-collected"]')
      .should("have.text", "1")
      .and("have.class", "bg-collected");
  });

  it("Show collected card in image view", () => {
    removeCard("46652ae3-6572-4296-939b-0789923180d5");
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
    cy.searchCard("Zodiac Dragon", "Zodiac Dragon", "cardnameSearch");
    cy.get("#searchButton").click();
    cy.get("#toggle-list-view").click({ force: true });
    cy.get('[id="en-nonfoil-collected"]')
      .should("have.text", "• 1")
      .parent()
      .should("have.class", "bg-collected");
  });
});
