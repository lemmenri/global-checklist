import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import TextListBox from "./ListBox";
import { conditions } from "../enums/conditions";
import "cypress-real-events/support";

it("Listbox", () => {
  cy.mount(
    <div className="flex items-center">
      <TextListBox
        id="condition"
        values={conditions}
        label="Condition"
        onChange={() => { }}
      />
    </div>
  );
  cy.get("label").should("have.text", "Condition:");
  cy.get("#condition-listbox > button > span > p").should(
    "have.text",
    conditions[0].value
  );
  cy.get("#condition-listbox > ul").should("not.exist");
  cy.get("#condition-listbox > button").realClick();
  cy.get("#condition-listbox > ul").should("exist");
  cy.get("#condition-listbox > ul").find("#condition-label-GD").click();
  cy.get("#condition-listbox > ul").should("not.exist");
  cy.get("#condition-listbox > button > span > p").should("have.text", "GD");
});

it("Listbox - Load with default value selected", () => {
  cy.mount(
    <div className="flex items-center">
      <TextListBox
        id="condition"
        values={conditions}
        label="Condition"
        onChange={() => { }}
        defaultValue={1}
      />
    </div>
  );
  cy.get("#condition-listbox > button > span > p").should(
    "have.text",
    conditions[1].value
  );
});
