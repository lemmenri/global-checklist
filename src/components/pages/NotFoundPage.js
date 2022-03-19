import React from "react";
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div className="p-2 sm:p-8 bg-light flex-grow">
        <h1 className="text-xl my-4">404</h1>
        <p className="pb-4">
            Couldn't find the page you're looking for...
        </p>
        <Link className="bg-green-300 text-black m-4 px-4 rounded-xl hover:bg-green-500" to="/">
            Go home
        </Link>
    </div>
)

export default NotFoundPage;