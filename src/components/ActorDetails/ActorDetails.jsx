import React, { useEffect, useState } from 'react'
import { getActorinfo, getOriginalImage } from '../../api'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import img from '../../assets/unKnownIcon.png'
import { CiCalendarDate } from "react-icons/ci";

export default function ActorDetails() {
  const [isLoading, setIsLoading] = useState(true)
  const [actorData, setActorData] = useState(null)
  const [actorImg, setActorImg] = useState(null)
  const { id } = useParams()
  console.log(id);

  async function getActorInfo() {
    try {
      setIsLoading(true)
      const { data } = await axios.get(getActorinfo(id))
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

    <div className='pt-25 app-container text-white'>

      <div className={`
              fixed inset-0 z-40 transition-all  duration-1500 ease-in-out
                ${isLoading ? 'opacity-100 ' : 'opacity-0  pointer-events-none'}
            `}>
        <Spinner />
      </div>
      {(actorData ?
        <div className="div">


          <div className='flex gap-20'>
            {actorImg == null ? <img className='w-40 h-60 rounded-full object-cover ' src={img} alt="" /> : <img className='w-40 h-60 rounded-full object-cover ' src={actorImg} alt="" />}

            <div className=' w-full flex flex-col gap-3 text-gray-400'>
              {console.log(actorData)
              }
        <h2 className='text-4xl text-white'>{actorData.name}</h2>
        <h3 className='text-1xl'>{`Known for : ${actorData.known_for_department}`}</h3>
        <div className=' flex items-center gap-3'>
          <CiCalendarDate size={30}/>
          <div>{actorData.birthday}</div>
        </div>

            </div>
          </div>

        </div>

        : '')}

    </div>
  </>
}

