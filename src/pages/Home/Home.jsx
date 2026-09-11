import React, { useEffect, useState } from 'react';

import HeroSection from '../../components/HeroSection/HeroSection';
import MovieCartTrending from '../../components/MovieCartTrending/MovieCartTrending';
import MoviesTrendingSlider from '../../components/MoviesTrendingSlider/MoviesTrendingSlider';
import Spinner from '../../components/Spinner/Spinner';
import MoviesCartPoster from '../../components/MoviesCartPoster/MoviesCartPoster';
import NetflixMoviesSlider from '../../components/NetflixMoviesSlider/NetflixMoviesSlider';
import ProvidersSliders from '../../components/ProvidersSlider/ProvidersSlider';
import Providers from './Providers';

import { requestAllProviders } from '../../api';

import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { FaChevronCircleRight } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';

export default function Home() {
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    let watchlist = JSON.parse(localStorage.getItem('watchList'));
    if (!watchlist) return setWatchlist([])
    setWatchlist(watchlist)
    // console.log(watchlist);

  }, [])


  return (


    <div className='mb-5'>

      <HeroSection />
      <MoviesTrendingSlider />
      <ProvidersSliders />

      {/* top_rated
upcoming
popular */}



      {(watchlist.length==0? '' :
        <div className='app-container mt-5'>


          <div

            //    onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
            className='text-gray-500 w-fit  text-md md:text-xl lg:text-2xl font-bold my-5 border-s-8 cursor-pointer  border-primary ps-3 flex gap-3 items-center hover:text-white duration-300'>MY Watch List
          </div>

          <Swiper
            className="cursor-grab"
            navigation
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
            {watchlist.map((val, index) => (
              <SwiperSlide key={`${val.tybe}-${val.id}`}>
                <MoviesCartPoster
                  type={val.tybe}
                  movieDetails={val}
                  index={index + 1}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      )}


      {/* call the componant to show slider Popular Movie and Tv Series in home */}
      <NetflixMoviesSlider providerName={'Popular Movie'} type={'movie'} category={'popular'} home={true} />
      <NetflixMoviesSlider providerName={'Popular Tv Series'} type={'tv'} category={'popular'} home={true} />
      {/* call the componant to show slider top_rated Movie and Tv Series in home */}
      <NetflixMoviesSlider providerName={'Top Rated Movie'} type={'movie'} category={'top_rated'} home={true} />
      <NetflixMoviesSlider providerName={'Top Rated  Series'} type={'tv'} category={'top_rated'} home={true} />
      {/* call the componant to show slider upcoming Movie in home */}
      {/* <NetflixMoviesSlider providerName={'upcoming Movie'} type={'movie'} category={'upcoming'} home={true}/> */}



      {/* <NetflixMoviesSlider providerName={'Netflix Movies'} type={'movie'} providerNumber={8}/> */}
      {/* <Providers/> */}
      {/* <NetflixMoviesSlider providerName={'Netflix Movies'} type={'movie'} providerNumber={8}/>
  // <NetflixMoviesSlider providerName={'Netflix Tv Series'} type={'tv'} providerNumber={8}/>
  <NetflixMoviesSlider providerName={'Apple TV+ movie'} type={'movie'} providerNumber={350}/>
  <NetflixMoviesSlider providerName={'Apple TV+ Series'} type={'tv'} providerNumber={350}/>
  <NetflixMoviesSlider providerName={'Disney+ movie'} type={'movie'} providerNumber={337}/>
  <NetflixMoviesSlider providerName={'Disney+ Series'} type={'tv'} providerNumber={337}/>
  <NetflixMoviesSlider providerName={'Prime movie'} type={'movie'} providerNumber={9}/>
  <NetflixMoviesSlider providerName={'Prime Series'} type={'tv'} providerNumber={9}/>
  <NetflixMoviesSlider providerName={'Shahid movie'} type={'movie'} providerNumber={1715}/>
  <NetflixMoviesSlider providerName={'Shahid Series'} type={'tv'} providerNumber={1715}/>
  <NetflixMoviesSlider providerName={'HBO Max movie'} type={'movie'} providerNumber={1899}/>
  <NetflixMoviesSlider providerName={'HBO Max Series'} type={'tv'} providerNumber={1899}/> */}


      {/* <MovieCartTrending/> */}

    </div>

  )
}
