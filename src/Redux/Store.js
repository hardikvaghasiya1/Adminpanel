import { applyMiddleware, createStore } from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk"
import { rootReducer } from "./Reducer"

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)
 
export const configuerStore = () =>{
    const store = createStore(persistedReducer, applyMiddleware(thunk))
    const persistor = persistStore(store)

    return {
        store, persistor
}
}