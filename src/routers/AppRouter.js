import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SearchPage from '../components/pages/SearchPage'
import HomePage from '../components/pages/HomePage'
import CardPage from '../components/pages/CardPage'
import NotFoundPage from '../components/pages/NotFoundPage'
import Header from '../components/Header'


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/card/:id" element={<CardPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    </BrowserRouter>
)

export default AppRouter

// create Header component
// create HomePage
// create CardPage
// wire everything up