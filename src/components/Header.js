import { NavLink } from "react-router-dom";

const Header = () => (
  <header
    role="banner"
    id="header"
    className="flex flex-col sm:flex-row px-4 pt-4 sm:pt-0 text-light bg-primary justify-between items-center print:hidden"
  >
    <NavLink id="home" to="/">
      <h1 id="title" className="display my-2 mx-4">
        MTG Library
      </h1>
    </NavLink>
    <div role="navigation" id="navLinks" className="space-x-8 sm:space-x-4 m-4">
      <NavLink id="collection" className={"text-light hover:underline"} to="/collection">
        Collection
      </NavLink>
      <NavLink id="sets" className={"text-light hover:underline"} to="/sets">
        Sets
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
