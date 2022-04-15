import React from "react";

export default function Condition({ condition }) {
  return (
    <p
      id={`language-label ${condition}`}
      className={`bg-${condition.toUpperCase()} font-medium text-light text-center px-1 my-0.5 rounded border border-${condition.toUpperCase()}`}
    >
      {condition.toUpperCase()}
    </p>
  );
}
