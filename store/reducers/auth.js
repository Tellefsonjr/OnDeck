import USERS from '../../data/stubbed/dummy-users';
import { AUTHENTICATE, GET, DELETE, UPDATE, RESTORE_TOKEN, LOGOUT} from '../actions/auth';
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
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET:
    //   return { ...state, filteredJOBS: state.JOBS.filter(
    //     return {(o) => action.jobIds.includes(o.id);}
    //   )};
    case AUTHENTICATE:
      // console.log("LOGGING IN REDUCER", action.userId, action.token, action.email, action.isSignUp);
      return {
        userId: action.userId,
        token: action.token,
        email: action.email,
        isSignUp: action.isSignUp,
      };
    case RESTORE_TOKEN: 
      return {
        userToken: action.token,
      };

    case LOGOUT:
      return { initialState };
  };
  return state;
}

export default authReducer;
