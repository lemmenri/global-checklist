import { NavLink } from "react-router-dom";

const Header = () => (
  <header className="px-4 text-light bg-primary flex flex-wrap justify-between items-center print:hidden">
    <h1 className="text-3xl m-4">MTG Library</h1>
    <div className="space-x-4 m-4">
      <NavLink className={"text-light hover:underline"} to="/">
        Home
      </NavLink>
      <NavLink className={"text-light hover:underline"} to="/search">
        Search
      </NavLink>
    </div>
  </header>
);

export default Header;
