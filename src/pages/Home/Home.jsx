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

const wantedProviders = [
  "Netflix",
  "Disney Plus",
  "Amazon Prime Video",
  "Apple TV",
  "Max",
  "Hulu",
  "Peacock Premium",
  "Crunchyroll",
  "Shahid VIP",
  "MUBI",
  "Curiosity Stream",
  "STARZ",
  "AMC+",
  "YouTube Premium",
  

];
let filtered
let uniqueProviders
export default function Home() {

  const [filterProvider, setFilterProvider] = useState([])

  async function requistProviders() {
    await axios.get(requestAllProviders('tv')).then((data) => {
      // console.log(data.data.results);

      filtered = data.data.results.filter(provider =>
        wantedProviders.includes(provider.provider_name)

      );
      uniqueProviders = filtered.filter(
        (provider, index, self) =>
          index === self.findIndex(
            p => p.provider_name === provider.provider_name
          )
      );
      setFilterProvider(uniqueProviders)
      // console.log(filtered);

    }).catch((error) => {
      console.log(error());

    })
  }

  useEffect(() => {
    requistProviders();
  }, []);


  return (


    <div className='mb-5'>

      <HeroSection />
      <MoviesTrendingSlider />
      <ProvidersSliders providers={filterProvider}/>
      {filterProvider.map((val) => {
        

        return <div key={val.provider_id}>
         
          <NetflixMoviesSlider providerName={val.provider_name+' Movies'} type={'movie'} providerNumber={val.provider_id} />
          <NetflixMoviesSlider providerName={val.provider_name+' Tv Series'} type={'tv'} providerNumber={val.provider_id} />
        </div>
      })}
      {/* <NetflixMoviesSlider providerName={'Netflix Movies'} type={'movie'} providerNumber={8}/>
  <NetflixMoviesSlider providerName={'Netflix Tv Series'} type={'tv'} providerNumber={8}/>
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
