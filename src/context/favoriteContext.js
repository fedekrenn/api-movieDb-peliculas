// React
import { createContext, useState, useEffect } from "react";
// Creación del contexto
const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([]);

    const favMovies = JSON.parse(localStorage.getItem('favs')) || [];


    useEffect(() => {

        favMovies !== [] && setFavorites(favMovies);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    const addOrRemoveFavorite = (movie) => {

        // Agregar clase de boton
        const btn = document.querySelector(`[data-movie-id="${movie.id}"]`);
        btn.classList.toggle('marked');

        // const btn = Event.currentTarget;

        const isInArray = favMovies.find(oneMovie => oneMovie.id === movie.id)

        if (!isInArray) {
            favMovies.push(movie)
            localStorage.setItem('favs', JSON.stringify(favMovies))
            setFavorites(favMovies);
        } else {
            // Encuentro el indice y lo elimino del array original
            const deleteIndex = favMovies.findIndex(movieToDelete => movieToDelete.id === movie.id)
            favMovies.splice(deleteIndex, 1)
            setFavorites(favMovies);
            // Seteo el local
            localStorage.setItem('favs', JSON.stringify(favMovies))
        }
    }

    const data = {
        favorites,
        setFavorites,
        addOrRemoveFavorite
    }

    return (
        <FavoriteContext.Provider value={data}>
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteContext
export { FavoriteProvider }