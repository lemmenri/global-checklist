import * as React from "react";
import "tailwindcss/tailwind.css";
import { mount } from "@cypress/react";
import Language from "./Language";

it("Language", () => {
  mount(<Language language="en" />);
  cy.get("p").should("have.text", "EN");
  cy.get("p").should("have.css", "background-color", "rgb(4, 42, 51)");
});
