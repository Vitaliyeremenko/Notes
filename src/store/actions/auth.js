import * as actionTypes from './actionsTypes';
import axios from '../../axios-instance';

export const signUpStart = () =>{
    return {
        type: actionTypes.SIGNUP_START
    }
}

export const signUpSuccess = (name,id,email,token,client,expiry,uid) =>{
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        name: name,
        userId: id,
        email: email,
        token: token,
        client: client,
        expiry: expiry,
        uid: uid
    }
}

export const signUpFail = (error) =>{
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    }
}

export const signUp = (name,email,password,password_confirmation) => {
    return dispatch => {
        dispatch(signUpStart());
        axios.post('/auth',{ name: name, email: email, password: password, password_confirmation: password_confirmation})
            .then(res => {
                console.log(res);
                dispatch(signUpSuccess(res.data.name, res.data.id, res.data.email, res.headers['access-token'],
                res.headers['client'],
                res.headers['expiry'],
                res.headers['uid']));
                localStorage.setItem('user', JSON.stringify({
                    name: res.data.name,
                    userId: res.data.id,
                    email: res.data.email,
                    token: res.headers['access-token'],
                    client: res.headers['client'],
                    expiry: res.headers['expiry'],
                    uid: res.headers['uid'],
                    
                }))
            })
            .catch(err => {
                console.log(err);
                dispatch(signUpFail(err));
            })
    }
}


export const signInStart = () =>{
    return {
        type: actionTypes.SIGNIN_START
    }
}

export const signInSuccess = (name,id,email,token,client,expiry,uid) =>{
    return {
        type: actionTypes.SIGNIN_SUCCESS,
        name: name,
        userId: id,
        email: email,
        token: token,
        client: client,
        expiry: expiry,
        uid: uid
    }
}

export const signInFail = (error) =>{
    return {
        type: actionTypes.SIGNIN_FAIL,
        error: error
    }
}


export const signIn = (email,password) => {
    return dispatch => {
        dispatch(signInStart());
        axios.post('/auth/sign_in',{ email: email, password: password, })
            .then(res => {
                console.log(res);
                dispatch(signInSuccess(res.data.name, res.data.id, res.data.email,
                     res.headers['access-token'],
                     res.headers['client'],
                     res.headers['expiry'],
                     res.headers['uid']));
                localStorage.setItem('user', JSON.stringify({
                    name: res.data.name,
                    userId: res.data.id,
                    email: res.data.email,
                    token: res.headers['access-token'],
                    client: res.headers['client'],
                    expiry: res.headers['expiry'],
                    uid: res.headers['uid'],
                    
                }))
            })
            .catch(err => {
                console.log(err);
                dispatch(signInFail(err));
            })
    }
}


export const getUserFromLocalStorage = (data) => {

    const parsedData = JSON.parse(data);

    return {
        type: actionTypes.GET_USER_FROM_LOCAL_STORAGE,
        ...parsedData
    }
}

export const setHeader = (header) => {
    return {
        type: actionTypes.SET_HEADER,
        header: header
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    return {
        type: actionTypes.LOGOUT
    }
}