/* eslint-disable no-undef */
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { React, useEffect } from 'react';
import { lightTheme, darkTheme } from './theme';
import { Router, Route, Switch } from 'react-router-dom';
import routes from './pages/routes';
import Navbar from './components/Navbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import GetParameterPopups from './components/GetParameterPopups';
import {
  PrivateRouteUser,
  PrivateRouteAdmin,
  PrivateRouteInstructor
} from './components/PrivateRoute';
import { Suspense } from 'react';
import { ROUTES } from './config/config';
import history from './history';
import { useSelector, useDispatch } from 'react-redux'
import {
  setWishlist,
} from './store/features/wishlist/wishlistSlice';
import wishlistService from './services/wishlist.service';

function App() {
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.toggleTheme.dark);

  useEffect(() => {
    wishlistService.getAll().then(response => {
      const wishlist = response.listAllResponse;
      dispatch(setWishlist(wishlist));
    }).catch(error => {
      console.log(error.message);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MuiThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Suspense fallback={<div>
        <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
      </div>}>
        <Router history={history}>
          <Navbar />
          <Switch>
            {routes.map(({ component, path, ...rest }) => {
              return rest.public
                ? <Route key={path} path={path} component={component} {...rest} />
                : path === ROUTES.admin
                  ? <PrivateRouteAdmin key={path} path={path} component={component} {...rest} />
                  : path === ROUTES.instructor
                    ? <PrivateRouteInstructor key={path} path={path} component={component} {...rest} />
                    : <PrivateRouteUser key={path} path={path} component={component} {...rest} />
            })}
          </Switch>
          <GetParameterPopups />
        </Router>
      </Suspense>
    </MuiThemeProvider>
  )
}

export default App;
