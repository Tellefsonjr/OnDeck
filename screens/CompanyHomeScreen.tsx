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
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import JobForm from '../components/jobs/JobForm';
import Agenda from "../components/Agenda";


export default function CompanyHomeScreen(props: any) {
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
            <Button onPress={ () => setShowJobForm(!showJobForm) }>+ Add</Button>
          </View>
          <View style={ styles.jobsListContainer }>
            <ScrollView 
            >
              <View style={{ flex: 1, height: 100, width: 200}}>
                <Title>Job</Title> 
              </View>   
              <View style={{ flex: 1, height: 100, width: 200}}>
                <Title>Job</Title> 
              </View> 
              <View style={{ flex: 1, height: 100, width: 200}}>
                <Title>Job</Title> 
              </View> 
              <View style={{ flex: 1, height: 100, width: 200}}>
                <Title>Job</Title> 
              </View> 
              <View style={{ flex: 1, height: 100, width: 200}}>
                <Title>Job</Title> 
              </View> 
              <View style={{ flex: 1, height: 100, width: 200}}>
                <Title>Job</Title> 
              </View> 
            </ScrollView>
          </View>


      </View>

      { showJobForm ? (

            <Modal 
              visible={showJobForm}
              onDismiss={() => setShowJobForm(!showJobForm)}
            >
              <JobForm />
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
  }
});
