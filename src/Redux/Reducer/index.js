import { combineReducers } from "redux";
import { CounterReducer } from "./Counter.reducer";

export const rootReducer = combineReducers({
    counter:CounterReducer
})