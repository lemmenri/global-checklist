/// <reference types="cypress" />

describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Navigate to home page", () => {
    cy.get("h1").should("contain.text", "Welcome to MTG Library!");
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/");
    });
  });
});
