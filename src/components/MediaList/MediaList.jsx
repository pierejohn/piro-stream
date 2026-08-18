import React, { useEffect, useRef, useState } from 'react'
import MoviesCartPoster from '../MoviesCartPoster/MoviesCartPoster'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
    popularMoviesAndTv,
    requesMoviesOrTvFromProvider
} from '../../api'
// import Spinner from '../Spinner/Spinner'

export default function MediaList() {

    const { media, type, category } = useParams()

    const [moviesAndTv, setMoviesAndTv] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const loadMoreRef = useRef(null)

    // ================================
    // Get movies
    // ================================

   async function getMovies(page, signal) {

    try {

        setLoading(true)

        const url =
            category === 'popular' || category === 'top_rated'
                ? popularMoviesAndTv(type, category, page)
                : requesMoviesOrTvFromProvider(type, category, page)

        const response = await axios.get(url, { signal })

        setMoviesAndTv(prev =>
            page === 1
                ? response.data.results
                : [...prev, ...response.data.results]
        )

        setPage(page + 1)

    } catch (error) {

        if (!axios.isCancel(error)) {
            console.log(error)
        }

    } finally {
        setLoading(false)
    }
}


    // ================================
    // Initial loading
    // ================================

    useEffect(() => {

        const controller = new AbortController()

        setMoviesAndTv([])
        setPage(1)
        setHasMore(true)

        getMovies(1, controller.signal)

        return () => {
            controller.abort()
        }

    }, [type, category])


    // ================================
    // Load more when scrolling
    // ================================

    useEffect(() => {

    function handleScroll() {

        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 500
        ) {
            if (!loading && hasMore) {
                getMovies(page)
            }
        }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
        window.removeEventListener('scroll', handleScroll)
    }

}, [page, loading, hasMore])


    // ================================
    // UI
    // ================================

    return (

        <div className="app-container pt-20">

            <h2 className="text-2xl p-5 text-white">
                {media}
            </h2>


            <div className="
                grid
                2xl:grid-cols-9
                xl:grid-cols-7
                lg:grid-cols-6
                md:grid-cols-4
                sm:grid-cols-5
                grid-cols-3
                gap-y-5
                justify-items-center
            ">

                {moviesAndTv.map((movie, index) => (

                    <div key={`${movie.id}-${index}`}>

                        <MoviesCartPoster
                            type={type}
                            movieDetails={movie}
                            index={index + 1}
                        />

                    </div>

                ))}

            </div>


            {/* ================================
                Load more trigger
            ================================= */}

            {hasMore && (

                <div
                    ref={loadMoreRef}
                    className="h-20 flex justify-center items-center"
                >

                   

                </div>

            )}

        </div>
    )
}