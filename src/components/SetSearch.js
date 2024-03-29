import React, { useState, useEffect } from "react";
import { getSetList } from "../scripts/ScryfallQueries";
import SearchCombobox from "./SearchCombobox";

const placeholderText = "Search sets...";
const idText = "setSearch";
const labelText = "Search by set:";

export default function SetSearch({ defaultSetValue }) {
  const [setNames, setSetNames] = useState(undefined);
  const [setCodeMap, setSetCodeMap] = useState(undefined);

  useEffect(() => {
    getSetList().then((json) => {
      const names = [];
      const codeMap = [];
      json.forEach((set) => {
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
      {setCodeMap && (
        <SearchCombobox
          itemList={setNames}
          id={idText}
          placeholder={placeholderText}
          codeMap={setCodeMap}
          defaultValue={
            defaultSetValue
              ? setCodeMap.find((set) => set.code === defaultSetValue).name
              : undefined
          }
        />
      )}
    </>
  );
}
