// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
// Librerías
import { Routes, Route } from "react-router-dom";
// Componentes
import Loguin from "./components/Login/Login";
import MovieList from "./components/MovieList/MovieList";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Detail from "./components/DetailContainer/DetailContainer";
import Results from './components/Results/Results';
import Favorites from './components/Favorites/Favorites';



function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Loguin />} />
          <Route path="/listado" element={<MovieList />} />
          <Route path="/detalle/:id" element={<Detail />} />
          <Route path="/resultados/:keyword" element={<Results />} />
          <Route path="/favoritos" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
