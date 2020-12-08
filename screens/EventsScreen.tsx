import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import Agenda from '../components/shared/Agenda';

const EventsScreen = (props) => {
  // console.log("props.jobs: ", props.jobs);
  const handleDayPressed = (day: String) => {
    console.log("EventsScreen pressed: ", day);
  };
  return (
    <View style={styles.container}>
      <Agenda onDayPress={handleDayPressed} hideKnob={true} jobs={props.jobs} companies={props.companies} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state:any, ownProps:any) => {
  let auth = state.firebase.auth;
  let profile = state.firebase.profile;
  let jobs = _.filter(state.firestore.ordered.jobs, {approvedApplicant: {id: auth.uid}})
  let companies = _.filter(state.firestore.ordered.companies, (company) => {
      return (jobs.every((job) => 
        job.companyId == company.id
        ))
  });
  console.log("Companies on eventsscreen: ", companies);
  // .filter(users, (user) => 
  //     ownProps.job.applicants.every((userId) => userId == user.id))
  return({
    auth: auth,
    profile: profile,
    jobs: jobs,
    companies: companies,
  })
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((state) => {
      return state.auth.isLoaded && state.auth.uid ? ['jobs', 'companies'] : []
  }),
)(EventsScreen)