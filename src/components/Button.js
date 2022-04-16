import React from "react";

export default function Button({ onClick }) {
  return (
    <button onClick={onClick()} className="btn">
      {this.props.children}
    </button>
  );
}
