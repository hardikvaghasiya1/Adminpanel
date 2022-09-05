import * as Actiontype from '../Actiontype'

const initialState = {
    isLoading: false,
    patient: [],
    error: ''
}


export const patientReducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case Actiontype.POST_PATIENT:
            return {
                ...state,
                isLoading: false,
                patient: state.patient.concat(action.payload),
                error: ''
            }
        case Actiontype.GET_PATIENT:
            return {
                ...state,
                isLoading: false,
                patient: action.payload,
                error: ''
            }
        case Actiontype.DELETE_PATIENT:
            return {
                ...state,
                isLoading: false,
                patient: state.patient.filter((l) => l.id !== action.payload),
                error: ''
            }
        case Actiontype.UPDATE_PATIENT:
            return {
                ...state,
                isLoading: false,
                patient: state.patient.map((l) =>{
                    if(l.id === action.payload.id){
                        return action.payload
                    }
                    else{
                        return l;   
                    }
                }),
                error: ''
            }

        default:
            return state
    }
}