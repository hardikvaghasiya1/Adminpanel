import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { rootReducer } from "./Reducer"

export const configuerStore = () =>{
    const store = createStore(rootReducer, applyMiddleware(thunk))
    return store
}