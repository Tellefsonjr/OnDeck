import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { useSelector } from 'react-redux'
import { firestoreConnect, useFirebase, } from "react-redux-firebase";
import { compose } from "redux";
import _ from "lodash";

export interface Props {
    key: string;
    job?: object;
  }

const ApplicantContainer = (props) => {
    console.log("APPLICANT USERS: ", props.applicants);
    return (
    <View style={styles.container}>
        <Text>{ props.applicants == null ? "No applicants here" : props.applicants.length} </Text>
    </View>
    );
}


const mapStateToProps = (state: any, ownProps: any) => {
    // console.log("ownProps::: ", ownProps.route.params.id);
    let applicants = _.reject(ownProps.job.applicants, (userId) => _.find(state.firestore.data.users, { id: userId} ));

    console.log("APPLICANT CONTAINER APPLICANTS: ", applicants);
    return {
        auth: state.firebase.auth,
      applicants: applicants
    };
  };


const mapDispatchToProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
    firestoreConnect((state, ownProps ) => {
        return (
            state.auth.isLoaded ? ['users'] : []
        )
    })
  )(ApplicantContainer);
