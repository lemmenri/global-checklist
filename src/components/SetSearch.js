import React, { useState, useEffect } from "react";
import { getSetList } from "../scripts/ScryfallQueries";
import SearchCombobox from "./SearchCombobox";

const placeholderText = "Search Sets...";
const idText = "setSearch";
const labelText = "Search by set:";

export default function SetSearch() {
  const [setNames, setSetNames] = useState("");

  useEffect(() => {
    getSetList().then((json) => {
      const names = [];
      json.data.forEach((set) => names.push(set.name));
      setSetNames(names);
    });
  }, []);

  return (
    <>
      <label htmlFor={idText}>{labelText}</label>
      <br />
      <SearchCombobox
        itemList={setNames}
        id={idText}
        placeholder={placeholderText}
      />
    </>
  );
}
