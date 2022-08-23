import * as ActionTypes from "../ActionTypes"

export const themeReducer = (action, state) => {
    console.log(action.payload)
    switch (action.type) {
        case ActionTypes.TOOGLE_THEME:
            return{
                ...state,
                theme:action.payload
            }
    
        default:
            return state;
    }
}