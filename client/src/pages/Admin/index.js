import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import useStyles from './styles'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Toolbar } from "@material-ui/core";
import Hidden from '@material-ui/core/Hidden';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import { useLocation, Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    DataGrid,

} from '@material-ui/data-grid';
import courseService from '../../services/course.service';
import userService from '../../services/user.service';
import categoryService from '../../services/category.service';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import { Snackbar, CssBaseline } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import {
    DELETE_CATEGORY, UPDATE_CATEGORY, CREATE_CATEGORY,
    UPDATE_USER, DELETE_USER, CREATE_USER,
} from '../../config/config';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const CategoriesBoard = () => {
    const [categories, setCategories] = React.useState([]);
    const [isPending, setIsPending] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [error1, setError1] = React.useState(null);
    const [selected, setSelected] = React.useState(null);

    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackContent, setSnackContent] = React.useState(null);
    const [snackType, setSnackType] = React.useState('success');

    const [editable, setEditable] = React.useState(false);
    const [name, setName] = React.useState('');
    const [parent, setParent] = React.useState(null);
    const [openAdd, setOpenAdd] = React.useState(false);

    const [refresh, setRefresh] = React.useState(null);

    const handleAdd = () => {
        setIsProcessing(true)
        setTimeout(() => { console.log('test') }, 3000);
        categoryService.postOne({ Name: name, Parent_Id: parent }).then(response => {

            if (response.data.message.Code !== CREATE_CATEGORY.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            setSnackContent('Added');
            setOpenSnack(true);
            setIsProcessing(false)
            setOpenAdd(false);
            setRefresh(true);
        }).catch(error => {
            console.log(error);
            setError1(error);
            setSnackType('error');
            setSnackContent(error.message);
            setOpenSnack(true);
            setIsProcessing(false);
        })
    }


    React.useEffect(() => {
        setIsPending(true);
        categoryService.getAll().then(response => {
            console.log(response);
            const list = response.data.message.listAllResponse;
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

    const [open, setOpen] = React.useState(false);

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleClick = (event) => {
        setOpen(event.row);
        setSelected(event.row);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        setIsProcessing(true)
        setTimeout(() => { console.log('test') }, 3000);
        categoryService.updateOne(open?.Id, open).then(response => {
            let array = [...categories]; // make a separate copy of the array
            let index = array.indexOf(selected)
            console.log('Selected', selected);
            if (response.data.message.Code !== UPDATE_CATEGORY.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            if (index !== -1) {
                array.splice(index, 1);
                array.push(open);
                console.log(array);
                setCategories(array);
                setSnackType('success');
                setSnackContent('Updated')
                setOpenSnack(true);
                setOpen(false);
            }
            setIsProcessing(false)
            console.log('update', response);
        }).catch(error => {
            console.log(error);
            setError1(error);
            setSnackType('error');
            setSnackContent(error.message);
            setOpenSnack(true);
            setIsProcessing(false);
        })
    }
    const handleDelete = () => {
        setIsProcessing(true)
        setTimeout(() => { console.log('test', 10000); })
        categoryService.deleteOne(open?.Id).then(response => {
            let array = [...categories]; // make a separate copy of the array
            let index = array.indexOf(open)
            if (response.data.message.Code !== DELETE_CATEGORY.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            if (index !== -1) {
                array.splice(index, 1);
                console.log(array);
                setCategories(array);
                setSnackType('success');
                setSnackContent('Deleted')
                setOpenSnack(true);
                setOpen(false);
            }
            setIsProcessing(false)
            console.log('del', response);
        }).catch(error => {
            console.log(error);
            setError1(error);
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
    const [categoriesTree, setCategoriesTree] = React.useState([]);
    const [isPendingCategory, setIsPendingCategory] = React.useState(false);
    const handleLoadCategory = () => {
        setIsPendingCategory(true)
        console.log("Ngu");
        categoryService.getAll().then(response => {
            const categoriesArray = response.data.message.listAllResponse;
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
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
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
                <Grid container zeroMinWidth>
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
                <Grid container zeroMinWidth>
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
                            {isPendingCategory ? <Skeleton variant='h6'></Skeleton>
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
}

const UsersBoard = () => {
    const [users, setUsers] = React.useState([]);
    const [isPending, setIsPending] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [error1, setError1] = React.useState(null);
    const [selected, setSelected] = React.useState(null);

    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackContent, setSnackContent] = React.useState(null);
    const [snackType, setSnackType] = React.useState('success');

    const [editable, setEditable] = React.useState(false);
    const [uname, setUname] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState(null);
    const [openAdd, setOpenAdd] = React.useState(false);

    const [refresh, setRefresh] = React.useState(null);

    const handleAdd = () => {
        setIsProcessing(true)
        setTimeout(() => { console.log('test') }, 3000);
        userService.postOne({ Email: uname, Name: name, Password: password }).then(response => {

            if (response.data.message.Code !== CREATE_USER.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            setSnackContent('Added');
            setOpenSnack(true);
            setIsProcessing(false)
            setOpenAdd(false);
            setRefresh(true);
        }).catch(error => {
            console.log(error);
            setError1(error);
            setSnackType('error');
            setSnackContent(error.message);
            setOpenSnack(true);
            setIsProcessing(false);
        })
    }


    React.useEffect(() => {
        setIsPending(true);
        userService.getAll().then(response => {
            console.log(response);
            const list = response.data.message.listAllResponse;
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

    const [open, setOpen] = React.useState(false);

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleClick = (event) => {
        setOpen(event.row);
        setSelected(event.row);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        setIsProcessing(true)
        setTimeout(() => { console.log('test') }, 3000);
        userService.updateOne(open?.Id, open).then(response => {
            let array = [...users]; // make a separate copy of the array
            let index = array.indexOf(selected)
            console.log('Selected', selected);
            if (response.data.message.Code !== UPDATE_USER.SUCCESS) {
                throw Error(response.data.message.Code);
            }
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
            console.log('update', response);
        }).catch(error => {
            console.log(error);
            setError1(error);
            setSnackType('error');
            setSnackContent(error.message);
            setOpenSnack(true);
            setIsProcessing(false);
        })
    }
    const handleDelete = () => {
        setIsProcessing(true)
        setTimeout(() => { console.log('test', 10000); })
        userService.deleteOne(open?.Id).then(response => {
            let array = [...users]; // make a separate copy of the array
            let index = array.indexOf(open)
            if (response.data.message.Code !== DELETE_USER.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            if (index !== -1) {
                array.splice(index, 1);
                console.log(array);
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
            setError1(error);
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
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={usersColumns}
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
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
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
                <Grid container zeroMinWidth>
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
                            Add user
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleAdd}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid container zeroMinWidth>
                    <TextField
                        id="uname"
                        label="Email"
                        size='medium'
                        type="email"
                        variant="outlined"
                        value={uname}
                        onChange={(e) => { setUname(e.target.value) }}
                        fullWidth
                        style={{ margin: 20 }}
                    />
                    <TextField
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
                    <TextField
                        id="pass"
                        label="Password"
                        size='medium'
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        fullWidth
                        style={{ margin: 20 }}
                    />

                </Grid>
            </Dialog>
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
}

const CoursesBoard = () => {
    const [courses, setCourses] = React.useState([]);
    const [isPending, setIsPending] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [error1, setError1] = React.useState(null);
    const [selected, setSelected] = React.useState(null);

    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackContent, setSnackContent] = React.useState(null);
    const [snackType, setSnackType] = React.useState('success');

    const [refresh, setRefresh] = React.useState(null);


    React.useEffect(() => {
        setIsPending(true);
        courseService.getAll().then(response => {
            console.log(response);
            const list = response.data.message.listAllResponse;
            const resultArray = list.map(elm => {
                elm['id'] = elm.Id;
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
            width: 50,
        },
        {
            field: 'Rating',
            headerName: 'Rating',
            width: 50,
        },
        {
            field: 'Category_Id',
            headerName: 'Category Id',
            width: 50,
        },
        {
            field: 'Author_Id',
            headerName: 'Author_Id',
            width: 50,
        },
        {
            field: 'Promote_Id',
            headerName: 'Promote Id',
            width: 50,
        },
        {
            field: 'Language_Id',
            headerName: 'Language Id',
            width: 50,
        },

    ];

    const [open, setOpen] = React.useState(false);

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleClick = (event) => {
        setOpen(event.row);
        setSelected(event.row);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setIsProcessing(true)
        setTimeout(() => { console.log('test'); }, 3000)
        courseService.deleteOne(open?.Id).then(response => {
            let array = [...courses]; // make a separate copy of the array
            let index = array.indexOf(open)
            if (response.data.message.Code !== DELETE_USER.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            if (index !== -1) {
                array.splice(index, 1);
                console.log(array);
                setCourses(array);
                setSnackType('success');
                setSnackContent('Deleted')
                setOpenSnack(true);
                setOpen(false);
            }
            setIsProcessing(false)
            console.log('del', response);
        }).catch(error => {
            console.log(error);
            setError1(error);
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
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={courses}
                columns={coursesColumns}
                pageSize={5}
                error={error}
                loading={isPending}
                onRowClick={handleClick}
                disableSelectionOnClick
            />

            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
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
                <Grid container zeroMinWidth>
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
}


function Admin() {
    const classes = useStyles();
    let { path, url } = useRouteMatch();

    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    let location = useLocation();
    React.useEffect(() => {
        switch (location.pathname) {
            case '/admin/users':
                setSelectedIndex(0);
                break;
            case '/admin/categories':
                setSelectedIndex(2);
                break;
            case '/admin/courses':
                setSelectedIndex(1);
                break;
            default: setSelectedIndex(-1);
        }
    }, [location])


    const links = [`${url}/users`, `${url}/courses`, `${url}/categories`]
    const drawer = (
        <div className={classes.drawerContainer}>
            <List>
                {['Users', 'Courses', 'Categories'].map((text, index) => (
                    <Link key={index} to={links[index]}>
                        <ListItem
                            button
                            color="inherit"
                            key={text}
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}
                        >
                            <ListItemIcon>{index % 2 === 0 ? <FaceRoundedIcon /> : <MenuBookRoundedIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div >
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Hidden xsDown>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    {drawer}
                </Drawer>

            </Hidden>
            <Switch>
                <Route path={`${path}/users`}>
                    <UsersBoard />
                </Route>
                <Route path={`${path}/courses`}>
                    <CoursesBoard />
                </Route>
                <Route path={`${path}/categories`}>
                    <CategoriesBoard />
                </Route>
            </Switch>



        </div>
    )
};

export default Admin;