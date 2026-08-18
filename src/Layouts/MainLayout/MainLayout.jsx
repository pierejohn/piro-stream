import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet, useMatch } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

export default function MainLayout() {
   
   return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <ScrollToTop />
      <main className="flex-1">
        <Outlet />
      </main>

       <Footer />
    </div>
  )
}
