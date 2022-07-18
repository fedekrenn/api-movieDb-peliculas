// React
import { createContext } from "react";

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {


    const data = {
        
    }

    return (
        <FavoriteContext.Provider value={data}>
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteContext
export { FavoriteProvider }