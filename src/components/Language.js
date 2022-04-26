import React from "react";

export default function Language({ language }) {
  return (
    <p
      id={`language-label ${language}`}
      className="bg-dark font-medium text-center text-light px-1 my-0.5 rounded border border-dark print:text-dark print:bg-light"
    >
      {language.toUpperCase()}
    </p>
  );
}
