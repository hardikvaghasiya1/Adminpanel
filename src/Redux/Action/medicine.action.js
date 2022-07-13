import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../../Base_Url/base_url';
import * as ActionTypes from '../Actiontype'


export const getMedicine = () => (dispatch) => {
  dispatch(loadingMedicine())
  try {
    setTimeout(function () {
      fetch(BASE_URL + 'medicines')
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
          error => {
            var errmess = new Error(error.message);
            throw errmess;
          })
        .then(response => response.json())
        .then(medicines => dispatch(({ type: ActionTypes.GET_MEDICINE, payload: medicines })))
        .catch((error) => dispatch(errorMedicine(error.message)))
    }, 2000)
  }
  catch (error) {
    dispatch(errorMedicine(error.message))
  }
}

export const updatemedicine = (data) => (dispatch) => {
  console.log(data.id)
  dispatch(loadingMedicine())
  try {
    setTimeout(function () {
      return fetch(BASE_URL + 'medicines/' + data.id,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
          error => {
            var errmess = new Error(error.message);
            throw errmess;
          })
        .then(response => response.json())
        .then(medicines => dispatch(({ type: ActionTypes.UPDATE_MEDICINE, payload: medicines })))
        .catch((error) => dispatch(errorMedicine(error.message)))
    }, 2000)
  }
  catch (error) {

  }
}





export const postmedicine = (data) => (dispatch) => {
  dispatch(loadingMedicine())
  try {
    setTimeout(function () {
      return fetch(BASE_URL + 'medicines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
          error => {
            var errmess = new Error(error.message);
            throw errmess;
          })
        .then(response => response.json())
        .then(medicine => dispatch(({ type: ActionTypes.POST_MEDICINE, payload: medicine })))
        .catch((error) => dispatch(errorMedicine(error.message)))
    }, 2000)
  }
  catch (error) {
    dispatch(errorMedicine(error.message))
  }
}

export const deletemedicine = (data) => (dispatch) => {
  dispatch(loadingMedicine())
  try {
    setTimeout(function () {
      return fetch(BASE_URL + 'medicines/' + data,
        {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
          }
        })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
          error => {
            var errmess = new Error(error.message);
            throw errmess;
          })
        .then(response => response.json())
        .then(dispatch(({ type: ActionTypes.DELETE_MEDICINE, payload: data })))
        .catch((error) => dispatch(errorMedicine(error.message)))
    }, 2000)
  }
  catch (error) {

  }
}

export const loadingMedicine = () => (dispatch) => {
  dispatch({ type: ActionTypes.LOAD_MEDICINE })
}

export const errorMedicine = (error) => (dispatch) => {
  dispatch({ type: ActionTypes.ERROR_MEDICINE, payload: error })
}