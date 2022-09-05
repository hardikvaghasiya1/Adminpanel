import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addpatienaction, deletepatientaction, getpatientaction, updatepatientaction } from '../../Redux/Action/patient.action';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';





function Patient(props) {

    const [open, setOpen] = useState(false);
    const [dopen, setDopen] = useState(false);
    const [ddata, setDdata] = useState('');
    const [udata, setUdata] = useState(false);
    const [uid, setUid] = useState(false);
    const [firstname , setFirstName] = useState();



    const dispatch = useDispatch();
    const patient = useSelector(state => state.patient)
    const patientdata = patient.patient;
    console.log(patient.patient)






    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickDopen = (params) => {
        setDdata(params.row)
        setDopen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setDopen(false);
    };






    const   handleinsert = (values) => {
        let dataobj = {
            name: values.name,
            email: values.email,
            age: values.age,
            phonenumber: values.phonenumber,
            file: values.file
        }

        dispatch(addpatienaction(dataobj));

        // setData(dataobj);
        // console.log(dataobj)
        handleClose();
    }


    const handledelete = () => {
        dispatch(deletepatientaction(ddata))
        handleClose();
        setDdata();
    }

    const handleedit = (params) => {
        console.log(params.row);
        formik.setValues({
            name: params.row.name,
            email: params.row.email,
            age: params.row.age,
            phonenumber: params.row.phonenumber,
            file:params.row.file
        })
        setUid(params.row.id);
        setFirstName(params.row.fileName);
        setOpen(true);
        setUdata(true);
        // console.log(udata)
    }

    const handleupdate = (values) => {
        console.log(values);
        let data = {
            id: uid,
            fileName: firstname,
            ...values
        }
        // console.log(uid)
        // console.log(data);
        dispatch(updatepatientaction(data));
        formik.resetForm();
        setOpen(false);
    }





    useEffect(() => {
        dispatch(getpatientaction())
    }, [])




    let schema = yup.object().shape({
        name: yup.string().required("Please Enter a Name"),
        email: yup.string().email().required("Please Enter a Email"),
        age: yup.number("Write Only Number").required("Please Enter a Age").positive("Please Enter a positive age"),
        phonenumber: yup.number("Write Only Number").required("Please Enter a Age").positive("Please Enter a positive age").integer("please enter a value without point"),
        file: yup.mixed().required("Please enter a file")
    });


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            age: '',
            phonenumber: '',
            file: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (udata) {
                handleupdate(values)
                // console.log(values)
            } else {
                handleinsert(values)
                // console.log(values)
            }

            // console.log()
            formik.resetForm();
        },
    });







    const columns = [
        { field: 'url', headerName: 'Profile', width: 160, 
            renderCell: (params) => (
             <img src={params.row.file} height={35} width={35} style={{borderRadius:18}}/>   
            )
        },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 160 },
        { field: 'age', headerName: 'Age', type: 'number', width: 90 },
        { field: 'phonenumber', headerName: 'PhoneNumber', type: 'number', width: 160 },
        {
            field: 'delete',
            HeaderName: 'Delete/Update',
            width: 90,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleClickDopen(params)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="update" onClick={() => handleedit(params)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        },
    ];



    return (
        <>
            <div>
                <h2>Patient List</h2>
                <Button variant="outlined" onClick={handleClickOpen}>Add Patient</Button>
                {/* <img src=''/> */}
            </div>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Patient</DialogTitle>
                    <Formik value={formik}>
                        <Form onSubmit={formik.handleSubmit}>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Enter a Name"
                                    type="name"
                                    value={formik.values.name}
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.name ? <p>{formik.errors.name}</p> : null}
                                <TextField
                                    margin="dense"
                                    id="email"
                                    label="Enter a Email"
                                    type="email"
                                    value={formik.values.email}
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.email ? <p>{formik.errors.email}</p> : null}
                                <TextField
                                    margin="dense"
                                    id="age"
                                    label="Enter a Age"
                                    value={formik.values.age}
                                    type="age"
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.age ? <p>{formik.errors.age}</p> : null}
                                <TextField
                                    margin="dense"
                                    id="phonenumber"
                                    label="Enter a PhoneNumber"
                                    value={formik.values.phonenumber}
                                    type="phone"
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.phonenumber ? <p>{formik.errors.phonenumber}</p> : null}
                                <TextField
                                    margin="dense"
                                    id="file"
                                    type="file"
                                    fullWidth
                                    variant="standard"
                                    value={formik.values.file}
                                    onChange={(e) => formik.setFieldValue('file', e.target.files[0])}
                                />
                                {formik.errors.file ? <p>{formik.errors.file}</p> : null}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='Submit'>Add</Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={patient.patient}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>


            <div>
                <Dialog
                    open={dopen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Are You Sure?
                    </DialogTitle>
                    <DialogContent>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handledelete}>Yes</Button>
                        <Button onClick={handleClose}>No</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

export default Patient;