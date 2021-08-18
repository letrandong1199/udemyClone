import { call, take, put, all } from 'redux-saga/effects';
import { authActions as actions } from './authSlice';
import service from '../../../services/auth.service';
import history from '../../../history';
import { ROUTES, GET_PARAMS, GET_ENUMS } from '../../../config/config';

function* handleLogin(info) {
    try {
        yield call(service.login, info);
        const user = yield call(service.getCurrentUser)
        const isInstructor = yield call(service.isInstructor)
        const isAdmin = yield call(service.isAdmin)
        yield put(actions.loginSuccess({ user, isInstructor, isAdmin }))
    } catch (error) {
        yield put(actions.loginFailed(error.message.toString()))
        console.log(error);
    }

}
function* handleLogout() {
    try {
        yield call(service.logout);
        history.push(`${ROUTES.home}?${GET_PARAMS.popup}=${GET_ENUMS.popup.signIn}`);
    } catch (error) {
        yield put(actions.loginFailed(error.message.toString()))
        console.log(error);
    }


}


function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = localStorage.getItem('user');
        if (!isLoggedIn) {
            const action = yield take(actions.login.type);
            yield call(handleLogin, action.payload);
        }
        else {
            const user = yield call(service.getCurrentUser)
            const isInstructor = yield call(service.isInstructor)
            const isAdmin = yield call(service.isAdmin)
            yield put(actions.loginSuccess({ user, isInstructor, isAdmin }))

            yield take(actions.logout.type);
            yield call(handleLogout)
        }
    }
};

function* watchSignupFlow() {
    while (true) {
        try {
            const action = yield take(actions.signUp.type);
            yield call(service.register, action.payload);
            yield put(actions.signUpSuccess())
        } catch (error) {
            yield put(actions.loginFailed(error.message.toString()))
            console.log(error);
        }
    }
};

export default function* userSaga() {
    yield all([
        watchLoginFlow(),
        watchSignupFlow(),
    ])
};