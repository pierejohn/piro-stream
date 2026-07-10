import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { requestAllProviders } from '../api';


export let AppContext=createContext(2)


export default function AppContextProvider({children})
{
 let [trendingMovies, setTrendingMovies] = useState([])
    const [filterProvider, setFilterProvider] = useState([])
    const [isLodingFilterProvider, setIsLodingFilterProvider] = useState(true)


    const wantedProviders = [
  "Netflix",
  "Disney Plus",
  "Amazon Prime Video",
  "Apple TV",
  "Max",
  "Hulu",
  "Peacock Premium",
  "Crunchyroll",
  "Shahid VIP",
  "MUBI",
  "Curiosity Stream",
  "STARZ",
  "AMC+",
  "YouTube Premium",
  

];
let filtered
let uniqueProviders

     async function requistProviders() {
           await axios.get(requestAllProviders('tv')).then((data) => {
            //  console.log(data.data.results);
       
             filtered = data.data.results.filter(provider =>
               wantedProviders.includes(provider.provider_name)
       
             );
             uniqueProviders = filtered.filter(
               (provider, index, self) =>
                 index === self.findIndex(
                   p => p.provider_name === provider.provider_name
                 )
             );
             setFilterProvider(uniqueProviders)
             setIsLodingFilterProvider(false)
             // console.log(filtered);
       
           }).catch((error) => {
             console.log(error);
       
           })
         }
       
         useEffect(() => {
           requistProviders();
         }, []);
   return (
  <AppContext.Provider value={{ trendingMovies ,setTrendingMovies,filterProvider, setFilterProvider,wantedProviders,isLodingFilterProvider}}>
    {children}
  </AppContext.Provider>
)

    // 
}