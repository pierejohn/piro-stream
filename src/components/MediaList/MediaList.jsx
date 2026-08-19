import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import MoviesCartPoster from '../MoviesCartPoster/MoviesCartPoster'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
    popularMoviesAndTv,
    requesMoviesOrTvFromProvider
} from '../../api'
import Genere from '../Genere/Genere'

import {
    FaFistRaised, FaMountain, FaFilm, FaLaugh,
    FaUserSecret, FaBook, FaTheaterMasks, FaUsers,
    FaHatWizard, FaLandmark, FaGhost, FaMusic, FaSearch,
    FaHeart, FaRocket, FaTv, FaBolt, FaFlag, FaHorse
} from "react-icons/fa"
import GenereMobile from '../GenereMobile/GenereMobile'


export default function MediaList() {

    const genres = [
        [
            { name: "Action", id: 28, icon: <FaFistRaised /> },
            { name: "Adventure", id: 12, icon: <FaMountain /> },
            { name: "Animation", id: 16, icon: <FaFilm /> },
            { name: "Comedy", id: 35, icon: <FaLaugh /> },
            { name: "Crime", id: 80, icon: <FaUserSecret /> },
            { name: "Documentary", id: 99, icon: <FaBook /> },
            { name: "Drama", id: 18, icon: <FaTheaterMasks /> },
            { name: "Family", id: 10751, icon: <FaUsers /> },
            { name: "Fantasy", id: 14, icon: <FaHatWizard /> },
            { name: "History", id: 36, icon: <FaLandmark /> },
            { name: "Horror", id: 27, icon: <FaGhost /> },
            { name: "Music", id: 10402, icon: <FaMusic /> },
            { name: "Mystery", id: 9648, icon: <FaSearch /> },
            { name: "Romance", id: 10749, icon: <FaHeart /> },
            { name: "Science Fiction", id: 878, icon: <FaRocket /> },
            { name: "TV Movie", id: 10770, icon: <FaTv /> },
            { name: "Thriller", id: 53, icon: <FaBolt /> },
            { name: "War", id: 10752, icon: <FaFlag /> },
            { name: "Western", id: 37, icon: <FaHorse /> }
        ],

        [
            { name: "Action & Adventure", id: 10759, icon: <FaFistRaised /> },
            { name: "Animation", id: 16, icon: <FaFilm /> },
            { name: "Comedy", id: 35, icon: <FaLaugh /> },
            { name: "Crime", id: 80, icon: <FaUserSecret /> },
            { name: "Documentary", id: 99, icon: <FaBook /> },
            { name: "Drama", id: 18, icon: <FaTheaterMasks /> },
            { name: "Family", id: 10751, icon: <FaUsers /> },
            { name: "Kids", id: 10762, icon: <FaUsers /> },
            { name: "Mystery", id: 9648, icon: <FaSearch /> },
            { name: "News", id: 10763, icon: <FaBook /> },
            { name: "Reality", id: 10764, icon: <FaTv /> },
            { name: "Sci-Fi & Fantasy", id: 10765, icon: <FaRocket /> },
            { name: "Soap", id: 10766, icon: <FaHeart /> },
            { name: "Talk", id: 10767, icon: <FaTv /> },
            { name: "War & Politics", id: 10768, icon: <FaFlag /> },
            { name: "Western", id: 37, icon: <FaHorse /> }
        ]
    ]

    const { media, type, category } = useParams()

    const [moviesAndTv, setMoviesAndTv] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [genere, setGenere] = useState(null)
    const [genereName, setGenereName] = useState(null)

    const pageRef = useRef(1)
    const loadingRef = useRef(false)


    useLayoutEffect(() => {

        window.history.scrollRestoration = "manual"
        window.scrollTo(0, 0)

        return () => {
            window.history.scrollRestoration = "auto"
        }

    }, [])


    async function getMovies(pageNumber) {

        if (
            loadingRef.current ||
            (!hasMore && pageNumber !== 1)
        ) return

        loadingRef.current = true

        try {

            const url =
                category === 'popular' ||
                    category === 'top_rated'

                    ? popularMoviesAndTv(
                        type,
                        category,
                        pageNumber
                    )

                    : requesMoviesOrTvFromProvider(
                        type,
                        category,
                        genere,
                        pageNumber
                    )

            console.log('PAGE:', pageNumber)
            console.log('GENRE:', genere)
            console.log('URL:', url)

            const response = await axios.get(url)

            const newMovies = response.data.results

            if (pageNumber === 1) {

                // Replace results when genre changes
                setMoviesAndTv(newMovies)

            } else {

                // Add results when scrolling
                setMoviesAndTv(prev => [
                    ...prev,
                    ...newMovies
                ])
            }

            pageRef.current = pageNumber + 1

            if (
                pageNumber >= response.data.total_pages ||
                newMovies.length === 0
            ) {
                setHasMore(false)
            }

        } catch (error) {

            console.log(error)

        } finally {

            loadingRef.current = false

        }
    }


    // Initial request + genre change
    useEffect(() => {

        setMoviesAndTv([])
        setHasMore(true)

        pageRef.current = 1
        loadingRef.current = false

        window.scrollTo({
            top: 0,
            behavior: "auto"
        })

        getMovies(1)

    }, [type, category, genere])


    // Infinite scroll
    useEffect(() => {

        function handleScroll() {

            const nearBottom =
                window.innerHeight +
                window.scrollY >=
                document.documentElement.scrollHeight - 500

            if (nearBottom) {
                getMovies(pageRef.current)
            }
        }

        window.addEventListener(
            'scroll',
            handleScroll
        )

        return () => {
            window.removeEventListener(
                'scroll',
                handleScroll
            )
        }

    }, [type, category, genere])


    return (

        <div className="app-container pt-20">
            <GenereMobile
                setGenere={setGenere}
                setGenereName={setGenereName}
                genres={type === 'tv' ? genres[1] : genres[0]}
            />
            <h2 className="text-2xl p-5 text-white ">
                {`${media}  ${(genereName == null ? '' : '  >>  ' +genereName
)}`}
            </h2>

            <div className="grid lg:grid-cols-5 md:grid-cols-4">

                <div
                    className="
                        lg:col-span-4
                        md:col-span-3
                        self-start
                        grid
                        2xl:grid-cols-7
                        xl:grid-cols-5
                        lg:grid-cols-4
                        md:grid-cols-3
                        sm:grid-cols-5
                        grid-cols-3
                        gap-y-5
                        justify-items-center
                    "
                >

                    {moviesAndTv.map((movie, index) => (

                        <div
                            key={`${movie.id}-${index}`}
                        >

                            <MoviesCartPoster
                                type={type}
                                movieDetails={movie}
                                index={index + 1}
                            />

                        </div>

                    ))}

                </div>

                <div className='hidden md:block'>
                    <Genere
                        setGenereName={setGenereName}
                        setGenere={setGenere}
                        genres={
                            type === 'tv'
                                ? genres[1]
                                : genres[0]
                        }
                    />
                </div>
            </div>

        </div>
    )
}