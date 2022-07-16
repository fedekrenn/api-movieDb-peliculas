import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';


const Detail = () => {

    let token = sessionStorage.getItem('token')
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [videoData, setVideoData] = useState('');
    const [loading, setLoading] = useState(true);

    const { title, backdrop_path, overview, genres, release_date, vote_average } = movie;

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d492a22487e205c56d74c2e5d17a5013&language=es-MX`)
            .then(res => {
                setMovie(res.data)
                setLoading(false)
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Problema al llamar a la base de datos',
                    text: `${err}`,
                })
            })

        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=d492a22487e205c56d74c2e5d17a5013&language=es-MX`)
            .then(res => {
                const videoTrailer = res.data.results.find(video => video.type === 'Trailer')
                setVideoData(videoTrailer)
            })
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    return (
        !token ?
            <Navigate to="/" replace />
            :
            loading ?
                <LoaderSpinner />
                :
                <>
                    <h2>{title}</h2>
                    <div className="movie-detail ">
                        <img className="img-detail" src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt={title} />
                        <p className='overview'>{overview}</p>
                        {videoData &&
                            <iframe
                                src={`https://www.youtube.com/embed/${videoData.key}`}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>}
                        <div className="movie-detail__premiere">
                            <h5>Fecha de estreno:</h5>
                            <p>{release_date}</p>
                        </div>
                        <div className="movie-detail__rating">
                            <h5>Valoración de la crítica:</h5>
                            <p>{vote_average}</p>
                        </div>
                        <div className='movie-detail__genre'>
                            <h5>Género</h5>
                            <ul>
                                {genres.map((genre, i) => <li key={i}>{genre.name}</li>)}
                            </ul>
                        </div>
                    </div>
                </>
    )
}

export default Detail;