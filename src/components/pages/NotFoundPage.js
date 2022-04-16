import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="p-4 sm:p-8 flex-grow">
    <h1 className="text-xl my-4">404</h1>
    <p className="pb-4">Couldn't find the page you're looking for...</p>
    <Link className="btn" id="goHomeButton" to="/">
      Go home
    </Link>
  </div>
);

export default NotFoundPage;
