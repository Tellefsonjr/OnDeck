import USERS from '../../data/stubbed/dummy-users';
import { CREATE, GET, UPDATE, DELETE} from '../actions/users';
import User from '../../data/models/User';

const initialState = {
  // JOBS: [],
  // filteredJOBS: [],
  // orderedJOBS: [],
  user: null,
  userId: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET:
    //   return { ...state, filteredJOBS: state.JOBS.filter(
    //     return {(o) => action.jobIds.includes(o.id);}
    //   )};
    case CREATE: 
        const newUser = new User(
          action.data.id,
          action.data.name,
          action.data.ein,
          action.data.icon,
          action.data.categories,
          action.data.description,
          action.data.tagline,
          action.data.locations,
          action.data.jobs,
          action.data.team,
        );
        return { ...state, companies: state.companies.concat( newCompany ) };
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
  };
  return state;
}

export default usersReducer;
