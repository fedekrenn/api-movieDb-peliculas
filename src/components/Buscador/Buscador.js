// Sass
import './Buscador.css';
// Librerías
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
// React
import { useNavigate } from 'react-router-dom';

const Buscador = () => {

    const navigate = useNavigate();

    const submitHandler = (e) => {

        e.preventDefault();

        const keyword = e.currentTarget.keyword.value.trim();

        if (keyword === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Escribe el nombre de una película',
                text: 'El campo no puede estar vacío',
            })
        } else if (keyword.length < 4) {
            Swal.fire({
                icon: 'warning',
                title: 'Frase demasiado corta',
                text: 'Debes escribir por lo menos 4 caracteres',
            })
        } else {
            e.currentTarget.keyword.value = "";
            navigate(`resultados/${keyword}`);
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