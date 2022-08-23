// Librerías
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate, Navigate } from 'react-router-dom';
// Context
import { useContext } from 'react';
import LoguinContext from '../../context/loguinContext';

// Componentes
import Button from 'react-bootstrap/Button';



const Loguin = () => {
    
    const { setLogin } = useContext(LoguinContext);

    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')


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