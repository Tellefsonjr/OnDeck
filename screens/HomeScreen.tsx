import * as React from 'react';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Surface, TouchableRipple } from 'react-native-paper';
import Colors from '../constants/Colors.ts';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as _ from 'lodash';

import JOBS from '../data/stubbed/dummy-jobs';
import CATEGORIES from '../data/stubbed/dummy-job-categories';

import Agenda from '../components/Agenda';

export default function HomeScreen() {
  const dateToday = new Date();

  function renderJobCategoryIcon(categoryId){
    return(
      _.find(CATEGORIES, { id: categoryId}).icon
    )
  };

  function renderCards(){
    return(JOBS.map((job, index) =>
      <View key={index} style={styles.cardContainer}>
        <Card elevation={2} style={ styles.card }>
          <Card.Title title={job.title} subtitle="Time: 2wk+   $$" left={ (props) =>
            <Avatar.Icon style={{ width: 28, height: 28, backgroundColor: Colors.primaryDark}} {...props} icon={ renderJobCategoryIcon(job.categories[1]) } />
          }
          style={{borderBottomWidth: .5, borderBottomColor: Colors.secondaryDark}} />
          <Card.Content style={ styles.cardInner}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
            <Avatar.Image size={28} source={{ uri: 'https://picsum.photos/'+((Math.floor(Math.random(0,1000)*1000)).toString()) }} />
            <Title>Company Name</Title>
          </View>
          <View style={{ flexDirection: 'row'}}>
            <Paragraph style={{flex: 1, flexWrap: 'wrap'}}>{_.truncate(job.description, { 'length': 29})}</Paragraph>
          </View>
          </Card.Content>

          <Card.Actions style={{ justifyContent: 'flex-end'}}>
            <Button color={Colors.error} labelStyle={{ color: Colors.errorDark }} mode="text">Pass</Button>
              <View style={{width: 2}} />
            <Button color={Colors.secondary} labelStyle={{ color: Colors.textDark, fontWeight: 'bold' }} mode="contained">Details</Button>
          </Card.Actions>
        </Card>
        <View style = { styles.separator }/>
      </View>
    ))
  };

  return (
    <ImageBackground style={styles.container} source={require('../assets/images/bg.jpg')}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)', padding: 5}}>
        <Agenda />
      </View>

      <View style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
        <Title style={{ fontWeight: 'bold', width: '100%', color: Colors.textLight, fontSize: 22, borderBottomWidth: 1, borderBottomColor: Colors.textLight, paddingHorizontal: 10,marginVertical: 10}}> Your Top 10: </Title>
        <ScrollView style={ styles.scrollViewStyle } containerContainerStyle={ styles.cardContentContainer } horizontal={true}>
        {
          renderCards()
        }
        </ScrollView>
      </View>
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
  cardContainer:{
    marginHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    paddingBottom: 10,

  },
  card: {
    width: '100%',
    paddingHorizontal: 10,
  },
  cardInner: {
    width: '100%'
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
