import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import { mount } from "@cypress/react";
import SimpleToggle from "./Toggle";

it("SimpleToggle", () => {
  let toggle = true;

  const label = "Toggle";

  mount(
    <SimpleToggle
      name={"toggle"}
      label={label}
      onToggle={() => {
        toggle = !toggle;
      }}
    />
  );

  cy.get("label").should("have.text", label);
  cy.get("span").click();
});
