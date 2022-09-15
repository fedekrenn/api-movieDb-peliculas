import { useEffect } from "react"


const CategoriesList = () => {

    const prueba = '2'

    useEffect(() => {
        const ENDPOINT = `https://api.themoviedb.org/3/discover/movie?api_key=d492a22487e205c56d74c2e5d17a5013&with_genres=${prueba}`
        console.log(ENDPOINT)
    }, [prueba])

        return (
            <div>Está funcionando!</div>
        )

    }

export default CategoriesList