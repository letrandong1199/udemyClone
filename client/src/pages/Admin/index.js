import { useState, useEffect } from 'react';
import useStyles from './styles'
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    List,
    Toolbar,
    Hidden
} from '@material-ui/core';

import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';

import { useLocation, Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import CourseBoard from './CourseBoard';
import UserBoard from './UserBoard';
import CategoryBoard from './CategoryBoard';


function Admin() {
    const classes = useStyles();
    let { path, url } = useRouteMatch();

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    let location = useLocation();
    useEffect(() => {
        switch (location.pathname) {
            case '/admin/users':
                setSelectedIndex(0);
                break;
            case '/admin/categories':
                setSelectedIndex(2);
                break;
            case '/admin/courses':
                setSelectedIndex(1);
                break;
            default: setSelectedIndex(-1);
        }
    }, [location])


    const drawer = (
        <div className={classes.drawerContainer}>
            <List>
                {['Users', 'Courses', 'Categories'].map((text, index) => (
                    <ListItem
                        component={Link}
                        to={[`${url}/users`, `${url}/courses`, `${url}/categories`][index]}
                        key={index}
                        button
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index)}
                    >
                        <ListItemIcon>
                            {[
                                <PeopleOutlineRoundedIcon />,
                                <MenuBookRoundedIcon />,
                                <ListAltRoundedIcon />
                            ][index]
                            }
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
                <Route path={`${path}/users`}>
                    <UserBoard />
                </Route>
                <Route path={`${path}/courses`}>
                    <CourseBoard />
                </Route>
                <Route path={`${path}/categories`}>
                    <CategoryBoard />
                </Route>
            </Switch>



        </div>
    )
};

export default Admin;