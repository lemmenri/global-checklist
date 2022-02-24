import { NavLink } from 'react-router-dom'

const Header = () => (
    <header>
        <h1>MTG Library</h1>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/search">Search</NavLink>
    </header>
)

export default Header