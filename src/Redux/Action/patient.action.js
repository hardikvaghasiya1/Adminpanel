import * as Actiontype from '../Actiontype'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, } from "firebase/firestore";
import { db } from '../../firebase';
import { async } from '@firebase/util';


export const addpatienaction = (data) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "Patient"),
      data
    );
    dispatch({ type: Actiontype.POST_PATIENT, payload: { id: docRef.id, ...data } })
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

export const getpatientaction = () => async (dispatch) => {
  try {
    const getpatientdata = await getDocs(collection(db, "Patient"));

    const data = [];

    getpatientdata.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    dispatch({ type: Actiontype.GET_PATIENT, payload: data })


  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

export const deletepatientaction = (data) => async (dispatch) => {

  try {
    await deleteDoc(doc(db, "Patient", data));
    dispatch({ type: Actiontype.DELETE_PATIENT, payload: data })
  }
  catch (e) {
    console.error("Error adding document: ", e)
  }


}


export const updatepatientaction = (data) => async(dispatch) => {
  console.log(data);
  try {
    const PatientRef = doc(db, "Patient", data.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(PatientRef, {
      name:data.name,
      email:data.email,
      age:data.age,
      phonenumber:data.phonenumber
    });
    dispatch({type:Actiontype.UPDATE_PATIENT,payload:data})
  }
  catch (e) {
    console.error("Error adding document: ", e)
  }
}