import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Chip, IconButton } from 'react-native-paper';
import * as _ from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import JobListItem from '../components/jobs/JobListItem';

import CATEGORIES from '../data/stubbed/dummy-job-categories';

export default function SosScreen(props) {
  const dispatch = useDispatch();
  const JOBS = useSelector(state => state.jobs.jobs);
  const COMPANIES = useSelector(state => state.companies.companies);

  const [ jobs, setJobs ] = useState(JOBS);
  // TO DO: Set filters as object, later to be pulled from Redux using user's preferred filters.


  const handleJobPress = (job: { id: any; title: any; }) => {
    props.navigation.navigate("JobDetailScreen", { id: job.id, title: job.title});
  };

  const renderJobsList = () => {
    return( jobs.map( (job, i) => {
      return(
        <View key={i}>
          <JobListItem job={job} company={ _.find(COMPANIES, { id: job.companyId }) } onPress={ handleJobPress } />
        </View>
      )
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ }}>
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
  horizontalList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
