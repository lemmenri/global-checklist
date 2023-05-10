import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import Prints from "./Prints";
import { BrowserRouter as Router } from "react-router-dom";
import { moreThenTenPrintings, twoPrintings } from "../testdata/PrintingData";

it("displays message when no prints are available", () => {
    cy.mount(
        <Router>
            <Prints prints={[]} />
        </Router>
    );
    cy.get('#prints-list-header')
        .should('contain.text', 'Prints')
    cy.get('#no-other-prints')
        .should('contain.text', 'No other prints')
});

it("displays a couple of elements correctly", () => {
    cy.mount(
        <Router>
            <Prints prints={twoPrintings} />
        </Router>
    );
    cy.get('#prints-list-header')
        .should('contain.text', 'Prints')
    cy.get('#no-other-prints')
        .should('not.exist')
    cy.get('#all-prints')
        .should('not.exist')
    cy.get('#prints-list').children().should('have.length', 3)
});

it("displays only 10 items and a link to see all prints when more then 10 prints are available", () => {
    cy.mount(
        <Router>
            <Prints prints={moreThenTenPrintings} />
        </Router>
    );
    cy.get('#prints-list-header')
        .should('contain.text', 'Prints')
    cy.get('#no-other-prints')
        .should('not.exist')
    cy.get('#all-prints')
        .should('contain.text', 'View all prints...')
    cy.get('#prints-list').children().should('have.length', 12)
});