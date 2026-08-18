import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { getImage, requesMoviesOrTvDetails, requesMoviesOrTvLogo, trailerApi } from '../../api';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import { IoPlay } from 'react-icons/io5';
import { CiCalendarDate } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import RecommendationsToWatch from '../RecommendationsToWatch/RecommendationsToWatch';
import VideoDetails from '../VideoDetails/VideoDetails';
import CastDetails from '../CastDetails/CastDetails';
// ✅ Import the new component
import SeasonsAndEpisodes from '../SeasonsAndEpisodes/SeasonsAndEpisodes'; 

export default function WatchMovie({ tybe }) {

    let parms = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logo, setLogo] = useState(null);
    const [trailerVideo, setTrailerVideo] = useState(null);
    const [showVideo, setShowVideo] = useState(false);
    const [isPlayingVideo, setIsPlayingVideo] = useState(false);
    const [showFullOverview, setShowFullOverview] = useState(false)
    const [iframeReady, setIframeReady] = useState(false)

    async function getMovieLogo(movieId, type) {
        try {
            const { data } = await axios.get(requesMoviesOrTvLogo(movieId, type))
            const englishLogo = data.logos.find(logo => logo.iso_639_1 === "en")
            if (englishLogo) setLogo(englishLogo.file_path)
        } catch (error) {
            console.log(error);
        }
    }

    async function getDetails() {
        setLoading(true);
        setShowVideo(false)
        setIframeReady(false)
        setTrailerVideo(null)
        setLogo(null)
        setShowFullOverview(false)

        try {
            const { data } = await axios.get(requesMoviesOrTvDetails(parms.id, tybe));
            setMovieDetails(data);
            getMovieLogo(parms.id, tybe)
            getMovieTrailer(parms.id)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function getMovieTrailer(id) {
        try {
            const { data } = await axios.get(trailerApi(id, tybe))
            const trailer = data.results.find(
                v => v.type === "Trailer" && v.site === "YouTube"
            ) || data.results[0]

            if (trailer?.key) {
                setTrailerVideo(
                    `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&loop=1&playlist=${trailer.key}`
                )
            }
        } catch (error) {
            console.log(error);
        }
    }

    function playVideo() {
        setIsPlayingVideo(true)
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        getDetails();

        const timer = setTimeout(() => {
            setShowVideo(true)
        }, 3000);

        return () => clearTimeout(timer)
    }, [parms.id]);

    if (loading) {
        return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
    }

    if (!movieDetails) {
        return <div className="pt-20 text-white text-center">Not found.</div>;
    }

    return (
        <div>
            {movieDetails && (
                <div className={`h-[70vh] w-full ${isPlayingVideo ? 'hidden' : ''} relative group`}>

                    <div className="relative w-full h-[70vh] overflow-hidden">
                        <img
                            src={getImage(movieDetails.backdrop_path,'original')}
                            alt=""
                            className={`
                                absolute inset-0 w-full h-full object-cover
                                transition-opacity duration-1000
                                ${showVideo && iframeReady ? "opacity-0" : "opacity-100"}
                            `}
                        />

                        {trailerVideo && (
                            <div className="absolute inset-0 overflow-hidden">
                                <iframe
                                    className={`
                                        absolute top-1/2 left-1/2
                                        -translate-x-1/2 -translate-y-1/2
                                        w-[300vw] h-[170vh]
                                        md:w-[140vw] md:h-[79vw]
                                        transition-opacity duration-1000
                                        ${showVideo && iframeReady ? "opacity-100" : "opacity-0"}
                                    `}
                                    src={trailerVideo}
                                    allow="autoplay; encrypted-media; compute-pressure"
                                    allowFullScreen
                                    onLoad={() => setIframeReady(true)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute top-0 h-[calc(100%+4px)] w-full bg-gradient-to-t from-black via-black via-25% to-transparent to-100%">
                        <div className='app-container h-[calc(100%+4px)] w-full flex justify-end-safe sm:pb-10 pb-5 flex-col gap-2'>

                            {logo && <img className='w-30 sm:w-70' src={getImage(logo)} alt="" />}

                            <div className='flex gap-3'>
                                <div className='text-gray-500 flex gap-2 items-center'>
                                    <CiCalendarDate size={20} />
                                    <h1 className='text-xs sm:text-lg'>
                                        {movieDetails.release_date || movieDetails.first_air_date}
                                    </h1>
                                </div>

                                {tybe === 'tv' ? (
                                    <div className='text-gray-500 flex gap-2 items-center'>
                                        <h1 className='text-xs sm:text-lg'>
                                            {movieDetails.number_of_seasons}
                                            {movieDetails.number_of_seasons === 1 ? " season" : " seasons"}
                                        </h1>
                                    </div>
                                ) : (
                                    <div className='text-gray-500 flex gap-2 items-center'>
                                        <IoTimeOutline size={20} />
                                        <h1 className='text-xs sm:text-lg'>
                                            {Math.floor(movieDetails.runtime / 60) + "h " + String(movieDetails.runtime % 60).padStart(2, "0") + "m"}
                                        </h1>
                                    </div>
                                )}
                            </div>

                            <div className='flex-wrap gap-3 text-gray-500 w-[50%] hidden md:flex'>
                                {movieDetails.genres.map((val, index) => (
                                    <div className='border text-xs border-gray-700 py-1 px-2 rounded' key={index}>
                                        {val.name}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-3 mt-5 text-gray-400 w-[60%]">
                                <p>⭐ {movieDetails.vote_average.toFixed(1)}/10</p>
                                <p>🗳️ {movieDetails.vote_count} votes</p>
                                <p>🔥 {movieDetails.popularity.toFixed(1)} popularity</p>
                            </div>

                            <div className="relative">
                                <div className="rounded absolute w-30 h-60 right-0 -top-30 sm:w-40 sm:h-80 sm:right-10 sm:-top-25 md:w-60 md:h-120 md:right-10 md:-top-55">
                                    <img className='rounded-2xl' src={getImage(movieDetails.poster_path,'original')} alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="app-container gap-4 relative">
                            <div className='w-[60%] sm:w-[50%]'>
                                <h1 className='text-xs md:text-sm sm:font-light text-gray-400'>
                                    {showFullOverview
                                        ? movieDetails.overview
                                        : `${movieDetails.overview.slice(0, 100)}`}
                                </h1>
                                {movieDetails.overview.length > 100 && (
                                    <button
                                        onClick={() => setShowFullOverview(!showFullOverview)}
                                        className='text-primary text-xs md:text-sm mt-2 hover:underline cursor-pointer'
                                    >
                                        {showFullOverview ? 'See less' : 'See more'}
                                    </button>
                                )}
                            </div>

                            <div className='flex gap-3'>
                                <NavLink onClick={
                                    ()=>
                                    {if(tybe=='movie'){
                                      playVideo()  
                                    }
                                       
                                    }
                                   
                                
                                }
                                to={(tybe=='tv')?'Episode/1':''}
                                    className='btnGradiant my-2 px-1 rounded font-bold text-white md:p-3 md:px-6 flex gap-1 justify-center items-center cursor-pointer hover:scale-95 duration-300 text-sm'>
                                    <IoPlay />WATCH NOW
                                </NavLink>
                                <button className='my-2 rounded bg-gray-700 text-white p-1 px-2 md:px-4 font-bold flex gap-3 justify-center items-center cursor-pointer hover:scale-95 duration-300'>
                                    <FaPlus />My Watchlist
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {isPlayingVideo ? (
                <div className='app-container mt-25'>
                    
                    
                    <VideoPlayer movieDetails={movieDetails} tybe='movie' setIsPlayingVideo={setIsPlayingVideo} />
                </div>
            ) : (
                <div className={`${showFullOverview
                    ? `${movieDetails.overview.length > 300 ? 'mt-75' : 'mt-55'} sm:mt-54`
                    : 'mt-40 sm:mt-40'
                    } app-container`}>

                    {/* ✅ Use the new component here */}
                    {tybe === 'tv' && movieDetails.seasons && (
                        <SeasonsAndEpisodes 
                            tvId={movieDetails.id} 
                            seasons={movieDetails.seasons} 
                        />
                    )}

                    <CastDetails type={tybe} Details={movieDetails} />
                    <RecommendationsToWatch type={tybe} id={parms.id} />
                    <VideoDetails movieDetails={movieDetails} type={tybe} />
                </div>
            )}
        </div>
    )
}