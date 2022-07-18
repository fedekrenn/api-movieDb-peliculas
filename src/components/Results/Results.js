// REact
import { useEffect, useState } from 'react';
// Context 
import { useContext } from 'react';
import FavoriteContext from '../../context/favoriteContext';
// Librerías
import { useParams, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// Componentes
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';

const Results = () => {

    const { addOrRemoveFavorite } = useContext(FavoriteContext); // Atr

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
                        {moviesResult.map((movie, i) => {
                            const { title, poster_path, overview ,id } = movie;
                            return (
                                <Card key={i} className='movie-detail'>
                                    <Card.Img className='img-detail' variant="top" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
                                    <Button
                                        className='favorite-btn'
                                        onClick={addOrRemoveFavorite}
                                        data-movie-id={movie.id}
                                    >❤️</Button>
                                    <Button
                                        className='favorite-btn'
                                        onClick={addOrRemoveFavorite}
                                        data-movie-id={movie.id}
                                    >🖤</Button>
                                    <Card.Body>
                                        <Card.Title>{title}</Card.Title>
                                        <Card.Text>{overview.substring(0, 75)}...</Card.Text>
                                        <Link to={`/detalle/${id}`}><Button variant="primary">Detalle de película</Button></Link>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </section>
                </>
    )
}

export default Results;