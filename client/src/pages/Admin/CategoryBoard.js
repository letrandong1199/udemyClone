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
    FormControl,
    Select,
    InputLabel,
    MenuItem,
} from '@material-ui/core';

import {
    Alert,
    Skeleton,
} from '@material-ui/lab';

import { DataGrid } from '@material-ui/data-grid'
import { useState, useEffect } from 'react';
import useStyles from './styles'
import categoryService from '../../services/category.service';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import CloseIcon from '@material-ui/icons/Close'


const CategoryBoard = () => {
    const [categories, setCategories] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('success');

    const [editable, setEditable] = useState(false);
    const [name, setName] = useState('');
    const [parent, setParent] = useState('');
    const [openAdd, setOpenAdd] = useState(false);

    const [refresh, setRefresh] = useState(null);

    const handleAdd = () => {
        setIsProcessing(true)
        categoryService.postOne({ Name: name, Parent_Id: parent }).then(response => {
            setSnackContent('Added');
            setOpenSnack(true);
            setIsProcessing(false)
            setOpenAdd(false);
            setRefresh(!refresh);
        }).catch(error => {
            console.log(error);
            setSnackType('error');
            setSnackContent(error.message);
            setOpenSnack(true);
            setIsProcessing(false);
        })
    }


    useEffect(() => {
        setIsPending(true);
        categoryService.getAll().then(response => {
            const list = response.listAllResponse;
            const resultArray = list.map(elm => {
                elm['id'] = elm.Id;
                return elm
            });
            setIsPending(false);
            setCategories(resultArray)
        }).catch(error => {
            setError(error)
            setIsPending(false);
        })
    }, [refresh])

    const categoriesColumns = [
        { field: 'Id', headerName: 'Id', width: 90 },
        {
            field: 'Name',
            headerName: 'Name',
            width: 350,
        },
        { field: 'Parent_Id', headerName: 'Parent Id', width: 150 },

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
        categoryService.updateOne(open?.Id, open).then(response => {
            let array = [...categories];
            let index = array.indexOf(open)

            if (index !== -1) {
                array.splice(index, 1);
                array.push(open);
                setCategories(array);
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
        categoryService.deleteOne(open?.Id).then(response => {
            let array = [...categories];
            let index = array.indexOf(open)

            if (index !== -1) {
                array.splice(index, 1);
                setCategories(array);
                setSnackType('success');
                setSnackContent('Deleted')
                setOpenSnack(true);
                setOpen(false);
            }
            setIsProcessing(false)
        }).catch(error => {
            console.log(error.message);
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
    const [categoriesTree, setCategoriesTree] = useState([]);
    const [isPendingCategory, setIsPendingCategory] = useState(false);
    const handleLoadCategory = () => {
        setIsPendingCategory(true)
        categoryService.getAll().then(response => {
            const categoriesArray = response.listAllResponse;
            if (categoriesArray !== undefined) { setCategoriesTree(categoriesArray); }
            setIsPendingCategory(false)
        }).catch(error => {
            setIsPendingCategory(false);
        });
    }

    const classes = useStyles();
    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={categories}
                columns={categoriesColumns}
                pageSize={5}
                error={error}
                loading={isPending}
                onRowClick={handleClick}
                disableSelectionOnClick
            />
            <IconButton style={{ position: 'absolute', top: 70, right: 100 }}
                onClick={() => { setOpenAdd(true) }}
            >
                <AddCircleOutlineRoundedIcon />
            </IconButton>
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
            <Dialog open={openAdd} onClose={() => { setOpenAdd(false) }} className={classes.dialog}>
                <AppBar className={classes.dialogAppBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => { setOpenAdd(false) }} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Add category
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleAdd}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        size='medium'
                        type="text"
                        variant="outlined"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        fullWidth
                        style={{ margin: 20 }}
                    />
                    <FormControl
                        className={classes.formControl}
                        variant='outlined'
                        style={{ width: '100%', margin: 20 }}
                    >
                        <InputLabel id="catg-label" >Category</InputLabel>
                        <Select
                            labelId='catg-select-label'
                            id='catg-select'
                            value={parent}
                            onChange={(event) => setParent(event.target.value)}
                            label='Category'
                            onOpen={handleLoadCategory}
                        >
                            {isPendingCategory ? <Skeleton width='100%' height={50} />
                                : categoriesTree.map(category => (
                                    <MenuItem key={category.Id} value={category.Id}>
                                        {category.Name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Dialog>

            <Backdrop className={classes.backdrop} open={isProcessing} onClick={handleClose}>
                <CircularProgress color="inherit" />
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
        </div >
    )
};

export default CategoryBoard;