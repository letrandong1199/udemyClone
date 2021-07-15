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

const RegisterTab = ({ value, index }) => (
    <TabPanel value={value} index={0}>
        <Grid container spacing={3} alignItems='center' alignContent='center' justifyContent='space-around' direction="row" >
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
                    <TextField id="txt-fullname" variant="outlined" require="true" fullWidth label="Full name"
                        style={{ marginBottom: 16 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}></TextField>

                    <TextField id="txt-uname" variant="outlined" require="true" fullWidth label="Username"
                        style={{ marginBottom: 16 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}></TextField>

                    <TextField id="txt-pass" variant="outlined" require="true" fullWidth label="Password"
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
);

const LoginTab = ({ value, index }) => (
    <TabPanel value={value} index={1}>
        <Grid container spacing={3} alignItems='center' alignContent='center' justifyContent='space-around' direction="row" >
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
                    <TextField id="txt-uname" variant="outlined" require="true" fullWidth label="Username"
                        style={{ marginBottom: 16 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}></TextField>

                    <TextField id="txt-pass" variant="outlined" require="true" fullWidth label="Password"
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
);


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
                tabsActions.current.updateIndicator();
            }, 175);
        }
    }, [tabsActions]);

    return (
        <Paper className={classes.loginSection}>
            <Tabs value={value}
                action={tabsActions}
                onChange={handleChange}
                aria-label="login"
                centered="true"
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="Register" {...a11yProps(0)} />
                <Tab label="Login" {...a11yProps(1)} />
            </Tabs>
            <RegisterTab value={value} index={0} />
            <LoginTab value={value} index={1} />
        </Paper >
    )
};

export default RegisterAndLogin;