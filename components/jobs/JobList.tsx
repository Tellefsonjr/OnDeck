import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import JobListItem from './JobListItem';

const JobList = (props: any) => {
    const renderJobsList = () => {
        let jobs = _.concat(props.jobs, props.jobs, props.jobs);
       return jobs.map((job, i) => {
            let company = _.find(props.companies, { id: job.companyId });
            // console.log("company: ", company.id);
          return (
              <JobListItem
                 key={i} 
                job={job}
                company={ company }
                onPress={handleJobPress}
                userType={props.profile.type}
              />
          );
        })
      };
      const handleJobPress = (job) => {
        console.log("PRESSED: ", job.id);
        props.navigation.navigate("JobDetailScreen", {
          id: job.id,
          title: job.title,
        });
      };
        return (
            <View style={{ flex: 1,}}>
                <ScrollView
                    style={styles.scrollViewStyle}
                    contentContainerStyle={styles.jobContentContainer}
                >
                    { props.jobs && props.companies ? renderJobsList() : <Text>
                        { props.companyRefId ? "Looks like you haven't made any jobs yet, hit Add to start listing your jobs!" : "No jobs available, please come back later!"}
                    </Text> }
                </ScrollView>
            </View>
        )
};

const styles = StyleSheet.create({
    scrollViewStyle: {
        flex: 1,
      },
      jobContentContainer: {
        width: "100%",
        flexDirection: 'column',
        // marginHorizontal: 10,
        paddingHorizontal: 10,
        justifyContent: "space-around",
        backgroundColor: "transparent",
      },
});

const mapStateToProps = (state:any, ownProps) => {
    let auth = state.firebase.auth;
    let profile = state.firebase.profile;
    let company = ownProps.companyRefId && auth.isLoaded && state.firestore.ordered.companies ? _.find(state.firestore.ordered.companies, { refId: ownProps.companyRefId }) : null;
    // console.log("OwnProps::: ", ownProps.companyRefId ? ownProps.companyRefId : "no company provided");
    // console.log("COMPANY: ", company);
    // console.log("Company: ", company ? true : false);
    // console.log("NAVIGATION~~~~~~~~~~~~~~~: ", ownProps.navigation)
    // console.log("State jobs: ", ownProps.companyRefId ? state.firestore.ordered.jobs.length : "no jobs provided");
    let jobs = auth.isLoaded ? company ? _.filter(state.firestore.ordered.jobs, { companyId: company.id}) : state.firestore.ordered.jobs : [];
    // console.log("Jobs length: ", jobs ? jobs.length : "No jobs!?");
    let companies = auth.isLoaded ? state.firestore.ordered.companies : [];
    console.log("AUTH UID: ", auth.uid);

    //Labourer filters on JobList props
    if(profile.type == "Labourer" && ownProps.approved == false){
      jobs = _.reject(jobs, {approvedApplicant: auth.uid})
    }
    if(profile.type == "Labourer" && ownProps.applied == false){
      console.log("JOBS BEFORE: ", jobs);
      jobs = _.reject(jobs, (job) => 
        job.applicants.includes(auth.uid)
        )
    }


    // console.log("STATE FIRESTORE: ", state.firestore);
    // console.log("JobList, Auth.uid: ", auth.uid);
    return({
      auth: auth,
      profile: profile,
      companies: companies,
      jobs: jobs,
    })
  };

  export default compose(
    connect(mapStateToProps),
    firestoreConnect((state) => {
        return state.auth.isLoaded && state.auth.uid ? ['jobs', 'companies'] : []
    }),
  )(JobList)
