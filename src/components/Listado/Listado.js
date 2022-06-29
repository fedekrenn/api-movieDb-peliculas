// Css
import './Listado.css'
// Librerías
import { Navigate } from 'react-router-dom';
// Componentes
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';



const Listado = () => {

    let token = localStorage.getItem('token')

    return (
        <>
            {!token ?
                <Navigate to="/" replace/>
                :
                <>
                    <h3>Listado!</h3>
                    <div className='listado'>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Detalle de película</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </>
            }
        </>
    )
}

export default Listado;