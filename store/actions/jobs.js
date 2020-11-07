export const GET = 'GET_JOBS';
export const CREATE = 'CREATE';
export const CREATE_ERROR = 'CREATE_ERROR';
export const UPDATE = 'UPDATE_JOB';
export const DELETE = 'DELETE_JOB';

export const getJobs = JobIds => {
  return { type: GET, data: JobIds }
};

export const create = (payload) => {
  let job = payload;
  job.createdTime = new Date();
  return(dispatch, getState, {getFirestore, }) => {
      const firestore = getFirestore();
      firestore.collection('jobs').add(
              job
          ).then(() => {
              dispatch({ type: "CREATE", data: payload});
          }).catch((err) => {
              dispatch({ type: "CREATE_ERROR", err});
          })
  }
};
export const updateJob = Job => {
  return { type: UPDATE, data: Job }
};
export const deleteJob = JobId => {
  return { type: DELETE, data: JobId }
};
