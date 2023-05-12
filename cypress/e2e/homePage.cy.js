/// <reference types="cypress" />

describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays all elements on the homepage", () => {
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/");
    });
    cy.get('#header')
      .should("exist")
      .and("be.visible");
    cy.get('footer')
      .should("exist")
      .and("be.visible");
    cy.get("h1")
      .should("contain.text", "Welcome to MTG Library");
    cy.get('#cardnameSearch')
      .should("exist")
      .and("be.visible");
    cy.get('#actions')
      .should("exist")
      .and("be.visible")
      .children().should('have.length', 3)
  });

  it("displays the search page with the selected card when searching a card", () => {
    cy.intercept('*/catalog/card-names*', { fixture: 'cardnames.json' }).as('getCardNames')

    cy.get("h1").should("contain.text", "Welcome to MTG Library");
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/");
    });
    cy.searchCard("Birds of Paradise", "Birds of Paradise", "cardnameSearch");
    cy.get("#searchButton").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/search");
    });
    cy.get("[name='cardnameSearch']")
      .should("have.value", "Birds of Paradise");
    cy.get("#seachResultsDescription")
      .should(
        "contain.text",
        'Showing results for "Birds of Paradise".'
      );
  });

  it("displays the search page when clicking Advanced Search", () => {
    cy.get("h1").should("contain.text", "Welcome to MTG Library");
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/");
    });
    cy.get('#goToAdvancedSearchButton').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/search");
    });
    cy.get("h1").should("contain.text", "Search");
  });

  it("displays the sets page when clicking Sets", () => {
    cy.get("h1").should("contain.text", "Welcome to MTG Library");
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/");
    });
    cy.get('#goToSetsButton').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/sets");
    });
    cy.get("h1").should("contain.text", "Sets");
  });

  it("displays the import/export page when clicking Import/Export", () => {
    cy.get("h1").should("contain.text", "Welcome to MTG Library");
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/");
    });
    cy.get('#goToImportExport').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/import-export");
    });
    cy.get("h1").should("contain.text", "Import and Export");

  });
});