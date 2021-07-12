import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import ButtonBase from '@material-ui/core/ButtonBase';
import { ReactComponent as ReactLogo } from '../logo.svg'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import RegisterAndLogin from './RegisterAndLogin';
import Popover from '@material-ui/core/Popover';
import Fade from '@material-ui/core/Fade'
import Collapse from '@material-ui/core/Collapse';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: 1100,
        flexGrow: 1,
        background: 'white', //'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //boxShadow: '0 3px 5px 2px rgba(75, 75, 75, .3)', //'0 3px 5px 2px rgba(255, 105, 135, .3)'
        justifyContent: 'space-between',
        position: 'fixed',
        //backgroundColor: 'transparent'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    catg: {
        position: 'relative',
        color: 'rgb(75, 75, 75)',
    },
    regisButton: {
        position: 'relative',
        flexGrow: '-1',
        color: /*'rgb(0, 86, 210)', 'rgb(75, 75, 75)',*/ 'whitesmoke',
        marginRight: '50px',
        marginLeft: '50px',
        backgroundColor: /*'rgb(255, 202, 24)',*/ 'rgb(0, 86, 210)',
        border: '1px solid rgb(0, 86, 210)', //rgb(255, 202, 24)
        '&:hover': {
            color: 'rgb(0, 86, 210)',
        },
    },
    search: {
        position: 'relative',
        flexGrow: 1,
        borderRadius: theme.shape.borderRadius,
        border: '1px solid',
        borderColor: 'rgb(141, 141, 141)',
        backgroundColor: fade('rgb(193, 193, 193)', 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        color: 'rgb(75, 75, 75)'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgb(75, 75, 75)'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        //width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '50ch',
        },
    },
    logoButton: {
        maxWidth: '100px',
        height: '30px',
        marginTop: '10px',
        marginBottom: '10px'
    },
    logo: {
        width: '100%',
        height: '100%',
        padding: '0',
        margin: '0'
    },
    sectionDesktop: {
        color: 'rgb(75, 75, 75)',
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    popoverRegisterAndLogin: {
        width: '100vw',
        backgroundColor: 'rgba(81,81,81,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

function ProfileButton(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleProfileMenuOpen = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.sectionDesktop}>
            <IconButton
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle color="inherit" />
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition style={{ zIndex: 1500, marginTop: 10 }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

function RegisterButton(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openRegister = Boolean(anchorEl);
    const id = openRegister ? 'simple-popover' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <Button className={classes.regisButton} onClick={handleClick}>Register</Button>
            <Popover
                id={id}
                open={openRegister}
                anchorReference="none"
                //anchorPosition={{ top: 0, left: 1000 }}
                // anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                className={classes.popoverRegisterAndLogin}
            >
                <RegisterAndLogin />
            </Popover>
            {/*<Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        timeout={3500}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <RegisterAndLogin />
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
                </Popper>*/}


        </div >
    )
}

function ElevationScroll(props) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });
    console.log(trigger ? 'static' : 'fixed');
    return React.cloneElement(children, {
        backgroundColor: trigger ? 'white' : 'transparent',
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

function HideOnScroll(props) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 4,
    });
    console.log(trigger);
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

function Navbar() {
    const classes = useStyles();

    return (
        <div>
            <Paper style={{ width: '100%', minHeight: '64px' }} />
            <CssBaseline />
            <HideOnScroll>

                <AppBar className={classes.root} disableElevation>
                    <Toolbar>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item xs>
                                <ButtonBase className={classes.logoButton}>
                                    <ReactLogo className={classes.logo} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs>
                                <Button className={classes.catg}>Categories <ExpandMoreIcon /></Button>
                            </Grid>
                            <Grid item xs><ProfileButton /></Grid>
                            <Grid item xs><RegisterButton /></Grid>

                        </Grid>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </div >
    );
}

export default Navbar;