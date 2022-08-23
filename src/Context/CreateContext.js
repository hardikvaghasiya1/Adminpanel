import { createContext, useReducer } from "react";
import { themeReducer } from "./Reducer/themeReducer";
import * as ActionTypes from './ActionTypes'

export const ThemeContext = createContext();

const initialstate = {
    theme : "light" 
}


export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initialstate);

    const toogle_theme = (theme) => {
        const newtheme = theme === "light" ? "dark" : "light"
        dispatch(({ type: ActionTypes.TOOGLE_THEME, payload: newtheme}))
    }

    return (
        <ThemeContext.Provider value={
            {   
                ...state,
                toogle_theme
            }
        }>
            {children}
        </ThemeContext.Provider>
    )


}
