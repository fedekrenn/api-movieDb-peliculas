// React
import { useEffect, useState } from 'react'
// Librerías
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
// Componentes
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner'
import Detail from '../../components/Detail/Detail'

const DetailContainer = () => {
  const token = sessionStorage.getItem('token')

  const { id } = useParams()

  const [movie, setMovie] = useState({})
  const [videoData, setVideoData] = useState('')
  const [loading, setLoading] = useState(true)

  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-MX`
      )
      .then((res) => {
        setMovie(res.data)
        setLoading(false)
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Problema al llamar a la base de datos',
          text: `${err}`,
        })
      })

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=es-MX`
      )
      .then((res) => {
        const videoTrailer = res.data.results.find(
          (video) => video.type === 'Trailer'
        )
        setVideoData(videoTrailer)
      })
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  if (!token) return <Navigate to='/' />

  if (loading) return <LoaderSpinner />

  return <Detail movie={movie} videoData={videoData} />
}

export default DetailContainer
