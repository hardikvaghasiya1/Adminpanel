import { combineReducers } from "redux";
import { CounterReducer } from "./Counter.reducer";
import { medicinereducer } from "./medicine.reducer";

export const rootReducer = combineReducers({
    counter:CounterReducer,
    medicines:medicinereducer
})