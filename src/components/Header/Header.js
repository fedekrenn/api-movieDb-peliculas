// React
import { useContext, useEffect, useState } from 'react';
// Librerías
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Dropdown from 'react-bootstrap/Dropdown';
// Context 
import FavoriteContext from '../../context/favoriteContext';
import LoguinContext from "../../context/loguinContext";
// Componentes
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios";

const Header = () => {

    const { favorites } = useContext(FavoriteContext);
    const { login, setLogin } = useContext(LoguinContext);

    const [categories, setCategories] = useState([]);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const ENDPOINT = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d492a22487e205c56d74c2e5d17a5013&language=es-ES'
        axios.get(ENDPOINT)
            .then(res => {
                setCategories(res.data.genres)
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'Error al conectar con la API',
                })
            })

        token && setLogin(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand><Link to={'/listado'}>Krennflix</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Navbar.Text className='anchor-navbar'><Link to={'/listado'}>Listado</Link></Navbar.Text>
                        <Navbar.Text className='anchor-navbar'>
                            <Link to={'/favoritos'}>
                                Favoritos
                                {favorites.length > 0 && <sup> {token && favorites.length}</sup>}
                            </Link>
                        </Navbar.Text>
                        {login &&
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">Categorías</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {categories.map((category, i) => (
                                        <Dropdown.Item as='button' key={i}>
                                            <Link to={`/categoria/${category.id}`} state={category.name}>
                                                {category.name}
                                            </Link>
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                    </Nav>
                    {login && <SearchBar />}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header