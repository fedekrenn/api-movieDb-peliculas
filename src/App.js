// Estilo
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// Librerías
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

// Componentes
import Loguin from "./components/Login/Login";
import MovieList from "./components/MovieList/MovieList";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Detail from "./components/Detail/Detail";
import Resultados from './components/Results/Results';
import Favorites from './components/Favorites/Favorites';

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

  const setBackground = () => {
    
    const main = document.querySelector('main');

    main.classList.remove('background-img');
  }

  return (
    <>
      <Header favorites={favorites}/>
      <main className='background-img'>
        <Routes>
          <Route path="/" element={<Loguin setBackground={setBackground}/>} />
          <Route path="/listado" element={<MovieList addOrRemoveFavorite={addOrRemoveFavorite} />} />
          <Route path="/detalle/:id" element={<Detail />} />
          <Route path="/resultados/:keyword" element={<Resultados addOrRemoveFavorite={addOrRemoveFavorite} />} />
          <Route path="/favoritos" element={<Favorites favorites={favorites} addOrRemoveFavorite={addOrRemoveFavorite} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
