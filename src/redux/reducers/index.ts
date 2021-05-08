import { combineReducers } from "redux";
import configReducer from "./config-reducer";
import moviesReducer from "./movies-reducer";

const reducers = combineReducers({
  config: configReducer,
  movies: moviesReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
