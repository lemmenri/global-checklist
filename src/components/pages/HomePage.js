import React from "react";
import { useNavigate } from "react-router";
import CardnameSearchForm from "../CardnameSearchForm";

export default function HomePage() {
  document.title = "MTG Library";

  const navigate = useNavigate();
  const goToPage = (page) => {
    navigate({
      pathname: page,
    });
  };

  return (
    <div className="flex flex-col p-4 sm:p-8 flex-grow bg-light w-full place-items-center space-y-12 my-6">
      <h1 className="display font-semibold text-center">Welcome to MTG Library</h1>
      <p className="text-center">
        Keeping track of <span className="font-bold">all</span> your Magic: The
        Gathering cards has never been easier.
      </p>
      <CardnameSearchForm />
      <div id="actions" className="flex flex-wrap space-x-2 max-w-screen-sm place-content-center">
        <button id="goToAdvancedSearchButton" className="btn bg-light text-dark border border-1 border-dark" onClick={() => goToPage("search")}>Advanced Search</button>
        <button id="goToSetsButton" className="btn bg-light text-dark border border-1 border-dark" onClick={() => goToPage("sets")}>Sets</button>
        <button id="goToImportExport" className="btn bg-light text-dark border border-1 border-dark" onClick={() => goToPage("import-export")}>Import/Export</button>
        <button id="goToCollection" className="btn bg-light text-dark border border-1 border-dark" onClick={() => goToPage("collection")}>Collection</button>
      </div>
    </div>
  );
}
