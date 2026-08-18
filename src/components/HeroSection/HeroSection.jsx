import React, { useContext, useEffect, useState } from 'react'
import img from '../../assets/response.jpeg'
import { IoPlay } from "react-icons/io5";
import { IoMdInformationCircle } from "react-icons/io";

import { requests, getImage, requesMoviestDetails, requesMoviesOrTvDetails, requesMoviesOrTvLogo } from '../../api';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { AppContext } from '../../context/AppContext';


export default function HeroSection() {

    let { trendingMovies, setTrendingMovies } = useContext(AppContext)


    const [trending, setTrending] = useState(null)
    const [bgImg, setBgImg] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [logo, setLogo] = useState(null)
    // to remove scrool in loading screen 
  

    // get the trenting movies 
    async function getMovies() {

        await axios.get(requests.trending).then((data) => {


            
            setTrendingMovies(data.data.results)

            getMovieDetails(data.data.results[0])


        }
        ).catch((error) => {
            console.log(error);

        })
            ;

    };
    // get the first movie details  

    async function getMovieDetails(movie) {



        await axios.get(requesMoviesOrTvDetails(movie.id, movie.media_type)).then((data) => {
            console.log(data.data);
            
            setTrending(data.data)
            setBgImg(getImage(data.data.backdrop_path,'original'))
            getMovieLogo(movie.id, movie.media_type);
            setIsLoading(false)
        }
        ).catch((error) => {
            console.log(error);

        })
            ;
    }
    // get logo of movie or series
    async function getMovieLogo(movieId, type) {
        await axios.get(requesMoviesOrTvLogo(movieId, type)).then((data) => {

            setLogo(data.data.logos.filter(
                logo => logo.iso_639_1 === "en"
            )[0].file_path)
        }).catch((error) => {
            console.log(error);

        })


    }


    useEffect(() => {
        // call the movie api for the first time
        getMovies();

    }, []);

    return (
        <>
            <div className={`
              fixed inset-0 z-40 transition-all  duration-1500 ease-in-out
                ${isLoading ? 'opacity-100 ' : 'opacity-0  pointer-events-none'}
            `}>
                <Spinner />
            </div>
            {!isLoading ? <div className="h-[75vh] w-full overflow-hidden relative group">
                <>
                    <img className='h-full w-full object-cover object-center lg:object-cover lg:object-[50%_20%] transition-transform duration-5000 group-hover:scale-110' src={bgImg} alt="" />
                    <div className="absolute top-0 h-full w-full bg-gradient-to-tr from-black lg:via-black lg:via-30%  to-transparent to-100% ">
                        <div className='app-container h-full   flex justify-end-safe sm:pb-10 pb-5 flex-col gap-2'>

                            <h1 className='text-md sm:text-xl sm:font-bold textGradiant '>{trending.production_companies[0]?.name}
                            </h1>


                            {/* <h1 className='text-4xl sm:text-8xl text-amber-50 sm:font-bold '>
                                {trending?.title}{trending?.original_name} 
                                </h1> */}
                            {/* logo  */}
                            <img className='w-30 sm:w-70' src={getImage(logo)} alt="" />

                            {/* genres */}
                            <h1 className='text-sm sm:text-xl sm:font-bold text-amber-50 '>{trending.release_date
                            } <div className='flex gap-3'> {trending.genres.map((val, index) => {
                                return <div key={index}>{val.name}</div>
                            })} </div>
                            </h1>
                            <h1 className='text-xs md:text-sm w-65 sm:w-80 lg:w-100 sm:text-md sm:font-light text-gray-400'>{trending.overview.slice(0, 100) + '...'}</h1>
                            <div className='flex gap-3'>
                                <button className='btnGradiant my-2 rounded text-white p-3 px-6 font-bold flex gap-3 justify-center items-center cursor-pointer hover:scale-95 duration-300'><IoPlay />WATCH NOW</button>
                                <button className=' my-2 rounded bg-gray-700 text-white p-1 px-4 font-bold flex gap-3 justify-center items-center cursor-pointer hover:scale-95 duration-300'><IoMdInformationCircle />
                                    Deatails</button>
                            </div>
                        </div>

                    </div>
                </>

            </div> :
                ''
            }
        </>
    )
}
