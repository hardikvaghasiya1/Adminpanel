import axios from 'axios';
import { BASE_URL } from '../Base_Url/base_url';


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
  });

const sendrequest = (config) => {
    return axiosInstance.request(config);
}

export const getrequest = (path) => {
    return sendrequest({
        url:path,
        method:'GET'    
    })
}

export const postrequest = (path, data) => {
    return sendrequest({
        url:path,
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        data:JSON.stringify(data)
    })
}

export const deleterequest = (path, id) => {
    return sendrequest({
        url:path + id,
        method:'DELETE',
        headers: { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        }
    })
}


export const putrequest = (path, data) => {
    return sendrequest({
        url:path + data.id,
        method:'PUT',
        headers: { 
            'Content-Type': 'application/json'
        },
        data:JSON.stringify(data)
    })
}