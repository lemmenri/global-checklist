import * as React from "react";
import "tailwindcss/tailwind.css";
import { mount } from "@cypress/react";
import Condition from "./Condition";

it("External Link", () => {
  mount(<Condition condition={"nm"} />);
  cy.get("p").contains("NM").should("have.class", "bg-NM");
});
