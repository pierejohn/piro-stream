import React, { useEffect, useState } from 'react'
import MoviesCartPoster from '../MoviesCartPoster/MoviesCartPoster'
import '../../index.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import {requesMoviesOrTvFromProvider} from '../../api'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import axios from 'axios'

export default function NetflixTvSlider() {


      const [netflixTv, setNetflixTv] = useState([])


    async function getNetflixTv()
    {
        await axios.get(requesMoviesOrTvFromProvider('tv',8)).then((data)=>
        {
            console.log(data.data.results);
            setNetflixTv(data.data.results)
        }).catch((error)=>
        {
            console.log(error);
            
        })
    }
    useEffect(() => {

       getNetflixTv()
       

    }, [])

 return (
        <div className='app-container mt-5'>

            <h1 className='text-white text-2xl font-bold my-5 border-s-8 border-primary ps-3 '>Netflix Tv Series</h1>

            <Swiper className='cursor-grab'
                

                navigation
                
                
                loop={netflixTv.length > 8}
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
                {netflixTv.map((val, index) => (
                    <SwiperSlide key={val.id || index}>
                        <MoviesCartPoster movieDetails={val} index={index + 1} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    
  )
}
