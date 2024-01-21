import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  document.title = "MTG Library - 404";

  return (
    <div role="main" className="p-4 sm:p-8 flex-grow">
      <h1 className="display">404</h1>
      <p className="pb-4">Couldn't find the page you're looking for...</p>
      <Link className="btn" id="goHomeButton" to="/">
        Go home
      </Link>
    </div>
  );
}
