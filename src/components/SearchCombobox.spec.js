import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import { mount } from "@cypress/react";
import SearchCombobox from "./SearchCombobox";
import { cardNames } from "../testdata/CardnameData";
import "cypress-real-events/support";

const placeholderText = "Search cards...";
const idText = "cardnameSearch";

it("Search Combobox", () => {
  mount(
    <SearchCombobox
      itemList={cardNames}
      id={idText}
      placeholder={placeholderText}
    />
  );
  cy.get(`[name='${idText}']`).type("akiri");
  cy.get("ul").find("li").should("have.length", 2);
  cy.get("ul > li[name='Akiri, Line-Slinger']")
    .realHover()
    .should("have.css", "background-color", "rgba(0, 0, 0, 0)");
  cy.get("ul > li[name='Akiri, Line-Slinger']").realClick();
  cy.get("input").should("have.value", "Akiri, Line-Slinger");
  cy.get("ul").should("not.exist");
});

it("Search Combobox - one result", () => {
  mount(
    <SearchCombobox
      itemList={cardNames}
      id={idText}
      placeholder={placeholderText}
    />
  );
  cy.get(`[name='${idText}']`).type("Arid");
  cy.get("ul").find("li").should("have.length", 1);
});

it("Search Combobox - more than 5 results", () => {
  mount(
    <SearchCombobox
      itemList={cardNames}
      id={idText}
      placeholder={placeholderText}
    />
  );
  cy.get(`[name='${idText}']`).type("Ari");
  cy.get("ul").find("li").should("have.length", 5);
});

it("Search Combobox - no results", () => {
  mount(
    <SearchCombobox
      itemList={cardNames}
      id={idText}
      placeholder={placeholderText}
    />
  );
  cy.get(`[name='${idText}']`).type("Ariba");
  cy.get("[name='noSearchResults']").should("have.text", "No results found.");
});
