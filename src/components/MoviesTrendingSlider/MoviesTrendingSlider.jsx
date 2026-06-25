import React, { useEffect, useState } from 'react'
import MovieCartTrending from '../MovieCartTrending/MovieCartTrending'
import '../../index.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function MoviesTrendingSlider() {
    const [trendingMovies, setTrendingMovies] = useState([])

    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('trendingMovies')) || []
        setTrendingMovies(movies)
    }, [])

    return (
        <div className='app-container mt-5'>

            <h1 className='text-white text-2xl font-bold my-5 border-s-8 border-primary ps-3 '>Top 20</h1>

            <Swiper className='cursor-grab'
                modules={[  Autoplay]}

                navigation
                
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
                loop={trendingMovies.length > 6}
                breakpoints={{
                    0: {
                        slidesPerView: 1.2,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 1.5,
                        spaceBetween: 12,
                    },
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 16,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                    },
                    1440: {
                        slidesPerView: 6,
                        spaceBetween: 24,
                    },
                }}
            >
                {trendingMovies.map((val, index) => (
                    <SwiperSlide key={val.id || index}>
                        <MovieCartTrending movieDetails={val} index={index + 1} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}