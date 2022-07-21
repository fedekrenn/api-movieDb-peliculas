// React
import { useEffect, useState } from 'react';
// Librerías
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
// Componentes
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import MovieCard from '../MovieCard/MovieCard';

const Results = () => {

    const { keyword } = useParams();
    const [moviesResult, setMoviesResult] = useState([]);
    const [loading, setLoading] = useState(true);

    let token = sessionStorage.getItem('token')

    useEffect(() => {

        axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=d492a22487e205c56d74c2e5d17a5013&language=es-ES&query=${keyword}`)
            .then(res => {
                const moviesArray = res.data.results;
                moviesArray.length === 0 && Swal.fire({
                    icon: 'warning',
                    title: 'Prueba de nuevo',
                    text: 'No se encontraron resultados',
                });

                // Filtramos las que no tienen imagen de poster, para descartarlas
                const noImageFilter = moviesArray.filter(movie => movie.poster_path !== null);

                // Ordenamos por popularidad
                noImageFilter.sort((a, b) => b.popularity - a.popularity);

                // Seteamos
                setMoviesResult(noImageFilter);
                setLoading(false);
            })
            .catch(err => console.log(err))

        return () => {
            setMoviesResult([]);
            setLoading(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]);

    return (
        !token ?
            <Navigate to="/" replace />
            :
            loading ?
                <LoaderSpinner />
                :
                <>
                    <h2>Resultados de la búsqueda de: {keyword}</h2>
                    <section className="total-movies">
                        {moviesResult.length === 0 && <h4>No se encontraron resultados</h4>}
                        {moviesResult.map((movie, i) => <MovieCard key={i} movie={movie} />)}
                    </section>
                </>
    )
}

export default Results;