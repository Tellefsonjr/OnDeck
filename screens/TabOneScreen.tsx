import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Surface, TouchableRipple } from 'react-native-paper';
import Colors from '../constants/Colors.ts';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import JOBS from '../data/stubbed/dummy-jobs';
import JOB_CATEGORIES from '../data/stubbed/dummy-job-categories';

export default function TabOneScreen() {
  const LeftContent = (props) => <Avatar.Icon style={{ width: 28, height: 28, backgroundColor: Colors.primaryDark}} {...props} icon="folder" />

  function renderCards(){
    return(JOBS.map((c, index) =>
      <View key={index} style={styles.cardContainer}>
        <Card elevation={2} style={ styles.card }>
          <Card.Title title="Health Inspector" subtitle="Time: 2wk+   $$" left={LeftContent} style={{borderBottomWidth: .5, borderBottomColor: Colors.secondaryDark}} />
          <Card.Content>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
            <Avatar.Image size={28} source={{ uri: 'https://picsum.photos/'+((Math.floor(Math.random(0,1000)*1000)).toString()) }} />
            <Title>Company Name</Title>
          </View>
          <Paragraph>Short description goes here ...</Paragraph>
          <Paragraph>...Can continue here too ...</Paragraph>
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

  function renderTypes(){
    return (JOB_CATEGORIES.map( (category, index) => (
      <Surface key={index} style={styles.surface}>
      <TouchableRipple>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <MaterialCommunityIcons name={category.icon} size={26} color={Colors.primaryDark} style={{color: Colors.primaryDark}}/>
              <Text style={{}}>{category.title}</Text>
            </View>
            <View style={{}}>
              <MaterialCommunityIcons name='menu-right' size={26} style={{color: Colors.textLight}}/>
            </View>
        </View>
      </TouchableRipple>
      </Surface>

    )))

  };

  return (
    <View style={styles.container}>
      <View>
        <Title style={{ fontWeight: 'bold', width: '100%', color: Colors.textDark, fontSize: 22, borderBottomWidth: 1, borderBottomColor: Colors.textLight, paddingHorizontal: 10,marginVertical: 10}}> Your Top 10: </Title>
        <ScrollView style={ styles.scrollViewStyle } containerContainerStyle={ styles.cardContentContainer } horizontal={true}>
        {
          renderCards()
        }
        </ScrollView>
      </View>
      <View style={{ flex: 1, marginTop: 10, padding: 10}}>
        <Title color={Colors.textDark} style={{ marginHorizontal: 10}}>Categories</Title>
        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around'}}>
        { renderTypes() }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.textLight,
    justifyContent: 'center'

  },
  scrollViewStyle: {
  },
  cardContentContainer: {
    width: '100%',
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-around'
  },
  cardContainer:{
    marginHorizontal: 10,
  },
  card: {
    width: '100%',
    paddingHorizontal: 10,
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
