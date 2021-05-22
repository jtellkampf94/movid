import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action-types";
import { GetImagesConfigAction, GetMovieGenreConfigAction } from "../actions";

const key = process.env.REACT_APP_API_KEY;

export const getImagesConfig = () => async (
  dispatch: Dispatch
): Promise<GetImagesConfigAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${key}`
    );
    const action: GetImagesConfigAction = {
      type: ActionTypes.GET_IMAGE_CONFIG,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getMovieGenreConfig = () => async (
  dispatch: Dispatch
): Promise<GetMovieGenreConfigAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`
    );
    const action: GetMovieGenreConfigAction = {
      type: ActionTypes.GET_MOVIE_GENRE_CONFIG,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
