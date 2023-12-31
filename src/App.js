import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from './pages/Index';
import Page404 from './pages/Page404';
import 'react-toastify/dist/ReactToastify.css';
import { PokemonApi } from './pages/PokemonApi';
import Navbar from './components/Navbar';
import MyDocument from './pages/VistaPokemonPdf';

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pokemon-api" element={<PokemonApi />} />
        <Route path="/pdf-pokemon/:id" element={<MyDocument />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
