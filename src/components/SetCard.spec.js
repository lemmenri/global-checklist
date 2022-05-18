import * as React from "react";
import "tailwindcss/tailwind.css";
import { mount } from "@cypress/react";
import SetCard from "./SetCard";
import "cypress-real-events/support";
import { BrowserRouter as Router } from "react-router-dom";
import { addCard } from "../scripts/CollectedCards";

const exampleSetData = {
  object: "set",
  id: "a4a0db50-8826-4e73-833c-3fd934375f96",
  code: "aer",
  mtgo_code: "aer",
  arena_code: "aer",
  tcgplayer_id: 1857,
  name: "Aether Revolt",
  uri: "https://api.scryfall.com/sets/a4a0db50-8826-4e73-833c-3fd934375f96",
  scryfall_uri: "https://scryfall.com/sets/aer",
  search_uri:
    "https://api.scryfall.com/cards/search?order=set\u0026q=e%3Aaer\u0026unique=prints",
  released_at: "2017-01-20",
  set_type: "expansion",
  card_count: 194,
  printed_size: 184,
  digital: false,
  nonfoil_only: false,
  foil_only: false,
  block_code: "kld",
  block: "Kaladesh",
  icon_svg_uri:
    "https://c2.scryfall.com/file/scryfall-symbols/sets/aer.svg?1652673600",
};

const exampleSmallSetData = {
  object: "set",
  id: "c77cb8ee-8c7c-4177-af59-53d591150bef",
  code: "pdrc",
  name: "Dragon Con",
  uri: "https://api.scryfall.com/sets/c77cb8ee-8c7c-4177-af59-53d591150bef",
  scryfall_uri: "https://scryfall.com/sets/pdrc",
  search_uri:
    "https://api.scryfall.com/cards/search?order=set\u0026q=e%3Apdrc\u0026unique=prints",
  released_at: "1994-07-15",
  set_type: "promo",
  card_count: 1,
  digital: false,
  nonfoil_only: true,
  foil_only: false,
  icon_svg_uri:
    "https://c2.scryfall.com/file/scryfall-symbols/sets/pdrc.svg?1652673600",
};

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
