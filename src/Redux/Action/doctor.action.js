import { deletedoctorapi, getdoctorapi, postdoctorapi, updatedoctorapi } from '../../Common/apis/doctor.apis'
import * as ActionTypes from '../Actiontype'

export const getdoctor = () => (dispatch) => {
    console.log('Hiii')
    try{
        return getdoctorapi()
        .then((data) => dispatch(({ type: ActionTypes.GET_DOCTOR, payload: data.data})))
        // .then(doctors => dispatch(({ type: ActionTypes.GET_DOCTOR, payload: doctors})))
    }
    catch(error)
    {
        console.log(error)
    }
}

export const postdoctor = (data) => (dispatch) => {
    try{
        return postdoctorapi(data)
        .then((data) => dispatch(({ type: ActionTypes.POST_DOCTOR, payload: data.data})))
    }
    catch(error)
    {
        console.log(error)
    }
}

export const deletedoctor = (id) => (dispatch) => {
    try{
        return deletedoctorapi(id)
        .then(dispatch(({ type: ActionTypes.DELETE_DOCTOR, payload: id})))
    }
    catch(error)
    {
        console.log(error)
    }
}

export const updatedoctor = (data) => (dispatch) => {
    console.log(data)
    try{
       return updatedoctorapi(data)
        .then((data) => dispatch(({ type: ActionTypes.UPDATE_DOCTOR, payload: data.data})))
    }
    catch(error)
    {
        console.log(error)
    }
}