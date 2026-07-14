import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { getImage, tvSeasonDetailsApi } from '../../api'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import ShinyText from '../ShinnyText/ShinnyText'
import { div } from 'motion/react-client'

export default function SeasonsAndEpisodes({ tvId, seasons }) {
    const { SeasonNum } = useParams()
    const navigate = useNavigate()

    const [seasonDetails, setSeasonDetails] = useState(null)
    const [loadingEpisodes, setLoadingEpisodes] = useState(false)

    // remove season 0
    const validSeasons = useMemo(() => {
        return seasons?.filter((s) => s.season_number > 0) || []
    }, [seasons])

    // selected season comes from URL
    const selectedSeason = Number(SeasonNum) || validSeasons[0]?.season_number || 1

    async function getSeasonDetails(id, seasonNumber) {
        try {
            setLoadingEpisodes(true)
            const { data } = await axios.get(tvSeasonDetailsApi(id, seasonNumber))
            setSeasonDetails(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingEpisodes(false)
        }
    }

    // if no season in URL, go to first season
    useEffect(() => {
        if (tvId && validSeasons.length > 0 && !SeasonNum) {
            navigate(`/watch/tv/${tvId}/season/${validSeasons[0].season_number}`, { replace: true })
        }
    }, [tvId, validSeasons, SeasonNum, navigate])

    // fetch selected season details
    useEffect(() => {
        if (tvId && selectedSeason) {
            getSeasonDetails(tvId, selectedSeason)
        }
    }, [tvId, selectedSeason])

    return (
        <div className="mb-10">
            <h2 className="text-white text-2xl font-bold mb-4">Seasons & Episodes</h2>

            {/* Season Buttons */}
            <div className="flex gap-2 flex-wrap mb-6">
                {validSeasons.map((season) => (
                    <NavLink
                        key={season.id}
                        to={`/watch/tv/${tvId}/season/${season.season_number}`}
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${isActive
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`
                        }
                    >
                        S{season.season_number}
                    </NavLink>
                ))}
            </div>

            {/* Episodes Grid */}
            {loadingEpisodes ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-gray-800 rounded-xl animate-pulse">
                            <div className="w-full h-40 bg-gray-700 rounded-t-xl"></div>
                            <div className="p-3">
                                <div className="h-4 w-3/4 bg-gray-700 rounded mb-2"></div>
                                <div className="h-3 w-full bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : seasonDetails?.episodes ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {console.log(seasonDetails)}
                    {seasonDetails.episodes.map((episode) => (


                        <NavLink
                            to={`Episode/${episode.episode_number}`}

                            onClick={() => {
                                console.log(episode.
                                    episode_number
                                );

                            }
                            }
                            key={episode.id}
                            className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            {/* Episode Image */}
                            <div className="relative">
                                {episode.still_path ? <img
                                    src={
                                        episode.still_path
                                            ? getImage(episode.still_path)
                                            : 'https://via.placeholder.com/400x225?text=No+Image'
                                    }
                                    alt={episode.name}
                                    className="w-full h-40 object-cover"
                                /> :
                                    <div className='w-full h-40 object-cover flex justify-around items-center text-4xl'><ShinyText
                                        text=" Soon"
                                        speed={2.3}
                                        delay={0}
                                        color="#392974"
                                        shineColor="#e10e9c"
                                        spread={150}
                                        direction="left"
                                        yoyo
                                        pauseOnHover={false}
                                        disabled={false}
                                    /></div>
                                }




                                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    E{episode.episode_number}
                                </div>

                                {episode.runtime && (
                                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                        {episode.runtime} min
                                    </div>
                                )}
                            </div>

                            {/* Episode Info */}
                            <div className="p-3">
                                <h3 className="text-white text-sm font-semibold truncate">
                                    {episode.name}
                                </h3>

                                <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                                    {episode.overview || 'No description available.'}
                                </p>

                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-gray-500 text-xs">
                                        {episode.air_date}
                                    </p>

                                    {episode.vote_average > 0 && (
                                        <p className="text-yellow-500 text-xs">
                                            ⭐ {episode.vote_average.toFixed(1)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No episodes found.</p>
            )}
        </div>
    )
}