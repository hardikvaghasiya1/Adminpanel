import * as Actiontype from '../Actiontype'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, } from "firebase/firestore";
import { db, storage } from '../../firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';



export const addpatienaction = (data) => async (dispatch) => {
  try {
    const rndmfilename = Math.floor(Math.random() * 1000000).toString();
    const storageRef = ref(storage, 'PatientProfile/' + rndmfilename);
    uploadBytes(storageRef, data.file)
      .then((snapshot) => {
        console.log(snapshot);
        getDownloadURL(ref(storage, snapshot.ref))
          .then(async (url) => {
            const docRef = await addDoc(collection(db, "Patient"),
              {
                name: data.name,
                email: data.email,
                age: data.age,
                phonenumber: data.phonenumber,
                file: url,
                fileName: rndmfilename
              }
            );
            dispatch({
              type: Actiontype.POST_PATIENT,
              payload: {
                id: docRef.id,
                name: data.name,
                email: data.email,
                age: data.age,
                phonenumber: data.phonenumber,
                file: url,
                fileName: rndmfilename
              }
            })
          })
      });


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
  console.log(data)
  try {
    const imagedelRef = ref(storage, 'PatientProfile/' + data.fileName);
    deleteObject(imagedelRef)
      .then(async () => {
        await deleteDoc(doc(db, "Patient", data.id));
        dispatch({ type: Actiontype.DELETE_PATIENT, payload: data.id })
      }).catch((error) => {
        console.error("Error adding document: ", error)
      });
  }
  catch (e) {
    console.error("Error adding document: ", e)
  }


}


export const updatepatientaction = (data) => async (dispatch) => {
  console.log(data);
  try {
    const PatientRef = doc(db, "Patient/", data.id);
    if (typeof data.file === 'string') {
      await updateDoc(PatientRef, {
        name: data.name,
        email: data.email,
        age: data.age,
        phonenumber: data.phonenumber,
        file: data.file
      });
      dispatch({ type: Actiontype.UPDATE_PATIENT, payload: data })


    } else {

      const imagedelRef = ref(storage, 'PatientProfile/' + data.fileName);
      deleteObject(imagedelRef)
        .then(async () => {
          const rndmfilename = Math.floor(Math.random()*1000000).toString();
          const uploadRef = ref(storage, 'PatientProfile/' + rndmfilename);
          uploadBytes(uploadRef, data.file)
            .then((snapshot) => {
              // console.log(snapshot);
              getDownloadURL(ref(storage, snapshot.ref))
                .then(async (url) => {
                  console.log(url);
                  await updateDoc(PatientRef, {
                    name: data.name,
                    email: data.email,
                    age: data.age,
                    phonenumber: data.phonenumber,
                    fileName: rndmfilename,
                    file: url
                  });
                  dispatch({
                    type: Actiontype.UPDATE_PATIENT,
                    payload:{...data , fileName:rndmfilename, file: url}
                  })
                })
            })
        })
    }
    //   const PatientRef = doc(db, "Patient", data.id);

    //   // Set the "capital" field of the city 'DC'
    //   await updateDoc(PatientRef, {
    //     name: data.name,
    //     email: data.email,
    //     age: data.age,
    //     phonenumber: data.phonenumber
    //   });
    //   dispatch({ type: Actiontype.UPDATE_PATIENT, payload: data })
  }
  catch (e) {
    console.error("Error adding document: ", e)
  }
}