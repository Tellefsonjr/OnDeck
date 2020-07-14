import * as React from 'react';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Surface, TouchableRipple, Provider, Portal } from 'react-native-paper';
import Colors from '../constants/Colors.ts';
import { Text, View, } from '../components/Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as _ from 'lodash';

import JOBS from '../data/stubbed/dummy-jobs';
import COMPANIES from '../data/stubbed/dummy-companies';
import CATEGORIES from '../data/stubbed/dummy-job-categories';

import Agenda from '../components/Agenda';
import JobCard from '../components/jobs/JobCard';


export default function HomeScreen(props) {
  const [jobModalVisible, setJobModalVisible] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const dateToday = new Date();

  const showJobModal = (jobId) => {
    setJobModalVisible(true);
    setSelectedJob(_.find(JOBS, { id: jobId }));
    console.log("TOGGLED JOB MODAL", jobModalVisible, selectedJob);
  }

  function renderJobCards(){
    return(JOBS.map((job, index) =>
      <View key={index} style={{ backgroundColor: 'rgba(0,0,0,0)',}}>
        <JobCard job={job} company={ _.find(COMPANIES, { id: job.companyId }) } onPress={ handleJobPress }/>
      </View>
    ))
  };

  const handleDayPressed = (day) => {
    const date = day;
    console.log("DAY PRESSED ON HOME: ", date);
  };
  const handleJobPress = (job) => {
    console.log("PRESSED: ", job.id);
    props.navigation.navigate("JobDetailScreen", { id: job.id, title: job.title});
  };
  return (
    <ImageBackground style={styles.container} source={require('../assets/images/bg.jpg')}>
      <View style={{ height: 115}}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)', padding: 5, height: 10}}>
          <Agenda onDayPress={ handleDayPressed} hideKnob={true}/>
        </View>
      </View>

      <View style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
          <Title style={{ fontWeight: 'bold', width: '100%', color: Colors.textLight, fontSize: 22, borderBottomWidth: 1, borderBottomColor: Colors.textLight, paddingHorizontal: 10,marginVertical: 10}}> Featured companies: </Title>
          <ScrollView style={ styles.scrollViewStyle } containerContainerStyle={ styles.cardContentContainer } horizontal={true}>
            {
              renderJobCards()
            }
          </ScrollView>
      </View>
      <View style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
        <Title style={{ fontWeight: 'bold', width: '100%', color: Colors.textLight, fontSize: 22, borderBottomWidth: 1, borderBottomColor: Colors.textLight, paddingHorizontal: 10,marginVertical: 10}}> Recommended for you: </Title>
        <ScrollView style={ styles.scrollViewStyle } containerContainerStyle={ styles.cardContentContainer } horizontal={true}>
        {
          renderJobCards()
        }
        </ScrollView>
      </View>
      { selectedJob && selectedJob!=null?
            <JobDetailModal job={selectedJob} visible={jobModalVisible} dismissModal={() => setJobModalVisible(false)}/>
        :
        null

      }
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'

  },
  scrollViewStyle: {
    backgroundColor: 'rgba(0,0,0,0)',

  },
  cardContentContainer: {
    width: '100%',
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-around'
  },
  separator: {
   width: 5,
   backgroundColor: 'rgba(0,0,0,0.5)'
  },
  surface: {
    width: '40%',
    height: 40,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
