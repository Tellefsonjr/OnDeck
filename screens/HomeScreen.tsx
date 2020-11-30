import * as React from "react";
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
} from "react-native-paper";
import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as _ from "lodash";
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CATEGORIES from "../data/stubbed/dummy-job-categories";
import COMPANIES from "../data/stubbed/dummy-companies";

import Agenda from "../components/Agenda";
import JobListItem from "../components/jobs/JobListItem";
import JobFilterModal from "../components/jobs/JobFilterModal";
import * as userActions from '../store/actions/users'; //Redux Actions
import JobList from "../components/jobs/JobList";

export default function HomeScreen(props: any) {
  const dispatch = useDispatch();
  const JOBS = useSelector(state => state.jobs.jobs);
  const companies = useSelector(state => state.companies.companies);
  const loggedInUser = useSelector(state => state.auth.userId);
  // dispatch(userActions.get(loggedInUser));
  const USER = useSelector(state => state.users.user);
  console.log("PULLED USER: ", USER, loggedInUser);
  const [filteredJobs, setFilteredJobs] = React.useState(JOBS);
  const [jobModalVisible, setJobModalVisible] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [filters, setFilters] = React.useState({
    search: "",
    categories: [],
    location: "",
    radius: "",
    pay: 0,
    payRate: "hr",
  });
  const [ filterModalVisible, setFilterModalVisible ] = React.useState(false);

  const dateToday = new Date();

  const showJobModal = (jobId) => {
    setJobModalVisible(true);
    setSelectedJob(_.find(JOBS, { id: jobId }));
    console.log("TOGGLED JOB MODAL", jobModalVisible, selectedJob);
  };

  const renderJobsList = () => {
    return filteredJobs.map((job, i) => {
      return (
        <View key={i} style={{ backgroundColor: "transparent" }}>
          <JobListItem
            job={job}
            company={_.find(COMPANIES, { id: job.companyId })}
            onPress={handleJobPress}
          />
        </View>
      );
    });
  };

  const handleDayPressed = (day) => {
    const date = day;
    console.log("DAY PRESSED ON HOME: ", date);
  };
  const handleJobPress = (job) => {
    console.log("PRESSED: ", job.id);
    props.navigation.navigate("JobDetailScreen", {
      id: job.id,
      title: job.title,
    });
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
  const handleFilterSubmit = (filters) => {
    setFilters(filters);
    filterJobs(filters);
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/bg.jpg")}
    >
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: Colors.textLight,
            padding: 15,
            marginVertical: 10,
          }}
        >
          <MaterialCommunityIcons name="access-point" size={30} color={"red"} />
        </View>
      </View>

      <View style={{ flex: 1.5 }}>
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

      <View style={{ backgroundColor: "rgba(0,0,0,0)", flex: 6 }}>
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: Colors.textLight,
            paddingHorizontal: 15,
            marginVertical: 10,
          }}
        >
          <Title
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: Colors.textLight,
            }}
          >
            {" "}
            Recommended for you:{" "}
          </Title>
          <TouchableHighlight onPress={() => setFilterModalVisible(true)}>
            <MaterialCommunityIcons
              name="filter"
              size={28}
              color={Colors.textLight}
            />
          </TouchableHighlight>
        </View>

        <ScrollView
          style={styles.scrollViewStyle}
          contentContainerStyle={styles.cardContentContainer}
        >
          <JobList companyRefId={null} navigation={props.navigation} />
        </ScrollView> 
      </View>
      {selectedJob && selectedJob != null ? (
        <JobDetailModal
          job={selectedJob}
          visible={jobModalVisible}
          dismissModal={() => setJobModalVisible(false)}
        />
      ) : null}
      {filterModalVisible ? (
        <JobFilterModal
          filters={filters}
          visible={filterModalVisible}
          dismissModal={() => setFilterModalVisible(false)}
          handleSubmit={handleFilterSubmit}
        />
      ) : null}
    </ImageBackground>
  );
};

HomeScreen.navigationOptions = navData => {
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
  scrollViewStyle: {
    backgroundColor: "transparent",
  },
  cardContentContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
  },
  separator: {
    width: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  surface: {
    width: "40%",
    height: 40,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});
