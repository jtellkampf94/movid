import { ActionTypes } from "../action-types";
import { PeopleAction } from "../actions";

export interface PeopleDetails {
  birthday: string | null;
  known_for_department: string;
  deathday: null | string;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: string;
  homepage: null | string;
}

export interface CombinedCredits {
  cast: {
    id: number;
    original_language: string;
    episode_count: number;
    overview: string;
    origin_country: string[];
    original_name: string;
    genre_ids: number[];
    name: string;
    media_type: string;
    poster_path: string | null;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    character: string;
    backdrop_path: string | null;
    popularity: number;
    credit_id: string;
    original_title: string;
    video: boolean;
    release_date: string;
    title: string;
    adult: boolean;
  }[];
  crew: {
    id: number;
    department: string;
    original_language: string;
    episode_count: number;
    job: string;
    overview: string;
    origin_country: string[];
    original_name: string;
    vote_count: number;
    name: string;
    media_type: string;
    popularity: number;
    credit_id: string;
    backdrop_path: string | null;
    first_air_date: string;
    vote_average: number;
    genre_ids: number[];
    poster_path: string | null;
    original_title: string;
    video: boolean;
    title: string;
    adult: boolean;
    release_date: string;
  }[];
  id: number;
}

interface PeopleState {
  details: PeopleDetails;
  combinedCredits: CombinedCredits;
}

const initialState: PeopleState = {
  details: {
    birthday: null,
    known_for_department: "",
    deathday: null,
    id: 0,
    name: "",
    also_known_as: [],
    gender: 0,
    biography: "",
    popularity: 0,
    place_of_birth: null,
    profile_path: null,
    adult: false,
    imdb_id: "",
    homepage: null
  },
  combinedCredits: {
    id: 0,
    cast: [],
    crew: []
  }
};

const peopleReducer = (
  state: PeopleState = initialState,
  action: PeopleAction
): PeopleState => {
  switch (action.type) {
    case ActionTypes.GET_PEOPLE_DETAILS:
      return { ...state, details: action.payload };
    case ActionTypes.GET_PEOPLE_COMBINDED_CREDITS:
      return { ...state, combinedCredits: action.payload };
    case ActionTypes.CLEAR_PEOPLE:
      return { ...initialState };
    default:
      return state;
  }
};

export default peopleReducer;
