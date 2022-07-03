import * as ActionTypes from '../Actiontype'

export const incrementcounter= () => (dispatch) => {
    dispatch({type:ActionTypes.INCREMENT_VALUE})
}
export const decrementcounter= () => (dispatch) => {
    dispatch({type:ActionTypes.DECREMENT_VALUE})
}