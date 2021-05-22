import { ImageConfig, MovieGenreConfig } from "./../reducers/config-reducer";
import { ActionTypes } from "../action-types";

export interface GetImagesConfigAction {
  type: ActionTypes.GET_IMAGE_CONFIG;
  payload: ImageConfig;
}

export interface GetMovieGenreConfigAction {
  type: ActionTypes.GET_MOVIE_GENRE_CONFIG;
  payload: MovieGenreConfig;
}

export type ConfigActions = GetImagesConfigAction | GetMovieGenreConfigAction;
