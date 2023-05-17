import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import TextListBox from "./ListBox";
import { conditions } from "../enums/conditions";
import "cypress-real-events/support";

it("displays the selected value", () => {
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

it("displays with default value selected", () => {
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

it("displays no dropdown option when only 1 finish is provided", () => {
  cy.mount(
    <div className="flex items-center">
      <TextListBox
        id="finish"
        values={[
          { id: 3, name: "E", value: "etched" },
        ]}
        label="Finish"
        onChange={() => { }}
      />
    </div>
  );
  cy.get("label")
    .should("have.text", "Finish:");
  cy.get('#finish')
    .should("have.text", "E");
  cy.get("#condition-listbox > button")
    .should("not.exist");

});

it("displays no dropdown option when only 1 language is provided", () => {
  cy.mount(
    <div className="flex items-center">
      <TextListBox
        id="language"
        values={[
          { id: 1, name: "en", value: "English", type: "language" },
        ]}
        label="Language"
        onChange={() => { }}
      />
    </div>
  );
  cy.get("label")
    .should("have.text", "Language:");
  cy.get('#language-label-en')
    .should("have.text", "EN");
  cy.get("#condition-listbox > button")
    .should("not.exist");

});
