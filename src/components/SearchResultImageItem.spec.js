import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import { mount } from "@cypress/react";
import { BrowserRouter as Router } from "react-router-dom";
import SearchResultImageItem from "./SearchResultImageItem";
import {
  cardWithEtchedFoilFinish,
  cardWithGlossyFinish,
  defaultCardData,
} from "../testdata/CardData";
import { addCard } from "../scripts/CollectedCards";

it("Search result image item", () => {
  mount(
    <Router>
      <div className="w-72">
        <SearchResultImageItem card={defaultCardData} />
      </div>
    </Router>
  );
  cy.get("img").should("exist").and("be.visible");
  cy.get("#en-nonfoil-collected").should("contain.text", "• 0");
  cy.get("#en-foil-collected").should("contain.text", "✶ 0");
});

it("Search result image item - in collection", () => {
  const card = {
    id: "feefe9f0-24a6-461c-9ef1-86c5a6f33b83",
    name: "Birds of Paradise",
    set: "cn2",
    nr: "176",
    language: "EN",
    finish: "foil",
    quantity: 2,
    condition: "MT",
  };
  addCard(card);
  mount(
    <Router>
      <div className="w-72">
        <SearchResultImageItem card={defaultCardData} />
      </div>
    </Router>
  );
  cy.get("img").should("exist").and("be.visible");
  cy.get("#en-nonfoil-collected").should("contain.text", "• 0");
  cy.get("#nonfoil").should(
    "have.css",
    "background-color",
    "rgba(231, 234, 238, 0.4)"
  );
  cy.get("#en-foil-collected").should("contain.text", "✶ 2");
  cy.get("#foil").should(
    "have.css",
    "background-color",
    "rgba(61, 176, 87, 0.4)"
  );
});

it("Search result image item - card with etched foil finish", () => {
  mount(
    <Router>
      <div className="w-72">
        <SearchResultImageItem card={cardWithEtchedFoilFinish} />
      </div>
    </Router>
  );
  cy.get("img").should("exist").and("be.visible");
  cy.get("#en-nonfoil-collected").should("contain.text", "• 0");
  cy.get("#en-foil-collected").should("contain.text", "✶ 0");
  cy.get("#en-etched-collected").should("contain.text", "E 0");
});

it("Search result image item - card with glossy finish", () => {
  mount(
    <Router>
      <div className="w-72">
        <SearchResultImageItem card={cardWithGlossyFinish} />
      </div>
    </Router>
  );
  cy.get("img").should("exist").and("be.visible");
  cy.get("#en-nonfoil-collected").should("not.exist");
  cy.get("#en-foil-collected").should("not.exist");
  cy.get("#en-glossy-collected").should("contain.text", "G 0");
});
