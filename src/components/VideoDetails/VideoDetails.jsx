import React from 'react'

export default function VideoDetails({ movieDetails, type }) {
    return (
        <>
            {console.log(type)}

            <div className='text-gray-500 w-fit  text-md md:text-xl lg:text-2xl font-bold my-5 border-s-8 cursor-pointer  border-primary ps-3 flex gap-3 items-center hover:text-white duration-300'>Details</div>

            {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 */}
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-50 gap-y-5  text-gray-500 ">
                <div className=" rounded ">
                    <div className='flex justify-between  '>
                        <h2 >OriginalTitle</h2>
                        <h2 className='text-gray-400'>{movieDetails.title}{movieDetails.original_name
                        }
                        </h2>
                    </div>
                </div>
                <div className=" rounded ">
                    <div className='flex justify-between '>
                        <h2>Genere</h2>
                        <div className='flex gap-2 text-gray-400'>
                            {movieDetails.genres.map((val, index) => {
                                return <h3 key={val.id}>{val.name}</h3>
                            })}

                        </div>
                    </div>
                </div><div className=" rounded">
                    <div className='flex justify-between '>
                        <h2 >Status</h2>
                        <h2 className='text-gray-400'>{movieDetails.status}</h2>
                    </div>
                </div>
                {type == 'tv' ? '' : <div className=" rounded">
                    <div className='flex justify-between '>
                        <h2 >Budget</h2>
                        <h2 className='text-gray-400'>{movieDetails.budget}$</h2>
                    </div>
                </div>}

                <div className=" rounded">
                    <div className='flex justify-between '>
                        <h2 >Relase Date</h2>
                        <h2 className='text-gray-400'>{movieDetails.release_date}{movieDetails.first_air_date}</h2>
                    </div>
                </div>



                {type == 'tv' ? <div className=" rounded">
                    <div className='flex justify-between '>
                        <h2 >Number of Seasons</h2>
                        <h2 className='text-gray-400'>{movieDetails.
                            number_of_seasons}</h2>
                    </div>
                </div> : <div className=" rounded">
                    <div className='flex justify-between '>
                        <h2 >Revenue</h2>
                        <h2 className='text-gray-400'>{movieDetails.revenue}$</h2>
                    </div>
                </div>}


              
                {type == 'tv' ? <div className=" rounded">
                    <div className='flex justify-between '>
                        <h2 >Number of Episodes</h2>
                        <h2 className='text-gray-400'>{movieDetails.
                            number_of_episodes
}</h2>
                    </div>
                </div> :   <div className=" rounded">
                    <div className='flex justify-between '>
                        <h2 >Run time</h2>
                        <h2 className='text-gray-400'>{Math.floor(movieDetails.runtime / 60) + "h " + String(movieDetails.runtime % 60).padStart(2, "0") + "m"}</h2>
                    </div>
                </div>
                }



                <div className=" rounded">
                    <div className='flex justify-between '>
                        <h2 >Language</h2>
                        <h2 className='text-gray-400'>{movieDetails.original_language}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
