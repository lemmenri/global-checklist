import * as React from "react";
import "../App.css";
import "tailwindcss/tailwind.css";
import { mount } from "@cypress/react";
import SearchResultListItem from "./SearchResultListItem";
import { BrowserRouter as Router } from "react-router-dom";
import {
  groupedCardData,
  groupedCardDataNoFoil,
  groupedCardDataEtchedFoil,
} from "../testdata/GroupedCardData";
import { addCard } from "../scripts/CollectedCards";
import "cypress-real-events/support";

it("Search Result List Item", () => {
  const card = {
    id: "feefe9f0-24a6-461c-9ef1-86c5a6f33b83",
    name: "Birds of Paradise",
    set: "cn2",
    nr: "176",
    language: "EN",
    finish: "foil",
    quantity: 1,
    condition: "MT",
  };
  addCard(card);

  mount(
    <Router>
      <SearchResultListItem group={groupedCardData[0]} />
    </Router>
  );
  cy.get("#card-name").should("contain.text", card.name);
  cy.get("#card-collector-details").should(
    "contain.text",
    "Conspiracy: Take the Crown - #176 - rare"
  );
  cy.get("#printings").find("div#languages").should("have.length", 3);
  cy.get("#en-nonfoil-collected")
    .should("have.css", "background-color", "rgba(0, 0, 0, 0)")
    .and("have.text", "0");
  cy.get("#en-foil-collected")
    .should("have.css", "background-color", "rgb(61, 176, 87)")
    .and("have.text", card.quantity);
  cy.get("#prices").find("div#eur").should("exist");
  cy.get("#prices").find("div#usd").should("exist");
  cy.get("#card-details").realHover();
  cy.get("[data-id='tooltip'] > div > img").should("exist");
});

// etched foil

// no english

// no nonfoil

it("Etched foil", () => {
  const card = {
    id: "716c415e-5eb8-4644-ac64-5ba7c3f0ea65",
    name: "Arid Mesa",
    set: "mh2",
    nr: "436",
    language: "EN",
    finish: "etched",
    quantity: 2,
    condition: "NM",
  };
  addCard(card);

  mount(
    <Router>
      <SearchResultListItem group={groupedCardDataEtchedFoil[0]} />
    </Router>
  );
  cy.get("#card-name").should("contain.text", card.name);
  cy.get("#card-collector-details").should(
    "contain.text",
    "Modern Horizons 2 - #436 - rare"
  );
  cy.get("#printings").find("div#languages").should("have.length", 11);
  cy.get("#en-nonfoil-collected")
    .should("have.css", "background-color", "rgba(0, 0, 0, 0)")
    .and("have.text", "0");
  cy.get("#en-etched-collected")
    .should("have.css", "background-color", "rgb(61, 176, 87)")
    .and("have.text", card.quantity);
  cy.get("#prices").find("div#eur").should("exist");
  cy.get("#prices").find("div#usd").should("exist");
  cy.get("#card-details").realHover();
  cy.get("[data-id='tooltip'] > div > img").should("exist");
});

it("No English and no nonfoil", () => {
  const card = {
    id: "ed2e3b59-ddbe-4e82-ad67-dd21302a31cb",
    name: "Serra Angel",
    set: "pdom",
    nr: "33c",
    language: "JA",
    finish: "foil",
    quantity: 4,
    condition: "EX",
  };
  addCard(card);

  mount(
    <Router>
      <SearchResultListItem group={groupedCardDataNoFoil[0]} />
    </Router>
  );
  cy.get("#card-name").should("contain.text", card.name);
  cy.get("#card-collector-details").should(
    "contain.text",
    "Dominaria Promos - #33c - uncommon"
  );
  cy.get("#printings").find("div#languages").should("have.length", 1);
  cy.get("#ja-foil-collected")
    .should("have.css", "background-color", "rgb(61, 176, 87)")
    .and("have.text", card.quantity);
  cy.get("#prices").find("div#eur").should("exist");
  cy.get("#prices").find("div#usd").should("exist");
  cy.get("#card-details").realHover();
  cy.get("[data-id='tooltip'] > div > img").should("exist");
});
