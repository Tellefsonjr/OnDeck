import * as React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import * as _ from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';

import EditScreenInfo from '../components/EditScreenInfo';


import JOBS from '../data/stubbed/dummy-jobs';

export default function JobDetailScreen( route, navigation) {
  const job = _.find(JOBS, { id: route.route.params.id});
  console.log("JOB Detail: ", job);

  return (
    <View style={styles.container}>
      <View style={ styles.headerContainer } >
        <Text style={styles.title}> Company Name </Text>
        <View style={ styles.horizontalList}>
          <Text style={styles.subTitle}> {job.title} </Text>
          <Text style={styles.subTitle}> Time info </Text>
          <Text style={styles.subTitle}> {job.pay.amount}/{job.pay.rate == 'hourly'? 'hr': job.pay.rate } </Text>
        </View>
        <View style={ styles.horizontalList }>
          <MaterialCommunityIcons name="star" size={20} />
          <MaterialCommunityIcons name="star" size={20} />
          <MaterialCommunityIcons name="star" size={20} />
          <MaterialCommunityIcons name="star" size={20} />
          <MaterialCommunityIcons name="star-outline" size={20} />
        </View>

      </View>
      <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: 5, marginBottom: 20}}>
        <Video
          source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          useNativeControls={true}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }} />
      </View>

      <View style={ styles.descriptionContainer }>
        <Text style={ styles.title }> Description: </Text>
        <Text> { job.description } </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10}}>
        <Button icon="account-check" mode="contained">
          Apply
        </Button>
      </View>
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  headerContainer: {
    alignItems: 'center',
    padding: 10,
  },
  horizontalList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'rgba(97,97,97,1)'
  },
  descriptionContainer: {
    flex: 1,
    marginTop: 10,
    padding: 10,
  }

});
