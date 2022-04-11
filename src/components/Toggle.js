import React from "react";
import { Toggle } from "react-toggle-component";

export default function SimpleToggle({ label, onToggle }) {
  return (
    <>
      <label htmlFor="toggle-list-view">{label}</label>
      <Toggle
        name="toggle-list-view"
        width="32px"
        height="16px"
        leftBackgroundColor="#06746B"
        rightBackgroundColor="#E7EAEE"
        borderWidth="1px"
        borderColor="#042A33"
        knobWidth="12px"
        knobHeight="12px"
        knobGap="18px"
        leftKnobColor="#E7EAEE"
        rightKnobColor="#042A33"
        checked={true}
        onToggle={onToggle}
      />
    </>
  );
}
