import * as React from "react";
import "tailwindcss/tailwind.css";
import { mount } from "@cypress/react";
import { ExternalLink } from "./ExternalLink";

it("External Link", () => {
  mount(
    <ExternalLink
      href="https://scryfall.com/card/sld/176/birds-of-paradise?utm_source=api"
      externalParty="Scryfall"
      imageLocation={"https://assets.scryfall.com/favicon.ico"}
    />
  );
  cy.get("a").contains("Open on Scryfall");
});
