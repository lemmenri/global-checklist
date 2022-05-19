import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import { mount } from "@cypress/react";
import { ExternalLink } from "./ExternalLink";
import "cypress-real-events/support";

it("External Link", () => {
  mount(
    <ExternalLink
      href="https://scryfall.com/card/sld/176/birds-of-paradise?utm_source=api"
      externalParty="Scryfall"
      imageLocation={"https://assets.scryfall.com/favicon.ico"}
    />
  );
  cy.get("a").contains("Open on Scryfall").and("have.attr", "href");
  cy.get("a > img").should("have.attr", "src");
  cy.get("a > img").should("have.attr", "alt");
  cy.get("a")
    .should("have.css", "text-decoration-line", "none")
    .realHover()
    .should("have.css", "text-decoration-line", "underline");
});
