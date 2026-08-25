import React from 'react'
import style from './MovieCartTrending.module.css'
import img from '../../assets/responseText.jpeg'
import { PiNumberTwoBold, PiNumberOneBold } from "react-icons/pi";
import '../../index.css'
import { useNavigate } from 'react-router-dom';


export default function MovieCartTrending(props) {
  // const {type}=props
  const type = props.movieDetails.media_type
  const id = props.movieDetails.id
  
  let navigate=useNavigate()

  function MoviOrTvDetails() {
    if (type == 'movie') {
     console.log(id);
     

      navigate(`/watch/movies/${id}`);
    } else {
     console.log(id);
      

      navigate(`/watch/tv/${id}/Season/1`);
    
    }


  }

  return (
    <>


      <div className="group relative w-50  md:w-65">
        {/* Background Number */}
        {/* <h1 className="absolute left-[-40px] top-[5px] rotate-4 text-[10rem] leading-[0.8] text-transparent [-webkit-text-stroke:1px_#6366f1] z-0 opacity-30 group-hover:opacity-60 group-hover:z-10 transition-all duration-500  ">
            {props.index}
          </h1> */}

        {/* Card */}
        <div onClick={() => MoviOrTvDetails()} className="relative overflow-hidden rounded-2xl bg-balck">
          <img
            className=" w-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
            src={`https://image.tmdb.org/t/p/w500/${props.movieDetails.backdrop_path}`}

            alt=""
          />

          {/* Gradient Overlay */}
          <div className="absolute w-full h-full inset-0 rounded-2xl group-hover:scale-110 bg-gradient-to-r from-gray-900 via-black/50 to-transparent" />

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
