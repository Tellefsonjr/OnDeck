import companies from '../../data/stubbed/dummy-companies';
import { CREATE, GET, LOGIN, LOGOUT, UPDATE, DELETE, CREATE_ERROR} from '../actions/companies';

const initialState = {
  company: null,
  companyId: null,
  companies: companies,
  selectedCompany: null,
};

const companiesReducer = (state = initialState, action) => {
  // console.log(" ~~~~~~~~~~~~~~GOT TO THE REDUCER ~~~~~~~~~~~~~~~~~~~");
  switch (action.type) {
    case GET:
      // console.log("~~~~~~~~~~~~~~~~GETTING company IN REDUCER", action);
      return { ...state, selectedCompany: action.data};
    case CREATE: 
        console.log("Creating company in reducer: ", action.data.companyId);
        return {...state, company: action.data, companyId: action.data.companyId};
    case CREATE_ERROR:
        console.log("Error when creating company: ", action.err);
        return state
    case UPDATE:
        const companyIndex = state.companies.findIndex( company => company.id == action.data.id);
        const updatedCompany = new Company(
            action.data.id,
            action.data.companyId,
            action.data.categories,
            action.data.title,
            action.data.description,
            action.data.location,
            action.data.dates,
            action.data.pay
        );
        const updatedCompanies = [ ...state.companies ];
        updatedCompany[companyIndex] = updatedCompany;
        return {
          ...state,
          companies: updatedCompany,
        }
    case DELETE:
    console.log("Deleting in reducer: ", action.companyId);
      return { ...state, companies: state.companies.filter((company) => company.id !== action.companyId ) };
    case LOGIN:
        console.log(`LOGGED IN company:  ${action.data.companyId} /// ${action.data.companyId}`);
        return { ...state, company: action.data, companyId: action.data.companyId }
    case LOGOUT: 
        return { initialState }
  };
  return state;
}

export default companiesReducer;
