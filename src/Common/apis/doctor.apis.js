import { deleterequest, getrequest, postrequest, putrequest, } from "../request"

export const getdoctorapi = () =>{
    return getrequest('doctor')
} 

export const postdoctorapi = (data) =>{
    console.log(data)
    return postrequest('doctor',data)
}

export const deletedoctorapi = (id) =>{
    return deleterequest('doctor/',id)
}

export const updatedoctorapi = (data) =>{
    return putrequest('doctor/',data)
}