import * as React from "react";
import "tailwindcss/tailwind.css";
import { mount } from "@cypress/react";
import { Loading } from "./Loading";

it("Loading", () => {
  mount(<Loading />);
  cy.get("#loading > svg").should("be.visible");
  cy.get("#loading > p").should("contain.text", "Loading...");
});
