import React, { useEffect, useState } from 'react'
import { IoCaretBackOutline } from "react-icons/io5";
import axios from 'axios';
import { imdbIdForEpisode, tvSeasonDetailsApi } from '../../api';
import { useParams } from 'react-router-dom';

export default function VideoPlayer({ movieDetails, setIsPlayingVideo, tybe }) {

    let { imdb_id, id } = movieDetails

    // let  {imdb_id, title, id }= movieDetails
    const [loadingEpisodes, setLoadingEpisodes] = useState(false)
    const [seasonDetails, setSeasonDetails] = useState(null)

     let{SeasonNum,EpisodeNum}= useParams()
     let seriesId= useParams().id
    
     
     






    const [selectedSource, setSelectedSource] = useState(0)
    // console.log(imdb_id);



    function goBack() {



        setIsPlayingVideo(false)
    }


    // id = TMDB id, imdb_id = like tt1234567

    // const sources = [
    //     { 
    //         name: "Server 1", 
    //         url: `https://vidsrc.xyz/embed/movie?imdb=${imdb_id}` 
    //     },
    //     { 
    //         name: "Server 2", 
    //         url: `https://vidsrc.xyz/embed/movie?tmdb=${id}` 
    //     },
    //     { 
    //         name: "Server 3", 
    //         url: `https://player.vidsrc.nl/embed/movie/${id}` 
    //     },
    //     { 
    //         name: "Server 4", 
    //         url: `https://embed.su/embed/movie/${imdb_id}` 
    //     },
    //     { 
    //         name: "Server 5", 
    //         url: `https://autoembed.co/embed/movie/${imdb_id}` 
    //     },
    // ]

    if (!imdb_id) {
        return (
            <div className="text-white text-center py-10 bg-gray-900 rounded-xl">
                <p className='text-gray-400'>Video not available for this movie.</p>
                 
            </div>
        )
    }

    return (
        <div className='w-full '>
            {tybe=='tv'?"": <button className='text-red-900 mb-4 flex gap-2 items-center md:text-2xl lg:text-3xl text-xl cursor-pointer' onClick={() => goBack()}><IoCaretBackOutline />Back
            </button>}
            
            {/* Title */}
            {/* <h1 className='text-white text-2xl font-bold mb-4'>{title}</h1>  */}

            {/* Source Buttons */}
            {/* <div className='flex gap-2 mb-4 flex-wrap'>
                {sources.map((source, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedSource(index)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300
                            ${selectedSource === index
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                    >
                        {source.name}
                    </button>
                ))}
            </div> */}

            {/* Player */}
            <div
                className="relative w-full rounded-xl overflow-hidden bg-black"
                style={{ paddingBottom: '46.25%' }}
            >
                <iframe
                    className="
      absolute top-0 left-0 origin-top-left
      w-[117.65%] h-[117.65%] scale-[0.85]
      md:w-full md:h-full md:scale-100
    "
    
src={
    tybe=="tv"?`https://vaplayer.ru/embed/tv/${seriesId}/${SeasonNum}/${EpisodeNum}`:`https://vaplayer.ru/embed/${tybe}/${imdb_id}`
    
}
                    // src={`https://vaplayer.ru/embed/${tybe}/${imdb_id}`}
                    
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    // title={title}
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            {/* <p className='text-gray-500 text-sm mt-3'>
                ⚠️ If video doesn't load, please try another server.
            </p> */}

        </div>
    )
}