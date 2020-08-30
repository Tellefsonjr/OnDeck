export const GET = 'GET_JOBS';
export const ADD = 'ADD_JOB';
export const UPDATE = 'UPDATE_JOB';
export const DELETE = 'DELETE_JOB';

export const getJobs = JobIds => {
  return { type: GET, data: JobIds }
};

export const addJob = Job => {
  return { type: ADD, data: Job }
};
export const updateJob = Job => {
  return { type: UPDATE, data: Job }
};
export const deleteJob = JobId => {
  return { type: DELETE, data: JobId }
};
