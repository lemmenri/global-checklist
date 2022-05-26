import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import { mount } from "@cypress/react";
import "cypress-real-events/support";
import CreatureTypeSearch from "./CreatureTypeSearch";

it("Creature Type Search", () => {
  mount(<CreatureTypeSearch />);
  cy.get("label").should("contain.text", "Search by creature type:");
  cy.get("[name='creatureTypeSearch']").should(
    "have.attr",
    "placeholder",
    "Search creature type..."
  );
});

it("Creature Type Search - default creature type", () => {
  mount(<CreatureTypeSearch defaultCreatureTypeValue={"Bird"} />);
  cy.get("[name='creatureTypeSearch']").should("have.value", "Bird");
});
