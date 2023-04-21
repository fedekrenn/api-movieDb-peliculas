// React
import { createContext, useState } from 'react'
// Creación del contexto
const LoguinContext = createContext()

const LoguinProvider = ({ children }) => {
  const [login, setLogin] = useState(false)

  const token = localStorage.getItem('token')

  token && setLogin(true)

  const data = {
    login,
    setLogin,
  }

  return (
    <LoguinContext.Provider value={data}>{children}</LoguinContext.Provider>
  )
}

export default LoguinContext
export { LoguinProvider }
