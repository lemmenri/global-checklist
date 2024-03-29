import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";

it("Header", () => {
  cy.mount(
    <Router>
      <Header />
    </Router>
  );
  cy.get("header")
    .should("exist")
    .and("have.css", "background-color", "rgb(6, 116, 107)");
  cy.get("#title").should("have.text", "MTG Library")
  cy.get("#home").should("have.attr", "href", "/");
  cy.get("#navLinks").find("a").should("have.length", 3);
  cy.get("#navLinks > #collection")
    .should("have.text", "Collection")
    .and("have.attr", "href", "/collection");
  cy.get("#navLinks > #sets")
    .should("have.text", "Sets")
    .and("have.attr", "href", "/sets");
  cy.get("#navLinks > #search")
    .should("have.text", "Search")
    .and("have.attr", "href", "/search");
});
