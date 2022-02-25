import { NavLink } from 'react-router-dom'

const Header = () => (
    <header className='p-4 text-white bg-gray-700'>
        <h1 className='text-3xl m-4'>MTG Library</h1>
        <NavLink
            className={"bg-green-300 text-black m-4 px-4 rounded-xl hover:bg-green-500"}
            to="/"
        >
            Home
        </NavLink>
        <NavLink
            className={"bg-green-300 text-black m-4 px-4 rounded-xl hover:bg-green-500"}
            to="/search"
        >
            Search
        </NavLink>
    </header>
)

export default Header