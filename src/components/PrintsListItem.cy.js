import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import PrintsListItem from "./PrintsListItem";
import { BrowserRouter as Router } from "react-router-dom";

const collectedAllFinishes = [
    {
        finish: "foil",
        count: 1,
    },
    {
        finish: "nonfoil",
        count: 0
    },
    {
        finish: "etched",
        count: 0
    },
]

const collectedOnlyNonfoil = [
    {
        finish: "nonfoil",
        count: 40
    }
]

it("displays the correct name, number, and collected state", () => {
    cy.mount(<Router>
        <PrintsListItem
            collected={collectedAllFinishes}
            collector_number={475}
            image="https://cards.scryfall.io/normal/front/5/4/54ced5cf-b51a-4dab-97f7-50fb18e5c463.jpg?1631666677"
            setName="Modern Horizons 2"
            id="54ced5cf-b51a-4dab-97f7-50fb18e5c463"
        />
    </Router>
    );
    cy.get('#cardName')
        .should('contain.text', 'Modern Horizons 2 - #475')
    cy.get('#nonfoil-collected')
        .should('contain.text', '0')
        .and('not.have.class', 'bg-collected')
    cy.get('#foil-collected')
        .should('contain.text', '1')
        .and('have.class', 'bg-collected')
    cy.get('#etched-collected')
        .should('contain.text', '0')
        .and('not.have.class', 'bg-collected')
});

it("displays image on hover and hides image on mouseout", () => {
    cy.mount(<Router>
        <PrintsListItem
            collected={collectedAllFinishes}
            collector_number={475}
            image="https://cards.scryfall.io/normal/front/5/4/54ced5cf-b51a-4dab-97f7-50fb18e5c463.jpg?1631666677"
            setName="Modern Horizons 2"
            id="54ced5cf-b51a-4dab-97f7-50fb18e5c463"
        />
    </Router>
    );
    cy.get('#cardName')
        .trigger('mouseover')
    cy.get('img')
        .should('exist')
        .and('be.visible')
    cy.get('#cardName')
        .trigger('mouseout', { force: true })
    cy.get('img')
        .should('not.be.visible')
});

it("displays only the provided finish", () => {
    cy.mount(<Router>
        <PrintsListItem
            collected={collectedOnlyNonfoil}
            collector_number={475}
            image="https://cards.scryfall.io/normal/front/5/4/54ced5cf-b51a-4dab-97f7-50fb18e5c463.jpg?1631666677"
            setName="Modern Horizons 2"
            id="54ced5cf-b51a-4dab-97f7-50fb18e5c463"
        />
    </Router>
    );
    cy.get('#cardName')
        .should('contain.text', 'Modern Horizons 2 - #475')
    cy.get('#nonfoil-collected')
        .should('contain.text', '40')
        .and('have.class', 'bg-collected')
    cy.get('#foil-collected')
        .should('not.exist')
    cy.get('#etched-collected')
        .should('not.exist')
});