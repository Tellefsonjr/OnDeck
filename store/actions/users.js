import {firebase, db} from '../../firebaseConfig.js';
import { AsyncStorage } from 'react-native';

export const CREATE = 'CREATE';
export const CREATE_ERROR = 'CREATE_ERROR';
export const GET = 'GET';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const SET_USER_FILTERS = 'SET_USER_FILTERS';



export const create = (payload) => {
    return(dispatch, getState, {getFirestore, }) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(payload.userId).set({
                ...payload
            }).then(() => {
                dispatch({ type: "CREATE", data: payload});
            }).catch((err) => {
                dispatch({ type: "CREATE_ERROR", err});
            })
    }
};

export const get = (payload) => {
    return(dispatch, getState, {getFirestore, }) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(payload).get().then((doc) => {
            dispatch({ type: "GET", data: doc.data()})
        })
    }
};

export const login = (payload) => {
    return(dispatch, getState, {getFirestore, }) => {
        const firestore = getFirestore();
        firestore.collection('users').doc(payload).get().then((doc) => {
            dispatch({ type: "LOGIN", data: doc.data()})
        })
    }
};

export const logout = () => {
    return(dispatch, getState, {getFirestore, }) => {
        const firestore = getFirestore();
        // TO DO ? Any logic needed here for DB?
        dispatch({ type: "LOGOUT", data: {}});
    }
};

export const updateUser = (payload) => ({
    type: UPDATE,
    data: payload
});

export const deleteUser = (payload) => ({
    type: DELETE,
    data: payload
});

export const setUserFilters = (payload) => ({
    type: SET_USER_FILTERS,
    payload
})
