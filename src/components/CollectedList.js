import React from "react";
import CollectedListItem from "./CollectedListItem";

export default function CollectedList({ collected }) {
  return (
    <div id="collected-list" className="py-4 max-w-sm">
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
        />
      ))}
      {collected.length === 0 && (
        <div className="py-1 px-2 border border-primary">No copies listed.</div>
      )}
    </div>
  );
}
