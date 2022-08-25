import { combineReducers } from "redux";
import { CounterReducer } from "./Counter.reducer";
import { doctorReducer } from "./doctor.reducer";
import { medicinereducer } from "./medicine.reducer";
import { patientReducer } from "./patient.reducer";

export const rootReducer = combineReducers({
    counter:CounterReducer,
    medicines:medicinereducer,
    doctors:doctorReducer,
    patient:patientReducer
})