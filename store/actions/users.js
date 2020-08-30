export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const SET_USER_FILTERS = 'SET_USER_FILTERS';


export const ADD_USER = (payload) => ({
    type: ADD_USER,
    payload
});

export const UPDATE_USER = (payload) => ({
    type: UPDATE_USER,
    payload
});

export const DELETE_USER = (payload) => ({
    type: DELETE_USER,
    payload
});

export const SET_USER_FILTERS = (payload) => ({
    type: SET_USER_FILTERS,
    payload
})
