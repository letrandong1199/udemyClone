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
import RegisterAndLogin from '../RegisterAndLogin/RegisterAndLogin';
import Popover from '@material-ui/core/Popover';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { ListItem, Divider, ListItemIcon, ListItemText, List } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import { useStyles } from './styles';

const ProfileButton = () => {
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
        <Fragment className={classes.sectionDesktop}>
            <IconButton
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleOpen}
                className={classes.profileButton}
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
        </Fragment >
    )

}

const RegisterButton = () => {
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
                <RegisterAndLogin />
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
    const drawer = (
        <div>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
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
                                <ButtonBase className={classes.logoButton}>
                                    <ReactLogo className={classes.logo} />
                                </ButtonBase>
                            </Hidden>

                            <SearchBar />
                            <Hidden xsDown>
                                <Button onClick={props.handleToggleDark} className={classes.categoriesButton}>Categories <ExpandMoreIcon /></Button>
                                <ProfileButton />
                                <RegisterButton />
                            </Hidden>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </div >
    );
}

export default Navbar;