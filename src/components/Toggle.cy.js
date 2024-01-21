import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import Toggle from "./Toggle";

it("can be toggled", () => {
  let toggle = true;

  const label = "Toggle";

  cy.mount(
    <Toggle
      name={"toggle"}
      label={label}
      onToggle={() => {
        toggle = !toggle;
      }}
    />
  );

  cy.get("label").should("have.text", label);
  cy.get('#toggle').should('have.attr', 'data-headlessui-state', '')
  cy.get('#toggle').click();
  cy.get('#toggle').should('have.attr', 'data-headlessui-state', 'checked')
});

it("can be set default checked", () => {
  let toggle = true;

  const label = "Toggle";

  cy.mount(
    <Toggle
      name={"toggle"}
      label={label}
      onToggle={() => {
        toggle = !toggle;
      }}
      checked={true}
    />
  );

  cy.get("label").should("have.text", label);
  cy.get('#toggle').should('have.attr', 'data-headlessui-state', 'checked')
  cy.get('#toggle').click();
  cy.get('#toggle').should('have.attr', 'data-headlessui-state', '')
});
