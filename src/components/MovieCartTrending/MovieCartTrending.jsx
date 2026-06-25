import React from 'react'
import style from './MovieCartTrending.module.css'
import img from '../../assets/responseText.jpeg'
import { PiNumberTwoBold, PiNumberOneBold } from "react-icons/pi";
import '../../index.css'

export default function MovieCartTrending(props) {
  
  
  return (
    <>
      

        <div className="group relative w-65">
          {/* Background Number */}
          <h1 className="absolute left-[5px] top-[5px] text-[4rem] leading-[0.8] text-transparent [-webkit-text-stroke:1px_#6366f1] z-10 transition-all duration-500  ">
            {props.index}
          </h1>

          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl">
            <img
              className="h-35 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={`https://image.tmdb.org/t/p/original/${props.movieDetails.backdrop_path}`}

              alt=""
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0  bg-gradient-to-r from-black via-black/70 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 right-0 p-4">
              <h3 className="font-semibold text-gray-300">
                {props.movieDetails.title}
                {props.movieDetails.name}
              </h3>
              
            </div>
          </div>
        </div>








      
    </>
  )
}
