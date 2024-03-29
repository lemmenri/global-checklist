import * as React from "react";
import "../App.css";
import "tailwindcss/tailwind.css";
import Accordion from "./Accordion";

it("Accordion", () => {
  cy.mount(<Accordion title={<p className="h2">Title</p>}>content</Accordion>);

  cy.get("#accordion-content").should("not.exist");
  cy.get("#accordion-title").click();
  cy.get("#accordion-content").should("be.visible");
});

it("Mount with content opened", () => {
  cy.mount(
    <Accordion title={"Title"} opened={true}>
      content
    </Accordion>
  );

  cy.get("#accordion-content").should("be.visible");
  cy.get("#accordion-title").click();
  cy.get("#accordion-content").should("not.exist");
});

it("Nested Accordions", () => {
  cy.mount(
    <Accordion title={"Parent Accordion"}>
      <Accordion title={"Child Accordion 1"}>content</Accordion>
      <Accordion title={"Child Accordion 2"}>content</Accordion>
    </Accordion>
  );

  cy.get("#accordion-title").click();
  cy.get("#accordion-content").click();
  cy.get("#accordion-content").contains("content").should("be.visible");
});
