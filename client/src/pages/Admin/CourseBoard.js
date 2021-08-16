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
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useState, useEffect } from 'react';
import useStyles from './styles'
import courseService from '../../services/course.service';
import CloseIcon from '@material-ui/icons/Close'


const CourseBoard = () => {
    const [courses, setCourses] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    const [refresh, setRefresh] = useState(null);


    useEffect(() => {
        setIsPending(true);
        courseService.getAll().then(response => {
            const list = response.listAllResponse;
            const resultArray = list.map(elm => {
                elm['id'] = elm.Id;
                elm['Author_Id'] = elm.Author.Id;
                elm['Category_Id'] = elm.Category.Id;
                return elm
            });
            setIsPending(false);
            setCourses(resultArray)
        }).catch(error => {
            setError(error)
            setIsPending(false);
        })
    }, [refresh])

    const coursesColumns = [
        { field: 'Id', headerName: 'Id', width: 90 },
        {
            field: 'Title',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'Sub_Description',
            headerName: 'Sub Description',
            width: 250,
        },
        {
            field: 'Description',
            headerName: 'Description',
            width: 250,
        },
        {
            field: 'Thumbnail_Small',
            headerName: 'Thumbnail Small',
            width: 250,
        },
        {
            field: 'Thumbnail_Medium',
            headerName: 'Thumbnail Medium',
            width: 250,
        },
        {
            field: 'Thumbnail_Large',
            headerName: 'Thumbnail Large',
            width: 250,
        },
        {
            field: 'Price',
            headerName: 'Price',
            width: 150,
        },
        {
            field: 'Rating',
            headerName: 'Rating',
            width: 150,
        },
        {
            field: 'Category_Id',
            headerName: 'Category Id',
            width: 150,
        },
        {
            field: 'Author_Id',
            headerName: 'Author Id',
            width: 150,
        },
        {
            field: 'Promote_Rate',
            headerName: 'Promote Rate',
            width: 150,
        },
        {
            field: 'Language_Id',
            headerName: 'Language Id',
            width: 150,
        },

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

    const handleDelete = () => {
        setIsProcessing(true)
        courseService.deleteOne(open?.Id).then(response => {
            let array = [...courses];
            let index = array.indexOf(open)

            if (index !== -1) {
                array.splice(index, 1);
                setCourses(array);
                setSnackType('success');
                setSnackContent('Deleted')
                setOpenSnack(true);
                setOpen(false);
            }
            setIsProcessing(false)
            setRefresh(!refresh);
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
        <Grid style={{ minHeight: 520, width: '100%' }}>
            <DataGrid
                rows={courses}
                columns={coursesColumns}
                autoPageSize
                error={error}
                loading={isPending}
                onRowClick={handleClick}
                disableSelectionOnClick
                components={{
                    Toolbar: GridToolbar,
                }}
            />

            <Dialog open={open ? true : false} onClose={handleClose} className={classes.dialog}>
                <AppBar className={classes.dialogAppBar} style={{ position: 'static' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Detail
                        </Typography>

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
                        value={open ? open.Title : ''}
                        onChange={handleChange}
                        disabled
                        fullWidth
                        style={{ margin: 20 }}
                    />

                </Grid>
            </Dialog>

            <Backdrop className={classes.backdrop} open={isProcessing} onClick={handleClose}>
                <CircularProgress />
            </Backdrop>
            <Snackbar
                open={openSnack}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnack} severity={snackType}>
                    {snackContent}
                </Alert>
            </Snackbar>
        </Grid>
    )
};

export default CourseBoard;

