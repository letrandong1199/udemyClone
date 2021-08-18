import { useState, useEffect } from 'react';
import useStyles from './styles'

import {
    CssBaseline,
    Divider,
    Toolbar,
    Hidden,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Drawer,
} from "@material-ui/core";

import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import PublicRoundedIcon from '@material-ui/icons/PublicRounded';

import { useLocation, Route, Switch, useRouteMatch, Link } from 'react-router-dom';

import { ROUTES } from '../../config/config';
import Wishlist from './Wishlist';
import AccountInfo from './AccountInfo';
import PublicInfo from './PublicInfo';
import MyLearning from './MyLearning';

function Profile() {
    const classes = useStyles();
    let { path, url } = useRouteMatch();

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    let location = useLocation();
    useEffect(() => {
        switch (location.pathname) {
            case `${path}`:
                setSelectedIndex(0);
                break;
            case `${path}${ROUTES.publicInfo}`:
                setSelectedIndex(1);
                break;
            case `${path}${ROUTES.myLearning}`:
                setSelectedIndex(2);
                break;
            case `${path}${ROUTES.wishlist}`:
                setSelectedIndex(3);
                break;
            default: setSelectedIndex(-1);
        }
    }, [location, path])

    const drawer = (
        <div className={classes.drawerContainer}>
            <List>
                {['Profile', 'Public Info'].map((text, index) => (
                    <ListItem
                        button
                        color="inherit"
                        key={text}
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index)}
                        component={Link}
                        to={[`${url}`, `${url}${ROUTES.publicInfo}`][index]}
                    >
                        <ListItemIcon>
                            {[<FaceRoundedIcon />, < PublicRoundedIcon />,][index]}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                <Divider />
                {['My Learning', 'Wishlist'].map((text, index) => (
                    <ListItem
                        button
                        color="inherit"
                        key={text}
                        selected={selectedIndex === index + 2}
                        onClick={(event) => handleListItemClick(event, index)}
                        component={Link}
                        to={[`${url}${ROUTES.myLearning}`, `${url}${ROUTES.wishlist}`][index]}
                    >
                        <ListItemIcon>
                            {[<LibraryBooksRoundedIcon />, <StarsRoundedIcon />,][index]}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div >
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Hidden xsDown>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    {drawer}
                </Drawer>

            </Hidden>
            <Switch>
                <Route path={path} exact component={AccountInfo} />
                <Route path={`${path}${ROUTES.myLearning}`} component={MyLearning} />
                <Route path={`${path}${ROUTES.wishlist}`} component={Wishlist} />
                <Route path={`${path}${ROUTES.publicInfo}`} component={PublicInfo} />
            </Switch>
        </div>
    )
};

export default Profile;