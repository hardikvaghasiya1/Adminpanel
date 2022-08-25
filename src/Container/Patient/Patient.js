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
    const [did, setDid] = useState('');
    const [udata, setUdata] = useState(false);
    const [uid, setUid] = useState(false);



    const dispatch = useDispatch();
    const patient = useSelector(state => state.patient)
    // console.log(patient.patient)






    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickDopen = (params) => {
        setDid(params.id)
        setDopen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setDopen(false);
    };






    const handleinsert = (values) => {
        let dataobj = {
            name: values.name,
            email: values.email,
            age: values.age,
            phonenumber: values.phonenumber
        }

        dispatch(addpatienaction(dataobj));

        // setData(dataobj);
        // console.log(dataobj)
        handleClose();
    }


    const handledelete = () => {
        dispatch(deletepatientaction(did))
        handleClose();
        setDid();
    }

    const handleedit = (params) => {
        formik.setValues({
            name:params.row.name,
            email:params.row.email,
            age:params.row.age,
            phonenumber:params.row.phonenumber,
        })
        setUid(params.row.id);
        setOpen(true);
        setUdata(true);
        console.log(udata)
    }

    const handleupdate = (values) => {
        let data = {
            id:uid,
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
        phonenumber: yup.number("Write Only Number").required("Please Enter a Age").positive("Please Enter a positive age").integer("please enter a value without point")
    });


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            age: '',
            phonenumber: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (udata) {
                handleupdate(values)
                console.log(values) 
            }else{
                handleinsert(values)
                console.log(values)
            }

            // console.log()
            formik.resetForm();
        },
    });







    const columns = [
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
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open alert dialog
                </Button>
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