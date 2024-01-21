import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import CollectedList from "./CollectedList";
import { collectedCardData } from "../testdata/CollectedCardsData";
import { BrowserRouter as Router } from "react-router-dom";

it("Collected List", () => {
  cy.mount(
    <Router>
      <CollectedList collected={collectedCardData} />
    </Router>
  );
  cy.get("#collected-list-header").should("contain.text", "Collected");
  cy.get("#collected-list > #collected-list-item").should("have.length", 3);
});

it("Collected List - Empty list", () => {
  cy.mount(
    <Router>
      <CollectedList collected={[]} />
    </Router>
  );
  cy.get("#collected-list-header").should("contain.text", "Collected");
  cy.get("#no-copies-listed").should("contain.text", "No copies in collection.");
});
