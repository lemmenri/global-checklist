import { NavLink } from "react-router-dom";

const Header = () => (
  <header
    id="header"
    className="px-4 text-light bg-primary flex flex-wrap justify-between items-center print:hidden"
  >
    <h1 id="title" className="text-3xl m-4">
      MTG Library
    </h1>
    <div className="space-x-4 m-4">
      <NavLink id="home" className={"text-light hover:underline"} to="/">
        Home
      </NavLink>
      <NavLink
        id="search"
        className={"text-light hover:underline"}
        to="/search"
      >
        Search
      </NavLink>
    </div>
  </header>
);

export default Header;
