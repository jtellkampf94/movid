import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action-types";
import {
  GetDiscoverMoviesAction,
  GetNowPlayingMoviesAction,
  GetPopularMoviesAction,
  GetTopRatedMoviesAction,
  GetUpcomingMoviesAction
} from "../actions";

const key = process.env.REACT_APP_API_KEY;

export const getNowPlayingMovies = () => async (
  dispatch: Dispatch
): Promise<GetNowPlayingMoviesAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`
    );
    const action: GetNowPlayingMoviesAction = {
      type: ActionTypes.GET_NOW_PLAYING_MOVIES,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getUpcomingMovies = () => async (
  dispatch: Dispatch
): Promise<GetUpcomingMoviesAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`
    );
    const action: GetUpcomingMoviesAction = {
      type: ActionTypes.GET_UPCOMING_MOVIES,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getTopRatedMovies = () => async (
  dispatch: Dispatch
): Promise<GetTopRatedMoviesAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`
    );
    const action: GetTopRatedMoviesAction = {
      type: ActionTypes.GET_TOP_RATED_MOVIES,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const getPopularMovies = () => async (
  dispatch: Dispatch
): Promise<GetPopularMoviesAction | void> => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
    );
    const action: GetPopularMoviesAction = {
      type: ActionTypes.GET_POPULAR_MOVIES,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

interface MovieFilers {
  sortBy: string | null;
  voteAverage: null | string;
  withPeople: null | string;
  withGenre: null | string;
  year: null | string;
  page: string;
}

export const getDiscoverMovies = (movieFilers: MovieFilers) => async (
  dispatch: Dispatch
): Promise<GetDiscoverMoviesAction | void> => {
  try {
    let {
      sortBy,
      voteAverage,
      withPeople,
      withGenre,
      year,
      page
    } = movieFilers;

    if (sortBy === null) {
      sortBy = "popularity.desc";
    }

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&${
      voteAverage ? `vote_average.gte=${voteAverage}&` : ""
    }${withGenre ? `with_genres=${withGenre}&` : ""}${
      withPeople ? `with_people=${withPeople}&` : ""
    }${year ? `primary_release_year=${year}` : ""}`;

    const { data } = await axios.get(url);
    const action: GetDiscoverMoviesAction = {
      type: ActionTypes.GET_DISCOVER_MOVIES,
      payload: data
    };
    return dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
