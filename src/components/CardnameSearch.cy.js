import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import CardnameSearch from "./CardnameSearch";
import "cypress-real-events/support";

it("Cardname Search", () => {
  cy.mount(<CardnameSearch />);
  cy.get("label").should("contain.text", "Search by card name:");
  cy.get("[name='cardnameSearch']").should(
    "have.attr",
    "placeholder",
    "Search cards..."
  );
});

it("Cardname Search - default cardname", () => {
  cy.mount(<CardnameSearch defaultCardnameValue={"Birds of Paradise"} />);
  cy.get("[name='cardnameSearch']").should("have.value", "Birds of Paradise");
});
