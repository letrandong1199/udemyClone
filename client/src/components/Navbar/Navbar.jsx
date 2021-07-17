import React from 'react'

import { Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import ButtonBase from '@material-ui/core/ButtonBase';
import { ReactComponent as ReactLogo } from '../../logo.svg'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import RegisterAndLogin from '../RegisterAndLogin/RegisterAndLogin.jsx';
import Popover from '@material-ui/core/Popover';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { ListItem, Divider, ListItemIcon, ListItemText, List } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import { useLocation } from 'react-router-dom';
import FlareRoundedIcon from '@material-ui/icons/FlareRounded';
import { useStyles } from './styles';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

const ProfileButton = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleOpen = () => {
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
        <Fragment>
            <IconButton
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleOpen}
                className={classes.profileButton}
                title="Profile"
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
                                    <Link to="/profile">
                                        <MenuItem onClick={handleClose}><FaceRoundedIcon />&nbsp;Profile</MenuItem>
                                    </Link>
                                    <MenuItem onClick={props.handleLogout}><ExitToAppRoundedIcon />&nbsp;Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment >
    )

}

const RegisterButton = (props) => {
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
        <Fragment>
            <Button color="primary" variant="contained" className={classes.registerButton} onClick={handleClick}>
                Register
            </Button>
            <Popover
                id={id}
                open={openRegister}
                anchorReference="none"
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
                <RegisterAndLogin handleLogin={props.handleLogin} />
            </Popover>
        </Fragment>
    )
}

const SearchBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.searchBar}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="What do you want to search?"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    )
}

const HideOnScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 4,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
};


function Navbar(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
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
            case '/my-learning':
                setSelectedIndex(1);
                break;
            default: setSelectedIndex(-1);
        }
    }, [location])

    const [isLogin, setIsLogin] = React.useState(window.sessionStorage.getItem('isLogin'))
    const handleAuth = (type) => (event) => {
        if (type === 'logout') {
            setIsLogin(false)
            window.sessionStorage.removeItem('isLogin');
            window.sessionStorage.removeItem('user_id');
        }
        else if (type === 'login') {
            setIsLogin(true)
        }

    }

    /* React.useEffect(() => {
         setIsLogin(window.sessionStorage.getItem('isLogin'))
         console.log(window.sessionStorage.getItem('isLogin'))
     }, [window.sessionStorage.getItem('isLogin')])
 */
    const drawer = (
        <div>
            <List>
                <ButtonBase button id="logo-button" className={classes.logoButton}>
                    <Link to="/"><ReactLogo className={classes.logo} /></Link>
                </ButtonBase>
            </List>
            <Divider />
            {isLogin &&
                <List>
                    {['Profile', 'My learning'].map((text, index) => (
                        <Link to={index % 2 === 0 ? '/profile' : '/my-learning'}>
                            <ListItem
                                button
                                key={text}
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index)}
                            >
                                <ListItemIcon>{index % 2 === 0 ? <FaceRoundedIcon /> : <MenuBookRoundedIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>}
            <Divider />
            {isLogin &&
                <List>
                    {['Wishlist'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{<FavoriteRoundedIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>}
            <List>
                <IconButton onClick={props.handleToggle}>
                    <FlareRoundedIcon />
                </IconButton>
                {isLogin &&
                    <IconButton onClick={handleAuth('logout')}>
                        <ExitToAppRoundedIcon />
                    </IconButton>
                }
            </List>

        </div >
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <HideOnScroll>
                <AppBar color="default" className={classes.appBar} elevation={1}>
                    <Toolbar>
                        <Grid container alignItems="center" style={{ justifyContent: 'space-between' }}>
                            <Hidden smUp>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    size="small"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Drawer
                                    variant="temporary"
                                    anchor='left'
                                    open={mobileOpen}
                                    onClose={handleDrawerToggle}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    ModalProps={{
                                        keepMounted: true, // Better open performance on mobile.
                                    }}
                                >
                                    {drawer}
                                </Drawer>
                            </Hidden>
                            <Hidden xsDown>
                                <ButtonBase id="logo-button" className={classes.logoButton}>
                                    <Link to="/"><ReactLogo className={classes.logo} /></Link>
                                </ButtonBase>
                            </Hidden>

                            <SearchBar />
                            {isLogin && <Hidden xsDown>
                                <Button className={classes.categoriesButton}>Categories <ExpandMoreIcon /></Button>
                                <ProfileButton handleLogout={handleAuth('logout')} />
                            </Hidden>}
                            {!isLogin && <RegisterButton handleLogin={handleAuth('login')} />}
                            <Hidden xsDown>
                                <IconButton onClick={props.handleToggle}>
                                    <FlareRoundedIcon />
                                </IconButton>
                            </Hidden>

                        </Grid>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </div >
    );
}

export default Navbar;