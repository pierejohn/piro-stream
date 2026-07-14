const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const MOVIE_DETAILS_BASE_URL = import.meta.env.VITE_MOVIE_DETAILS;
const TV_DETAILS_BASE_URL = import.meta.env.VITE_TV_DETAILS;
const MOVIE_AND_TV_DETAILS_BASE_URL= import.meta.env.VITE_MOVIE_AND_TV_DETAILS

export const requests = {
  trending: `${BASE_URL}/trending/all/day?api_key=${API_KEY}`,
  popularMovies: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  popularTv: `${BASE_URL}/tv/popular?api_key=${API_KEY}`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
};

// ✅ Get tv tt of the seson


export function imdbIdForEpisode(id,seasonNumber,episodeNumber){


 
  return `${BASE_URL}/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/external_ids?api_key=${API_KEY}`
 
};

// ✅ Get movie cast

 
export function cast(type,id){


 
  return `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`
 
};



export function recommendations(type,id){


 
  return `${BASE_URL}/${type}/${id}/recommendations?api_key=${API_KEY}`
 
};

export function search(query,page=1){


 
  return `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`
 
};
export const trendingMoviesOrTv = {
  movie: `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  tv: `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`,
 
};
    // get popular Movies And Tv
export function popularMoviesAndTv(type,categories){

 
  return `${BASE_URL}/${type}/${categories}?api_key=${API_KEY}`
 
};

// get the trailler
export function trailerApi(id,type){

 
  return `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`
 
};
// get the seson of the tv

export const tvSeasonDetailsApi = (tvId, seasonNumber) =>
    `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`


// Image helper
export const getImage = (path) => {
  return `${IMAGE_BASE_URL}${path}`;
};
// get movies or Tv details
export function requesMoviesOrTvDetails(ID,type){
 
  return `${MOVIE_AND_TV_DETAILS_BASE_URL}${type}/${ID}?api_key=${API_KEY}`
 
};

export function requestAllProviders(type)
{
 
  return `${BASE_URL}/watch/providers/${type}?api_key=${API_KEY}`
}
// get movies and tv seriess of netflix 
export function requesMoviesOrTvFromProvider(type,provider){
 
  return `${MOVIE_AND_TV_DETAILS_BASE_URL}discover/${type}?api_key=${API_KEY}&with_watch_providers=${provider}&watch_region=US&sort_by=popularity.desc`

};


// get logo
export function requesMoviesOrTvLogo(ID,type){
 
  return `${MOVIE_AND_TV_DETAILS_BASE_URL}${type}/${ID}/images?api_key=${API_KEY}`

};


// reques Moviest Details
export function requesMoviestDetails(ID){
 
  return `${MOVIE_DETAILS_BASE_URL}${ID}?api_key=${API_KEY}`
 
};
// reques Tv Details
export function requesTvDetails(ID){
 
  return `${TV_DETAILS_BASE_URL}${ID}?api_key=${API_KEY}`
 
};