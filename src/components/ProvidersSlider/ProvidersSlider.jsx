import React, { useContext, useEffect, useState } from 'react'
import MovieCartTrending from '../MovieCartTrending/MovieCartTrending'
import '../../index.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ProvidersCart from '../ProvidersCart/ProvidersCart'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { requestAllProviders } from '../../api'





export default function ProvidersSliders() {
   
    
    

   
    let {filterProvider,setFilterProvider,wantedProviders}= useContext(AppContext)
   
       
       
        
   
   

    return (
        <div className='app-container mt-5'>

            <h1 className='text-white text-2xl font-bold my-5 border-s-8 border-primary ps-3 '>Providers</h1>

            <Swiper className=''
                modules={[  Autoplay]}

                navigation
                
                autoplay={{
                    delay: 8000,
                    disableOnInteraction: true,
                }}
                loop={filterProvider.length > 12}
                breakpoints={{
                    0: {
                        slidesPerView: 3,
                      
                    },
                    480: {
                        slidesPerView: 5,
                        
                    },
                    768: {
                        slidesPerView: 6,
                       
                    },
                    1024: {
                        slidesPerView: 8,
                        
                    },
                    1200: {
                        slidesPerView: 10,
                        
                    },
                    1440: {
                        slidesPerView: 12,
                        
                    },
                }}
            >
          
                
                {filterProvider.map((val, index) => (
                  
                    <SwiperSlide key={val.id || index}>
                        <ProvidersCart providers={val} />
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </div>
    )
}