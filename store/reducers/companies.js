import COMPANIES from '../../data/stubbed/dummy-companies';
import { GET, ADD, DELETE, UPDATE, } from '../actions/companies';
import Company from '../../data/models/Company';

const initialState = {
  // Companies: [],
  // filteredCompanies: [],
  // orderedCompanies: [],
  companies: COMPANIES,
  filteredCompanies: COMPANIES,
  orderedCompanies: COMPANIES
};

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET:
    //   return { ...state, filteredCompanies: state.Companies.filter(
    //     return {(o) => action.jobIds.includes(o.id);}
    //   )};
    case ADD:
      const newCompany = new Company(
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
        const companyIndex = state.companies.findIndex( company => company.id == action.data.id);
        const updatedCompany = new Company(
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
        const updatedCompanies = [ ...state.companies ];
        updatedCompanies[companyIndex] = updatedCompany;
        return {
          ...state,
          companies: updatedCompanies,
        }
    case DELETE:
    console.log("Deleting in reducer: ", action.companyId);
      return { ...state, companies: state.companies.filter((company) => company.id !== action.companyId ) }
  };
  return state;
}

export default companiesReducer;
