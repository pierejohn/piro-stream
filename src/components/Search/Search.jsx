import React, { use, useEffect, useState } from 'react'
import { search } from '../../api'
import axios from 'axios'
import MoviesCartPoster from '../MoviesCartPoster/MoviesCartPoster'

export default function Search() {

    const [searchedItems, setSearchedItems] = useState()
    const [totalResults, setTotalResults] = useState(null)

    async function searchFunction(quary, pageNumber) {
        await axios.get(search(quary, pageNumber)).then((data) => {
            // console.log(data);
            setTotalResults(data.data.total_results)
            let results = data.data.results.filter(
                ({ media_type, poster_path, backdrop_path }) =>
                    ["movie", "tv"].includes(media_type) &&
                    poster_path &&
                    backdrop_path
            )
            console.log(results);
            setSearchedItems(results)
        }).catch((error) => {
            console.log(error);

        })


    }

    useEffect(() => {

    }, [])
    return (
        <div className='pt-20 text-white app-container '>
            <form onSubmit={(e) => {
                e.preventDefault()
            }
            }>
                <input type="text" onKeyUp={(e) => { e.target.value.length >= 3 ? searchFunction(e.target.value, 1) : searchFunction('', 1) }
                    // searchFunction(e.target.value, 1)

                } className='bg-white w-full my-5 p-2 rounded-2xl text-black ' />
            </form>

            {searchedItems ? <div className='flex gap-2 flex-wrap  justify-center items-center'>
                {searchedItems.map((val, index) => {
                    console.log(val);
                    return <div className=' w-fit'>
                        <MoviesCartPoster type={val.media_type} movieDetails={val} index={index + 1} />
                        
                    </div>



                    // return <div key={val.id}> {val.title || val.name}</div>
                }
                )}
            </div> : ''}
        </div>
    )
}
