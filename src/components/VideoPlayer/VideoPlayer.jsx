import React, { useEffect, useState } from 'react';
import {
  IoArrowBack,
  IoWarningOutline
} from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

export default function VideoPlayer({
  movieDetails = {},
  setIsPlayingVideo,
  tybe = 'movie'
}) {
  const { imdb_id, id, title, name } = movieDetails;

  const {
    SeasonNum = 1,
    EpisodeNum = 1,
    id: routeId
  } = useParams();

  const seriesId = routeId || id;

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const currentEmbedUrl =
    tybe === 'tv'
      ? `https://vaplayer.ru/embed/tv/${seriesId}/${SeasonNum}/${EpisodeNum}`
      : `https://vaplayer.ru/embed/movie/${imdb_id || id}`;

  useEffect(() => {
    setIsLoading(true);
  }, [SeasonNum, EpisodeNum, seriesId]);

  const handleBack = () => {
    if (tybe === 'tv') {
      navigate(`/watch/tv/${seriesId}/Season/${SeasonNum}`);
    } else {
      setIsPlayingVideo(false);
    }
  };

  if (!imdb_id && !id && !seriesId) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-800 text-center max-w-lg mx-auto my-8">

        <IoWarningOutline className="text-5xl text-amber-500 mb-3 animate-pulse" />

        <h3 className="text-xl font-bold text-white mb-1">
          Source Unavailable
        </h3>

        <p className="text-zinc-400 text-sm mb-6">
          Unable to find streaming IDs for this media.
        </p>

        <button
          onClick={handleBack}
          className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition text-sm font-medium"
        >
          Go Back
        </button>

      </div>
    );
  }

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">

        <div className="flex items-center gap-3">

          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-800/80 hover:bg-zinc-700 active:scale-95 text-zinc-200 hover:text-white rounded-xl transition-all text-sm font-medium border border-zinc-700/50 shadow-sm"
          >
            <IoArrowBack className="text-lg" />
            <span>Back</span>
          </button>

          <div>
            <h2 className="text-white font-bold text-base md:text-lg tracking-wide truncate max-w-[200px] md:max-w-md">
              {title || name || (tybe === 'tv' ? 'TV Series' : 'Movie')}
            </h2>

            {tybe === 'tv' && (
              <span className="text-xs text-red-400 font-medium">
                Season {SeasonNum} • Episode {EpisodeNum}
              </span>
            )}
          </div>

        </div>

      </div>

      {/* Video Player */}
      <div className="relative group">

        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/30 via-purple-600/20 to-blue-600/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000 -z-10" />

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800/80 shadow-2xl">

          {isLoading && (
            <div className="absolute inset-0 bg-black flex items-center justify-center z-10 pointer-events-none">
              <div className="w-14 h-14 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin" />
            </div>
          )}

          <iframe
            src={currentEmbedUrl}
            className="w-full h-full border-0 block bg-black"
            allowFullScreen
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            referrerPolicy="no-referrer"
            loading="eager"
            onLoad={() => setIsLoading(false)}
          />

        </div>
      </div>

    </div>
  );
}