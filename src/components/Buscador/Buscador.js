import './Buscador.css';
import Button from 'react-bootstrap/Button';
import swAlert from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';

const Buscador = () => {

    const navigate = useNavigate();

    const submitHandler = (e) => {

        e.preventDefault();

        const keyword = e.currentTarget.keyword.value.trim();

        if (keyword === "") {
            swAlert(<h2>El campo no puede estar vacío</h2>);
        } else if (keyword.length < 4) {
            swAlert(<h2>El campo debe tener al menos 4 caracteres</h2>);
        } else {
            e.currentTarget.keyword.value = "";
            navigate(`resultados/${keyword}` );
        }
    }

    return (
        <form className='buscador-peliculas' onSubmit={submitHandler}>
            <label for="buscador" className='buscador-peliculas__label'>
                <input type="text" id="buscador" name="keyword" placeholder="Buscar película..." />
                <Button type="submit" variant='primary' className='buscador-peliculas__btn'>Buscar</Button>
            </label>
        </form>
    )
}

export default Buscador;