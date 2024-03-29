import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import "cypress-real-events/support";
import SetSearch from "./SetSearch";

it("Set Search", () => {
  cy.mount(<SetSearch />);
  cy.get("label").should("contain.text", "Search by set:");
  cy.get("[name='setSearch']").should(
    "have.attr",
    "placeholder",
    "Search sets..."
  );
});

it("Set Search - default set", () => {
  cy.mount(<SetSearch defaultSetValue={"dom"} />);
  cy.get("[name='setSearch']").should("have.value", "Dominaria");
});
