import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../../components/Spinner/Spinner'
import NetflixMoviesSlider from '../../components/NetflixMoviesSlider/NetflixMoviesSlider'
import { getImage, requesMoviesOrTvLogo, trendingMoviesOrTv } from '../../api'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { IoMdInformationCircle } from 'react-icons/io'

export default function Providers(props) {
  const [logo, setLogo] = useState(null)
  const [randomHero, setRandomHero] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [random] = useState(Math.floor(Math.random() * 20))
  // ✅ NEW: track if the hero image is loaded
  const [heroImageLoaded, setHeroImageLoaded] = useState(false)

  let { filterProvider } = useContext(AppContext)

  useEffect(() => {
    setIsLoading(true)
    setRandomHero(null)
    setLogo(null)
    // ✅ NEW: reset image loaded state on page change
    setHeroImageLoaded(false)

    async function fetchHeroData() {
      try {
        const typeKey = props.tybe === 'movies' ? 'movie' : 'tv'

        const trendingRes = await axios.get(trendingMoviesOrTv[typeKey])
      
        
        const selectedMedia = trendingRes.data.results[random]
        setRandomHero(selectedMedia)

        const logoRes = await axios.get(requesMoviesOrTvLogo(selectedMedia.id, typeKey))
        const logos = logoRes.data.logos

        const englishLogo = logos.find(l => l.iso_639_1 === "en")
        const anyLogo = logos[0]

        if (englishLogo) {
          setLogo(englishLogo.file_path)
        } else if (anyLogo) {
          setLogo(anyLogo.file_path)
        }

      } catch (error) {
        console.log("Error:", error)
      }
      // ✅ REMOVED: setIsLoading(false) from here
      // Now spinner hides only after image is loaded (see onLoad below)
    }

    fetchHeroData()

  }, [props.tybe])

  // ✅ NEW: This runs when heroImageLoaded becomes true
  // Spinner hides ONLY after image is fully loaded
  useEffect(() => {
    if (heroImageLoaded) {
      setIsLoading(false)
    }
  }, [heroImageLoaded])

  return (
    <div>

      {/* Spinner */}
      <div className={`
              fixed inset-0 z-40 transition-all  duration-1500 ease-in-out
                ${isLoading ? 'opacity-100 ' : 'opacity-0  pointer-events-none'}
            `}>
                <Spinner />
            </div>

      <div className={`transition-all duration-700 ${!isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

        {randomHero && (
          <div className="h-[75vh] w-full overflow-hidden relative group">

            {/* ✅ Skeleton shows while image is loading */}
            {!heroImageLoaded && (
              <div className="h-screen w-full bg-gray-800 animate-pulse absolute inset-0 z-10" />
            )}

            {/* ✅ Image with onLoad to track when it's ready */}
            <img
              className={`
                h-screen w-full object-cover object-center 
                lg:object-cover lg:object-[50%_20%] 
                transition-all duration-1000 
                group-hover:scale-110
                ${heroImageLoaded ? 'opacity-100' : 'opacity-0'}
              `}
              src={getImage(randomHero.backdrop_path)}
              alt="hero"
              // ✅ This fires when image is fully loaded
              onLoad={() => setHeroImageLoaded(true)}
            />

            <div className="absolute top-0 h-full w-full bg-gradient-to-tr from-black lg:via-black lg:via-30% to-transparent to-100%">
              <div className='app-container h-full flex justify-end-safe sm:pb-10 pb-5 flex-col gap-2'>

                {logo && (
                  <img
                    className='w-30 sm:w-70'
                    src={getImage(logo)}
                    alt="logo"
                  />
                )}

                <h1 className='text-xs md:text-sm w-65 sm:w-80 lg:w-100 sm:font-light text-gray-400'>
                  {randomHero.overview?.slice(0, 150)}...
                </h1>

                <div className='flex gap-3'>
                  <button className='btnGradiant my-2 rounded text-white p-3 px-6 font-bold flex gap-3 justify-center items-center cursor-pointer hover:scale-95 duration-300'>
                    WATCH NOW
                  </button>
                  <button className='my-2 rounded bg-gray-700 text-white p-1 px-4 font-bold flex gap-3 justify-center items-center cursor-pointer hover:scale-95 duration-300'>
                    <IoMdInformationCircle /> Details
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Providers Sliders */}
        {!isLoading && filterProvider.map((val) => (
          <div key={val.provider_id}>
            <NetflixMoviesSlider
              providerName={`${val.provider_name} ${props.tybe === 'movies' ? 'Movies' : 'Tv Series'}`}
              type={props.tybe === 'movies' ? 'movie' : 'tv'}
              providerNumber={val.provider_id}
            />
          </div>
        ))}

      </div>
    </div>
  )
}