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
import Animated, { interpolate } from 'react-native-reanimated';
import {usePanGestureHandler, withSpring, useTransition } from  "react-native-redash/lib/module/v1";
export interface Props {
    key: string;
    job?: object;
  }
const {height, width} = Dimensions.get('window');

const ApplicantContainer = (props) => {
    const [ applicants, setApplicants ] = useState(props.applicants);
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ currentApplicant, setCurrentApplicant ] = useState(applicants ? applicants[currentIndex] : null);
    const aIndex = useTransition(currentIndex);
    const declineApplicant = (applicant) => {
      console.log("Declining Applicant: ", applicant.id );
      props.decline(props.job, applicant.id);
      setApplicants(_.without(applicants, applicant));
      setCurrentIndex(currentIndex + 1);
      setCurrentApplicant(applicants[currentIndex+1]);
    };
    const skipApplicant = () => {
      let nextIndex = currentIndex + 1;
      if( nextIndex > applicants.length - 1){
        setCurrentIndex(0);
        setCurrentApplicant(applicants[0]);
      } else {
        setCurrentIndex(currentIndex + 1);
        setCurrentApplicant(applicants[currentIndex+1])
      }

      // console.log("Applicantant. id:", applicant.id);
      // let updatedApplicants = _.without(applicants, applicant);
      // setApplicants( _.concat( updatedApplicants, applicant));
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

    const renderApplicant = () => {
      if(currentApplicant){
        return (
          <ApplicantCardItem key={currentApplicant.id} user={currentApplicant}
          decline={ declineApplicant }
          skip={ skipApplicant }
          approve={ approveApplicant }
          />
        )
      } else {
        return null
      }
    }


    return (
    <View style={styles.container}>
      <View style={ styles.applicantContainer }>
        { applicants ?
          renderApplicant()
          :
          null
        }
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
