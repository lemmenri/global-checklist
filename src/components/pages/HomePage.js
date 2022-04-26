import React from "react";

export default function HomePage() {
  document.title = "MTG Library";
  return (
    <div className="p-4 sm:p-8 flex-grow">
      <h1 className="display">Welcome to MTG Library!</h1>
      <p>
        Keeping track of <span className="font-bold">all</span> your Magic: The
        Gathering cards has never been easier
      </p>
    </div>
  );
}
