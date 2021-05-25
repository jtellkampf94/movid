import { ActionTypes } from "../action-types";
import { TVAction } from "../actions/tv-actions";

export interface TVDetails {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
  title: undefined;
}

export interface TVResults {
  page: number;
  results: TVDetails[];
  total_results: number;
  total_pages: number;
}

interface TVState {
  airingToday: TVResults;
  popular: TVResults;
  onTheAir: TVResults;
  topRated: TVResults;
}

const initialTVResults: TVResults = {
  page: 0,
  results: [],
  total_results: 0,
  total_pages: 0
};

const initialState: TVState = {
  airingToday: { ...initialTVResults },
  popular: { ...initialTVResults },
  onTheAir: { ...initialTVResults },
  topRated: { ...initialTVResults }
};

const tvReducer = (
  state: TVState = initialState,
  action: TVAction
): TVState => {
  switch (action.type) {
    case ActionTypes.GET_TV_AIRING_TODAY:
      return { ...state, airingToday: action.payload };
    case ActionTypes.GET_POPULAR_TV:
      return { ...state, popular: action.payload };
    case ActionTypes.GET_TV_ON_THE_AIR:
      return { ...state, onTheAir: action.payload };
    case ActionTypes.GET_TOP_RATED_TV:
      return { ...state, topRated: action.payload };
    default:
      return state;
  }
};

export default tvReducer;
