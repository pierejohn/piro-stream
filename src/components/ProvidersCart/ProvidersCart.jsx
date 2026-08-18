import React from 'react'

import img from '../../assets/responseText.jpeg'
import { PiNumberTwoBold, PiNumberOneBold } from "react-icons/pi";
import '../../index.css'

export default function ProvidersCart(props) {
  
   
   
   
  return (
    <>
      

        <div className="group relative w-20">
         
          

          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl">
            <img
              className="h-20 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={`https://image.tmdb.org/t/p/w500/${props.providers.logo_path}`}

              alt=""
            />

            {/* Gradient Overlay */}
            {/* <div className="absolute inset-0  bg-gradient-to-r from-black via-black/70 to-transparent" /> */}

            {/* Content */}
            {/* <div className="absolute bottom-0 right-0 p-4">
              <h3 className="font-semibold text-gray-300">
                {props.movieDetails.title}
                {props.movieDetails.name}
              </h3>
              
            </div> */}
          </div>
        </div>








      
    </>
  )
}
