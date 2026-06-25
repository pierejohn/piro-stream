const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const MOVIE_DETAILS_BASE_URL = import.meta.env.VITE_MOVIE_DETAILS;
const TV_DETAILS_BASE_URL = import.meta.env.VITE_TV_DETAILS;
const MOVIE_AND_TV_DETAILS_BASE_URL= import.meta.env.VITE_MOVIE_AND_TV_DETAILS

// All endpoints
export const requests = {
  trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
  popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
};

// Image helper
export const getImage = (path) => {
  return `${IMAGE_BASE_URL}${path}`;
};
// get movies or Tv details
export function requesMoviesOrTvDetails(ID,type){
 
  return `${MOVIE_AND_TV_DETAILS_BASE_URL}${type}/${ID}?api_key=${API_KEY}`
 
};



// get movies and tv seriess of netflix 
export function requesMoviesOrTvFromProvider(type,provider){
 
  return `${MOVIE_AND_TV_DETAILS_BASE_URL}discover/${type}?api_key=${API_KEY}&with_watch_providers=${provider}&watch_region=EG&sort_by=popularity.desc`

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