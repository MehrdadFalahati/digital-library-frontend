import axios from 'axios';
import jwtDecode from 'jwt-decode';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, admin) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        admin: admin,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const auth = (authRequest, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        let authData = {
            username: authRequest.username,
            email: authRequest.email,
            password: authRequest.password,
        };
        let url = 'http://localhost:8090/app/v1/auth/signup';
        if (!isSignup) {
            authData = {
                usernameOrEmail: authRequest.email,
                password: authRequest.password,
            };
            url = 'http://localhost:8090/app/v1/auth/login';
        }
        axios.post(url, authData)
            .then(response => {
                const jwt = jwtDecode(response.data.accessToken);
                const expirationDate = new Date(new Date().getTime() + jwt.exp);
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.accessToken, jwt.jti));
                dispatch(checkAuthTimeout(jwt.exp));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const jwt = jwtDecode(token);
                const admin = jwt.jti;
                dispatch(authSuccess(token, admin));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    };
};