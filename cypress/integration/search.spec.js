/// <reference types="cypress" />

describe("Searching cards", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/search");
  });

  it("Navigate to search page", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").should("contain.text", "Welcome to MTG Library!");
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
      'Showing results for "".'
    );
  });

  it("Search card by creature type", () => {
    cy.searchCard("Sliv", "Sliver", "creatureTypeSearch");
    cy.get("#searchButton").click();
    cy.get("#seachResultsDescription").should(
      "contain.text",
      'Showing results for "".'
    );
  });

  it("Search card by set", () => {
    cy.searchCard("legions", "Legions", "setSearch");
    cy.get("#searchButton").click();
    cy.get("#seachResultsDescription").should(
      "contain.text",
      'Showing results for "".'
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
      'Showing results for "Spell Queller".'
    );
    cy.get("[id='search-result-list-item']").should("have.lengthOf", 1);
  });

  it("Load more search results", () => {
    cy.searchCard("Evolving Wilds", "Evolving Wilds", "cardnameSearch");
    cy.get("#searchButton").click();
    cy.get("#loadMore").click().should("not.exist");
    cy.get("[id='search-result-list-item']").should("have.lengthOf", 42);
  });

  it("Toggle image view", () => {
    cy.searchCard("Zodiac Dragon", "Zodiac Dragon", "cardnameSearch");
    cy.get("#searchButton").click();
    cy.get("#toggle-list-view").click();
    cy.get("#search-result-list-item").should("not.exist");
  });

  // no search results message
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

  // image on hover
  it("Show cardimage on hover", () => {
    cy.searchCard("Zodiac Dragon", "Zodiac Dragon", "cardnameSearch");
    cy.get("#searchButton").click();
    cy.get("#card-details").trigger("mouseenter");
    cy.get('[name="cardImage"]').should("be.visible");
  });

  // the collored fields when a card is in collection (2x)
});
