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

const AccountInfo = () => {
    const classes = useStyles();
    const [uname, setUname] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    //const [email, setEmail] = React.useState(null);
    const id = window.sessionStorage.getItem('user_id');
    console.log(id);
    const { data, isPending, error } = useFetch(`${config.HOST}:${config.PORT}/${config.USER_CONTROLLER}/${id}`)
    const [editable, setEditable] = React.useState(false);

    React.useEffect(() => {
        if (data) {
            setName(data.name);
            setUname(data.uname);
            setPassword(data.password);
        }

    }, [data])

    const handleClickEdit = () => {
        setEditable(!editable)
    }
    const handleClickCancel = () => {
        setEditable(!editable)
        setName(data.name);
        setUname(data.uname);
        setPassword(data.password);
    }

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const handleClickSave = () => {
        //setEditable(!editable)
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
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
                        <TextField id="txt-fullname" variant="outlined" require="true" fullWidth label="Full name"
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
                            onChange={(event) => setName(event.target.value)}
                            value={isPending ? 'loading...' : name}
                        />

                        <TextField id="txt-uname" variant="outlined" require="true" fullWidth label="Username"
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
                            onChange={(event) => setUname(event.target.value)}
                            value={isPending ? 'loading...' : uname}
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
                        <TextField id="txt-pass" variant="outlined" require="true" fullWidth label="Password"
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
                            required
                            onChange={(event) => setPassword(event.target.value)}
                            value={isPending ? 'loading...' : data.password}
                        />

                        <Button variant="outlined" color="primary" >Change password</Button>
                    </form>

                </Grid>
            </Grid>
        </Container >
    )
};

const MyLearning = () => {
    return (
        <Container style={{ padding: 0, flexGrow: 1 }}>

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
                <Route path={`${path}/:dsd`} component={() => (<div>Loading..</div>)} />
            </Switch>
        </div>
    )
};

export default Profile;