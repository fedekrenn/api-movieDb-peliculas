// Librerías
import { Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
// Componentes
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';



const MovieList = ({ addOrRemoveFavorite }) => {

    let token = sessionStorage.getItem('token')
    const [moviesList, setMoviesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=d492a22487e205c56d74c2e5d17a5013&language=es-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
        axios.get(endPoint)
            .then(res => {
                const apiData = res.data.results;
                setMoviesList(apiData)
                setLoading(false)
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'Error al conectar con la API',
                  })
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        !token ?
            <Navigate to="/" replace />
            :
            loading ?
                <LoaderSpinner />
                :
                <>
                    <h2>Las mejores películas</h2>
                    <section className="total-movies">
                        {moviesList.map((movie, i) => {
                            const { title, overview, poster_path, id } = movie;
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
                                        <Card.Text>{overview.substring(0, 200)}...</Card.Text>
                                        <Link to={`/detalle/${id}`}><Button variant="primary">Detalle de película</Button></Link>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </section>
                </>
    )
}

export default MovieList;