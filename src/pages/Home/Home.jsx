import React, {  useEffect, useState } from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import MovieCartTrending from '../../components/MovieCartTrending/MovieCartTrending'
import MoviesTrendingSlider from '../../components/MoviesTrendingSlider/MoviesTrendingSlider'
import Spinner from '../../components/Spinner/Spinner'
import MoviesCartPoster from '../../components/MoviesCartPoster/MoviesCartPoster'
import NetflixMoviesSlider from '../../components/NetflixMoviesSlider/NetflixMoviesSlider'
import { requestAllProviders } from '../../api'
import axios from 'axios'
import ProvidersSliders from '../../components/ProvidersSlider/ProvidersSlider'
import Providers from './Providers'





export default function Home() {

  


  return (


    <div className='mb-5'>

      <HeroSection />
      <MoviesTrendingSlider />
      <ProvidersSliders />
      
   {/* top_rated
upcoming
popular */}

{/* call the componant to show slider Popular Movie and Tv Series in home */}
<NetflixMoviesSlider providerName={'Popular Movie'} type={'movie'} category={'popular'} home={true}/>
<NetflixMoviesSlider providerName={'Popular Tv Series'} type={'tv'} category={'popular'} home={true}/>
{/* call the componant to show slider top_rated Movie and Tv Series in home */}
<NetflixMoviesSlider providerName={'Top Rated Movie'} type={'movie'} category={'top_rated'} home={true}/>
<NetflixMoviesSlider providerName={'Top Rated  Series'} type={'tv'} category={'top_rated'} home={true}/>
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
