import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as _ from 'lodash';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


import JOBS from '../data/stubbed/dummy-jobs';

export default function JobDetailScreen( route, navigation) {
  const job = _.find(JOBS, { id: route.route.params.id});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JobDetail Screen</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/BrowseScreen.tsx" />
    </View>
  );
};

JobDetailScreen.navigationOptions = (navData) => {
  console.log("NAVIGATION: JOB", job);
  return {
    headerTitle: job.title,
    // headerRight: (
    //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    //     <Item title="Menu" iconName="menu" onPress={ () => { navData.navigation.openDrawer()}} />
    //   </HeaderButtons>
    // )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
