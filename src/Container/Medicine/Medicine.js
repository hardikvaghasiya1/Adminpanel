import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Slide from '@mui/material/Slide';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import EditIcon from '@mui/icons-material/Edit';







const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});





function Medicine(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [dopen, setDopen] = useState(false);
    const [did, setDid] = useState();
    const [update, setUpdate] = useState(false);
    const [uid, setUid] = useState();
    const [searchdata, setSearchdata] = useState();



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickDopen = (params) => {
        setDopen(true);
        setDid(params);
    };

    const handleClose = () => {
        setOpen(false);
        setDopen(false);
    };
    let handleSubmit = (value) => {
        let data = {
            id: Math.floor(Math.random() * 1000),
            name: value.name,
            price: value.price,
            quntity: value.quntity,
            expiry: value.expiry
        }
        // console.log(name, price, quntity, expiry);



        var localdata = JSON.parse(localStorage.getItem("medicine"));
        if (localdata === null) {
            localStorage.setItem("medicine", JSON.stringify([data]));
        }
        else {
            localdata.push(data);
            localStorage.setItem("medicine", JSON.stringify(localdata));
        }
        handleClose();
        showData();
        formik.resetForm();
    };

    const handleDelete = () => {
        var localdata = JSON.parse(localStorage.getItem("medicine"));
        console.log(localdata);
        let ddata = localdata.filter((l, i) => l.id !== did.id);
        localStorage.setItem("medicine", JSON.stringify(ddata));
        handleClose();
        setDid();
        showData();
    };

    const handleedit = (params) => {
        // console.log(params.row);
        formik.setValues({
            name: params.row.name,
            price: params.row.price,
            quntity: params.row.quntity,
            expiry: params.row.expiry,
        })
        setUid(params.row.id);
        setOpen(true);
        setUpdate(true);
    }

    const handleupdate = (value) => {
        console.log(uid);
        let udata = JSON.parse(localStorage.getItem('medicine'));
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
        localStorage.setItem("medicine", JSON.stringify(editdata));
        console.log("Update successfully");
        showData();
        handleClose();
    }


    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'price', headerName: 'Price', type: 'number', width: 70 },
        { field: 'quntity', headerName: 'Quntity', type: 'number', width: 70 },
        { field: 'expiry', headerName: 'Expiry Date', type: 'number', width: 90 },
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

    const showData = () => {
        let localData = JSON.parse(localStorage.getItem("medicine"))

        if (localData !== null) {
            setData(localData)
        }
    }

    useEffect(
        () => {
            showData();
        },
        [])

    let schema = yup.object().shape({
        name: yup.string().required("Name is recuired"),
        price: yup.number().required("Price is recuired"),
        quntity: yup.number().required("Quantity is recuired"),
        expiry: yup.number().required("Expiry is recuired")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            quntity: '',
            expiry: ''
        },
        validationSchema: schema,
        onSubmit: value => {
            if (update) {
                handleupdate(value);
            }
            else {
                handleSubmit(value);
            }
        },
    });

    const handleSearch = (searchvalue) => {
        let localdata = JSON.parse(localStorage.getItem('medicine'));
        let filtervalue = localdata.filter((f) => 
            f.id.toString().includes(searchvalue) ||
            f.name.toString().toLowerCase().includes(searchvalue.toLowerCase()) ||
            f.price.toString().includes(searchvalue) ||
            f.quntity.toString().includes(searchvalue) ||
            f.expiry.toString().includes(searchvalue)
        );

        console.log(filtervalue);
        if (filtervalue.length === 0) {
            setSearchdata([]);
        } else {
            setSearchdata(filtervalue);
        }
        
    }

    let searchresult;

    if (searchdata === undefined) {
        searchresult = data
    } else if (searchdata.length > 0) {
        searchresult = searchdata
    } else {
        searchresult = []
    }

    //let searchresult = searchdata.length === 0 ? [] : searchdata;

    return (
        <>
            <div>
                <h2>Add Medicine</h2>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicine
                </Button>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name='name'
                    label="Medicine name"
                    type="name"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <Dialog open={open} onClose={handleClose} fullScreen>
                    <DialogTitle>Add Medicine</DialogTitle>
                    <Formik value={formik}>
                        <Form onSubmit={formik.handleSubmit}>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    name='name'
                                    label="Medicine name"
                                    value={formik.values.name}
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
                                    id="price"
                                    name='price'
                                    label="Medicine price"
                                    value={formik.values.price}
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.price ? <p>{formik.errors.price}</p> : null}
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="quntity"
                                    name='quntity'
                                    label="Medicine quntity"
                                    value={formik.values.quntity}
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.quntity ? <p>{formik.errors.quntity}</p> : null}
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="expiry"
                                    name='expiry'
                                    label="Medicine expiry"
                                    value={formik.values.expiry}
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.expiry ? <p>{formik.errors.expiry}</p> : null}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='Submit'>Submit</Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </Dialog>
            </div>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={searchresult}
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
        </>
    );
}

export default Medicine;