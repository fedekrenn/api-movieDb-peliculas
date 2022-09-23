// Context 
import { useContext } from 'react';
import FavoriteContext from '../../context/favoriteContext';
// Librerías
import { Navigate } from 'react-router-dom';
// Componentes
import MovieCard from '../../components/MovieCard/MovieCard';


const Favorites = () => {

    const token = sessionStorage.getItem('token');
    const { favorites } = useContext(FavoriteContext);

    if (!token) return <Navigate to='/login' />

    return (
        <section className="total-movies">
            {favorites.length === 0 ? <h2>Explora para agregar tus películas favoritas!</h2> : <h2>Tus películas preferidas:</h2>}
            {favorites.map((movie, i) => <MovieCard key={i} movie={movie} />)}
        </section>

    )
}

export default Favorites;