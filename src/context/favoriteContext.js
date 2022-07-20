// React
import { createContext, useState } from "react";



// Creación del contexto
const FavoriteContext = createContext();



const FavoriteProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([]);

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

    const data = {
        favorites,
        setFavorites,
        addOrRemoveFavorite,
        setBackground
    }

    return (
        <FavoriteContext.Provider value={data}>
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteContext
export { FavoriteProvider }