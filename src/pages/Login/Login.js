// React
import { useEffect, useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
// Librerías
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// Context
import { useContext } from 'react';
import LoguinContext from '../../context/loguinContext';
// Firebase Auth
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from '../../utils/firebaseConfig';


const Loguin = () => {

    const { setLogin } = useContext(LoguinContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')


    useEffect(() => {
        const main = document.querySelector('main');
        main.classList.add('background-img')

        return () => {
            main.classList.remove('background-img')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleSubmit = (e) => {

        e.preventDefault();

        if (email === "" || password === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Los campos no pueden estar vacíos',
            })
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const receivedToken = userCredential.user.accessToken;
                sessionStorage.setItem('token', receivedToken);
                setLogin(true);
                navigate('/listado');

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

            })
            .catch((error) => {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o contraseña incorrectos',
                })
            });
    }

    if (token) return <Navigate to='/listado' />

    return (
        <div className='form-access'>
            <h2>Formulario de login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Iniciar sesión
                </Button>
                <Link to="/registro">
                    <Button variant="primary" type="submit" className='register-btn'>
                        Crear cuenta
                    </Button>
                </Link>
            </Form>
        </div>
    )
}

export default Loguin;