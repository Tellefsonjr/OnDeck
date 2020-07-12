import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Chip } from 'react-native-paper';
import * as _ from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SearchBarComponent from '../components/SearchBarComponent';
import JobListItem from '../components/jobs/JobListItem';

import JOBS from '../data/stubbed/dummy-jobs';
import CATEGORIES from '../data/stubbed/dummy-job-categories';

export default function BrowseScreen(props) {
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ filteredJobs, setFilteredJobs ] = useState(JOBS);
  const [ selectedChips, setSelectedChips ] = useState([]);

  const handleJobPress = (job) => {
    props.navigation.navigate("JobDetailScreen", { id: job.id, title: job.title});
  };
  const handleChangeSearch = (query) => {
    console.log("QUERY CHANGED: ", query);
    setSearchQuery(query);
    filterJobs(query, selectedChips);
  };
  const handleChipPressed = (chipId) => {
    const newChips = selectedChips.includes(chipId)?
      _.without(selectedChips, chipId) : [...selectedChips, chipId];
    setSelectedChips( newChips );
    filterJobs(searchQuery, newChips);
  };
  const filterJobs = (query, categories) => {
    // There has GOT to be a better way to filter, TO DO: revisit this ungly code.
    var newJobs = JOBS;
    console.log("Search Count: ", _.filter(JOBS, function(j) { _.includes(j.title, query)}).length);
    console.log("Category Matched: ", _.filter(JOBS, function(j){ _.includes(j.categories.some((e) => categories.includes(e)))}));
    if( query == '' && categories.length == 0 ){
      console.log("First");
      newJobs = JOBS;
    } else if ( query != '' && categories.length == 0 ) {
      console.log("Second");
      newJobs = _.filter(JOBS, function(item){
        return item.title.indexOf(query) > -1;
      })
    } else if ( query == '' && categories.length > 0 ) {
      console.log("THIRD");
      newJobs = _.filter(newJobs, function(item){
        return item.categories.some((e) => categories.includes(e))
      });
    } else if ( query != '' && categories.length > 0 ) {
      console.log("FOURTH");
      newJobs = _.filter(newJobs, function(item){
        return( _.includes(item.title, query) && item.categories.some((e) => categories.includes(e)));
      })
    };
    console.log("FILTERS:::: ", query, query == '', categories.length == 0, categories);
    setFilteredJobs( newJobs );
  };
  const renderJobsList = () => {
    return( filteredJobs.map( (job, i) => {
      return(
        <View key={i}>
          <JobListItem job={job} onPress={ handleJobPress } />
        </View>
      )
    }));
  };
  const renderCategoryChips = () => {
    return(CATEGORIES.map((chip, i) => {
        return(<Chip key={"chip"+i} icon={chip.icon} onPress={() => { handleChipPressed(chip.id)}} mode="outlined" selected={ selectedChips.includes(chip.id)}> {chip.title} </Chip>)
    }))
  };
  return (
    <View style={styles.container}>
      <SearchBarComponent handleChangeSearch={ handleChangeSearch } />
      <View style={{ height: 30, marginVertical: 5}}>
      <ScrollView contentContainerStyle={{  }} horizontal={true}>
        { renderCategoryChips() }
      </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ borderColor: 'red', borderWidth: 1}}>
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
});
