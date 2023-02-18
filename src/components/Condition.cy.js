import * as React from "react";
import "../App.css";
import "tailwindcss/tailwind.css";
import Condition from "./Condition";

it("Condition MT", () => {
  cy.mount(<Condition condition={"MT"} />);
  cy.get("p").contains("MT").should("have.class", "bg-MT");
  cy.get("p").should("have.css", "background-color", "rgb(23, 162, 184)");
});

it("Condition NM", () => {
  cy.mount(<Condition condition={"nm"} />);
  cy.get("p").contains("NM").should("have.class", "bg-NM");
  cy.get("p").should("have.css", "background-color", "rgb(61, 176, 87)");
});

it("Invalid Condition", () => {
  cy.mount(<Condition condition={"hoi"} />);
  cy.get("p").contains("HOI").should("have.class", "bg-HOI");
  cy.get("p").should("have.css", "background-color", "rgba(0, 0, 0, 0)");
});

it("No Condition Provided / Default Condition", () => {
  cy.mount(<Condition />);
  cy.get("p").contains("NM").should("have.class", "bg-NM");
  cy.get("p").should("have.css", "background-color", "rgb(61, 176, 87)");
});
