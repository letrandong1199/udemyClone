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
import Menu from '@material-ui/core/Menu';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import clsx from 'clsx';
import config from '../../config/config';
import useFetch from '../../utils/useFetch';
import authService from '../../services/auth.service';
import usePrepareLink from "../../utils/usePrepareLink";
import { GET_ENUMS, GET_PARAMS } from "../../config/config";



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
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon><FaceRoundedIcon /></ListItemIcon>
                                            <ListItemText primary="Profile" />
                                        </MenuItem>
                                    </Link>
                                    <MenuItem onClick={props.handleLogout}>
                                        <ListItemIcon><ExitToAppRoundedIcon /></ListItemIcon>
                                        <ListItemText primary="Sign-out" />
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment >
    )

}

const RegisterButton = () => {
    const signUpLink = usePrepareLink({
        query: {
            [GET_PARAMS.popup]: GET_ENUMS.popup.signUp
        }
    });
    const classes = useStyles();

    return (
        <Button color="primary"
            variant="contained"
            className={classes.registerButton}
            component={Link}
            to={signUpLink}>
            Register
        </Button>
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

const NestedMenu = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = props.anchorRef;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    return (
        <Fragment>
            {props.hasChildren && <MenuItem aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleOpen}
                title="catg"
                id="sub"
            >
                <ListItemText primary={props.text} className={clsx({ [classes.textExpandOpen]: open })} />
                <ListItemIcon>
                    <KeyboardArrowRightRoundedIcon className={clsx(classes.expand, {
                        [classes.expandOpen]: open,
                    })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more" />
                </ListItemIcon>
            </MenuItem>}
            {!props.hasChildren && <MenuItem aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                title="catg"
                id="sub"
            >
                <ListItemText primary={props.text} />
            </MenuItem>}

            <Popper open={open} placement="right-start" anchorEl={anchorRef} role={undefined} transition style={{ zIndex: 1500, marginLeft: 3, }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'right-start' ? 'right start' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {props.children}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment >
    )
}

const listToTree = (list) => {
    var map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parent !== null) {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.parent]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
}

const CategoryNestedMap = (props) => {
    return (
        <NestedMenu anchorRef={props.anchorRef} text={props.data.name} hasChildren={props.data.children.length !== 0}>
            {props.data.children.map((child,
                index) => <CategoryNestedMap key={index} anchorRef={props.anchorRef} data={child} />)}
        </NestedMenu>
    )
}

const CategoryMenu = (props) => {
    const classes = useStyles();

    const { data, isPending, error } = useFetch(`${config.HOST}:${config.PORT}/categories`);
    const [categoriesTree, setCategoriesTree] = React.useState([]);
    React.useEffect(() => {
        if (data) {
            setCategoriesTree(listToTree(data));
        }

    }, [data])

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const anchorRef2 = React.useRef(null);



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
            <Button className={classes.categoriesButton}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleOpen}
                title="catg"
            >
                Categories <ExpandMoreIcon />
            </Button>
            <Popper ref={anchorRef2} open={open} anchorEl={anchorRef.current} role={undefined} transition style={{ zIndex: 1500, marginTop: 16 }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {categoriesTree.map((category,
                                        index) => <CategoryNestedMap key={index} anchorRef={anchorRef2.current} data={category} key={index} />)}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

        </Fragment>
    )
}

const HideOnScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger({ threshold: props.threshold });

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

    const [isLogin, setIsLogin] = React.useState(authService.getCurrentUser())
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
                        <Link key={index} to={index % 2 === 0 ? '/profile' : '/my-learning'}>
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
                        <ListItem key={index} button key={text}>
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
                            <CategoryMenu />
                        </Hidden>

                        <SearchBar />
                        {!isLogin && <RegisterButton handleLogin={handleAuth('login')} />}
                        <Hidden xsDown>
                            {isLogin && <ProfileButton handleLogout={handleAuth('logout')} />}
                            <IconButton onClick={props.handleToggle}>
                                <FlareRoundedIcon />
                            </IconButton>
                        </Hidden>
                    </Grid>
                </Toolbar>
            </AppBar>

        </div >
    );
}

export default Navbar;