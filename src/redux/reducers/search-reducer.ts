import { ActionTypes } from "../action-types";
import { SearchActions } from "../actions";

export interface MovieResults {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: "movie";
  original_language: string;
  original_title: string;
  overview: string;
  popularity?: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TVResults {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: "tv";
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity?: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

type known_for = MovieResults | TVResults;

export interface PersonResults {
  adult: boolean;
  gender: number;
  id: number;
  known_for: known_for[];
  known_for_department: string;
  media_type: "person";
  name: string;
  popularity: number;
  profile_path: string | null;
}

type results = MovieResults | TVResults | PersonResults;

export interface SearchResultsState {
  page: number;
  results: results[];
  total_results: number;
  total_pages: number;
}

const initialState: SearchResultsState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
};

const searchReducer = (
  state: SearchResultsState = initialState,
  action: SearchActions
): SearchResultsState => {
  switch (action.type) {
    case ActionTypes.SEARCH:
      return { ...action.payload };
    default:
      return state;
  }
};

export default searchReducer;
