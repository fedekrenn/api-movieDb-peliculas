// React
import { createContext, useState, useEffect } from 'react'
// Creación del contexto
const FavoriteContext = createContext()

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favs')) || []
  )

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favorites))
  }, [favorites])

  const addOrRemoveFavorite = (movie) => {
    
    const isInArray = favorites.find((oneMovie) => oneMovie.id === movie.id)

    if (!isInArray) {
      setFavorites((favorites) => favorites.concat(movie))
    } else {
      const deleteFav = favorites.filter((oneMovie) => oneMovie.id !== movie.id)
      setFavorites(deleteFav)
    }
  }

  const data = {
    favorites,
    setFavorites,
    addOrRemoveFavorite,
  }

  return (
    <FavoriteContext.Provider value={data}>{children}</FavoriteContext.Provider>
  )
}

export default FavoriteContext
export { FavoriteProvider }
