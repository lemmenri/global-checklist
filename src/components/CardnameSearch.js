import React, { useState, useEffect } from "react";
import { getCardnameList } from "../scripts/ScryfallQueries";
import SearchCombobox from "./SearchCombobox";

const placeholderText = "Search cards...";
const idText = "cardnameSearch";
const labelText = "Search by card name:";

export default function CardnameSearch({ defaultCardnameValue, label }) {
  const [cardNames, setCardNames] = useState(undefined);

  useEffect(() => {
    getCardnameList().then((json) => setCardNames(json));
  }, []);

  return (
    <>
      <label htmlFor={idText}>{label ? label : labelText}</label>
      <br />
      <SearchCombobox
        itemList={cardNames}
        id={idText}
        placeholder={placeholderText}
        defaultValue={defaultCardnameValue ? defaultCardnameValue : undefined}
      />
    </>
  );
}
