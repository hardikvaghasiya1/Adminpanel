import * as ActionTypes from '../Actiontype'
const InitialState = {
    isLoding: false,
    medicines: [],
    error: ''
}
export const medicinereducer = (state = InitialState, action) => {
    // console.log(action.payload, action);
    switch (action.type) {
        case ActionTypes.LOAD_MEDICINE:
            return {
                ...state,
                isLoding: true,
                error: ''
            }
        case ActionTypes.GET_MEDICINE:
            return {
                ...state,
                isLoding: false,
                medicines: action.payload,
                error: ''
            }
        case ActionTypes.POST_MEDICINE:
            return {
                ...state,
                isLoding: false,
                medicines: state.medicines.concat(action.payload),
                error: ''
            }
        case ActionTypes.DELETE_MEDICINE:
            return {
                ...state,
                isLoding: false,
                medicines: state.medicines.filter((l, i) => l.id !== action.payload),
                error: ''
            }
        case ActionTypes.UPDATE_MEDICINE:
            return {
                ...state,
                isLoding: false,
                medicines: state.medicines.map((l, i) =>{
                    if(l.id === action.payload.id){
                        return action.payload
                    }
                    else{
                        return l;
                    }
                }),
                error: ''
            }
        case ActionTypes.ERROR_MEDICINE:
            return {
                ...state,
                isLoding: false,
                medicines: [],
                error: action.payload
            }
        default:
            return state
    }
} 