// Librerías
import { Link } from "react-router-dom";
// Componentes
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Buscador from '../Buscador/Buscador';

const Header = ({ favorites }) => {

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand><Link to={'/'}>Krennflix</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Navbar.Text className='anchor-navbar'><Link to={'/listado'}>Listado</Link></Navbar.Text>
                        <Navbar.Text className='anchor-navbar'>
                            <Link to={'/favoritos'}>
                                Favoritos 
                                {favorites.length > 0 && <sup> {favorites.length}</sup>}
                            </Link>
                        </Navbar.Text>
                    </Nav>
                    <Buscador />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header