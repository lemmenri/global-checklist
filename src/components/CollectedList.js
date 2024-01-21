import React from "react";
import CollectedListItem from "./CollectedListItem";

export default function CollectedList({ collected, handleDeleteCard }) {
  return (
    <div id="collected-list" className="py-4">
      <div
        id="collected-list-header"
        className="bg-primary text-white py-1 px-2"
      >
        Collected
      </div>
      {collected.map((card) => (
        <CollectedListItem
          key={`${card.language}${card.finish}${card.condition}`}
          id={card.id}
          finish={card.finish}
          quantity={card.quantity}
          condition={card.condition}
          language={card.language}
          handleDeleteCard={handleDeleteCard}
        />
      ))}
      {collected.length === 0 && (
        <div id="no-copies-listed" className="py-1 px-2 border border-primary">
          No copies in collection.
        </div>
      )}
    </div>
  );
}
