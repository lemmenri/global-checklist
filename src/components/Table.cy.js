import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import "cypress-real-events/support";
import Table from './Table'
import { BrowserRouter as Router } from "react-router-dom";
import { deleteCollection, getCollectionAsList } from "../scripts/Collection";
import { addCard } from "../scripts/CollectedCards";
import { collectedCardsAsListHeaderData } from "../testdata/CollectedCardsAsListData";

describe('<Table />', () => {
    deleteCollection()
    addCard({
        id: "46652ae3-6572-4296-939b-0789923180d5",
        name: "Zodiac Dragon",
        set: "ptk",
        nr: "131",
        language: "EN",
        finish: "nonfoil",
        quantity: 1,
        condition: "MT",
    });
    addCard({
        id: "7f9c6be5-ec44-4c66-aad6-cf9eca765b6b",
        name: "Nalathni Dragon",
        set: "pdrc",
        nr: "1",
        language: "EN",
        finish: "nonfoil",
        quantity: 2,
        condition: "EX",
    });
    const tableData = getCollectionAsList()

    it('renders', () => {
        cy.mount(
            <Router>
                <Table headers={collectedCardsAsListHeaderData} data={tableData} key={"table"} />
            </Router>
        )
        cy.get("table thead tr").should("have.length", 1)
        cy.get("table thead tr th").should("have.length", 7)
        cy.get("table tbody tr").should("have.length", 2)
    })

    it('sorts columns', () => {
        cy.mount(
            <Router>
                <Table headers={collectedCardsAsListHeaderData} data={tableData} key={"table"} />
            </Router>
        )
        cy.get('#sort-Name').should('contain.text', 'Name')
        cy.get('#sort-Name').click()
        cy.get('#name-0 button').should('contain.text', 'Zodiac Dragon')
        cy.get('#name-1 button').should('contain.text', 'Nalathni Dragon')
        cy.get('#sort-Name').click()
        cy.get('#name-0 button').should('contain.text', 'Nalathni Dragon')
        cy.get('#name-1 button').should('contain.text', 'Zodiac Dragon')
    })
})