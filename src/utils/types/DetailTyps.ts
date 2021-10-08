export interface ResultType {
  poster_path?: string;
  original_title?: string;
  vote_average?: number;
  release_date?: string;
  backdrop_path?: string;
  original_name?: string;
  overview?: string;
  runtime?: number;
  first_air_date: string;
  episode_run_time: number[];
  genres: GenreType[];
}

export interface GenreType {
  id: number;
  name: string;
}
