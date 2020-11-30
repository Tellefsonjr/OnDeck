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
import JobList from "../components/jobs/JobList";



const CompanyHomeScreen = ( props: any) => {
  // console.log("PROPS on COMPANY HOME SCREEN : ", props.navigation);
  // console.log("~COMPANY ID~", props.companyId);
  const [ showJobForm, setShowJobForm ] = useState(false);

  const handleDayPressed = (day) => {
    const date = day;
    console.log("DAY PRESSED ON HOME: ", date);
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
            <JobList companyRefId={props.profile.companyRefId} navigation={props.navigation} />
          </View>


      </View>

      { showJobForm ? (

            <Modal 
              visible={showJobForm}
              onDismiss={() => setShowJobForm(false)}
              contentContainerStyle={{ flex: 1, padding: 20 }}
            >
              <JobForm companyRefId={props.profile.companyRefId} onDismiss={() => setShowJobForm(false) }/>
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
  
});

const mapStateToProps = (state:any) => {
  const auth = state.firebase.auth;
  // console.log("state.auth", auth);
  return({
    auth: auth,
    profile: state.firebase.profile,
  })
};
// TO DO --- Put firestoreConnect only in subComponent, must be rendered only if auth.uid!
export default compose(
  connect(mapStateToProps),
)(CompanyHomeScreen)
