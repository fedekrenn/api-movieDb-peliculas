import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';


const CategoriesList = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {

        const ENDPOINT = `https://api.themoviedb.org/3/discover/movie?api_key=d492a22487e205c56d74c2e5d17a5013&language=es-ES&with_genres=${id}`

        axios.get(ENDPOINT)
            .then(res => {
                
                const noImageFilter = res.data.results.filter(movie => movie.poster_path !== null);

                const orderedMovies = noImageFilter.sort((a, b) => b.release_date - a.release_date);

                setMovies(orderedMovies);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    return (
        loading ?
            <LoaderSpinner />
            :
            <>
                <h2>Películas en la categoría "{location.state}"</h2>
                <section className="total-movies">
                    {movies.map(movie => (
                        <div key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <p>{movie.title}</p>
                        </div>
                    ))}
                </section>
            </>
    )

}

export default CategoriesList