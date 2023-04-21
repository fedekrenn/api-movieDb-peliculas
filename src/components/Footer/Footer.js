import { FaMailBulk, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='logo-container'>
        <Link to={'/listado'}>
          <span className='navbar-brand'>Krennflix</span>
        </Link>
        <p>Condiciones del servicio</p>
        <p>Política de Privacidad</p>
        <p>Contacto</p>
      </div>
      <ul className=''>
        {/* <FaMailBulk />
        <FaGithub />
        <FaLinkedin /> */}
        <li>
          <a href='mailto:fedekrenn@gmail.com' target='_blank' rel='noreferrer'>
            <FaMailBulk />
          </a>
        </li>
        <li>
          <a
            href='https://github.com/fedekrenn'
            target='_blank'
            rel='noreferrer'
          >
            <FaGithub />
          </a>
        </li>
        <li>
          <a
            href='https://www.linkedin.com/in/fkrenn/'
            target='_blank'
            rel='noreferrer'
          >
            <FaLinkedin />
          </a>
        </li>
      </ul>
      <h4 >© 2023 Krennflix - Cine, series, teatro y mucho mas</h4>
    </footer>
  )
}

export default Footer
