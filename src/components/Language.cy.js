import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import Language from "./Language";

it("Language", () => {
  cy.mount(<Language language="en" />);
  cy.get("p").should("have.text", "EN");
  cy.get("p").should("have.css", "background-color", "rgb(4, 42, 51)");
});
