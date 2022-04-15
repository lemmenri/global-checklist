/// <reference types="cypress" />

describe("Searching cards", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/search");
  });

  it("Navigate to search page", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").should("contain.text", "Welcome to MTG Library!");
    cy.get("[id='header']").within(() => {
      cy.get("[id='search']").click();
    });
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/search");
    });
  });

  it("Search card by cardname", () => {
    cy.get("[name='cardnameSearch']").type("Bird");
    cy.get("[name='Birds of Paradise']").click();
    cy.get("[name='cardnameSearch']").should("have.value", "Birds of Paradise");
    cy.get("[id='searchButton']").click();
    cy.get("[id='seachResultsDescription']").should(
      "contain.text",
      'Showing results for "Birds of Paradise".'
    );
  });

  it("Search card by artist", () => {
    cy.get("[name='artistSearch']").type("john");
    cy.get("[name='John Avon']").click();
    cy.get("[name='artistSearch']").should("have.value", "John Avon");
    cy.get("[id='searchButton']").click();
    cy.get("[id='seachResultsDescription']").should(
      "contain.text",
      'Showing results for "".'
    );
  });

  it("Search card by creature type", () => {
    cy.get("[name='creatureTypeSearch']").type("Sliv");
    cy.get("[name='Sliver']").click();
    cy.get("[name='creatureTypeSearch']").should("have.value", "Sliver");
    cy.get("[id='searchButton']").click();
    cy.get("[id='seachResultsDescription']").should(
      "contain.text",
      'Showing results for "".'
    );
  });

  it("Search card by set", () => {
    cy.get("[name='setSearch']").type("legions");
    cy.get("[name='Legions']").click();
    cy.get("[name='setSearch']").should("have.value", "Legions");
    cy.get("[id='searchButton']").click();
    cy.get("[id='seachResultsDescription']").should(
      "contain.text",
      'Showing results for "".'
    );
  });

  //TODO
  // it("Search card by all search parameters", () => {
  //   cy.get("[name='setSearch']").type("legions");
  //   cy.get("[name='Legions']").click();
  //   cy.get("[name='setSearch']").should("have.value", "Legions");
  //   cy.get("[id='searchButton']").click();
  //   cy.get("[id='seachResultsDescription']").should(
  //     "contain.text",
  //     'Showing results for "".'
  //   );
  // });

  it("Load more search results", () => {
    cy.get("[name='cardnameSearch']").type("Evolving Wilds");
    cy.get("[id='searchButton']").click();
    cy.get("[id='seachResultsDescription']").should(
      "contain.text",
      'Showing results for "Evolving Wilds".'
    );
    cy.get("[id='loadMore']").click().should("not.exist");
    cy.get("[id='search-result-list-item']").should("have.lengthOf", 42);
  });

  // TODO
  // it("Toggle image view", () => {
  //   cy.get("[name='cardnameSearch']").type("Evolving Wilds");
  //   cy.get("[id='searchButton']").click();
  //   cy.get("[id='seachResultsDescription']").should(
  //     "contain.text",
  //     'Showing results for "Evolving Wilds".'
  //   );
  //   cy.get("[id='loadMore']").click().should("not.exist");
  //   cy.get("[id='search-result-list-item']").should("have.lengthOf", 42);
  // });

  // no search results message

  // image on hover

  // the collored fields when a card is in collection (2x)
});
