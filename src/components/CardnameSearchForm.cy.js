import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import CardnameSearchForm from "./CardnameSearchForm";
import "cypress-real-events/support";
import { BrowserRouter as Router } from "react-router-dom";

it("displays the CardnameSearch component", () => {
    cy.mount(
        <Router>
            <CardnameSearchForm />
        </Router>
    );
    cy.get("#cardnameSearch").should(
        "have.attr",
        "placeholder",
        "Search cards..."
    );
    cy.get('#cardnameSearch')
        .should('be.visible')
    cy.get('#searchButton')
        .should('be.visible')
});

it("displays the searched card", () => {
    cy.intercept('*/catalog/card-names*', { fixture: 'cardnames.json' }).as('getCardNames')

    cy.mount(
        <Router>
            <CardnameSearchForm />
        </Router>
    );

    cy.searchCard("Birds of Paradise", "Birds of Paradise", "cardnameSearch");
    cy.get("#cardnameSearch")
        .should("have.value", "Birds of Paradise");

});
