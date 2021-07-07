import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '10px',
        maxWidth: 345,
        //boxShadow: '10x 10px 5px 1px rgba(143, 143, 143, 0.5)',
        boxShadow: '5px 5px 5px rgba(143, 143, 143, .5)'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        //height: '100vh',
        display: 'flex',
        textAlign: 'center',
        //flexDirection: 'column',
        //position: 'absolute',
        //top: '50%',
        //left: '50%',
        //transform: 'translate(-50 %, -50 %)'
    },
    loginSection: {
        //margin: '50px',
        //maxWidth: '1000px',
        //top: '500px',
        //left: '500px',
        //marginLeft: '200px',
        //marginRight: '200px',
        // padding: 20,
        padding: theme.spacing(3),
        margin: 'auto',
        maxWidth: 700,
        minHeight: 500,
    },
    input: {
        //position: 'relative',
        //width: '555px',
        height: '60px',
        fontSize: '40px',
        borderRadius: '20px !important',
        //margin: '20px',
        //marginLeft: theme.spacing(2),
        //marginRight: theme.spacing(2),
        //width: '25ch',
    },
    button: {

        //width: '100%',
        height: '50px',
        margin: 10,
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div style={{ marginTop: 20 }}>{children}</div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function RegisterAndLogin(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Paper className={classes.loginSection}>
            <Tabs value={value}
                onChange={handleChange}
                aria-label="login"
                centered
                selectionFollowsFocus
                indicatorColor="primary"
                textColor="primary">
                <Tab label="Register" {...a11yProps(0)} />
                <Tab label="Login" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Grid container spacing={3} zeroMinWidth alignItems='center' alignContent='center' justifyContent='space-around' direction="row" >
                    <Grid item xs={12} justifyContent='center' container>
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
                            <TextField id="txt-fullname" variant="outlined" require fullWidth label="Full name"
                                style={{ marginBottom: 16 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}></TextField>

                            <TextField id="txt-uname" variant="outlined" require fullWidth label="Username"
                                style={{ marginBottom: 16 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}></TextField>

                            <TextField id="txt-pass" variant="outlined" require fullWidth label="Password"
                                type="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}></TextField>
                        </form>
                    </Grid>
                    <Grid item xs={12} justifyContent='center' container>
                        <Button
                            variant="outlined"
                            color="primary"
                            size='large'
                            style={{ height: 50, maxWidth: 580, width: '100%', margin: 'auto' }}>
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </TabPanel >
            <TabPanel value={value} index={1}>
                <Grid container spacing={3} zeroMinWidth alignItems='center' alignContent='center' justifyContent='space-around' direction="row" >
                    <Grid item xs={12} justifyContent='center' container>
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
                            <TextField id="txt-uname" variant="outlined" require fullWidth label="Username"
                                style={{ marginBottom: 16 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}></TextField>

                            <TextField id="txt-pass" variant="outlined" require fullWidth label="Password"
                                type="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}></TextField>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{ maxWidth: 580, left: 60, padding: 0 }} color='primary'>Forget password?</Button>
                    </Grid>
                    <Grid item xs={12} justifyContent='center' container>
                        <Button
                            variant="outlined"
                            color="primary"
                            size='large'
                            style={{ height: 50, maxWidth: 580, width: '100%', margin: 'auto' }}>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </TabPanel >
        </Paper >
    )
};

export default RegisterAndLogin;