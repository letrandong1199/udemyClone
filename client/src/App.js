/* eslint-disable no-undef */
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { lightTheme, darkTheme } from './theme';
import { BrowserRouter as Router, Route, Switch, withRouter, useLocation } from 'react-router-dom';
import routes from './pages/routes';
import Navbar from './components/Navbar/Navbar.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import GetParameterPopups from './components/GetParameterPopups/GetParameterPopups';
import { PrivateRouteUser } from './components/PrivateRoute';
import { Suspense } from 'react';

function App() {
  const [dark, setDark] = React.useState(false)

  const handleToggle = () => {
    setDark(!dark);
    console.log(dark);
  }
  //let location = useLocation();
  return (
    <MuiThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Suspense fallback={<div><CircularProgress /></div>}>
        <Router>
          <Navbar handleToggle={handleToggle} />
          <Switch>
            {routes.map(({ component, path, ...rest }) => {
              return rest.public
                ? <Route key={path} path={path} component={component} {...rest} />
                : <PrivateRouteUser key={path} path={path} component={component} {...rest} />
            })}
          </Switch>
          <GetParameterPopups />
        </Router>
      </Suspense>
    </MuiThemeProvider >
  )
}

export default App;
