import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import { mount } from "@cypress/react";
import { BrowserRouter as Router } from "react-router-dom";
import SearchResults from "./SearchResults";
import { searchResultsData } from "../testdata/SearchResultsData";
import { groupedCardData } from "../testdata/GroupedCardData";
import { addCard } from "../scripts/CollectedCards";

it("Search Results", () => {
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
      <SearchResults
        searchResults={searchResultsData}
        groupedCards={groupedCardData}
      />
    </Router>
  );
  cy.get("#search-results").children().should("have.length", 1);
  cy.get("#search-result-list-item").should("exist");
  cy.get("#search-result-image-item").should("not.exist");
  cy.get("#container-toggle-list-view > span").click();
  cy.get("#search-results").children().should("have.length", 19);
  cy.get("#search-result-list-item").should("not.exist");
  cy.get("#search-result-image-item").should("exist");
  cy.get("#container-toggle-filter-collected > span").click();
  cy.get("#search-results").children().should("have.length", 1);
});
