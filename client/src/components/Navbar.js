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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: 'white', //'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(75, 75, 75, .3)', //'0 3px 5px 2px rgba(255, 105, 135, .3)'
        justifyContent: 'space-between',
        position: 'static'

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
        color: 'rgb(75, 75, 75)',
        marginRight: '50px',
        marginLeft: '50px',
        backgroundColor: 'rgb(255, 202, 24)',
        border: '1px solid rgb(255, 202, 24)'
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
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    logoButton: {
        width: '200px',
        height: '50px',
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

function Navbar() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const openRegister = Boolean(anchorEl);
    const id = openRegister ? 'simple-popover' : undefined;

    const handleClickRegister = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseRegister = () => {
        setAnchorEl(null);
    };

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
        <div>
            <AppBar className={classes.root}>
                <Toolbar>
                    <ButtonBase className={classes.logoButton}>
                        <ReactLogo className={classes.logo} />
                    </ButtonBase>
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

                    <Button className={classes.catg}>Categories <ExpandMoreIcon /></Button>
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
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
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
                    <Button className={classes.regisButton} onClick={handleClickRegister}>Register</Button>
                </Toolbar>
            </AppBar>
            <Popover
                id={id}
                open={openRegister}
                anchorReference="none"
                //anchorPosition={{ top: 0, left: 1000 }}
                // anchorEl={anchorEl}
                onClose={handleCloseRegister}
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
        </div>
    );
}

export default Navbar;