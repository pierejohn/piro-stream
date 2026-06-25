import React, { useEffect, useState } from 'react'
import MoviesCartPoster from '../MoviesCartPoster/MoviesCartPoster'
import '../../index.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { requesMoviesOrTvFromProvider } from '../../api'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import axios from 'axios'
import { FaHandPointRight } from "react-icons/fa";

export default function NetflixMoviesSlider(props) {


    let { providerName, providerNumber, type } = props


    const [netflixMovies, setNetflixMovies] = useState([])


    async function getNetflixMovies() {
        await axios.get(requesMoviesOrTvFromProvider(type, providerNumber)).then((data) => {
            // console.log(data.data.results);
            setNetflixMovies(data.data.results)
        }).catch((error) => {
            console.log(error);

        })
    }
    useEffect(() => {

        getNetflixMovies()


    }, [])

    return (
        <div className='app-container mt-5'>

            <h1 className='text-white text-2xl font-bold my-5 border-s-8 border-primary ps-3 '>{providerName}</h1>

            <Swiper className='cursor-grab'


                navigation


                // loop={netflixMovies.length > 8}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    350: {
                        slidesPerView: 3,
                        spaceBetween: 12,
                    },
                    480: {
                        slidesPerView: 4,
                        spaceBetween: 12,
                    },
                    600: {
                        slidesPerView: 5,
                        spaceBetween: 12,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView: 6,
                        spaceBetween: 24,
                    },
                    1440: {
                        slidesPerView: 8,
                        spaceBetween: 24,
                    },
                }}
            >
                
                    {netflixMovies.map((val, index) => (
                        <SwiperSlide key={val.id || index}>
                            <MoviesCartPoster movieDetails={val} index={index + 1} />

                        </SwiperSlide>

                    ))}
                    <SwiperSlide>
                        <div className="w-[100px] md:w-[160px] h-[150px] md:h-[240px] rounded-xl   flex items-center justify-center cursor-pointer">
                            <h1 className="text-red-700 flex w-fit gap-1 underline justify-center items-center  text-1xl font-bold">
                                See More <FaHandPointRight/>
                            </h1>
                        </div>
                    </SwiperSlide>
            </Swiper>
        </div>

    )
}
