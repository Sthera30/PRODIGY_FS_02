import { createContext, useContext, useState } from "react";


const FoodContext = createContext()


export function FoodContextProvider({ children }) {

    const [food, setFood] = useState(null)

    return (

        <FoodContext.Provider value={{ food, setFood }}>

            {children}

        </FoodContext.Provider>
    )

}

export function useFoodContext() {

    return useContext(FoodContext)

}
