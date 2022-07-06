// Estilo
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Librerías
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

// Componentes
import Loguin from "./components/Login/Login";
import Listado from "./components/Listado/Listado";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Detalle from './components/Detalle/Detalle';
import Resultados from './components/Resultados.js/Resultados';
import Favoritos from './components/Favoritos/Favoritos';

function App() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    const localMovies = JSON.parse(localStorage.getItem('favs'));
    localMovies !== null && setFavorites(localMovies);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const favMovies = JSON.parse(localStorage.getItem('favs')) || [];

  const addOrRemoveFavorite = (e) => {

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').src;
    const title = parent.querySelector('.h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const id = btn.dataset['movieId'];

    const movieData = {
      title,
      imgURL,
      overview,
      id
    }

    console.log(btn.classList)


    const isInArray = favMovies.find(oneMovie => oneMovie.id === movieData.id)

    if (!isInArray) {
      favMovies.push(movieData)
      localStorage.setItem('favs', JSON.stringify(favMovies))
      setFavorites(favMovies);
      btn.classList.toggle('hidden-btn');
    } else {
      // Encuentro el indice y lo elimino del array original
      const deleteIndex = favMovies.findIndex(movie => movie.id === movieData.id)
      favMovies.splice(deleteIndex, 1)
      setFavorites(favMovies);
      btn.classList.remove('hidden-btn');
      // Seteo el local
      localStorage.setItem('favs', JSON.stringify(favMovies))
    }

  }

  return (
    <>
      <Header favorites={favorites}/>
      <main>
        <Routes>
          <Route path="/" element={<Loguin />} />
          <Route path="/listado" element={<Listado addOrRemoveFavorite={addOrRemoveFavorite} />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/resultados/:keyword" element={<Resultados addOrRemoveFavorite={addOrRemoveFavorite} />} />
          <Route path="/favoritos" element={<Favoritos favorites={favorites} addOrRemoveFavorite={addOrRemoveFavorite} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
