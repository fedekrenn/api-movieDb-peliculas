// Css
import './Login.css'

// Librerías
import axios from 'axios';
import swAlert from '@sweetalert/with-react'
import { useNavigate, Navigate } from 'react-router-dom';

// Componentes
import Button from 'react-bootstrap/Button';

const Loguin = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const submitHandler = (e) => {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === "" || password === "") {
            swAlert(<h2>Los campos no pueden estar vacíos</h2>);
            return
        }

        if (!regexEmail.test(email) && email !== "") {
            swAlert(<h2>Debes escribir una direccion de correo electrónica válida</h2>);
            return
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            swAlert(<h2>Usuario o contraseña incorrectos</h2>);
            return
        }

        console.log("Login correcto")
        axios
            .post('http://challenge-react.alkemy.org', { email, password })
            .then(res => {
                swAlert(<h2>Estás logueado correctamente!</h2>);
                const tokenRecibido = res.data.token;
                localStorage.setItem('token', tokenRecibido);
                navigate('/listado')
            })
    }

    return (
        <>
            {token ?
                <Navigate to="/listado" replace />
                :
                <>
                    <h2>Formulario de login</h2>
                    <form onSubmit={submitHandler}>
                        <label>
                            <span>Usuario: </span>
                            <br />
                            <input type="email" placeholder="Ingresa tu email" name="email" />
                        </label>
                        <br />
                        <label>
                            <span>Contraseña: </span>
                            <br />
                            <input type="password" placeholder="Ingresa tu contraseña" name="password" />
                        </label>
                        <br />
                        <Button type="submit" variant='success'>Iniciar sesión</Button>
                    </form>
                </>
            }
        </>
    )
}

export default Loguin;