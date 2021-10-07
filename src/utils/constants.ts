import {
  CategoryTypes,
  MovieURLTypes,
  TvURLTypes,
} from "@/utils/types/constantsTypes";

export const BASE_URL = "https://api.themoviedb.org/3/";

export const API_KEYS = "22fe675e6b150687017596a5b2301c77";
export const LANGUAGE_CONFIG = "en-US";
export const BG_IMAGE_PATH = "http://image.tmdb.org/t/p/original";
export const IMAGE_URL = "http://image.tmdb.org/t/p/w300";

export const CATEGORY: CategoryTypes = {
  movie: "movie",
  tv: "tv",
  search: "search",
  videos: "videos",
};

export const MOVIEURL: MovieURLTypes = {
  nowPlaying: "/now_playing",
  upcomming: "/upcoming",
  popular: "/popular",
};

export const TVURL: TvURLTypes = {
  topRated: "/top_rated",
  popular: "/popular",
  airingToday: "/airing_today",
};

export const ROUTES = {
  home: "/",
  tv: "/tv",
  search: "/search",
  movie: "/movie",
  show: "/show",
  redirect: "*",
};
