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

interface DetailsState {
  details: Details | null;
}

const initialState: DetailsState = {
  details: null
};

const detailsReducer = (
  state: DetailsState = initialState,
  action: detailsAction
): DetailsState => {
  switch (action.type) {
    case ActionTypes.GET_DETAILS:
      return { ...state, details: action.payload };
    default:
      return state;
  }
};

export default detailsReducer;
