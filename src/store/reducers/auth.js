import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    token : null,
    userId : null,
    name: null,
    email: null,
    error: null,
    loading: false,
    client: null,
    expiry: null,
    uid: null,
    header: 'sign in'
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SIGNUP_START : 
            return {
                ...state,
                loading: true
            }
        case actionTypes.SIGNUP_SUCCESS : 
            return {
                ...state,
                name: action.name,
                userId: action.userId,
                email: action.email,
                token: action.token,
                client: action.client,
                expiry: action.expiry,
                uid: action.uid,
                loading: false
            }
        case actionTypes.SIGNUP_FAIL : 
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.SIGNIN_START : 
            return {
                ...state,
                loading: true
            }
        case actionTypes.SIGNIN_SUCCESS : 
            return {
                ...state,
                name: action.name,
                userId: action.userId,
                email: action.email,
                token: action.token,
                client: action.client,
                expiry: action.expiry,
                uid: action.uid,
                loading: false
            }
        case actionTypes.SIGNIN_FAIL : 
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.GET_USER_FROM_LOCAL_STORAGE : {
            return {
                ...state,
                name: action.name,
                userId: action.userId,
                email: action.email,
                token: action.token,
                client: action.client,
                expiry: action.expiry,
                uid: action.uid
            }
        }
        case actionTypes.SET_HEADER: {
            return {
                ...state,
                header: action.header,
                error: null
            }
        }
        case actionTypes.LOGOUT: {
            return{
                token : null,
                userId : null,
                name: null,
                email: null,
                error: null,
                loading: false,
                client: null,
                expiry: null,
                uid: null,
                header: 'sign in'
            }
        }
        default:
            return state;
    }
}

export default reducer;