import React, { useEffect, useState } from 'react'
import { recommendations } from '../../api';
import axios from 'axios';
import NetflixMoviesSlider from '../NetflixMoviesSlider/NetflixMoviesSlider';
import MoviesCartPoster from '../MoviesCartPoster/MoviesCartPoster';

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function RecommendationsToWatch({ type, id }) {

    const [recommendat, setRecommendat] = useState([])
    async function recommendationsMovies() {
        await axios.get(recommendations(type, id)).then((data) => {
            // console.log(data.data.results);
            setRecommendat(data.data.results)
        }).catch((error) => {
            console.log(error);

        })
    }

    useEffect(() => {
        recommendationsMovies()


    }, [])
    return (
    <>
        <div className='text-gray-500 w-fit  text-md md:text-xl lg:text-2xl font-bold my-5 border-s-8 cursor-pointer  border-primary ps-3 flex gap-3 items-center hover:text-white duration-300'>Related</div>
        
            ({recommendat.length == 0 ? '' :
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
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView: 7,
                        spaceBetween: 24,
                    },
                    1500: {
                        slidesPerView: 8,
                        spaceBetween: 24,
                    },
                    1600: {
                        slidesPerView: 9,
                        spaceBetween: 24,
                    },
                }}
            >

                {recommendat.map((val, index) => (
                    <SwiperSlide key={val.id || index}>
                        <MoviesCartPoster type={type} movieDetails={val} index={index + 1} />

                    </SwiperSlide>

                ))}
                {/* {netflixMovies.length>20?<SwiperSlide>
                    <div className="w-[100px] md:w-[160px] h-[150px] md:h-[240px] rounded-xl   flex items-center justify-center cursor-pointer">
                        <h1 className="bg-gradient-to-r  from-blue-500 to-purple-500 w-fit bg-clip-text text-transparent flex w-fit gap-1 underline justify-center items-center opacity-100 text-1xl font-bold  ">
                            See More 
                        </h1>
                    </div>
                </SwiperSlide>:''} */}
                
            </Swiper>
            })
        </>
    )
}
