import {firebase, db} from '../../firebaseConfig.js';
import { AsyncStorage } from 'react-native';

export const CREATE = 'CREATE';
export const GET = 'GET';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const SET_USER_FILTERS = 'SET_USER_FILTERS';



export const create = (payload) => {
    return async dispatch => {
    // console.log("CREATE PAYLOAD: ", payload.userId);
    // TO DO - wire up create with firebaseDB GET example:
    db.collection("users").doc(payload.userId).set({
            type: payload.type,
            contactInfo: payload.contactInfo,
            fullName: payload.fullName,
            location: payload.location,
            preferences: payload.preferences,
            profile: payload.profile,
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
};

export const get = (userId) => {
    return { type: GET, userId: userId };
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
        dispatch(authenticate(resData.localId, resData.idToken, resData.email));
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
