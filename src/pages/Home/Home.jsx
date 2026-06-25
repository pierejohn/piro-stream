import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import HeroSection from '../../components/HeroSection/HeroSection'
import MovieCartTrending from '../../components/MovieCartTrending/MovieCartTrending'
import MoviesTrendingSlider from '../../components/MoviesTrendingSlider/MoviesTrendingSlider'
import Spinner from '../../components/Spinner/Spinner'
import MoviesCartPoster from '../../components/MoviesCartPoster/MoviesCartPoster'
import NetflixMoviesSlider from '../../components/NetflixMoviesSlider/NetflixMoviesSlider'
import NetflixTvSlider from '../../components/NetflixTvSlider/NetflixTvSlider'



export default function Home() {

   
  return (
   
    
   <div className='mb-5'>
   
   <HeroSection/>
   <MoviesTrendingSlider/>
  <NetflixMoviesSlider/>
  <NetflixTvSlider/>
   
   {/* <MovieCartTrending/> */}
  
</div>

  )
}
