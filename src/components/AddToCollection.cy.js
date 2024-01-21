/* eslint-disable jest/valid-expect */
import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import AddToCollection from "./AddToCollection";
import { convertLanguageData } from "../scripts/ScryfallQueries";
import { defaultCardData } from "../testdata/CardData";
import { defaultOtherLanguagesList } from "../testdata/OtherLanguagesList";
import { BrowserRouter as Router } from "react-router-dom";

it("Add to Collection", () => {
  cy.mount(
    <Router>
      <AddToCollection
        card={defaultCardData}
        languages={convertLanguageData(defaultOtherLanguagesList)}
        handleAddCard={() => { }}
      />
    </Router>
  );

  cy.get("#finish-listbox").click();
  cy.get("#finish-listbox > ul > li > span").contains("✶").click();
  cy.get("#finish-listbox > ul").should("not.exist");
  cy.get("#finish-listbox > button > span > p").should("contain.text", "✶");

  cy.get("#quantity").clear().type("3");
  cy.get("#quantity").should("contain.value", "3");

  cy.get("#condition-listbox").click();
  cy.get("#condition-listbox > ul > li > span > p").contains("GD").click();
  cy.get("#condition-listbox > ul").should("not.exist");
  cy.get("#condition-listbox > button > span > p").should("contain.text", "GD");

  cy.get("#language-listbox").click();
  cy.get("#language-listbox > ul > li > span > p").contains("ZHS").click();
  cy.get("#language-listbox > ul").should("not.exist");
  cy.get("#language-listbox > button > span > p").should("contain.text", "ZHS");

  cy.get("#add > button").click();
});

it("Default Values", () => {
  cy.mount(
    <Router>
      <AddToCollection
        card={defaultCardData}
        languages={convertLanguageData(defaultOtherLanguagesList)}
      />
    </Router>
  );

  cy.get("#finish-listbox > button > span > p").should("contain.text", "•");
  cy.get("#quantity").should("contain.value", "1");
  cy.get("#condition-listbox > button > span > p").should("contain.text", "NM");
  cy.get("#language-listbox > button > span > p").should("contain.text", "EN");
});
