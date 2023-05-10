import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css"

export default function SimpleToggle({ name, label, onToggle }) {
  return (
      <div
        id={`toggle-container-${name}`}
        className="flex max-w-xs justify-between"
      >
        <label htmlFor={name}>{label}</label>
        <Toggle
          id={name}
          defaultChecked={false}
          onChange={onToggle}
        />
      </div>
  );
}
