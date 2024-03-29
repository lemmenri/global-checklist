import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import Language from "./Language";
import { BrowserRouter as Router } from "react-router-dom";

it("displays language label", () => {
  cy.mount(
    <Router>
      <Language language="en" />
    </Router>
  );
  cy.get('#language-label-en').should("have.text", "EN");
  cy.get('#language-label-en').should("have.css", "background-color", "rgb(4, 42, 51)");
});

it('displays image on hover', () => {
  cy.mount(
    <Router>
      <Language language={"zhs"} imageOnHover={"https://cards.scryfall.io/normal/front/6/a/6af5e30b-a23c-4b37-8702-fff80982c653.jpg?1562613047"} />
    </Router>
  );
  cy.get('#language-label-zhs')
    .trigger('mouseover')
  cy.get('img')
    .should('exist')
    .and('be.visible')
})

it('hides image on mouseout', () => {
  cy.mount(
    <Router>
      <Language language={"zhs"} imageOnHover={"https://cards.scryfall.io/normal/front/6/a/6af5e30b-a23c-4b37-8702-fff80982c653.jpg?1562613047"} />
    </Router>
  );
  cy.get('#language-label-zhs')
    .trigger('mouseover')
  cy.get('img')
    .should('exist')
    .and('be.visible')
  cy.get('#language-label-zhs')
    .trigger('mouseout', { force: true })
  cy.get('img')
    .should('not.be.visible')
})
