import React from 'react'

export default function GenereMobile({
    genres,
    setGenere,
    setGenereName
}) {

    function handleChange(e) {

        const id = Number(e.target.value)

        const selectedGenre = genres.find(
            genre => genre.id === id
        )

        setGenere(id)

        setGenereName(selectedGenre?.name || '')

        console.log('Genre ID:', id)
        console.log('Genre Name:', selectedGenre?.name)

    }

    return (

        <div className="md:hidden w-full px-5 pb-5">

            <select
                onChange={handleChange}
                defaultValue=""
                className="
                    w-full
                    bg-gray-900
                    text-white
                    border
                    border-gray-700
                    rounded
                    p-3
                    text-lg
                    outline-none
                    cursor-pointer
                "
            >

                <option value="" disabled>
                    Select Genre
                </option>

                {genres.map((genre) => (

                    <option
                        key={genre.id}
                        value={genre.id}
                    >
                        {genre.name}
                    </option>

                ))}

            </select>

        </div>

    )
}