import React from "react";

export default function Button({ onClick }) {
  return (
    <button
      onClick={onClick()}
      className="bg-primary text-light my-4 px-8 rounded-lg hover:underline"
    >
      {this.props.children}
    </button>
  );
}
