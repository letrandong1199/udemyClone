import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    logging: false,
    user: undefined,
    isError: false,
    errorMessage: undefined,
    isInstructor: false,
    isAdmin: false,
    isSuccess: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.logging = true;
        },

        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.logging = false;
            state.user = action.payload.user;
            state.isInstructor = action.payload.isInstructor;
            state.isAdmin = action.payload.isAdmin;
        },
        loginFailed(state, action) {
            state.logging = false;
            state.isError = true;
            state.errorMessage = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = undefined;
            state.isInstructor = false;
            state.isAdmin = false;
        },
        signUp(state, action) {
            state.logging = true;
        },
        signUpSuccess(state, action) {
            state.logging = false;
            state.isSuccess = true;
        },
        signUpFailed(state, action) {
            state.logging = false;
            state.isError = true;
            state.errorMessage = action.payload;
        },
        clearState(state) {
            state.logging = false;
            state.isError = false;
            state.errorMessage = undefined;
        }
    }
})

// Action
export const authActions = authSlice.actions;

//
export const authSelector = (state) => state.auth;

// Reducer
export default authSlice.reducer;