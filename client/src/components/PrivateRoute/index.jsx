import authService from '../../services/auth.service';
import { Route, Redirect } from 'react-router-dom';
import usePrepareLink from '../../utils/usePrepareLink';
import { GET_ENUMS, GET_PARAMS } from '../../config/config';

export const PrivateRouteUser = ({ component: Component, ...rest }) => {
    const signInLink = usePrepareLink({
        query: {
            [GET_PARAMS.popup]: GET_ENUMS.popup.signIn
        }
    });

    console.log("Private", signInLink);
    const auth = authService.isUser();
    console.log("auth", auth);
    return (
        <Route {...rest} render={(props) => (
            auth === true
                ? <Component {...props} />
                : <Redirect to={signInLink} />
        )} />
    )
};

export const PrivateRouteInstructor = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        authService.isInstructor(props) === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
);

export const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        authService.isAdmin(props) === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/404',
                state: { from: props.location }
            }} />
    )} />
);
