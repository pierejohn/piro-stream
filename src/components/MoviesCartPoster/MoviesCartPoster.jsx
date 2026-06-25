import React, { useState } from 'react'
import { getImage } from '../../api'
import { FaPlay } from "react-icons/fa";

export default function MoviesCartPoster(props) {
    // console.log(props.movieDetails.poster_path);
    const [img, setImg] = useState(props.movieDetails.poster_path)

    let { release_date, title, poster_path, name ,overview} = props.movieDetails

    return (
        <>


            <div className="group  w-25 md:w-40">


                {/* Card */}
                <div className="relative overflow-hidden group rounded-2xl">
                    <img
                        className=" w-full object-contain transition-transform duration-500 group-hover:scale-110"
                        src={getImage(poster_path)}
                        loading='lazy'
                        alt=""
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0  group-hover:bg-gradient-to-t group-hover:from-black group-hover: group-hover:via-black/70 group-hover:to-transparent duration-1000" />

                    {/* Content */}
                    <div className="absolute bottom-0 flex justify-center items-center  w-full h-full  p-4">
                        <div className='size-10 opacity-0 group-hover:opacity-100 transform duration-1000 bg-red-700 text-white flex justify-center items-center rounded-full'>
                            <FaPlay />

                        </div>
                    </div>

                    <div className="absolute -bottom-30 opacity-0 group-hover:bottom-0 group-hover:opacity-100 duration-1000 p-4">

                        <h3 className="font-semibold  text-gray-300">
                            {title}
                            {name}
                        </h3>
                        <h3 className="font-semibold text-xs text-gray-600 ">  {overview.slice(0,30)+'...'}</h3>
                    </div>
                </div>
            </div>









        </>
    )
}
