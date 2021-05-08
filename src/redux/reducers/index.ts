import { combineReducers } from "redux";
import configReducer from "./config-reducer";

const reducers = combineReducers({
  config: configReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
