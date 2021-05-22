import { ActionTypes } from "../action-types";
import { ConfigActions } from "../actions";

export interface ImageConfig {
  change_keys: string[];
  images: {
    backdrop_sizes: string[];
    base_url: string;
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    secure_base_url: string;
    still_sizes: string[];
  };
}

export interface MovieGenreConfig {
  genres: { id: number; name: string }[];
}

export interface ConfigState {
  images: ImageConfig;
  movieGenres: MovieGenreConfig;
}

const initialImagesState: ImageConfig = {
  change_keys: [],
  images: {
    backdrop_sizes: [],
    base_url: "",
    logo_sizes: [],
    poster_sizes: [],
    profile_sizes: [],
    secure_base_url: "",
    still_sizes: []
  }
};

const initialMovieGenreState: MovieGenreConfig = {
  genres: []
};

const initialState: ConfigState = {
  images: { ...initialImagesState },
  movieGenres: { ...initialMovieGenreState }
};

const configReducer = (
  state: ConfigState = initialState,
  action: ConfigActions
): ConfigState => {
  switch (action.type) {
    case ActionTypes.GET_IMAGE_CONFIG:
      return { ...state, images: action.payload };
    case ActionTypes.GET_MOVIE_GENRE_CONFIG:
      return { ...state, movieGenres: action.payload };
    default:
      return state;
  }
};

export default configReducer;
