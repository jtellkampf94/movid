import { ActionTypes } from "../action-types";
import { detailsAction } from "./../actions/details-actions";

export interface Details {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | {};
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
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
  revenue: number;
  runtime: number | null;
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
