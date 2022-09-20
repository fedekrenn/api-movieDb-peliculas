// React
import { useNavigate } from 'react-router-dom';
// Librerías
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';

const SearchBar = () => {

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
        <form className='search-movies' onSubmit={submitHandler}>
            <label htmlFor="search" className='search-movies__label'>
                <input type="text" id="search" name="keyword" placeholder="Buscar película..." />
                <Button type="submit" variant='primary' className='search-movies__btn'>Buscar</Button>
            </label>
        </form>
    )
}

export default SearchBar;