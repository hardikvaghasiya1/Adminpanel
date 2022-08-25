import * as ActionTypes from "../Actiontype";

const intialState = {
    isLoding: false,
    doctor: [],
    error: ''
}

export const doctorReducer = (state = intialState, action) => {
    // console.log(action.payload, action)
    switch (action.type) {
        case ActionTypes.GET_DOCTOR:
            return {
                ...state,
                isLoding: false,
                doctor: action.payload,
                error: ''
            }
        case ActionTypes.POST_DOCTOR:
            return {
                ...state,
                isLoding: false,
                doctor: state.doctor.concat(action.payload),
                error: ''
            }
        case ActionTypes.DELETE_DOCTOR:
            return {
                ...state,
                isLoding: false,
                doctor: state.doctor.filter((l, i) => l.id !== action.payload),
                error: ''
            }
            case ActionTypes.UPDATE_DOCTOR:
                return {
                    ...state,
                    isLoding: false,
                    doctor: state.doctor.map((l, i) => {
                        if(l.id === action.payload.id){
                            return action.payload
                        }
                        else{
                            return l
                        }
                    }),
                    error: ''
                }
        default:
            return state;
    }
}