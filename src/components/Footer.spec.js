import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import { mount } from "@cypress/react";
import Footer from "./Footer";

it("Footer", () => {
  mount(<Footer />);
  cy.get("footer")
    .should("exist")
    .and("have.css", "background-color", "rgb(6, 116, 107)");
  cy.get("footer > p").should("exist");
});
