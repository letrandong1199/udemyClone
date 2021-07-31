import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle'
import InputAdornment from '@material-ui/core/InputAdornment'
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import { useState, useEffect } from 'react';
import useStyles from './styles'
import { Avatar } from "@material-ui/core";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Toolbar } from "@material-ui/core";
import Hidden from '@material-ui/core/Hidden';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import { Divider, CssBaseline } from "@material-ui/core";
import { Fragment } from 'react';
import { useHistory, useLocation, Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import config from '../../config/config';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import HomeSection from '../../components/HomeSection/HomeSection.jsx'
import userService from '../../services/user.service';
import authService from '../../services/auth.service';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import enrolledCourseService from '../../services/enrolledCourse.service';
import { GET_ENROLLED, GET_WISHLIST, ROUTES } from '../../config/config';
import wishlistService from '../../services/wishlist.service';


const AccountInfo = () => {
    const classes = useStyles();
    const [password, setPassword] = useState(null);
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackContent, setSnackContent] = useState(null);
    const [snackType, setSnackType] = useState('info');
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    useEffect(() => {
        userService.getUserBoard().then(response => {
            if (response.data.message) {
                if (response.data.message.resultResponse) {
                    setUser(response.data.message.resultResponse)
                    setName(response.data.message.resultResponse.Name)
                    //console.log("user", response.data.message.resultResponse);
                }
                else {
                    throw Error(response.data.message)
                }
            }
        }).catch(error => {
            setError((
                error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString());
            history.goBack();
        })
    }, [])

    const [editable, setEditable] = useState([]);

    const handleClickEdit = (id) => () => {
        setEditable([...editable, id])
    }
    const handleClickCancel = (id) => (event) => {
        const index = editable.indexOf(id);
        if (index !== -1) {
            let array = [...editable];
            array.splice(index, 1);
            console.log(array);
            setEditable(array);
            setName(user.Name);
        }
    }

    const handleClickSave = (id) => () => {
        if (id === 'txt-name') {
            setLoading(true)
            console.log(name);
            userService.updateInfo({ Name: name }).then(response => {
                setUser(response.newUser);
                setLoading(false);
                setSnackType('success');
                setSnackContent('Updated');
                setOpenSnack(true);
                const index = editable.indexOf(id);
                if (index !== -1) {
                    const array = editable.splice(index, 1)
                    setEditable(array)
                }
            }).catch(error => {
                console.log(error);
                setSnackType('error');
                setSnackContent(error.message);
                setOpenSnack(true);
                setLoading(false);
            })
        }
        else if (id === 'txt-pass') {
            setLoading(true)
            console.log(password);
            userService.changePassword({
                Password: password.password,
                New_Password: password.newPassword
            }).then(response => {
                setLoading(false);
                setSnackType('success');
                setSnackContent('Updated');
                setOpenSnack(true);
                const index = editable.indexOf(id);
                if (index !== -1) {
                    const array = editable.slice(index, 1)
                    setEditable(array)
                }
            }).catch(error => {
                console.log(error);
                setSnackType('error');
                setSnackContent(error.message);
                setOpenSnack(true);
                setLoading(false);
            })
        }
    }

    const handleChangePasswordTxt = (key) => (event) => {
        let dic = { ...password };
        dic[key] = event.target.value;
        console.log(dic);
        setPassword(dic)
    }

    return (
        <Container style={{ padding: 0, flexGrow: 1 }}>
            <Typography variant="h3" className={classes.bigTitle}>Profile</Typography>
            <Avatar
                className={classes.avatar}
                src={user?.Thumbnail}
            >
                AV
                <Button color="primary" className={classes.avatar.hideText}>Edit</Button>
            </Avatar>
            <Grid container style={{ margin: 20, width: 'auto' }}>
                <Grid item xs={12} sm={6} container direction="column" style={{ padding: 20 }}>
                    <Typography variant="h5" style={{ marginBottom: 20 }}>Personal info</Typography>
                    <form style={{ maxWidth: 580, }}>
                        <TextField
                            id="txt-name"
                            variant="outlined"
                            required
                            fullWidth
                            label="Full name"
                            style={{ marginBottom: 16 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            disabled={!editable.includes('txt-name')}
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                        />
                        {editable.includes('txt-name')
                            ? <Fragment>
                                <Grid container alignItems="center">
                                    <Grid item className={classes.wrapper}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleClickSave('txt-name')}
                                            className={clsx({ [classes.buttonSuccess]: snackType === 'success' })}
                                            disabled={loading} >
                                            Save
                                        </Button>
                                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            style={{ marginLeft: 10 }}
                                            variant="contained"
                                            color="secondary"
                                            type="reset"
                                            onClick={handleClickCancel('txt-name')}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Fragment>
                            : <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleClickEdit('txt-name')}
                            >
                                Edit
                            </Button>
                        }
                    </form>
                </Grid>
                <Grid item xs={12} sm={6} container direction="column" style={{ padding: 20 }}>
                    <Typography variant="h5" style={{ marginBottom: 20 }}>Account info</Typography>
                    <form>
                        <TextField
                            id="txt-pass"
                            variant="outlined"
                            required
                            fullWidth
                            label="Password"
                            style={{ marginBottom: 16 }}
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyRoundedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            disabled={!editable.includes('txt-pass')}
                            onChange={handleChangePasswordTxt('newPassword')}
                            value={password?.newPassword}
                        />

                        {editable.includes('txt-pass')
                            ? <Fragment>
                                <TextField
                                    type="password"
                                    id="txt-cur-pass"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Current password"
                                    style={{ marginBottom: 16 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VpnKeyRoundedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    disabled={!editable.includes('txt-pass')}
                                    onChange={handleChangePasswordTxt('password')}
                                    value={password?.password}
                                />
                                <Grid container alignItems="center">
                                    <Grid item className={classes.wrapper}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleClickSave('txt-pass')}
                                            className={clsx({ [classes.buttonSuccess]: snackType === 'success' })}
                                            disabled={loading}
                                        >
                                            Save
                                        </Button>
                                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            style={{ marginLeft: 10 }}
                                            variant="contained"
                                            color="secondary"
                                            type="reset"
                                            onClick={handleClickCancel('txt-pass')}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>

                                </Grid>

                            </Fragment>
                            : <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleClickEdit('txt-pass')}
                            >
                                Change password
                            </Button>
                        }

                    </form>

                </Grid>
            </Grid>
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
        </Container >
    )
};

const MyLearning = () => {
    const [ownCourse, setOwnCourse] = useState([]);
    const [isPending, setIsPending] = useState(false);
    console.log('Hello my learn');
    useEffect(() => {
        console.log('In my learn');
        setIsPending(true);
        enrolledCourseService.getAll().then(response => {
            console.log('in service');
            console.log(response);
            if (response.data.message.Code !== GET_ENROLLED.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            console.log("en", response);
            setIsPending(false);
            setOwnCourse(response.data.message.listAllResponse);
        }).catch(error => {
            console.log(error);
            console.log('Hello bug');
        })
    }, [])


    return (
        <Container style={{ padding: 0, flexGrow: 1 }}>
            <HomeSection title="Learning" color="vibrant" courses={ownCourse} disableTitle isEnrolled />
        </Container>
    )
}


const Wishlist = () => {
    const [ownCourse, setOwnCourse] = useState([]);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {

        setIsPending(true);
        wishlistService.getAll().then(response => {
            if (response.data.message.Code !== GET_WISHLIST.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            setIsPending(false);
            setOwnCourse(response.data.message.listAllResponse);
        }).catch(error => {
            console.log(error);
            setIsPending(false);
        })
    }, [])


    return (
        <Container style={{ padding: 0, flexGrow: 1 }}>
            <HomeSection title="Learning" color="vibrant" courses={ownCourse} disableTitle isWishlist />
        </Container>
    )
}

function Profile() {
    const classes = useStyles();
    let { path, url } = useRouteMatch();

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    let location = useLocation();
    useEffect(() => {
        switch (location.pathname) {
            case `${path}`:
                setSelectedIndex(0);
                break;
            case `${path}${ROUTES.myLearning}`:
                setSelectedIndex(1);
                break;
            case `${path}${ROUTES.wishlist}`:
                setSelectedIndex(2);
                break;
            default: setSelectedIndex(-1);
        }
    }, [location])
    const links = [`${url}`, `${url}${ROUTES.myLearning}`, `${url}${ROUTES.wishlist}`]
    const nameOptions = ['Profile', 'My learning', 'Wishlist']
    const iconOptions = [<FaceRoundedIcon />, <MenuBookRoundedIcon />, <FavoriteRoundedIcon />,]
    const drawer = (
        <div className={classes.drawerContainer}>
            <List>
                {nameOptions.map((text, index) => (
                    <ListItem
                        button
                        color="inherit"
                        key={text}
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index)}
                        component={Link}
                        to={links[index]}
                    >
                        <ListItemIcon>{iconOptions[index]}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
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
                <Route path={path} exact component={AccountInfo} />
                <Route path={`${path}${ROUTES.myLearning}`} component={MyLearning} />
                <Route path={`${path}${ROUTES.wishlist}`} component={Wishlist} />
            </Switch>
        </div>
    )
};

export default Profile;