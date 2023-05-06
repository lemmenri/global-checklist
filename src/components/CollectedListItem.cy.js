import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import CollectedListItem from "./CollectedListItem";
import "cypress-real-events/support";

const collectedCardData = {
  id: "716c415e-5eb8-4644-ac64-5ba7c3f0ea65",
  finish: "etched",
  quantity: 3,
  condition: "NM",
  language: "EN",
};

it("Loading", () => {
  cy.mount(
    <CollectedListItem
      id={collectedCardData.id}
      finish={collectedCardData.finish}
      quantity={collectedCardData.quantity}
      condition={collectedCardData.condition}
      language={collectedCardData.language}
      handleDeleteCard={() => { }}
    />
  );
  cy.get("#finish").should("have.text", "E");
  cy.get("#quantity").should("have.text", "3x");
  cy.get("#condition").should("have.text", "NM");
  cy.get("#language").should("have.text", "EN");
  cy.get("editContainer").should("not.exist");
  cy.get("#edit > button").realClick();
  cy.get("#editContainer").should("exist").and("be.visible");
  cy.get("#save > button").realClick();
  cy.get("#editContainer").should("not.exist");
  cy.get("#edit > button").realClick();
  cy.get("#editContainer").should("exist").and("be.visible");
  cy.get("#delete > button").realClick();
  cy.get("#editContainer").should("not.exist");
});
