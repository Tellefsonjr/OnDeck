import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Surface,
  Provider,
  Portal,
  Modal,
} from "react-native-paper";
import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as _ from "lodash";
import { connect } from 'react-redux';
import CustomHeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import JobForm from '../components/jobs/JobForm';
import Agenda from "../components/Agenda";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import JobListItem from "../components/jobs/JobListItem";


const CompanyHomeScreen = ( props: any) => {
  // console.log("PROPS on COMPANY HOME SCREEN : ", props.jobs);
  console.log("~COMPANY ID~", props.companyId);
  const [ showJobForm, setShowJobForm ] = useState(false);

  const handleDayPressed = (day) => {
    const date = day;
    console.log("DAY PRESSED ON HOME: ", date);
  };
  const renderJobsList = () => {
    return props.jobs.map((job, i) => {
      return (
        <View key={i} style={{ flex: 1, }}>
          <JobListItem
            job={job}
            company={ props.company }
            onPress={handleJobPress}
          />
        </View>
      );
    });
  };
  const handleJobPress = (job) => {
    console.log("PRESSED: ", job.id);
    props.navigation.navigate("JobDetailScreen", {
      id: job.id,
      title: job.title,
    });
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/bg.jpg")}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            height: 115,
            backgroundColor: "rgba(0,0,0,0)",
            padding: 5,
            height: 10,
          }}
        >
          <Agenda onDayPress={handleDayPressed} hideKnob={true} />
        </View>
      </View>

      <View style={ styles.jobsContainer }>
          <View style={ styles.jobsHeader }>
            <Title> My Jobs </Title>
            <Button onPress={ () => setShowJobForm(true) }>+ Add</Button>
          </View>
          <View style={ styles.jobsListContainer }>
          <ScrollView
          style={styles.scrollViewStyle}
          contentContainerStyle={styles.cardContentContainer}
        >
          {renderJobsList()}
        </ScrollView> 
          </View>


      </View>

      { showJobForm ? (

            <Modal 
              visible={showJobForm}
              onDismiss={() => setShowJobForm(false)}
              contentContainerStyle={{ flex: 1, padding: 20 }}
            >
              <JobForm companyId={props.companyId} onDismiss={() => setShowJobForm(false) }/>
            </Modal>

          ) : null }
    </ImageBackground>
  );
};

CompanyHomeScreen.navigationOptions = navData => {
  return {
    headerTitle: "Home",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName="menu" onPress={ () => { navData.navigation.openDrawer()}} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  jobsContainer: {
    flex: 3.5,
    
  },
  jobsHeader: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobsListContainer: {
    flex: 1, 
  },
  scrollViewStyle: {
    flex: 1,
  },
  cardContentContainer: {
    flex: 1,
    width: "100%",
    flexDirection: 'column',
    marginHorizontal: 10,
    paddingHorizontal: 15,
    justifyContent: "space-around",
    backgroundColor: "transparent",
  },
});

const mapStateToProps = (state:any) => {
  return({
    jobs: _.filter(state.firestore.ordered.jobs, { companyId: state.firebase.profile.companyId}),
    company: _.get(state.firestore.data.companies, state.firebase.profile.companyId ),
    companyId: state.firebase.profile.companyId,
  })
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(() => ['jobs', 'companies'])
)(CompanyHomeScreen)
