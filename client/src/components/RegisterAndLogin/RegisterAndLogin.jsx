import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle'
import InputAdornment from '@material-ui/core/InputAdornment'
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import React from 'react';
import { useStyles } from './styles';
import { useFetch } from '../../utils/useFetch';
import config from '../../config/config';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AuthService from "../../services/auth.service";
import { useHistory } from 'react-router-dom';

const TabPanel = React.forwardRef(function TabPanel(props, ref) {
    const { children, value, index, ...other } = props;

    return (
        <div
            ref={ref}
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <div style={{ marginTop: 20 }}>{children}</div>
            )}
        </div>
    );
});

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const RegisterTab = ({ value, index }) => {
    const [uname, setUname] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [isPending, setIsPending] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackContent, setSnackContent] = React.useState(null);
    const [snackType, setSnackType] = React.useState(null);

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleClickRegister = (event) => {
        event.preventDefault();
        setIsPending(true);

        AuthService.register(uname, name, password).then(
            response => {
                setSnackContent(response.data.Code)
                setIsPending(false);
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setError(resMessage);
                setIsPending(false);
            }
        );
    }
    return (
        <TabPanel value={value} index={0}>
            <Grid container spacing={3} alignItems='center' alignContent='center' direction="row" >
                <Grid item xs={12} container>
                    <Button
                        startIcon={<MailOutlineRoundedIcon />}
                        variant="contained"
                        color="primary"
                        style={{ height: 50, maxWidth: 580, width: '100%', margin: 'auto' }}>
                        Continue with google
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <form style={{ maxWidth: 580, width: '100%', margin: 'auto' }}>
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
                            onChange={(event) => setName(event.target.value)}
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
                            onChange={(event) => setUname(event.target.value)}
                        />

                        <TextField id="txt-pass" variant="outlined" require="true" fullWidth label="Password"
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyRoundedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            required
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </form>
                </Grid>
                <Grid item xs={12} container>
                    {!isPending && <Button
                        variant="outlined"
                        color="primary"
                        size='large'
                        style={{ height: 50, maxWidth: 580, width: '100%', margin: 'auto' }}
                        onClick={handleClickRegister}
                    >
                        Register
                    </Button>}
                    {isPending && <Button
                        variant="outlined"
                        color="primary"
                        size='large'
                        style={{ height: 50, maxWidth: 580, width: '100%', margin: 'auto' }}
                        disabled
                    >
                        Register
                    </Button>}
                    <Snackbar
                        open={openSnack}
                        autoHideDuration={6000}
                        onClose={handleCloseSnack}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert onClose={handleCloseSnack} severity={snackType}>
                            {snackContent}
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid >
        </TabPanel >
    )
};

const LoginTab = ({ value, index, handleLogin }) => {
    const [uname, setUname] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackContent, setSnackContent] = React.useState(null);
    const [snackType, setSnackType] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };
    const history = useHistory();
    const handleClickLogin = (event) => {
        event.preventDefault();

        setLoading(true);

        AuthService.login(uname, password)
            .then(() => {
                setLoading(false);
                setSnackContent("Login success");
                //setOpenSnack(true)
                //history.push("/profile");
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setSnackContent(resMessage);
                setOpenSnack(true)
                setLoading(false);
            }
            );
    }
    return (
        <TabPanel value={value} index={1}>
            <Grid container spacing={3} alignItems='center' alignContent='center' direction="row" >
                <Grid item xs={12} container>
                    <Button
                        startIcon={<MailOutlineRoundedIcon />}
                        variant="contained"
                        color="primary"
                        style={{ height: 50, maxWidth: 580, width: '100%', margin: 'auto' }}>
                        Continue with google
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <form style={{ maxWidth: 580, width: '100%', margin: 'auto' }}>
                        <TextField id="txt-uname" variant="outlined" require="true" fullWidth label="Username"
                            style={{ marginBottom: 16 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(event) => setUname(event.target.value)}
                        />

                        <TextField id="txt-pass" variant="outlined" require="true" fullWidth label="Password"
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyRoundedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <Button style={{ maxWidth: 580, left: 60, padding: 0 }} color='primary'>Forget password?</Button>
                </Grid>
                <Grid item xs={12} container>
                    <Button
                        variant="outlined"
                        color="primary"
                        size='large'
                        style={{ height: 50, maxWidth: 580, width: '100%', margin: 'auto' }}
                        onClick={handleClickLogin}
                    >
                        Login
                    </Button>
                    <Snackbar
                        open={openSnack}
                        autoHideDuration={6000}
                        onClose={handleCloseSnack}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert onClose={handleCloseSnack} severity={snackType}>
                            {snackContent}
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid>
        </TabPanel >
    )
};


function RegisterAndLogin(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const tabsActions = React.useRef();
    React.useEffect(() => {

        if (tabsActions.current) {
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('resize'));
                // tabsActions.current.updateIndicator();
            }, 175);
        }
    }, [tabsActions]);

    return (
        <Paper className={classes.loginSection}>
            <Tabs value={value}
                action={tabsActions}
                onChange={handleChange}
                aria-label="login"
                centered={true}
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="Register" {...a11yProps(0)} />
                <Tab label="Login" {...a11yProps(1)} />
            </Tabs>
            <RegisterTab value={value} index={0} />
            <LoginTab value={value} index={1} handleLogin={props.handleLogin} />
        </Paper >
    )
};

export default RegisterAndLogin;