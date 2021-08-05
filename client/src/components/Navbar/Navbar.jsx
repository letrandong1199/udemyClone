import { useState, useEffect, useRef, Fragment } from 'react'
import { ReactComponent as ReactLogo } from '../../svgs/logo.svg'
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FlareRoundedIcon from '@material-ui/icons/FlareRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';

import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Skeleton from '@material-ui/lab/Skeleton';

import {
    ListItem,
    Divider,
    ListItemIcon,
    ListItemText,
    List,
    AppBar,
    Toolbar,
    Button,
    InputBase,
    IconButton,
    MenuItem,
    ButtonBase,
    Paper,
    MenuList,
    CssBaseline,
    Grid,
    Hidden,
    Drawer,
} from '@material-ui/core';

import { Link, useLocation, useHistory } from 'react-router-dom';

import { useStyles } from './styles';
import authService from '../../services/auth.service';
import categoryService from '../../services/category.service';
import usePrepareLink from '../../utils/usePrepareLink';
import { GET_ENUMS, GET_PARAMS, ROUTES } from '../../config/config';
import listToTree from '../../utils/listToTree';

// Component profile button
const ProfileButton = ({ handleSignOut }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

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

    const prevOpen = useRef(open);
    useEffect(() => {
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
                <AccountCircle color='inherit' />
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition style={{ zIndex: 1500, marginTop: 10 }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                                    <Link to="/profile">
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon><FaceRoundedIcon /></ListItemIcon>
                                            <ListItemText primary='Profile' />
                                        </MenuItem>
                                    </Link>
                                    <MenuItem onClick={handleSignOut}>
                                        <ListItemIcon><ExitToAppRoundedIcon /></ListItemIcon>
                                        <ListItemText primary='Sign-out' />
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

// Component register button
const RegisterButton = () => {
    const signUpLink = usePrepareLink({
        query: {
            [GET_PARAMS.popup]: GET_ENUMS.popup.signUp
        }
    });
    const classes = useStyles();

    return (
        <Button color='primary'
            variant='contained'
            className={classes.registerButton}
            component={Link}
            to={signUpLink}>
            Register
        </Button>
    )
}

const InstructorButton = () => {

    const classes = useStyles();

    return (
        <Button
            className={classes.categoriesButton}
            component={Link}
            to={`${ROUTES.instructor}`}>
            Instructor
        </Button>
    )
}

const AdminButton = () => {

    const classes = useStyles();

    return (
        <Button
            className={classes.categoriesButton}
            component={Link}
            to={`${ROUTES.admin}`}>
            Admin
        </Button>
    )
}

// Component search bar
const SearchBar = () => {
    const history = useHistory();
    const classes = useStyles();
    const [keyword, setKeyword] = useState();

    const handleClick = () => {
        history.push(`${ROUTES.course}?search=${keyword}`)

    };
    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            return handleClick();
        }
    }

    return (
        <div className={classes.searchBar}>
            <InputBase
                onKeyDown={handleEnter}
                autoComplete
                value={keyword}
                onChange={(event) => { setKeyword(event.target.value) }}
                placeholder='What do you want to learn?'
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton
                onClick={handleClick}
                className={classes.searchIcon}
            >
                <SearchRoundedIcon />
            </IconButton>
            {/*<Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
                />*/}
        </div>
    )
}

// Component for nested menu
const NestedMenu = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = props.anchorRef;
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false)
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
                aria-haspopup='true'
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                component={Link}
                to={`${ROUTES.course}?category=${props.category.Id}`}
                title='catg'
                id='sub'
            >
                <ListItemText primary={props.category.Name} className={clsx({ [classes.textExpandOpen]: open })} />
                <ListItemIcon>
                    <KeyboardArrowRightRoundedIcon className={clsx(classes.expand, {
                        [classes.expandOpen]: open,
                    })}
                        onMouseOver={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label='show more' />
                </ListItemIcon>
            </MenuItem>}
            {!props.hasChildren && <MenuItem
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                title='catg'
                id='sub'
                component={Link}
                to={`${ROUTES.course}?category=${props.category.Id}`}
            >
                <ListItemText primary={props.category.Name} />
            </MenuItem>}

            <Popper
                open={open}
                placement='right-start'
                anchorEl={anchorRef}
                keepMounted
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                role={undefined}
                transition
                style={{ zIndex: 1500, marginLeft: 3, }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'right-start' ? 'right start' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id='menu-list-grow' onKeyDown={handleListKeyDown}>
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

const CategoryNestedMap = (props) => {
    return (
        <NestedMenu anchorRef={props.anchorRef} category={props.data} hasChildren={props.data.children.length !== 0}>
            {props.data.children.map((child,
                index) => <CategoryNestedMap key={index} anchorRef={props.anchorRef} data={child} />)}
        </NestedMenu>
    )
}

const CategoryMenu = (props) => {
    const classes = useStyles();
    const anchorRef2 = useRef(null);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const id = open ? 'categories-menu' : undefined;

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [categoriesTree, setCategoriesTree] = useState([]);
    const handleClick = async (event) => {
        setOpen(!open)

        if (!open) {
            setIsPending(true);
            await categoryService.getAll().then(response => {
                const categoriesArray = response.listAllResponse;
                const tree = listToTree(categoriesArray, { idCol: 'Id', parentCol: 'Parent_Id' });
                setCategoriesTree(tree);
                if (tree.length === 0) {
                    throw Error("Not found");
                }
                setIsPending(false);
                setError(false);

            }).catch(err => {
                setError(err.message);
                setIsPending(false);
                console.log('err', err);
            })
        }
    };


    return (
        <Fragment>
            <Button className={classes.categoriesButton}
                ref={anchorRef}
                aria-controls={open ? 'button' : undefined}
                aria-haspopup='true'
                onClick={handleClick}
                title='catg'
            >
                Categories <ExpandMoreIcon />
            </Button>

            <Popper
                id={id}
                ref={anchorRef2}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                placement={'bottom-start'}
                style={{ zIndex: 1500, marginTop: 16 }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id='menu-list-grow'
                                >
                                    {error && <MenuItem>{error}</MenuItem>}
                                    {isPending ? <Skeleton width={200} height={80}></Skeleton>
                                        : categoriesTree.map((category,
                                            index) => <CategoryNestedMap
                                                key={index}
                                                anchorRef={anchorRef2.current}
                                                data={category} />)
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

        </Fragment >
    )
}


// Main component
function Navbar(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    let location = useLocation();
    let history = useHistory();
    useEffect(() => {
        switch (location.pathname) {
            case ROUTES.profile:
                setSelectedIndex(0);
                break;
            case ROUTES.myLearning:
                setSelectedIndex(1);
                break;
            default: setSelectedIndex(-1);
        }
    }, [location.pathname])

    const [isLogin, setIsLogin] = useState(authService.isUser())
    const auth = authService.isUser();
    useEffect(() => {
        setIsLogin(authService.isUser())
    }, [auth])
    const handleSignOut = () => {
        authService.logout();
        setIsLogin(false);
        history.push(ROUTES.home);
    };


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
                        <ListItem key={index} button>
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
                    <IconButton onClick={handleSignOut}>
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
                                color='inherit'
                                aria-label='open drawer'
                                edge='start'
                                onClick={handleDrawerToggle}
                                size='small'
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                variant='temporary'
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
                            <ButtonBase id='logo-button' className={classes.logoButton}>
                                <Link to="/"><ReactLogo className={classes.logo} /></Link>
                            </ButtonBase>
                            <CategoryMenu />
                        </Hidden>

                        <SearchBar />
                        {!isLogin && <RegisterButton />}
                        <Hidden xsDown>
                            {authService.isInstructor() && <InstructorButton />}
                            {authService.isAdmin() && <AdminButton />}
                            {isLogin && <ProfileButton handleSignOut={handleSignOut} />}
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