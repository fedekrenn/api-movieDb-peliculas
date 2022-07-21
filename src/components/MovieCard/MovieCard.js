// Context 
import { useContext } from 'react';
import FavoriteContext from '../../context/favoriteContext';
//Librerías
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const MovieCard = ({movie}) => {

    const { addOrRemoveFavorite } = useContext(FavoriteContext);

    const { title, overview, poster_path, id } = movie;

    return (
        <Card className='movie-detail'>
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
}

export default MovieCard;