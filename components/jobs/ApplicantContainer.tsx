import React, { Component, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { useSelector } from 'react-redux'
import { firestoreConnect, useFirebase, } from "react-redux-firebase";
import { compose } from "redux";
import _ from "lodash";
import ApplicantCardItem from "./ApplicantCardItem";
import { IconButton } from "react-native-paper";
import * as jobActions from '../../store/actions/jobs';

export interface Props {
    key: string;
    job?: object;
  }
const {height, width} = Dimensions.get('window');

const ApplicantContainer = (props) => {
    const [ applicants, setApplicants ] = useState(props.applicants);
    const declineApplicant = (applicant) => {
      console.log("Declining Applicant: ", applicant.id );
      props.decline(props.job, applicant.id);
      setApplicants(_.without(applicants, applicant)
      )
    };
    const skipApplicant = (applicant) => {
      console.log("Skipping Applicant: ", applicant.id );
      // let declinedIndex = _.indexOf(props.applicants, applicant.id);
      let updatedApplicants = applicants;
      updatedApplicants = _.without(updatedApplicants, applicant);
      console.log("YOOOOO: ", updatedApplicants);
      setApplicants( _.concat( updatedApplicants, applicant));
      console.log("AFter: ", applicants);
      
    };
    const approveApplicant = (applicant) => {
      console.log("Approving Applicant: ", applicant.id );
      console.log("APPROVING JOB: ", props.job.id);
      const approvedApplicant = {
        id: applicant.id,
        avatar: applicant.profile.avatar,
      }
      props.approveJob(props.job, approvedApplicant)
      props.onApprove();
    };
    return (
    <View style={styles.container}>
      <View style={ styles.applicantContainer }>
      { applicants.map((applicant, index) => {
          return ( 
            <ApplicantCardItem key={index} user={applicant} index={-index}
              decline={ declineApplicant }
              skip={ skipApplicant }
              approve={ approveApplicant }
            /> 
          )
        })}
      </View>

    </View>
    );
}


const mapStateToProps = (state: any, ownProps: any) => {
    // console.log("ownProps::: ", ownProps.route.params.id);
    // console.log("APPLICANT CONTAINER USER: ", state.firestore.ordered.users);
    // let applicants = _.reject(state.firestore.ordered.users, (userId) => _.find(ownProps.job.applicants, userId ));
    // console.log("State", state.firebase.auth.isLoaded, "users: ", state.firestore.ordered);
    let users = state.firestore.ordered.users;
    let applicants = [];
    if( ownProps.job.applicants.length){
      applicants = users != undefined? _.reject(users, (user) => 
      ownProps.job.applicants.every((userId) => userId != user.id)) : [];
    }

    console.log("APPLICANT CONTAINER APPLICANTS: ", ownProps.job.applicants.length, applicants.length);
    return {
      auth: state.firebase.auth,
      applicants: applicants
    };
  };


const mapDispatchToProps = (dispatch) => {
  return {
    decline: (job, userId) => dispatch(jobActions.decline(job, userId)),
    approveJob: (job, userId) => dispatch(jobActions.approve(job, userId)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  applicantContainer: {
    height: '100%',
  },

});
// const firestoreQuery = (state, ownProps) => {
//     return (state.auth.isLoaded && state.auth.uid ? 
//     [{ 
//         collection: 'users', 
//         where: [`documentId`, `in`, ownProps.job.applicants],
//         storeAs: "pendingApplicants"
//       }] : [])
// }
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    //TO DO: Select only users from job.applicants list of IDs
    // firestoreConnect((state, ownProps ) => {
    //         console.log("ownProps.job.applicants", ownProps.job.applicants);
    //         return (
    //         [{ 
    //             collection: 'users', 
    //             where: ['id', `in`, ownProps.job.applicants],
    //             storeAs: "pendingApplicants"
    //           }])
    //     }),
    //     connect(({ firestore: { ordered } }) => ({
    //         pendingApplicants: ordered.pendingApplicants // an array list of registrations
    //       }))
    firestoreConnect((state) => {
        return (
            state.auth.isLoaded ? ['users'] : []
            // ['users']
        )
    })
  )(ApplicantContainer);
