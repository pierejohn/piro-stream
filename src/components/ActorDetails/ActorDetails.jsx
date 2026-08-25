import React, { useEffect, useState } from 'react'
import { getActorinfo, getOriginalImage } from '../../api'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import img from '../../assets/unKnownIcon.png'
import { CiCalendarDate } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import MoviesCartPoster from '../MoviesCartPoster/MoviesCartPoster'

export default function ActorDetails() {
  const [isLoading, setIsLoading] = useState(true)
  const [actorData, setActorData] = useState(null)
  const [actorImg, setActorImg] = useState(null)
  const [moviesAndTv, setMoviesAndTv] = useState(null)
  const [showFullBiography, setShowFullBiography] = useState(true)

  const { id } = useParams()


  async function getActorInfo() {
    try {
      setIsLoading(true)
      const { data } = await axios.get(getActorinfo(id))
     const uniqueCredits = data.combined_credits.cast.filter(
    (item, index, self) =>
        item.id !== 59941 &&
        index === self.findIndex(
            x => x.id === item.id && x.media_type === item.media_type
        )
);

const sortedCredits = uniqueCredits.sort(
    (a, b) => b.popularity - a.popularity
);
      setMoviesAndTv(sortedCredits)
      console.log(data);
      
      
      if (data.profile_path == null) {
        const img = null
        setActorImg(null);

      } else {
        const img = await getOriginalImage(data.profile_path)
        setActorImg(img);
      }






      setActorData(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {


    getActorInfo()
  }, [])

  return <>

    <div className='pt-25 app-container md:p-20 text-white'>

      <div className={`
              fixed inset-0 z-40 transition-all  duration-1500 ease-in-out
                ${isLoading ? 'opacity-100 ' : 'opacity-0  pointer-events-none'}
            `}>
        <Spinner />
      </div>
      {(actorData ?
        <div className="div">


          <div className='flex flex-col md:flex-row text-center md:text-start md:gap-15 gap-5'>
            <div className='w-full md:max-w-fit   flex md:inline justify-center'>
              {actorImg == null ? <img className='w-40  h-60 rounded-full object-cover ' src={img} alt="" /> : <img className='w-40 h-60 rounded-full object-cover ' src={actorImg} alt="" />}
            </div>
            <div className=' w-full flex flex-col gap-4 text-gray-400'>
              



              <h2 className='text-4xl text-white'>{actorData.name}</h2>

              <h3 className='text-1xl'>{`Known for : ${actorData.known_for_department}`}</h3>

              <div className=' flex flex-col gap-2 '>
                <div className=' flex items-center justify-center md:justify-start gap-3'>
                  <CiCalendarDate size={30} />
                  <div>{actorData.birthday}</div>
                </div>
                <div className=' flex items-center justify-center md:justify-start gap-3'>
                  <FaLocationDot size={30} />
                  <div>{actorData.place_of_birth}</div>
                </div>
              </div>


              <div className='lg:w-[70%] text-start'>{showFullBiography ? `${actorData.biography.slice(0, 300)}` : `${actorData.biography}`}{actorData.biography.length > 300 && (
                <button
                  onClick={() => setShowFullBiography(!showFullBiography)}
                  className='text-primary text-start block text-xs md:text-sm mt-2 hover:underline cursor-pointer'
                >
                  {!showFullBiography ? 'See less' : 'See more'}
                </button>
              )}</div>



            </div>
          </div>

        </div>

        : '')}
      <div className='text-gray-500 w-fit  text-md md:text-xl lg:text-2xl font-bold my-5 border-s-8 cursor-pointer  border-primary ps-3 flex gap-3 items-center hover:text-white duration-300'>
        Top Movies and Tv Shows
      </div>

     

        <div
          className={`
                        lg:col-span-4 md:col-span-3 2xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-4
                        self-start
                        grid
                        
                        md:grid-cols-3
                        sm:grid-cols-5
                        grid-cols-3
                        gap-y-5
                        justify-items-start
                    `}
        >

          {moviesAndTv?.map((movie, index) => (

            <div
              key={`${movie.id}-${index}`}
            >

              <MoviesCartPoster
                type={movie.media_type}
                movieDetails={movie}
                index={index + 1}
              />

            </div>

          ))}

        </div>

       
      </div>
    
  </>
}

