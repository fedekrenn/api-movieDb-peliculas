import './Buscador.css';
import Button from 'react-bootstrap/Button';
import swAlert from '@sweetalert/with-react';

const Buscador = () => {

    const submitHandler = (e) => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value;
        keyword === "" && swAlert(<h2>El campo no puede estar vacío</h2>);
        console.log(keyword);
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