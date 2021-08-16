import {
    AppBar,
    TextField,
    Typography,
    Grid,
    Backdrop,
    Dialog,
    IconButton,
    Button,
    Toolbar,
    CircularProgress,
    Snackbar,
} from '@material-ui/core';

import { Alert } from '@material-ui/lab';
import { DataGrid } from '@material-ui/data-grid'

import { useState, useEffect } from 'react';
import useStyles from './styles'
import userService from '../../services/user.service';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import CloseIcon from '@material-ui/icons/Close'

import AddInstructorDialog from './AddInstructorDialog';

const UserBoard = () => {
    const [users, setUsers] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    const [editable, setEditable] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    const [refresh, setRefresh] = useState(null);

    useEffect(() => {
        setIsPending(true);
        userService.getAll().then(response => {
            const list = response.listAllResponse;
            const resultArray = list.map(elm => {
                elm['id'] = elm.Id;
                return elm
            });
            setIsPending(false);
            setUsers(resultArray)
        }).catch(error => {
            setError(error)
            setIsPending(false);
        })
    }, [refresh])

    const usersColumns = [
        { field: 'Id', headerName: 'Id', width: 90 },
        {
            field: 'Name',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'Email',
            headerName: 'Email',
            width: 250,
        },
        { field: 'Role', headerName: 'Role', width: 150 },

    ];

    const [open, setOpen] = useState(false);

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleClick = (event) => {
        setOpen(event.row);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setIsProcessing(true)
        userService.updateOne(open?.Id, open).then(response => {
            let array = [...users];
            let index = array.indexOf(open)

            if (index !== -1) {
                array.splice(index, 1);
                array.push(open);
                setUsers(array);
                setSnackType('success');
                setSnackContent('Updated')
                setOpenSnack(true);
                setOpen(false);
            }
            setIsProcessing(false)
        }).catch(error => {
            console.log(error);
            setSnackType('error');
            setSnackContent(error.message);
            setOpenSnack(true);
            setIsProcessing(false);
        })
    }

    const handleDelete = () => {
        setIsProcessing(true)
        userService.deleteOne(open?.Id).then(response => {
            let array = [...users]; // make a separate copy of the array
            let index = array.indexOf(open)

            if (index !== -1) {
                array.splice(index, 1);
                setUsers(array);
                setSnackType('success');
                setSnackContent('Deleted')
                setOpenSnack(true);
                setOpen(false);
            }
            setIsProcessing(false)
            console.log('del', response);
        }).catch(error => {
            console.log(error);
            setSnackType('error');
            setSnackContent(error.message);
            setOpenSnack(true);
            setIsProcessing(false);
        })
    }

    const handleChange = (event) => {
        const dic = {
            Id: open.Id,
            id: open.id,
            Name: event.target.value
        }
        setOpen(dic);
    }

    const classes = useStyles();
    return (
        <div style={{ minHeight: 520, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={usersColumns}
                pageSize={5}
                error={error}
                loading={isPending}
                onRowClick={handleClick}
                disableSelectionOnClick
            />
            <div style={{ position: 'absolute', top: 70, right: 100 }}>
                <IconButton
                    onClick={() => { setOpenAdd(true) }}
                >
                    <AddCircleOutlineRoundedIcon />
                </IconButton>
                <IconButton
                    onClick={() => { setRefresh(!refresh) }}
                >
                    <CachedRoundedIcon />
                </IconButton>
            </div>

            <Dialog open={open ? true : false} onClose={handleClose} className={classes.dialog}>
                <AppBar className={classes.dialogAppBar} style={{ position: 'static' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Detail
                        </Typography>
                        {editable
                            ? <Button autoFocus color="inherit" onClick={handleSave}>
                                Save
                            </Button>
                            : <Button autoFocus color="inherit"
                                onClick={() => { setEditable(!editable) }}>
                                Edit
                            </Button>}
                        <Button autoFocus color="inherit" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        variant="outlined"
                        value={open ? open.Name : ''}
                        onChange={handleChange}
                        disabled={!editable}
                        fullWidth
                        style={{ margin: 20 }}
                    />

                </Grid>
            </Dialog>

            <AddInstructorDialog
                setIsProcessing={setIsProcessing}
                setRefresh={setRefresh}
                refresh={refresh}
                open={openAdd}
                onClose={() => setOpenAdd(false)}
            />

            <Backdrop className={classes.backdrop} open={isProcessing} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnack}
                autoHideDuration={4000}
                onClose={handleCloseSnack}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnack} severity={snackType}>
                    {snackContent}
                </Alert>
            </Snackbar>
        </div >
    )
};

export default UserBoard;
