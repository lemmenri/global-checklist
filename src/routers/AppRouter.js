import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "../components/pages/SearchPage";
import HomePage from "../components/pages/HomePage";
import CardPage from "../components/pages/CardPage";
import DesignSystemPage from "../components/pages/DesignSystemPage";
import TestPage from "../components/pages/TestPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import SetsPage from "../components/pages/SetsPage";
import ImportExportPage from "../components/pages/ImportExportPage";

const AppRouter = () => (
  <BrowserRouter>
    <ScrollToTop />
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/sets" element={<SetsPage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/import-export" element={<ImportExportPage />} />
        <Route path="/design-system" element={<DesignSystemPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
