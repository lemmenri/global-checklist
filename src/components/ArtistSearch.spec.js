import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import { mount } from "@cypress/react";
import "cypress-real-events/support";
import ArtistSearch from "./ArtistSearch";

it("Artist Search", () => {
  mount(<ArtistSearch />);
  cy.get("label").should("contain.text", "Search by artist:");
  cy.get("[name='artistSearch']").should(
    "have.attr",
    "placeholder",
    "Search artists..."
  );
});

it("Artist Search - default artist", () => {
  mount(<ArtistSearch defaultArtistValue={"John Avon"} />);
  cy.get("[name='artistSearch']").should("have.value", "John Avon");
});
