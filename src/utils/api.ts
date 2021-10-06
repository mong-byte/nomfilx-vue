import axios, { AxiosResponse } from "axios";
import {
  API_KEYS,
  BASE_URL,
  CATEGORY,
  LANGUAGE_CONFIG,
  MOVIEURL,
  TVURL,
} from "./constants";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEYS,
    language: LANGUAGE_CONFIG,
  },
});

export const moviesApi = {
  nowPlaying: (): Promise<AxiosResponse<never>> =>
    api.get(`${CATEGORY.movie}${MOVIEURL.nowPlaying}`),
  upcomming: (): Promise<AxiosResponse<never>> =>
    api.get(`${CATEGORY.movie}${MOVIEURL.upcomming}`),
  popular: (): Promise<AxiosResponse<never>> =>
    api.get(`${CATEGORY.movie}${MOVIEURL.popular}`),
  movieDetail: (id: string | number): Promise<AxiosResponse<never>> =>
    api.get(`${CATEGORY.movie}/${id}`, {
      params: {
        append_to_response: CATEGORY.videos,
      },
    }),
  search: (term: string): Promise<AxiosResponse<never>> =>
    api.get(`${CATEGORY.search}/${CATEGORY.movie}`, {
      params: {
        query: term,
      },
    }),
};

export const tvapi = {
  topRated: (): Promise<AxiosResponse<never>> =>
    api.get(`${CATEGORY.tv}${TVURL.topRated}`),
  popular: (): Promise<AxiosResponse<never>> =>
    api.get(`${CATEGORY.tv}${TVURL.popular}`),
  airingToday: (): Promise<AxiosResponse<never>> =>
    api.get(`${CATEGORY.tv}${TVURL.airingToday}`),
  showDetail: (id: string | number): Promise<AxiosResponse<never>> =>
    api.get(`${CATEGORY.tv}/${id}`, {
      params: {
        append_to_response: CATEGORY.videos,
      },
    }),
  search: (term: string): Promise<AxiosResponse<never>> =>
    api.get(`${CATEGORY.search}/${CATEGORY.tv}`, {
      params: {
        query: term,
      },
    }),
};
