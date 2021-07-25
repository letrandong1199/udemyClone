import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle'
import InputAdornment from '@material-ui/core/InputAdornment'
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import React from 'react';
import useStyles from './styles'
import useFetch from '../../utils/useFetch';
import { Avatar } from "@material-ui/core";
//import Link from '@material-ui/core/Link';
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
import { BrowserRouter as Router, useLocation, Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import config from '../../config/config';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import HomeSection from '../../components/HomeSection/HomeSection.jsx'
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';

const AccountInfo = () => {
    const classes = useStyles();
    const [password, setPassword] = React.useState(null);

    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        console.log(error);
    }, [error])
    React.useEffect(() => {
        UserService.getUserBoard().then(
            response => {
                if (response.data.message) {
                    if (response.data.message.resultResponse) {
                        setUser(response.data.message.resultResponse)
                        console.log("user", response.data.message.resultResponse);
                    }
                    else if (response.data.message === "Invalid_token") {
                        setError(response.data.message)
                    }

                }
            },
            error => {
                setError((
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString())
            }
        );
        //console.log(user);
    }, [])

    const [editable, setEditable] = React.useState(false);

    const handleClickEdit = () => {
        setEditable(!editable)
    }
    const handleClickCancel = () => {
        setEditable(!editable)
    }

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleClickSave = () => {
        //setEditable(!editable)
        //const update_info = { uname, password, name }
        if (!loading) {
            setSuccess(false);
            setLoading(true);

        }
    }
    return (
        <Container style={{ padding: 0, flexGrow: 1 }}>
            <Typography variant="h3" className={classes.bigTitle}>Profile</Typography>
            <Avatar className={classes.avatar}
            >AV
                <Button color="primary" className={classes.avatar.hideText}>Edit</Button>
            </Avatar>
            <Grid container style={{ margin: 20, width: 'auto' }}>
                <Grid item xs={12} sm={6} container direction="column" style={{ padding: 20 }}>
                    <Typography variant="h5" style={{ marginBottom: 20 }}>Personal info</Typography>
                    <form style={{ maxWidth: 580, }}>
                        <TextField id="txt-uname" variant="outlined" require fullWidth label="Full name"
                            style={{ marginBottom: 16 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            required
                            disabled={!editable}
                            onChange={(event) => setUser({ name: event.target.value })}
                            value={user?.Full_Name}
                        />
                        {!editable && <Button variant="outlined" color="primary" onClick={handleClickEdit} >Edit</Button>}
                        {editable && <Fragment>
                            <Grid container alignItems="center">
                                <Grid item className={classes.wrapper}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleClickSave}
                                        className={clsx({ [classes.buttonSuccess]: success })}
                                        disabled={loading} >
                                        Save
                                    </Button>
                                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </Grid>
                                <Grid item>
                                    <Button style={{ marginLeft: 10 }} variant="contained" color="secondary" type="reset" onClick={handleClickCancel}>Cancel</Button>
                                </Grid>

                            </Grid>
                        </Fragment>}
                    </form>
                </Grid>
                <Grid item xs={12} sm={6} container direction="column" style={{ padding: 20 }}>
                    <Typography variant="h5" style={{ marginBottom: 20 }}>Account info</Typography>
                    <form>
                        <TextField id="txt-pass" variant="outlined" required fullWidth label="Password"
                            style={{ marginBottom: 16 }}
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyRoundedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            disabled
                            onChange={(event) => setPassword(event.target.value)}
                            value={"password"}
                        />

                        <Button variant="outlined" color="primary" >Change password</Button>
                    </form>

                </Grid>
            </Grid>
        </Container >
    )
};

const MyLearning = () => {
    const id = window.sessionStorage.getItem('user_id').valueOf();
    const { data, isPending, error } = useFetch(`${config.HOST}:${config.PORT}/${config.ENROLLED}`)
    const [ownCourse, setOwnCourse] = React.useState([]);
    React.useEffect(() => {
        if (data) {
            const temp = data.filter((obj) => obj.user_id == id);
            let course_list = []
            for (let course of temp) {
                course.course_info.id = course.course_id;
                course_list.push(course.course_info);
            }
            setOwnCourse(course_list);
            console.log(temp);
        }
    }, [data])

    return (
        <Container style={{ padding: 0, flexGrow: 1 }}>
            <HomeSection title="Learning" color="vibrant" courses={ownCourse} />
        </Container>
    )
}

function Profile() {
    const classes = useStyles();
    let { path, url } = useRouteMatch();

    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    let location = useLocation();
    React.useEffect(() => {
        switch (location.pathname) {
            case '/profile':
                setSelectedIndex(0);
                break;
            case '/profile/my-learning':
                setSelectedIndex(1);
                break;
            default: setSelectedIndex(-1);
        }
    }, [location])
    const drawer = (
        <div className={classes.drawerContainer}>
            <List>
                {['Profile', 'My learning'].map((text, index) => (
                    <Link key={index} to={index % 2 === 0 ? `${url}` : `${url}/my-learning`}>
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
            <Divider />
            <List>
                {['Wishlist'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{<FavoriteRoundedIcon />}</ListItemIcon>
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
                <Route path={`${path}/:dsd`} component={MyLearning} />
            </Switch>
        </div>
    )
};

export default Profile;