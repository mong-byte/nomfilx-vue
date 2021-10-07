export interface TvDataTypes {
  first_air_date: string;
  id: number;
  original_name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

export interface TvStateTypes {
  topRated: null | TvDataTypes[];
  popular: null | TvDataTypes[];
  airingToday: null | TvDataTypes[];
}
