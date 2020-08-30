import USERS from '../../data/stubbed/dummy-users';
import { GET, ADD, DELETE, UPDATE, } from '../actions/users';
import User from '../../data/models/User';

const initialState = {
  // JOBS: [],
  // filteredJOBS: [],
  // orderedJOBS: [],
  users: users,
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET:
    //   return { ...state, filteredJOBS: state.JOBS.filter(
    //     return {(o) => action.jobIds.includes(o.id);}
    //   )};
    case ADD:
      const newUser = new User(
        action.data.id,
        action.data.companyId,
        action.data.categories,
        action.data.title,
        action.data.description,
        action.data.location,
        action.data.dates,
        action.data.pay
      );
      return { ...state, users: state.users.concat( newUser ) };
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
      return { ...state, users: state.users.filter((user) => user.id !== action.userId ) }
  };
  return state;
}

export default usersReducer;
