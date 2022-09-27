// React
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Librerías
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
// Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from '../../utils/firebaseConfig';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const navigate = useNavigate();

    useEffect(() => {
        const main = document.querySelector('main');
        main.classList.add('background-img')

        return () => {
            main.classList.remove('background-img')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (event) => {

        event.preventDefault();

        if (email === "" || password === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Los campos no pueden estar vacíos',
            })
            return
        }

        if (!regexEmail.test(email) && email !== "") {
            Swal.fire({
                icon: 'warning',
                title: 'Revisa tu correo electrónico',
                text: 'El email ingresado debe corresponder a un formato válido de correo electrónico',
            })
            return
        }

        if (password !== password2) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden',
            })
            return
        }

        if (password.length < 6 && password !== "") {
            Swal.fire({
                icon: 'warning',
                title: 'Revisa tu contraseña',
                text: 'La contraseña debe tener al menos 6 caracteres',
            })
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario creado con éxito',
                    text: 'Ahora puedes iniciar sesión',
                })
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div className='form-access'>
            <h2>Formulario de registro</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPasswordTwo">
                    <Form.Label>Repite tu contraseña:</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password2" onChange={(e) => setPassword2(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
                <Link to="/">
                    <Button variant="primary" type="submit" className='register-btn'>
                        Ya tengo cuenta
                    </Button>
                </Link>
            </Form>
        </div>
    )
}

export default Register