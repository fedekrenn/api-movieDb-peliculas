import { Navigate, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Favorites = ({ addOrRemoveFavorite, favorites }) => {

    const token = sessionStorage.getItem('token');

    return (
        !token ?
            <Navigate to="/" replace />
            :
            <>
                {favorites.length === 0 ? <h2>Agrega tus películas favoritas!</h2> : <h2>Tus películas preferidas</h2>}
                <section className="total-movies">
                    {favorites.map((movie, i) => {
                        const { title, overview, imgURL, id } = movie;
                        return (
                            <Card key={i} className='movie-detail'>
                                <Card.Img className='img-detail' variant="top" src={`${imgURL}`} />
                                <Button
                                    className='favorite-btn'
                                    onClick={addOrRemoveFavorite}
                                    data-movie-id={movie.id}
                                >💔</Button>
                                <Card.Body>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Text>{overview.substring(0, 200)}...</Card.Text>
                                    <Link to={`/detalle/${id}`}>
                                        <Button variant="primary">Detalle de película</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </section>
            </>

    )
}

export default Favorites;