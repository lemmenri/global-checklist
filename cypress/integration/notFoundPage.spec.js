/// <reference types="cypress" />

describe("Not found page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fjkdlsfjdkl");
  });

  it("Redirect to not found page", () => {
    cy.get("h1").should("contain.text", "404");
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/fjkdlsfjdkl");
    });
  });

  it("Go back to home page", () => {
    cy.get("#goHomeButton").click();
    cy.get("h1").should("contain.text", "Welcome to MTG Library!");
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/");
    });
  });
});
