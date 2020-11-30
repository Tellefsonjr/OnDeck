import * as React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Button, Modal } from "react-native-paper";
import * as _ from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { useSelector, useDispatch, connect as connectRedux } from "react-redux";

import EditScreenInfo from "../components/EditScreenInfo";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { useState } from "react";

import * as jobActions from "../store/actions/jobs.js";
import ApplicantContainer from "../components/jobs/ApplicantContainer";

const JobDetailScreen = (props) => {
  // console.log("JOB Detail: ", props.job.id);
  const job = props.job;
  // Applicant Controls:
  const [isApplying, setIsApplying] = useState(false);
  const hasApplied = _.includes(props.job.applicants, props.auth.uid);

  //Owner of Job Controls:
  const isOwner = props.job.createdBy == props.auth.uid || _.includes(props.job.editableBy, props.auth.uid);
  const [ applicantContainer, setApplicantContainer ] = useState(false);

  const apply = () => {
    console.log("props.job.id: ", props.job.id);
    console.log("props.state.auth.uid: ", props.auth.uid);
    // console.log("JOB ACTION: ", props.apply);
    setIsApplying(true);
    props.apply(props.job, props.auth.uid);
    setIsApplying(false);
  };
  const unApply = () => {
    console.log("props.job.id: ", props.job.id);
    console.log("props.state.auth.uid: ", props.auth.uid);
    // console.log("JOB ACTION: ", props.apply);
    setIsApplying(true);
    props.unApply(props.job, props.auth.uid);
    setIsApplying(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> {props.company.name} </Text>
        <View style={styles.horizontalList}>
          <Text style={styles.subTitle}> {job.title} </Text>
          <Text style={styles.subTitle}> Time info </Text>
          <Text style={styles.subTitle}>
            {" "}
            {job.pay.amount}/{job.pay.rate == "hourly" ? "hr" : job.pay.rate}{" "}
          </Text>
        </View>
        <View style={styles.horizontalList}>
          <MaterialCommunityIcons name="star" size={20} />
          <MaterialCommunityIcons name="star" size={20} />
          <MaterialCommunityIcons name="star" size={20} />
          <MaterialCommunityIcons name="star" size={20} />
          <MaterialCommunityIcons name="star-outline" size={20} />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          marginTop: 5,
          marginBottom: 20,
        }}
      >
        <Video
          source={{
            uri:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          useNativeControls={true}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.title}> Description: </Text>
        <Text> {job.description} </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 10,
        }}
      >
        { isOwner ? 
        <Button
        icon="account-group"
        mode="contained"
        onPress={() => setApplicantContainer(true) }
      >
        View Applicants
      </Button>
        :
        <Button
        icon={hasApplied ? "account-minus" : "account-check"}
        loading={isApplying}
        mode="contained"
        onPress={() => {
          hasApplied ? unApply() : apply();
        }}
      >
        {hasApplied ? "Cancel" : "Apply"}
      </Button>
        }

      </View>
        {
          applicantContainer ? 
          <Modal visible={applicantContainer} onDismiss={ () => setApplicantContainer(false)} contentContainerStyle={{ height: '60%'}}>
            <ApplicantContainer job={job} />
          </Modal>
          : 
          null
        }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  headerContainer: {
    alignItems: "center",
    padding: 10,
  },
  horizontalList: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 2,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "normal",
    color: "rgba(97,97,97,1)",
  },
  descriptionContainer: {
    flex: 1,
    marginTop: 10,
    padding: 10,
  },
});

const mapStateToProps = (state: any, ownProps: any) => {
  // console.log("ownProps::: ", ownProps.route.params.id);
  let auth = state.firebase.auth;
  let job = auth.isLoaded
    ? _.find(state.firestore.ordered.jobs, { id: ownProps.route.params.id })
    : [];
  // console.log("JOB::::: ", job);
  // console.log("COMPANIES ===> ", _.get(state.firestore.ordered.companies, {id: job.companyId }));
  let company = auth.isLoaded
    ? _.find(state.firestore.ordered.companies, { id: job.companyId })
    : null;
  // console.log("Company: ", company.id);
  let companyId = company ? company.id : null;
  // console.log("Company ID: ", companyId);
  return {
    auth: auth,
    company: company,
    companyId: companyId,
    job: job,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    apply: (job, userId) => dispatch(jobActions.apply(job, userId)),
    unApply: (job, userId) => dispatch(jobActions.unApply(job, userId)),
  };
};

export default compose(
  connectRedux(mapStateToProps, mapDispatchToProps),
  firestoreConnect((state) => {
    return state.auth.isLoaded && state.auth.uid ? ["jobs", "companies"] : [];
  })
)(JobDetailScreen);
