import USERS from '../../data/stubbed/dummy-users';
import { CREATE, GET, LOGIN, LOGOUT, UPDATE, DELETE, CREATE_ERROR} from '../actions/users';
import User from '../../data/models/User';

const initialState = {
  user: null,
  userId: null,
  users: [],
  selectedUser: null,
};

const usersReducer = (state = initialState, action) => {
  // console.log(" ~~~~~~~~~~~~~~GOT TO THE REDUCER ~~~~~~~~~~~~~~~~~~~");
  switch (action.type) {
    case GET:
      // console.log("~~~~~~~~~~~~~~~~GETTING USER IN REDUCER", action);
      return { ...state, selectedUser: action.data};
    case CREATE: 
        console.log("Creating user in reducer: ", action.data.userId);
        return {...state, user: action.data, userId: action.data.userId};
    case CREATE_ERROR:
        console.log("Error when creating user: ", action.err);
        return state
    case UPDATE:
        const userIndex = state.users.findIndex( user => user.id == action.data.id);
        const updatedUser = new User(
            action.data.id,
            action.data.companyId,
            action.data.categories,
            action.data.title,
            action.data.description,
            action.data.location,
            action.data.dates,
            action.data.pay
        );
        const updatedUsers = [ ...state.users ];
        updatedUsers[userIndex] = updatedUser;
        return {
          ...state,
          users: updatedUsers,
        }
    case DELETE:
    console.log("Deleting in reducer: ", action.userId);
      return { ...state, users: state.users.filter((user) => user.id !== action.userId ) };
    case LOGIN:
        console.log(`LOGGED IN USER:  ${action.data.contactInfo.email} /// ${action.data.userId}`);
        return { ...state, user: action.data, userId: action.data.userId }
    case LOGOUT: 
        return { initialState }
  };
  return state;
}

export default usersReducer;
