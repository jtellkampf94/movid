import { ActionTypes } from "../action-types";
import { detailsAction } from "./../actions/details-actions";

export interface Details {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | {};
  budget?: number;
  created_by?: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
    episode_run_time: number[];
    first_air_date: string;
  };
  genres: { id: number; name: string }[];
  homepage: string | null;
  id: number;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  };
  name?: string;
  next_episode_to_air?: null;
  networks?: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  };
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_name?: string;
  seasons?: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  type?: string;
  imdb_id?: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue?: number;
  runtime?: number | null;
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Credits {
  id: number;
  cast: {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }[];
  crew: {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
  }[];
}

export interface Trailers {
  id: number;
  results: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
  }[];
}

export interface Reviews {
  id: number;
  page: number;
  results: {
    author: string;
    author_details: {
      name: string;
      username: string;
      avatar_path: string | null;
      rating: number | null;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
  }[];
  total_pages: number;
  total_results: number;
}

interface DetailsState {
  details: Details | null;
  credits: Credits | null;
  trailers: Trailers | null;
  reviews: Reviews | null;
}

const initialState: DetailsState = {
  details: null,
  credits: null,
  trailers: null,
  reviews: null
};

const detailsReducer = (
  state: DetailsState = initialState,
  action: detailsAction
): DetailsState => {
  switch (action.type) {
    case ActionTypes.GET_DETAILS:
      return { ...state, details: action.payload };
    case ActionTypes.GET_CREDITS:
      return { ...state, credits: action.payload };
    case ActionTypes.GET_TRAILERS:
      return { ...state, trailers: action.payload };
    case ActionTypes.GET_REVIEWS:
      return { ...state, reviews: action.payload };
    default:
      return state;
  }
};

export default detailsReducer;
