import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import MainLayout from './Layouts/MainLayout/MainLayout'
import AppContextProvider from './context/AppContext.jsx'
// import { Analytics } from "@vercel/analytics/next"
import Providers from './pages/Home/Providers.jsx'
import WatchMovie from './components/WatchMovie/WatchMovie.jsx'

import WatchTv from './components/WatchTv/WatchTv.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Search from './components/Search/Search.jsx'
import StreamTv from './components/StreamTv/StreamTv.jsx'
import Footer from './components/Footer/Footer.jsx'
import MediaList from './components/MediaList/MediaList.jsx'
import ActorDetails from './components/ActorDetails/ActorDetails.jsx'
function App() {

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // ✅ Cache for 5 minutes
            retry: 1, // retry once if failed
        }
    }
})




 let routes = createBrowserRouter([
  {path:'/',element:<MainLayout/>,children:[

    {index:true,element:<Home/>},
    {path:'/movies',element:<Providers key="movies" tybe={'movies'}/>},
    {path:'/:media/:type/:category',element:<MediaList/>},
    {path:'watch/movies/:id',element:<WatchMovie tybe={'movie'}/>},
    {path:'watch/tv/:id/Season/:SeasonNum',element:<WatchMovie tybe={'tv'}/>},
    {path:'watch/tv/:id/Season/:SeasonNum/Episode/:EpisodeNum',element:<StreamTv tybe={'tv'}/>},
    {path:'/tv_shows',element:<Providers key="tv" tybe={'tv'}/>},
    {path:'/search',element:<Search/>},
    {path:'/actorDetail/:id',element:<ActorDetails/>},
    {path:'/*',element:<><h1 className='h-screen w-screen flex items-center justify-center  text-accent text-2xl md:text-4xl lg:text-9xl '>Error Page Not Found (404)</h1></> }
  ]},
  
])


  return (
    < >
    
    <AppContextProvider>
       
    <RouterProvider router={routes} />
   {/* <Analytics /> */}
   </AppContextProvider>
    
    </>
  )
}

export default App
