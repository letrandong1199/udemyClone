import { all } from 'redux-saga/effects'
import authSaga from './features/auth/authSaga';

function* rootSaga() {
    yield all([
        authSaga(),
    ])
}

export default rootSaga;