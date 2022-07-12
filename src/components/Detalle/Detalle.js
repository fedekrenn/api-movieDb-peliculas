import './Detalle.css';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';


const Detalle = () => {

    let token = sessionStorage.getItem('token')
    const { id } = useParams();
    const [ movie, setMovie ] = useState({});
    const [ videoData, setVideoData ] = useState('');
    const [ loading, setLoading ] = useState(true);

    const { title, backdrop_path, overview, genres, release_date } = movie;

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d492a22487e205c56d74c2e5d17a5013&language=es-MX`)
            .then(res => {
                setMovie(res.data)
                setLoading(false)
            })
            .catch(err => {
                swAlert(<h5>Error al intentar obtener los datos de la película</h5>)
            })

        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=d492a22487e205c56d74c2e5d17a5013&language=es-MX`)
            .then(res => {
                const videoTrailer = res.data.results.find(video => video.type === 'Trailer')
                setVideoData(videoTrailer)
            })
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    console.log(videoData)
    return (
        !token ?
            <Navigate to="/" replace />
            :
            loading ?
                <LoaderSpinner />
                :
                <>
                    <h2>{title}</h2>
                    <div className="pelicula-detalle ">
                        <img className="img-detail" src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt={title} />
                        <p className='overview'>{overview}</p>
                        {videoData && <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoData.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
                        <div className="pelicula-detalle__estreno">
                            <h5>Fecha de estreno:</h5>
                            <p>{release_date}</p>
                        </div>
                        <div className="pelicula-detalle__rating">
                            <h5>Valoración de la crítica:</h5>
                            <p>{movie.vote_average}</p>
                        </div>
                        <div className='pelicula-detalle__genero'>
                            <h5>Género</h5>
                            <ul>
                                { genres.map((genre, i) => <li key={i}>{genre.name}</li>) }
                            </ul>
                        </div>
                    </div>
                </>
    )
}

export default Detalle