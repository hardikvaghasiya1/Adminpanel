import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Doctor(props) {

    const [open, setOpen] = useState(false);
    const [dataobj, setDataobj] = useState([]);
    const [dopen, setDopen] = useState(false);
    const [did, setDid] = useState();
    const [update, setUpdate] = useState(false);
    const [uid, setUid] = useState();




    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDopen(false);
    };

    const handleClickDopen = (params) => {
        setDopen(true);
        setDid(params);
    };

    let handleSubmit = (value) => {
        let dataobj = {
            id: Math.floor(Math.random() * 1000),
            name: value.name,
            degree: value.degree,
            about: value.about
        }
        var localdata = JSON.parse(localStorage.getItem('doctor'));
        if (localdata === null) {
            localStorage.setItem("doctor", JSON.stringify([dataobj]));
        }
        else {
            localdata.push(dataobj);
            localStorage.setItem("doctor", JSON.stringify(localdata));
        }
        handleClose();
        showData();
    };

    const handleDelete = () => {
        var localdata = JSON.parse(localStorage.getItem("doctor"));
        console.log(localdata);
        let ddata = localdata.filter((l, i) => l.id !== did.id);
        localStorage.setItem("doctor", JSON.stringify(ddata));
        handleClose();
        setDid();
        showData();
    };

    const handleedit = (params) => {
        // console.log(params.row);
        formik.setValues({
            name: params.row.name,
            degree: params.row.degree,
            about: params.row.about,
        })
        setUid(params.row.id);
        setOpen(true);
        setUpdate(true);
    }

    const handleupdate = (value) => {
        console.log(uid);
        let udata = JSON.parse(localStorage.getItem('doctor'));
        console.log(udata);
        let editdata = udata.map((l) => {
            if (l.id === uid) {
                console.log(uid);
                return (
                    { id: uid, ...value }
                )
            }
            else {
                return l;
            }

        }

        );
        localStorage.setItem("doctor", JSON.stringify(editdata));
        console.log("Update successfully");
        showData();
        handleClose();
    }


    const showData = () => {
        let localData = JSON.parse(localStorage.getItem("doctor"))

        if (localData !== null) {
            setDataobj(localData)
        }
    }

    useEffect(
        () => {
            showData();
        },
        [])

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'degree', headerName: 'Degree', width: 130 },
        { field: 'about', headerName: 'About', width: 250 },
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

    let schema = yup.object().shape({
        name: yup.string().required("Name is recuired"),
        degree: yup.string().required("Degree is recuired"),
        about: yup.string().required("About is recuired")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            degree: '',
            about: '',
        },
        validationSchema: schema,
        onSubmit: value => {
            if (update) {
                handleupdate(value);
            }
            else {
                handleSubmit(value);
                
            }
            
        formik.resetForm();
        },
    });

    return (
        <>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Doctor Detail
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Doctor Details</DialogTitle>
                    <Formik value={formik}>
                        <Form onSubmit={formik.handleSubmit}>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    value={formik.values.name}
                                    label="Doctor Name"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                    // onChange={(e) => setName(e.target.value)}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.name ? <p>{formik.errors.name}</p> : null}
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="degree"
                                    value={formik.values.degree}
                                    label="Degree"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                    // onChange={(e) => setDegree(e.target.value)}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.degree ? <p>{formik.errors.degree}</p> : null}
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="about"
                                    value={formik.values.about}
                                    label="About"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                    // onChange={(e) => setAbout(e.target.value)}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.about ? <p>{formik.errors.about}</p> : null}

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='Submit'>Add Data</Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </Dialog>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={dataobj}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                <div>
                    <Dialog
                        open={dopen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description">
                        <DialogTitle>{"Are You Sure?"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={handleDelete}>Yes</Button>
                            <Button onClick={handleClose}>No</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    );
}

export default Doctor;