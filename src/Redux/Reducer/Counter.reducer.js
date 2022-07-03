import * as ActionTypes from '../Actiontype'
const initialState = {
    counter : 0
}

export const CounterReducer = (state= initialState, action) => {
    switch (action.type) {
        case ActionTypes.INCREMENT_VALUE:
            return{
               ...state,
                counter:state.counter + 1
            }
        case ActionTypes.DECREMENT_VALUE:
            return{
                ...state,
                counter: state.counter - 1
            } 
        default:
            return state
    }
}