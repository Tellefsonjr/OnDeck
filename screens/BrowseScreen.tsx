import * as React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import JobListItem from '../components/jobs/JobListItem';

import JOBS from '../data/stubbed/dummy-jobs';

export default function BrowseScreen(props) {
  const handleJobPress = (job) => {
    props.navigation.navigate("JobDetailScreen", { id: job.id, title: job.title});
  };
  const renderJobsList = () => {
    return( JOBS.map( (job, i) => {
      return(
        <View key={i}>
          <JobListItem job={job} onPress={ handleJobPress } />
        </View>
      )
    }));
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{  }}>
        { renderJobsList() }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
