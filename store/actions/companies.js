export const GET = 'GET_COMPANIES';
export const ADD = 'ADD_COMPANY';
export const UPDATE = 'UPDATE_COMPANY';
export const DELETE = 'DELETE_COMPANY';

export const getCompanies = companyIds => {
  return { type: GET, data: companyIds }
};

export const addCompany = company => {
  return { type: ADD, data: company }
};
export const updateCompany = company => {
  return { type: UPDATE, data: company }
};
export const deleteCompany = companyId => {
  return { type: DELETE, data: companyId }
};
