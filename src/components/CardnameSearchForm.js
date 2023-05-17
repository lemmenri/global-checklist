import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getCardnameList } from "../scripts/ScryfallQueries";
import SearchCombobox from "./SearchCombobox";

export default function CardnameSearchForm() {
    const [cardNames, setCardNames] = useState(undefined);

    useEffect(() => {
        getCardnameList().then((json) => setCardNames(json));
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        goToCardname(e.target.cardnameSearch.value)
    }

    const navigate = useNavigate();
    const goToCardname = (cardName) => {
        navigate({
            pathname: "/search",
            search: `?name=${cardName}`,
        });
    };

    return (
        <form id="searchForm" role="search" onSubmit={handleSearchSubmit}>
            <div id="searchFormItemsContainer" className="flex flex-col place-items-center">
                <SearchCombobox
                    itemList={cardNames}
                    id="cardnameSearch"
                    placeholder="Search cards..."
                    withSearchButton={true}
                />
            </div>
        </form>
    );
}
