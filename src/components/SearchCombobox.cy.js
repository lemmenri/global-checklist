import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import SearchCombobox from "./SearchCombobox";
import { cardNames } from "../testdata/CardnameData";
import "cypress-real-events/support";

const placeholderText = "Search cards...";
const idText = "cardnameSearch";

it("displays the Search Combobox", () => {
  cy.mount(
    <SearchCombobox
      itemList={cardNames}
      id={idText}
      placeholder={placeholderText}
    />
  );
  cy.get(`[name='${idText}']`).should(
    "have.attr",
    "placeholder",
    "Search cards..."
  );
  cy.get("input").should("have.value", "");
  cy.get(`[name='${idText}']`).type("akiri");
  cy.get("ul").find("li").should("have.length", 2);
  cy.get("ul > li[name='Akiri, Line-Slinger']")
    .realHover()
    .should("have.css", "background-color", "rgba(0, 0, 0, 0)");
  cy.get("ul > li[name='Akiri, Line-Slinger']").realClick();
  cy.get("input").should("have.value", "Akiri, Line-Slinger");
  cy.get("ul").should("not.exist");
  cy.get('#searchButton')
    .should('not.exist')
});

it("displays one result correctly", () => {
  cy.mount(
    <SearchCombobox
      itemList={cardNames}
      id={idText}
      placeholder={placeholderText}
    />
  );
  cy.get(`[name='${idText}']`).type("Arid");
  cy.get("ul").find("li").should("have.length", 1);
});

it("displays multiple search results correctly", () => {
  cy.mount(
    <SearchCombobox
      itemList={cardNames}
      id={idText}
      placeholder={placeholderText}
    />
  );
  cy.get(`[name='${idText}']`).type("Ari");
  cy.get("ul").find("li").should("have.length", 15);
  cy.get(':nth-child(8)')
    .should('be.visible')
  cy.get(':nth-child(9)')
    .should('not.be.visible')
});

it("displays message on no results", () => {
  cy.mount(
    <SearchCombobox
      itemList={cardNames}
      id={idText}
      placeholder={placeholderText}
    />
  );
  cy.get(`[name='${idText}']`).type("Ariba");
  cy.get("[name='noSearchResults']").should("have.text", "No results found.");
});

it("displays default value when provided", () => {
  cy.mount(
    <SearchCombobox
      itemList={cardNames}
      id={idText}
      placeholder={placeholderText}
      defaultValue={"Arid Mesa"}
    />
  );
  cy.get(`[name='${idText}']`).should("contain.value", "Arid Mesa");
});

it("displays searchcomponent with search button correctly", () => {
  cy.mount(
    <SearchCombobox
      itemList={cardNames}
      id={idText}
      placeholder={placeholderText}
      withSearchButton={true}
    />
  );
  cy.get(`[name='${idText}']`).type("Arid");
  cy.get("ul").find("li").should("have.length", 1);
  cy.get('#searchButton')
    .should('be.visible')
});