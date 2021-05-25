import { combineReducers } from "redux";
import configReducer from "./config-reducer";
import detailsReducer from "./details-reducer";
import moviesReducer from "./movies-reducer";
import tvReducer from "./tv-reducer";
import peopleReducer from "./people-reducer";

const reducers = combineReducers({
  config: configReducer,
  movies: moviesReducer,
  details: detailsReducer,
  tv: tvReducer,
  people: peopleReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
