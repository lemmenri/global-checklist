import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import { mount } from "@cypress/react";
import SetCard from "./SetCard";
import "cypress-real-events/support";
import { BrowserRouter as Router } from "react-router-dom";
import { addCard } from "../scripts/CollectedCards";
import { exampleSetData, exampleSmallSetData } from "../testdata/SetData";

// Attach the CDN link for the keyrun icons to document
const linkElem = document.createElement("link");
linkElem.setAttribute("rel", "stylesheet");
linkElem.setAttribute("type", "text/css");
linkElem.setAttribute(
  "href",
  "https://cdn.jsdelivr.net/npm/keyrune@latest/css/keyrune.css"
);
if (document.head) {
  document.head.appendChild(linkElem);
}

it("SetCard Empty", () => {
  mount(
    <Router>
      <SetCard set={exampleSetData} />
    </Router>
  );
  cy.get("i").should("be.visible");
  cy.get("a").should("contain.text", exampleSetData.name);
  cy.get("a").should(
    "have.attr",
    "href",
    `/search/?set=${exampleSetData.code}`
  );
  cy.get("a")
    .should("have.css", "text-decoration-line", "none")
    .realHover()
    .should("have.css", "text-decoration-line", "underline");
  cy.get("#setCard-text-collected").should(
    "contain.text",
    `0/${exampleSetData.card_count} (0 total cards collected)`
  );
  cy.get("#percentagebar > p").should(
    "contain.text",
    `0% - 0/${exampleSmallSetData.card_count}`
  );
});

it("SetCard With Some Cards", () => {
  addCard({
    id: "9d71efa6-5de8-476f-86ce-0790956e574f",
    name: "Tezzeret's Betrayal",
    set: "aer",
    nr: "191",
    language: "EN",
    finish: "nonfoil",
    quantity: 3,
    condition: "MT",
  });
  mount(
    <Router>
      <SetCard set={exampleSetData} />
    </Router>
  );
  cy.get("#setCard-text-collected").should(
    "contain.text",
    `1/${exampleSetData.card_count} (3 total cards collected)`
  );
  cy.get("#percentagebar > p").should(
    "contain.text",
    `1% - 1/${exampleSmallSetData.card_count}`
  );
});

it("SetCard 100% Completed", () => {
  addCard({
    id: "7f9c6be5-ec44-4c66-aad6-cf9eca765b6b",
    name: "Nalathni Dragon",
    set: "pdrc",
    nr: "1",
    language: "EN",
    finish: "nonfoil",
    quantity: 1,
    condition: "EX",
  });
  mount(
    <Router>
      <SetCard set={exampleSmallSetData} />
    </Router>
  );
  cy.get("#setCard-text-collected").should(
    "contain.text",
    `1/${exampleSmallSetData.card_count} (1 total cards collected)`
  );
  cy.get("#percentagebar > p").should(
    "contain.text",
    `100% - ${exampleSmallSetData.card_count}/${exampleSmallSetData.card_count}`
  );
});
