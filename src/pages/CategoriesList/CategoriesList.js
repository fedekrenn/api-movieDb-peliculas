import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner'
import MovieCard from '../../components/MovieCard/MovieCard'

const CategoriesList = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const { id } = useParams()
  const location = useLocation()

  const token = sessionStorage.getItem('token')

  useEffect(() => {
    const ENDPOINT = `https://api.themoviedb.org/3/discover/movie?api_key=d492a22487e205c56d74c2e5d17a5013&language=es-ES&with_genres=${id}`

    axios
      .get(ENDPOINT)
      .then((res) => {
        const noImageFilter = res.data.results.filter(
          (movie) => movie.poster_path !== null
        )

        const orderedMovies = noImageFilter.sort(
          (a, b) => b.release_date - a.release_date
        )

        setMovies(orderedMovies)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })

    return () => {
      setMovies([])
      setLoading(true)
    }
  }, [id])

  if (!token) return <Navigate to='/login' />

  if (loading) return <LoaderSpinner />

  return (
    <>
      <h2>Películas en la categoría "{location.state}"</h2>
      <section className='total-movies'>
        {movies.map((movie, i) => (
          <MovieCard key={i} movie={movie} />
        ))}
      </section>
    </>
  )
}

export default CategoriesList
