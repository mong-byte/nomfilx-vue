export interface HomeTypes {
  id: number;
  poster_path: string;
  original_title: string;
  vote_average: number;
  release_date: string;
}

export interface movieTypes {
  nowPlaying: null | HomeTypes[];
  upcoming: null | HomeTypes[];
  popular: null | HomeTypes[];
}
