// Context 
import { useContext } from 'react';
import FavoriteContext from '../../context/favoriteContext';
//Librerías
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const MovieCard = ({movie}) => {

    const { addOrRemoveFavorite, favorites } = useContext(FavoriteContext);

    const { title, overview, poster_path, id, vote_average } = movie;

    // Saber si la película está en favoritos
    const isFavorite = favorites.some(fav => fav.id === id);

    return (
        <Card className='movie-detail'>
            <Card.Img className='img-detail' variant="top" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
            <Button
                className={isFavorite ? 'favorite-btn marked' : 'favorite-btn'}
                onClick={() => addOrRemoveFavorite(movie)}
                data-movie-id={movie.id}
            >❤️</Button>
            <Button
                className='favorite-btn'
                onClick={() => addOrRemoveFavorite(movie)}
                data-movie-id={movie.id}
            >🖤</Button>
            <Card.Body>
                <Card.Title>{title.substring(0, 35)}...</Card.Title>
                <div className='vote-average'>⭐ {vote_average}</div>
                <Card.Text>{overview.substring(0, 200)}...</Card.Text>
                <Link to={`/detalle/${id}`}><Button variant="primary">Detalle de película</Button></Link>
            </Card.Body>
        </Card>
    )
}

export default MovieCard;