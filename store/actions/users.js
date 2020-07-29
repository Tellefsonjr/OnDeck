export const ADD_JOB = 'ADD_JOB';
export const UPDATE_JOB = 'UPDATE_JOB';
export const DELETE_JOB = 'DELETE_JOB';

export const SET_JOB_FILTERS = 'SET_JOB_FILTERS';


export const ADD_JOB = (payload) => ({
    type: ADD_JOB,
    payload
});

export const UPDATE_JOB = (payload) => ({
    type: UPDATE_JOB,
    payload
});

export const DELETE_JOB = (payload) => ({
    type: DELETE_JOB,
    payload
});

export const SET_JOB_FILTERS = (payload) => ({
    type: SET_JOB_FILTERS,
    payload
})
