import React, { useState, useEffect } from "react";
import { getCollectionCount } from "../../scripts/CardCounts";
import { getCollectionAsList } from "../../scripts/Collection";
import CardnameSearch from "../CardnameSearch";
import CardnameSearchForm from "../CardnameSearchForm";
import { Loading } from "../Loading";
import Table from "../Table";

const tableHeaders = [
    { label: "Name", id: "name" },
    { label: "Set", id: "set" },
    { label: "Nr.", id: "nr" },
    { label: "Fin.", id: "finish" },
    { label: "Lang.", id: "language" },
    { label: "Cond.", id: "condition" },
    { label: "Qnt.", id: "quantity" },
]

export default function CollectionPage() {
    document.title = "MTG Library - Collection";

    const [cardlist, setCardlist] = useState([])
    const [totalCardCount] = useState(getCollectionCount());
    const [filters, setFilters] = useState({
        name: ""
    })

    useEffect(() => {
        if (totalCardCount > 0) {
            setCardlist(filterCards(filters))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    function filterCards(filters) {
        console.log(filters)
        if (filters.name === "") { return getCollectionAsList() }
        const filteredCardlist = getCollectionAsList().filter(card => card.name === filters.name)
        console.log(filteredCardlist)
        return filteredCardlist
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setFilters(filters => ({ ...filters, name: e.target.cardnameSearch.value }))
    }

    return (
        <div role="main" className="p-4 sm:p-8 flex-grow bg-light">
            <div className="flex flex-col-reverse sm:flex-row flex-wrap-reverse justify-between">
                <h1 className="display">Collection</h1>
                <div className="self-center">
                    <CardnameSearchForm />
                </div>
            </div>
            <div className="space-y-2">
                <p id="collectedCardCount">{`${totalCardCount} card${totalCardCount !== 1 ? "s" : ""} in collection`}</p>
                {totalCardCount > 0 ? (
                    <>
                        <form id="searchForm" role="search" onSubmit={handleSearchSubmit}>
                            <CardnameSearch label={"Filter cardname"} />
                        </form>

                        {cardlist.length > 0 ? (
                            <div id="collectionTable" className="overflow-x-auto">
                                <Table headers={tableHeaders} data={cardlist} key={filters.name} />
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </>
                ) : (
                    <p id="noCardsInCollectionText">Search some cards or sets to get started.</p>
                )
                }

            </div>
        </div>
    );
}
