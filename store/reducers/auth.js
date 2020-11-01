import USERS from '../../data/stubbed/dummy-users';
import { AUTHENTICATE, GET, DELETE, UPDATE, RESTORE_TOKEN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, LOGOUT_ERROR, SIGNUP_ERROR, SIGNUP_SUCCESS,} from '../actions/auth';
import User from '../../data/models/User';
import { FIREBASE_KEY } from '@env'; 

const initialState = {
  // JOBS: [],
  // filteredJOBS: [],
  // orderedJOBS: [],
  userId: null,
  token: null,
  email: null,
  isSignUp: false,
  authError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      console.log('Signup Success');
      return {
        ...state,
        authError: null,
      }
    case SIGNUP_ERROR: 
      console.log('Signup Error');
      return {
        ...state,
        authError: action.err.message,
      }
    // case GET:
    //   return { ...state, filteredJOBS: state.JOBS.filter(
    //     return {(o) => action.jobIds.includes(o.id);}
    //   )};
    case AUTHENTICATE:
      // console.log("LOGGING IN REDUCER", action.userId, action.token, action.email, action.isSignUp);
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        email: action.email,
        isSignUp: action.isSignUp,
      };
    case LOGIN_SUCCESS:
        console.log("Login Success");
        return {
          ...state,
          authError: null,
        }
    case LOGIN_ERROR: 
        return {
          ...state,
          authError: action.err.message
        }
    case RESTORE_TOKEN: 
      return {
        userToken: action.token,
      };

    case LOGOUT_SUCCESS:
      console.log("Logout Successful");
      return { initialState };
  };
  return state;
}

export default authReducer;
