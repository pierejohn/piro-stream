import React, { useState } from 'react'
import { getImage, requesMoviesOrTvDetails } from '../../api'
import { FaPlay } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MoviesCartPoster(props) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)
    let navigate = useNavigate()
    let { release_date, title, poster_path, name, overview, id } = props.movieDetails
    let { type } = props

    async function MoviOrTvDetails() {
        if (type == 'movie') {
            // console.log(props.movieDetails);

            navigate(`/watch/movies/${id}`);
        } else {
            // console.log(props.movieDetails);
            // await axios.get(requesMoviesOrTvDetails(id, type))
            //     .then((data) => {
            //         // console.log(props.movieDetails);
            //     navigate(`/watch/tv/${id}`);

            //         console.log(data.data);
                    
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
               
                navigate(`/watch/tv/${id}/Season/1`);
            //  navigate(`/movies`)
        }


    }

    return (
        <>
            <div onClick={() => MoviOrTvDetails()} className="group w-25 md:w-40">
                <div className="relative overflow-hidden group rounded-2xl">

                    {/* Skeleton Loader */}
                    {
                        !isLoaded && !hasError
                        && (

                            <div className="w-full   aspect-[2/3] bg-gray-800 animate-pulse rounded-2xl" />


                        )}

                    {/* Error Fallback */}
                    {hasError && (
                        <div className="w-full aspect-[2/3] bg-gray-900 flex items-center justify-center rounded-2xl">
                            <span className="text-gray-500 text-xs">No Image</span>
                        </div>
                    )}

                    {/* Actual Image */}
                    {!hasError && (
                        <img
                            className={`
                                w-full object-contain transition-all duration-500
                                group-hover:scale-110
                                ${isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}
                            `}
                            src={getImage(poster_path)}
                            alt={title || name}
                            onLoad={() => setIsLoaded(true)}
                            onError={() => setHasError(true)}
                        />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 group-hover:bg-gradient-to-t group-hover:from-black group-hover:via-black/70 group-hover:to-transparent duration-1000" />

                    {/* Play Button */}
                    <div className="absolute bottom-0 flex justify-center items-center w-full h-full p-4">
                        <div className='size-10 opacity-0 group-hover:opacity-100 transform duration-1000 bg-red-700 text-white flex justify-center items-center rounded-full'>
                            <FaPlay />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="absolute -bottom-30 opacity-0 group-hover:bottom-0 group-hover:opacity-100 duration-1000 p-4">
                        <h3 className="font-semibold text-sm text-gray-300">
                            {(title || name)?.length > 20
                                ? `${(title || name).slice(0, 20)}...`
                                : (title || name)}
                        </h3>
                        <h3 className="font-semibold text-xs text-gray-600">
                            {(overview)?.length >30
                                ? `${(overview).slice(0, 30)}...`
                                : (overview)}
                          
                        </h3>
                    </div>
                </div>
            </div>
        </>
    )
}