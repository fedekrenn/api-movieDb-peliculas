import './Login.css'
import axios from 'axios';
import swAlert from '@sweetalert/with-react'

const Loguin = () => {

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
                console.log(res.data)
                swAlert(<h2>Estás logueado correctamente!</h2>);
                const tokenRecibido = res.data.token;
                localStorage.setItem('token', tokenRecibido);
            })
    }

    return (
        <>
            <h2>Formulario de loguin</h2>
            <form onSubmit={submitHandler}>
                <label>
                    <span>Usuario: </span>
                    <br/>
                    <input type="email" placeholder="Ingresa tu email" name="email" />
                </label>
                <br/>
                <label>
                    <span>Contraseña: </span>
                    <br/>
                    <input type="password" placeholder="Ingresa tu contraseña" name="password" />
                </label>
                <br/>
                <button type="submit">Iniciar sesión</button>
            </form>
        </>
    )
}

export default Loguin;