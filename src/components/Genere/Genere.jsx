import React from 'react'
import style from './Genere.module.css'
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2"

export default function Genere({ genres, setGenere ,setGenereName}) {

    function changeGenere(id) {
        setGenere(id)
    }

    return (

        <div
            className={`
                ${style.bgGenere}
               
                w-full
                h-full
                text-white
                rounded
                lg:col-span-1
                md:col-span-1
                p-5
            `}
        >

            <div className="flex justify-between text-2xl pb-5">

                <h2>Generes</h2>

                <HiMiniAdjustmentsHorizontal />

            </div>


            {genres.map((genre) => (

                <div
                    key={genre.id}
                    onClick={() => {changeGenere(genre.id)
                        setGenereName(genre.name)
                    }}
                    className={`
                        ${style.bgGenereItem}
                        cursor-pointer
                        hover:scale-101
                        hover:shadow
                        shadow-gray-600
                        duration-400
                        p-3
                        text-xl
                        flex
                        gap-2
                        items-center
                        mb-5
                        w-full
                        rounded
                        border
                        border-gray-800
                    `}
                >

                    <h2>{genre.icon}</h2>

                    <h2>{genre.name}</h2>

                </div>

            ))}

        </div>
    )
}