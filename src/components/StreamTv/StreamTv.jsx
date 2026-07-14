import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { imdbIdForEpisode } from '../../api';
import axios from 'axios';

export default function StreamTv() {

    let { EpisodeNum, SeasonNum, id } = useParams()
    const [isPlayingVideo, setIsPlayingVideo] = useState(false);

    // let  {imdb_id, title, id }= movieDetails
    let movieDetails = {
        imdb_id: '1',
        id
    }
    useEffect(() => {
       getSeasonImdbId(id, SeasonNum) 
    }, [])
    
  
    async function getSeasonImdbId(id, seasonNumber) {
        try {

            const { data } = await axios.get(imdbIdForEpisode(id, seasonNumber, EpisodeNum))

            console.log(data);
            movieDetails.imdb_id = data.imdb_id
            console.log(movieDetails);

        } catch (error) {
            console.log(error)
        } finally {

        }
    }
    return (
        <>
            {/* <div className='text-9xl text-accent bg-amber-700'>{EpisodeNum}</div> */}
            <div className='app-container mt-25'>
                <VideoPlayer movieDetails={movieDetails} tybe='tv' setIsPlayingVideo={setIsPlayingVideo} />
            </div>
        </>

    )
}
