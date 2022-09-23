// React
import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
// Librerías
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// Context
import { useContext } from 'react';
import LoguinContext from '../../context/loguinContext';



const Loguin = () => {

    const { setLogin } = useContext(LoguinContext);

    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')


    useEffect(() => {
        // Obtengo el main y le agrego la clase para que sólo en esta vista exista el fondo
        const main = document.querySelector('main');
        main.classList.add('background-img')

        return () => {
            main.classList.remove('background-img')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const submitHandler = (e) => {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            Swal.fire({
                icon: 'error',
                title: 'Revisa tus credenciales',
                text: 'El email o la contraseña son incorrectos',
            })
            return
        }

        axios
            .post('http://challenge-react.alkemy.org/', { email, password })
            .then(res => {

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Iniciaste sesión correctamente!'
                })

                setLogin(true);
                const tokenRecibido = res.data.token;
                sessionStorage.setItem('token', tokenRecibido);
                navigate('/listado');
            })
    }

    if (token) return <Navigate to='/listado' />

    return (
        <div className='form-access'>
            <h2>Formulario de login</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Iniciar sesión
                </Button>
            </Form>
        </div>
    )
}

export default Loguin;