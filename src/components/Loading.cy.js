import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import { Loading } from "./Loading";

it("Loading", () => {
  cy.mount(<Loading />);
  cy.get("#loading > svg").should("be.visible");
  cy.get("#loading > p").should("contain.text", "Loading...");
});
