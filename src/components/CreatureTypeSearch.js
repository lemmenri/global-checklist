import React, { useState, useEffect } from "react";
import { getCreatureTypeList } from "../scripts/ScryfallQueries";
import SearchCombobox from "./SearchCombobox";

const placeholderText = "Search creature type...";
const idText = "creatureTypeSearch";
const labelText = "Search by creature type:";

export default function CreatureTypeSearch({ defaultCreatureTypeValue }) {
  const [creatureTypes, setCreatureTypes] = useState(undefined);

  useEffect(() => {
    getCreatureTypeList().then((json) => setCreatureTypes(json.data));
  }, []);

  return (
    <>
      <label htmlFor={idText}>{labelText}</label>
      <br />
      <SearchCombobox
        itemList={creatureTypes}
        id={idText}
        placeholder={placeholderText}
        defaultValue={
          defaultCreatureTypeValue ? defaultCreatureTypeValue : undefined
        }
      />
    </>
  );
}
