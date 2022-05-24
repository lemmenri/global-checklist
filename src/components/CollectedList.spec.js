import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import { mount } from "@cypress/react";
import CollectedList from "./CollectedList";
import { collectedCardData } from "../testdata/CollectedCardsData";

it("Collected List", () => {
  mount(<CollectedList collected={collectedCardData} />);
  cy.get("#collected-list-header").should("contain.text", "Collected");
  cy.get("#collected-list > #collected-list-item").should("have.length", 3);
});
