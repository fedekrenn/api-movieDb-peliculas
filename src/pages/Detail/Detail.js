const Detail = ({ movie, videoData }) => {

    const { title, backdrop_path, overview, genres, release_date, vote_average } = movie;


    return (
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