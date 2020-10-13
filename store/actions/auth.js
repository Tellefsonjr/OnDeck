import {FIREBASE_KEY} from '@env';
import { AsyncStorage } from 'react-native';

export const SIGNUP = 'SIGNUP';
export const DELETE = 'DELETE';
export const RESTORE_TOKEN = "RESTORE_TOKEN";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = 'AUTHENTICATE';

export const signUp = (payload) => {
    return async dispatch => {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: payload.email,
              password: payload.password,
              returnSecureToken: true
            })
          }
        );
    
        if (!response.ok) {
            const errorResData = await response.json();
            const errorCode = errorResData.error.message;
            console.log("Sign Up error: ", errorResData);
            let message = 'Something went wrong!';
            if (errorCode == 'EMAIL_EXISTS'){
                message = 'This email is already taken. Please go back to login, or try a new email.'
            } else if ( errorCode == 'INVALID_EMAIL'){
                message = 'Invalid email, please try another one.';
            } else if ( errorCode == 'TOO_MANY_ATTEMPTS_TRY_LATER'){
                message = 'An error occurred, please try again later. If the issue persists, please contact support.'
            } else if ( errorCode == 'OPERATION_NOT_ALLOWED'){
                message = 'An error occurred, please contact support.'
            }
            throw new Error(message);
        }
    
        const resData = await response.json();
        dispatch(authenticate(resData.localId, resData.idToken, resData.email, true));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage({
            userId: resData.localId,
            token: resData.idToken,
            email: resData.email, 
            expirationDate: expirationDate.toISOString()
        });
      };
};

export const authenticate = (userId, token, email, isSignUp) => {
    return { type: AUTHENTICATE, userId: userId, token: token, email: email, isSignUp: isSignUp };
};

export const updateUser = (payload) => ({
    type: UPDATE,
    data: payload
});

export const deleteUser = (payload) => ({
    type: DELETE,
    data: payload
});

export const restoreToken = (payload) => ({
    type: RESTORE_TOKEN,
    data: payload
});

export const login = (payload) => {
    return async dispatch => {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: payload.email,
              password: payload.password,
              returnSecureToken: true
            })
          }
        );
    
        if (!response.ok) {
            const errorResData = await response.json();
            const errorCode = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorCode == 'EMAIL_NOT_FOUND'){
                message = 'Email could not be found.'
            } else if ( errorCode == 'INVALID_PASSWORD'){
                message = 'Invalid password.'
            } else if ( errorCode == 'USER_DISABLED'){
                message = 'User has been disabled, please contact support.'
            }
            throw new Error(message);
        }
    
        const resData = await response.json();
        dispatch(authenticate(resData.localId, resData.idToken, resData.email, false));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage({
            userId: resData.localId,
            token: resData.idToken,
            email: resData.email, 
            expirationDate: expirationDate.toISOString()
        });
      };
};

const saveDataToStorage = ( user ) => {
    console.log("SAVING THIS TO STORAGE: ", user);
    AsyncStorage.setItem('userData', JSON.stringify({user}));
};

export const logout = () => {
    console.log("LOGGING OUT");
    AsyncStorage.removeItem('userData');   
    return { type: LOGOUT };
};


export const setUserFilters = (payload) => ({
    type: SET_USER_FILTERS,
    payload
})
