import { FaFacebook, FaMailBulk, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {

    return (
        <footer className="footer">
            <nav>
                <h3 className="footer__title">Desarrollado por Federico Krenn</h3>
                <ul className='footer__contact'>
                    <li><a href='https://www.facebook.com/kempeess' target='_blank' rel='noreferrer'><FaFacebook /></a></li>
                    <li><a href='mailto:fedekrenn@gmail.com' target='_blank' rel='noreferrer'><FaMailBulk /></a></li>
                    <li><a href='https://github.com/fedekrenn' target='_blank' rel='noreferrer'><FaGithub /></a></li>
                    <li><a href='https://www.linkedin.com/in/fkrenn/' target='_blank' rel='noreferrer'><FaLinkedin /></a></li>
                </ul>
            </nav>
        </footer>
    )
}


export default Footer;