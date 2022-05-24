import React from "react";

export default function Condition({ condition }) {
  return (
    <p
      id={`condition-label-${condition}`}
      className={`bg-${condition.toUpperCase()} font-medium text-light text-center px-1 my-0.5 rounded border border-${condition.toUpperCase()}`}
    >
      {condition.toUpperCase()}
    </p>
  );
}

Condition.defaultProps = {
  condition: "NM",
};
