import { HomeTypes } from "./HomeTypes";
import { TvDataTypes } from "./TvTypes";

export interface SearchStateTypes {
  movieResults: HomeTypes[] | null;
  tvResults: TvDataTypes[] | null;
}
