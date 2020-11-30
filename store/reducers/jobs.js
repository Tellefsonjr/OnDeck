import JOBS from '../../data/stubbed/dummy-jobs';
import { GET, CREATE, CREATE_ERROR, DELETE, UPDATE, APPLY, APPLY_ERROR, UNAPPLY, UNAPPLY_ERROR } from '../actions/jobs';
import Job from '../../data/models/Job';

const initialState = {
  // JOBS: [],
  // filteredJOBS: [],
  // orderedJOBS: [],
  
  jobs: JOBS,
  filteredJobs: JOBS,
  orderedJobs: JOBS
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET:
    //   return { ...state, filteredJOBS: state.JOBS.filter(
    //     return {(o) => action.jobIds.includes(o.id);}
    //   )};
    case CREATE:
      console.log("Creating company in reducer: ", action.data.companyId);
      return { ...state, jobs: state.jobs.push(action.data)};
    case CREATE_ERROR:
      console.log("Error when creating company: ", action.err);
      return state
    case UPDATE:
      const jobIndex = state.jobs.findIndex(job => job.id == action.data.id);
      const updatedJob = new Job(
        action.data.id,
        action.data.companyId,
        action.data.categories,
        action.data.title,
        action.data.description,
        action.data.location,
        action.data.dates,
        action.data.pay
      );
      const updatedJobs = [...state.jobs];
      updatedJOBS[jobIndex] = updatedJob;
      return {
        ...state,
        jobs: updatedJobs,
      }
    case APPLY: 
      console.log("Got to reducer, apply")
      return { ...state }
    case APPLY_ERROR:
      console.log("Error when applying for job, uid: ", action.uid, " jobID: ", action.job.id);
      return { ...state }
    case APPLY: 
      console.log("Got to reducer, removing application")
      return { ...state }
    case APPLY_ERROR:
      console.log("Error when removing application for job, uid: ", action.uid, " jobID: ", action.job.id);
      return { ...state }
    case DELETE:
      console.log("Deleting in reducer: ", action.jobId);
      return { ...state, jobs: state.jobs.filter((job) => job.id !== action.jobId) }
  };
  return state;
}

export default jobsReducer;
