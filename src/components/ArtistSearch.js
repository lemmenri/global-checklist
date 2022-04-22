import React, { useState, useEffect } from "react";
import { getArtistList } from "../scripts/ScryfallQueries";
import SearchCombobox from "./SearchCombobox";

const placeholderText = "Search artists...";
const idText = "artistSearch";
const labelText = "Search by artist:";

export default function ArtistSearch({ defaultArtistValue }) {
  const [artistNames, setArtistNames] = useState(undefined);

  useEffect(() => {
    getArtistList().then((json) => setArtistNames(json.data));
  }, []);

  return (
    <>
      <label htmlFor={idText}>{labelText}</label>
      <br />
      <SearchCombobox
        itemList={artistNames}
        id={idText}
        placeholder={placeholderText}
        defaultValue={defaultArtistValue ? defaultArtistValue : undefined}
      />
    </>
  );
}
