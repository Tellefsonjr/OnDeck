import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Chip, IconButton } from 'react-native-paper';
import * as _ from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SearchBarComponent from '../components/SearchBarComponent';
import JobListItem from '../components/jobs/JobListItem';
import JobFilterModal from '../components/jobs/JobFilterModal';

import JOBS from '../data/stubbed/dummy-jobs';
import COMPANIES from '../data/stubbed/dummy-companies';
import CATEGORIES from '../data/stubbed/dummy-job-categories';

export default function BrowseScreen(props) {
  const [ filteredJobs, setFilteredJobs ] = useState(JOBS);
  // TO DO: Set filters as object, later to be pulled from Redux using user's preferred filters.
  const [ filters, setFilters ] = useState({
    search: '',
    categories: [],
    location: '',
    radius: '',
    pay: 0,
    payRate: 'hr',
  });
  const [ filterModalVisible, setFilterModalVisible ] = useState(false);

  const handleJobPress = (job) => {
    props.navigation.navigate("JobDetailScreen", { id: job.id, title: job.title});
  };
  const handleChangeSearch = ( query ) => {
    console.log("QUERY CHANGED: ", query);
    const newFilters = {
      search: query,
      categories: filters.categories,
      location: filters.location,
    }
    setFilters(newFilters);
    filterJobs(newFilters);
  };
  const handleCategoryPressed = (categoryId) => {
    const newCategories = filters.categories.includes(categoryId)?
      _.without(filters.categories, categoryId) : [...filters.categories, categoryId];
    const newFilters = {
      search: filters.search,
      categories: newCategories,
    };
    setFilters( newFilters );
    filterJobs( newFilters );
  };
  const filterJobs = ( filters ) => {
    // There has GOT to be a better way to filter, TO DO: revisit this ungly code.
    var newJobs = JOBS;
    console.log("Search Count: ", _.filter(JOBS, function(j) { _.includes(j.title, filters.search)}).length);
    console.log("Category Matched: ", _.filter(JOBS, function(j){ _.includes(j.categories.some((e) => filters.categories.includes(e)))}));
    if( filters.search == '' && filters.categories.length == 0 ){
      console.log("First");
      newJobs = JOBS;
    } else if ( filters.search != '' && filters.categories.length == 0 ) {
      console.log("Second");
      newJobs = _.filter(JOBS, function(item){
        return item.title.indexOf(filters.search) > -1;
      })
    } else if ( filters.search == '' &&filters.categories.length > 0 ) {
      console.log("THIRD");
      newJobs = _.filter(newJobs, function(item){
        return item.categories.some((e) => filters.categories.includes(e))
      });
    } else if ( filters.search != '' && filters.categories.length > 0 ) {
      console.log("FOURTH");
      newJobs = _.filter(newJobs, function(item){
        return( _.includes(item.title, filters.search) && item.categories.some((e) => filters.categories.includes(e)));
      })
    };
    console.log("FILTERS:::: ", filters.search, filters.search == '', filters.categories.length == 0, filters.categories);
    setFilteredJobs( newJobs );
  };
  const renderJobsList = () => {
    return( filteredJobs.map( (job, i) => {
      return(
        <View key={i}>
          <JobListItem job={job} company={ _.find(COMPANIES, { id: job.companyId }) } onPress={ handleJobPress } />
        </View>
      )
    }));
  };
  const renderCategoryChips = () => {
    return(CATEGORIES.map((category, i) => {
        return(<Chip key={"category"+i} icon={category.icon} onPress={() => { handleCategoryPressed(category.id)}} mode="outlined" selected={ filters.categories.includes(category.id)}> {category.title} </Chip>)
    }))
  };
  const handleFilterSubmit = (filters) => {
    setFilters(filters);
    filterJobs(filters);
  };
  return (
    <View style={styles.container}>
      <View style={ styles.horizontalList }>
        <View style={{ width: '85%'}}>
          <SearchBarComponent handleChangeSearch={ handleChangeSearch } value={ filters.search }/>
        </View>
        <IconButton icon="filter" size={28} color='rgba(42,42,42,1)' onPress={() => setFilterModalVisible(true)} />
      </View>
      <View style={{ height: 30, marginVertical: 5}}>
      <ScrollView contentContainerStyle={{  }} horizontal={true}>
        { renderCategoryChips() }
      </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ }}>
        { renderJobsList() }
      </ScrollView>

      { filterModalVisible?
          <JobFilterModal filters={filters} visible={filterModalVisible} dismissModal={() => setFilterModalVisible(false)}
            handleSubmit={ handleFilterSubmit }
          />
          :
          null
      }
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
