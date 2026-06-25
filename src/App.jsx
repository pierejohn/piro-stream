import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import MainLayout from './Layouts/MainLayout/MainLayout'
import AppContextProvider from './context/AppContext.jsx'
  
function App() {

 let routes = createBrowserRouter([
  {path:'/',element:<MainLayout/>,children:[

    {index:true,element:<Home/>},
    {path:'/movies',element:<Home/>},
    {path:'/tv_shows',element:<Home/>},
    {path:'/new&popular',element:<Home/>},
    {path:'/browse',element:<Home/>},
  ]},
  
])


  return (
    <>
    
    <AppContextProvider>
    <RouterProvider router={routes} />
   </AppContextProvider>
    
    </>
  )
}

export default App
