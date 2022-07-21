// React
import { useEffect } from 'react';
// Context 
import { useContext } from 'react';
import FavoriteContext from '../../context/favoriteContext';
// Librerías
import { Navigate } from 'react-router-dom';
// Componentes
import MovieCard from '../MovieCard/MovieCard';


const Favorites = () => {

    const token = sessionStorage.getItem('token');
    const { favorites, setFavorites } = useContext(FavoriteContext);

    useEffect(() => {

        const localMovies = JSON.parse(localStorage.getItem('favs'));
        localMovies !== null && setFavorites(localMovies);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        !token ?
            <Navigate to="/" replace />
            :
            <>
                {favorites.length === 0 ? <h2>Explora para agregar tus películas favoritas!</h2> : <h2>Tus películas preferidas:</h2>}
                <section className="total-movies">
                    {favorites.map((movie, i) => <MovieCard key={i} movie={movie} />)}
                </section>
            </>

    )
}

export default Favorites;