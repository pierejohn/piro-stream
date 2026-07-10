import React, { useEffect, useState } from 'react'
import { cast, getImage } from '../../api'
import axios from 'axios'
import unKnownIcon from '../../assets/unKnownIcon.png'

function CastCard({ val }) {
  const [imgLoading, setImgLoading] = useState(true)

  return (
    <div className='flex flex-col justify-center items-center gap-2 w-[27%] md:w-fit'>
      <div className='relative size-15 md:size-32'>
        {imgLoading && (
          <div className='absolute inset-0 rounded-full bg-gray-700 animate-pulse'></div>
        )}

        <img
          className={`size-15 md:size-32 rounded-full object-cover transition-opacity duration-300 ${
            imgLoading ? 'opacity-0' : 'opacity-100'
          }`}
          src={val.profile_path ? getImage(val.profile_path) : unKnownIcon}
          alt={val.name}
          onLoad={() => setImgLoading(false)}
          onError={() => setImgLoading(false)}
        />
      </div>

      <h2 className='text-white text-center text-sm md:text-base'>
        {val.name}
      </h2>
    </div>
  )
}

export default function CastDetails({ type, Details }) {
  const [castIng, setCastIng] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getAllCast() {
    try {
      setIsLoading(true)
      const { data } = await axios.get(cast(type, Details.id))
      setCastIng(data.cast)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (Details?.id) {
      getAllCast()
    }
  }, [type, Details?.id])

  return (
    <div>
      <div className='text-gray-500 w-fit text-md md:text-xl lg:text-2xl font-bold my-5 border-s-8 cursor-pointer border-primary ps-3 flex gap-3 items-center hover:text-white duration-300'>
        Cast
      </div>

      <div className='flex flex-wrap gap-5 '>
        {isLoading
          ? Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className='flex flex-col justify-center items-center gap-2 w-[27%] md:w-fit'
              >
                <div className='size-15 md:size-32 rounded-full bg-gray-700 animate-pulse'></div>
                <div className='w-16 h-4 rounded bg-gray-700 animate-pulse'></div>
              </div>
            ))
          : castIng.slice(0, 11).map((val) => (
              <CastCard key={val.id} val={val} />
            ))}
      </div>
    </div>
  )
}