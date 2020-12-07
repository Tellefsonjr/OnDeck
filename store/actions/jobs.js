export const GET = 'GET_JOBS';
export const CREATE = 'CREATE';
export const CREATE_ERROR = 'CREATE_ERROR';
export const UPDATE = 'UPDATE_JOB';
export const APPLY = 'APPLY';
export const APPLY_ERROR = 'APPLY_ERROR';
export const UNAPPLY = 'UNAPPLY';
export const UNAPPLY_ERROR = 'UNAPPLY_ERROR';
export const APPROVE = 'APPROVE';
export const APPROVE_ERROR = 'APPROVE_ERROR';
export const DECLINE = 'DECLINE';
export const DECLINE_ERROR = 'DECLINE_ERROR';
export const DELETE = 'DELETE_JOB';
import * as _ from 'lodash';


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

export const apply = (job, uid) => {
  console.log("Job Action: ", job.id, uid);
  let updatedJob = job;
  console.log("Applicants before::: ", updatedJob.applicants);
  let newApplicants = [...updatedJob.applicants, uid];
  console.log("NEW APPLICANTS: ", newApplicants);
  updatedJob = {
    ...updatedJob,
    applicants: [ ...updatedJob.applicants, uid ],
  };
  console.log(" APPLY ACTION, UPDATED JOB: ", updatedJob.applicants);
  return(dispatch, getState, {getFirestore, }) => {
    const firestore = getFirestore();
    firestore.collection('jobs').doc(job.id).set(
      updatedJob
      ).then(() => {
          dispatch({ type: "APPLY", job: job, uid: uid });
        }).catch((err) => {
            dispatch({ type: "APPLY_ERROR", err});
        })
}
};
export const unApply = (job, uid) => {
  console.log("Job UNAPPLY Action: ", job.id, uid);
  let updatedJob = job;
  console.log("Applicants before::: ", updatedJob.applicants);
  updatedJob = {
    ...updatedJob,
    applicants: _.without(updatedJob.applicants, uid),
  };
  console.log(" APPLY ACTION, UPDATED JOB: ", updatedJob.applicants);
  return(dispatch, getState, {getFirestore, }) => {
    const firestore = getFirestore();
    firestore.collection('jobs').doc(job.id).set(
      updatedJob
      ).then(() => {
          dispatch({ type: "UNAPPLY", job: job, uid: uid });
        }).catch((err) => {
            dispatch({ type: "UNAPPLY_ERROR", err});
        })
}
};

export const approve = (job, uid) => {
  console.log("Job Approve Action: ", job.id, uid);
  let updatedJob = job;
  console.log("Applicants before::: ", updatedJob.applicants);
  updatedJob = {
    ...updatedJob,
    applicants: _.without( updatedJob.applicants, uid ),
    isFilled: true,
    approvedApplicant: uid,
  };
  console.log(" Approve ACTION, UPDATED JOB: ", updatedJob.applicants);
  return(dispatch, getState, {getFirestore, }) => {
    const firestore = getFirestore();
    firestore.collection('jobs').doc(job.id).set(
      updatedJob
      ).then(() => {
          dispatch({ type: "APPROVE", job: job, uid: uid });
        }).catch((err) => {
            dispatch({ type: "APPROVE_ERROR", err});
        })
}
};

export const deleteJob = JobId => {
  return { type: DELETE, data: JobId }
};
