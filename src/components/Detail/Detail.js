import { Link } from 'react-router-dom'

const Detail = ({ movie, videoData }) => {
  const {
    title,
    backdrop_path,
    overview,
    genres,
    release_date,
    vote_average,
    tagline,
  } = movie

  return (
    <>
      <img
        className='img-detail-movie'
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt={title}
      />
      <h2>{title}</h2>
      <h3 className='movie-tagline'>{tagline}</h3>
      <div className='movie-detail'>
        <div className='movie-detail__genre'>
          <h5>Género</h5>
          <ul>
            {genres.map((genre) => (
              <Link
                to={`/categoria/${genre.id}`}
                state={genre.name}
                key={genre.id}
              >
                <li className='li-item'>{genre.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className='movie-detail__child'>
          <div className='movie-detail__rating'>
            <h5>Valoración de la crítica:</h5>
            <p>⭐ {vote_average}</p>
          </div>
          <div className='movie-detail__premiere'>
            <h5>Fecha de estreno:</h5>
            <p>{release_date}</p>
          </div>
        </div>
        <p className='overview'>{overview}</p>
        {videoData ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoData.key}`}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        ) : (
          <p>No hay trailer disponible</p>
        )}
      </div>
    </>
  )
}

export default Detail
