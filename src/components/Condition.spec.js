import * as React from "react";
import "../App.css";
import "tailwindcss/tailwind.css";
import { mount } from "@cypress/react";
import Condition from "./Condition";

it("Condition MT", () => {
  mount(<Condition condition={"MT"} />);
  cy.get("p").contains("MT").should("have.class", "bg-MT");
  cy.get("p").should("have.css", "background-color", "rgb(23, 162, 184)");
});

it("Condition NM", () => {
  mount(<Condition condition={"nm"} />);
  cy.get("p").contains("NM").should("have.class", "bg-NM");
  cy.get("p").should("have.css", "background-color", "rgb(61, 176, 87)");
});

it("Invalid Condition", () => {
  mount(<Condition condition={"hoi"} />);
  cy.get("p").contains("HOI").should("have.class", "bg-HOI");
  cy.get("p").should("have.css", "background-color", "rgba(0, 0, 0, 0)");
});

it("No Condition Provided / Default Condition", () => {
  mount(<Condition />);
  cy.get("p").contains("NM").should("have.class", "bg-NM");
  cy.get("p").should("have.css", "background-color", "rgb(61, 176, 87)");
});
