import {FIREBASE_KEY} from '@env';
import { AsyncStorage } from 'react-native';
import { actionTypes } from 'redux-firestore';

export const SIGNUP = 'SIGNUP';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const DELETE = 'DELETE';
export const RESTORE_TOKEN = "RESTORE_TOKEN";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const AUTHENTICATE = 'AUTHENTICATE';


export const signUp = (payload) => {
    let userId = "";
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        console.log("SIGNING UP IN AUTHACTIONS~~~~~~~~~~", payload);
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            payload.auth.email,
            payload.auth.password,
        ).then((res) => {
            // const expirationDate = new Date(new Date().getTime() + parseInt(res.user.expiresIn) * 1000);
            // saveDataToStorage({
            //     userId: res.user.localId,
            //     token: res.user.idToken,
            //     email: res.user.email, 
            //     expirationDate: expirationDate.toISOString()
            // });
            let user = payload.user;
            userId = res.user.uid;
            user.userId = res.user.uid;
            return (
                firestore.collection('users').doc(res.user.uid).set(user)
            )
        }).then(() => {
            if(payload.user.type == "Business"){
                console.log("Got to Business Registration: ", userId);
                let tempCompany = payload.company;
                tempCompany.teamMembers.push(userId);
                return (
                    firestore.collection('companies').add(tempCompany)
                )
            }
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch( err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
};

export const authenticate = (userId, token, email, isSignUp) => {
    // console.log("GOT TO AUTHENTICATE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", userId);
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
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const state = getState();
        // console.log("AUUUUUTH STATE: ", state.firebase.auth);
        firebase.auth().signInWithEmailAndPassword(
            payload.email,
            payload.password
        ).then(() => {
            dispatch({ type: "LOGIN_SUCCESS" })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
        });
    }
}

// export const login = (payload) => {
//     return async dispatch => {
//         const response = await fetch(
//           `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               email: payload.email,
//               password: payload.password,
//               returnSecureToken: true
//             })
//           }
//         );
    
//         if (!response.ok) {
//             const errorResData = await response.json();
//             const errorCode = errorResData.error.message;
//             let message = 'Something went wrong!';
//             if (errorCode == 'EMAIL_NOT_FOUND'){
//                 message = 'Email could not be found.'
//             } else if ( errorCode == 'INVALID_PASSWORD'){
//                 message = 'Invalid password.'
//             } else if ( errorCode == 'USER_DISABLED'){
//                 message = 'User has been disabled, please contact support.'
//             }
//             throw new Error(message);
//         }
    
//         const resData = await response.json();
//         dispatch(authenticate(resData.localId, resData.idToken, resData.email, false));
//         const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
//         saveDataToStorage({
//             userId: resData.localId,
//             token: resData.idToken,
//             email: resData.email, 
//             expirationDate: expirationDate.toISOString()
//         });
//       };
// };

const saveDataToStorage = ( user ) => {
    AsyncStorage.setItem('userData', JSON.stringify({user}));
};

export const logout = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const state = getState();
        // console.log("LOGOUT STAAAATE: ", state.firebase.auth);
        firebase.logout().then(() => {
            dispatch({ type: actionTypes.CLEAR_DATA });

        }).then(() => {
            AsyncStorage.removeItem('userData');   

        }).then(() => {
            dispatch({ type: 'LOGOUT_SUCCESS', })
        })
    }
};


export const setUserFilters = (payload) => ({
    type: SET_USER_FILTERS,
    payload
})
