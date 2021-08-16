import {
    useState,
    useEffect,
    useRef,
    forwardRef
} from 'react';
import PropTypes from 'prop-types';
import {
    IconButton,
    Paper,
    Tabs,
    Tab,
} from '@material-ui/core';

import { useStyles } from './styles';
import { GET_ENUMS } from '../../config/config';
import RegisterTab from './RegisterPanel';
import LoginTab from './LoginPanel';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const TabPanel = forwardRef(function TabPanel(props, ref) {
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

function RegisterAndLogin({ defaultTab, handleClose }) {
    const classes = useStyles();

    const popups = {
        [GET_ENUMS.popup.signIn]: 1,
        [GET_ENUMS.popup.signUp]: 0,
    };

    const [value, setValue] = useState(popups[defaultTab]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const tabsActions = useRef();
    useEffect(() => {

        if (tabsActions.current) {
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('resize'));
                // tabsActions.current.updateIndicator();
            }, 175);
        }
    }, [tabsActions]);



    return (
        <Paper className={classes.loginSection}>
            <IconButton
                onClick={handleClose}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0
                }}>
                <CloseRoundedIcon fontSize='small' />
            </IconButton>
            <Tabs
                value={value}
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
            <TabPanel value={value} index={0}>
                <RegisterTab />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <LoginTab />
            </TabPanel>
        </Paper >
    )
};

RegisterAndLogin.propTypes = {
    defaultTab: PropTypes.string
}
RegisterAndLogin.defaultProps = {
    defaultTab: 0
}

export default RegisterAndLogin;