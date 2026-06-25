import React, { createContext, useState } from 'react'


export let AppContext=createContext(2)


export default function AppContextProvider({children})
{
 let [trendingMovies, setTrendingMovies] = useState([])

    
   return (
  <AppContext.Provider value={{ trendingMovies ,setTrendingMovies}}>
    {children}
  </AppContext.Provider>
)

    // 
}