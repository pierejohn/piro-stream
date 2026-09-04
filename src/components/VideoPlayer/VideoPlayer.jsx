import React, { useState, useEffect } from 'react';
import { 
  IoArrowBack, 
  IoRefreshOutline, 
  IoServerOutline,
  IoWarningOutline
} from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

export default function VideoPlayer({ movieDetails = {}, setIsPlayingVideo, tybe = 'movie' }) {
  const { imdb_id, id, title, name } = movieDetails;
  const { SeasonNum = 1, EpisodeNum = 1, id: routeId } = useParams();

  const seriesId = routeId || id;
  const [selectedServer, setSelectedServer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const navigate = useNavigate();

  // Active, working embed providers
  const servers = [
    {
      name: 'Server 1 (VAPlayer)',
      getUrl: () =>
        tybe === 'tv'
          ? `https://vaplayer.ru/embed/tv/${seriesId}/${SeasonNum}/${EpisodeNum}`
          : `https://vaplayer.ru/embed/movie/${imdb_id || id}`,
    },
    
    // {
    //   name: 'Server 2 (MultiEmbed)',
    //   getUrl: () =>
    //     tybe === 'tv'
    //       ? `https://multiembed.mov/?video_id=${seriesId}&tmdb=1&s=${SeasonNum}&e=${EpisodeNum}`
    //       : `https://multiembed.mov/?video_id=${id || imdb_id}&tmdb=1`,
    // },
   
    {
      name: 'Server 2 (VidLink - Modern UI)',
      getUrl: () =>
        tybe === 'tv'
          ? `https://vidlink.pro/tv/${seriesId}/${SeasonNum}/${EpisodeNum}`
          : `https://vidlink.pro/movie/${id || imdb_id}`,
    },
  ];

  useEffect(() => {
    setIsLoading(true);
  }, [selectedServer, SeasonNum, EpisodeNum, seriesId]);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

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
        <h3 className="text-xl font-bold text-white mb-1">Source Unavailable</h3>
        <p className="text-zinc-400 text-sm mb-6">Unable to find streaming IDs for this media.</p>

        <button
          onClick={handleBack}
          className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition text-sm font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  const currentEmbedUrl = servers[selectedServer]?.getUrl();

  return (
    <div className="w-full">
      {/* Top Header & Navigation Bar */}
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

        {/* Reload button */}
        {/* <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            title="Reload Stream"
            className="p-2.5 bg-zinc-800/80 hover:bg-zinc-700 active:scale-95 border border-zinc-700/50 text-zinc-400 hover:text-white rounded-xl transition"
          >
            <IoRefreshOutline className={`text-lg ${isLoading ? 'animate-spin text-red-500' : ''}`} />
          </button>
        </div> */}
      </div>

      {/* Video Player Container */}
      <div className="relative group">
        {/* Glow backlight */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/30 via-purple-600/20 to-blue-600/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000 -z-10" />

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800/80 shadow-2xl">
          {/* {isLoading && (
            <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center z-10 pointer-events-none">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin" />
                <div className="absolute w-8 h-8 bg-red-600/20 rounded-full animate-ping" />
              </div>
              <p className="text-zinc-400 text-xs md:text-sm mt-4 tracking-wider uppercase font-semibold animate-pulse">
                Connecting to {servers[selectedServer]?.name.split(' ')[1]}...
              </p>
            </div>
          )} */}

          <iframe
            key={iframeKey}
            src={currentEmbedUrl}
            className="w-full h-full border-0 block bg-black"
            allowFullScreen
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>

      {/* Server Switcher Bar */}
      <div className="mt-4 p-3 bg-zinc-900/60 backdrop-blur-md rounded-xl border border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
          <IoServerOutline className="text-base text-red-500" />
          <span>Select Server:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {servers.map((server, index) => (
            <button
              key={index}
              onClick={() => setSelectedServer(index)}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                selectedServer === index
                  ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30 scale-[1.02]'
                  : 'bg-zinc-800/60 border-zinc-700/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/60'
              }`}
            >
              {server.name.split(' ')[0]} {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}