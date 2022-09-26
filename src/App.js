// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
// Librerías
import { Routes, Route } from "react-router-dom";
// Pages
import MovieList from "./pages/MovieList/MovieList";
import Loguin from "./pages/Login/Login";
import Results from './pages/Results/Results';
import Favorites from './pages/Favorites/Favorites';
import CategoriesList from './pages/CategoriesList/CategoriesList';
// Componentes
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DetailContainer from "./pages/DetailContainer/DetailContainer";
import Register from './pages/Register/Register';



function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/registro" element={<Register/>}/>
          <Route path="/" element={<Loguin />} />
          <Route path="/listado" element={<MovieList />} />
          <Route path="/detalle/:id" element={<DetailContainer />} />
          <Route path="/categoria/:id" element={<CategoriesList />} />
          <Route path="/resultados/:keyword" element={<Results />} />
          <Route path="/favoritos" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
