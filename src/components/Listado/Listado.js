import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Listado = () => {
    
    const navigate = useNavigate()
    
    useEffect(() => {
        localStorage.getItem('token') === null && navigate('/')
        
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [])

    

    return (
        <>
            <h3>Listado!</h3>
        </>
    )
}

export default Listado;