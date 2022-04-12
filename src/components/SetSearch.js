import React, { useState, useEffect } from "react";
import { getSetList } from "../scripts/ScryfallQueries";
import SearchCombobox from "./SearchCombobox";

const placeholderText = "Search Sets...";
const idText = "setSearch";
const labelText = "Search by set:";

export default function SetSearch() {
  const [setNames, setSetNames] = useState("");
  const [setCodeMap, setSetCodeMap] = useState("");

  useEffect(() => {
    getSetList().then((json) => {
      const names = [];
      const codeMap = [];
      json.data.forEach((set) => {
        names.push(set.name);
        codeMap.push({
          name: set.name,
          code: set.code,
        });
      });
      setSetNames(names);
      setSetCodeMap(codeMap);
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
        codeMap={setCodeMap}
      />
    </>
  );
}
