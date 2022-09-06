// Librerías
import { Link } from "react-router-dom";
// Context 
import { useContext, useEffect } from 'react';
import FavoriteContext from '../../context/favoriteContext';
import LoguinContext from "../../context/loguinContext";
// Componentes
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
    
    const { favorites } = useContext(FavoriteContext);
    const { login, setLogin } = useContext(LoguinContext);

    const token = sessionStorage.getItem('token');

    useEffect(() => {

        token && setLogin(true);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);
    
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
                    </Nav>
                    {login && <SearchBar />}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header