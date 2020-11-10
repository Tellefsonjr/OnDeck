import React, { useState } from 'react';
import {Alert, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import {Agenda} from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';


export default function AgendaComponent(props) {
  // console.log("PROPS", props);
  const [ items, setItems ] = useState( { } );


  function loadItems(day) {
    // console.log("LoadingITems: ", day);
  setTimeout(() => {
    for (let i = -15; i < 21; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
        const numItems = Math.floor(Math.random() * 2 + 1);
        for (let j = 0; j < numItems; j++) {
          items[strTime].push({
            name: 'Item for ' + strTime + ' #' + j,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            id: Math.floor(Math.random() * 10),
          });
        }
      }
    }
    const newItems = {};
    Object.keys(items).forEach(key => { newItems[key] = items[key]; });
    setItems(newItems);
  }, 1000);
}

function renderItem(item) {
  return (
    <View style={ styles.item }>
      <View style={ styles.eventItemTop }>
        <Text style={{ fontWeight: 'bold'}}>10:00a - 2:00p</Text>
        <Avatar.Image size={28} source={{ uri: 'https://picsum.photos/'+((Math.floor(Math.random(0,1000)*1000)).toString()) }} />
      </View>
      <View style={ styles.eventTitleContainer }>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons name="human-greeting" size={18} style={{ marginRight: 5, }}/>
          <Text>Customer Service Rep</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Text>@Planet Books</Text>
        </View>
      </View>
      <View style={ styles.buttonContainer }>
        <Button icon="phone" color='rgba(40,140,31,1)' onPress={() => console.log("Pressed Phone")} mode='contained' style={[ styles.eventButton, { borderTopLeftRadius: 5, borderBottomLeftRadius: 5, } ]} labelStyle={ styles.eventButtonInner }   />
        <Button icon="message-text-outline" color='rgba(242,156,85,1)' onPress={() => console.log("Pressed Message")} mode='contained' style={ styles.eventButton } labelStyle={ styles.eventButtonInner } />
        <Button icon="information-outline" color='rgba(77,177,249,1)' onPress={() => console.log("Pressed Info")} mode='contained' style={ styles.eventButton } labelStyle={ styles.eventButtonInner } />
        <Button icon="map-outline" color='rgba(85,116,242,1)' onPress={() => console.log("Pressed Navigation")} mode='contained' style={ styles.eventButton } labelStyle={ styles.eventButtonInner }  />
        <Button icon="cancel" color='rgba(221,104,46,1)' onPress={() => console.log("Pressed Phone")} mode='contained' style={[styles.eventButton, { borderTopRightRadius: 5, borderBottomRightRadius: 5, } ]} labelStyle={ styles.eventButtonInner }   />
      </View>
    </View>

  );
}

function renderEmptyDate() {
  return (
    <View style={styles.emptyDate}>
      <Text>This is empty date!</Text>
    </View>
  );
}

function rowHasChanged(r1, r2) {
  return r1.name !== r2.name;
}

function timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}
function dateNow(date){
  var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
    // console.log("DATESTRING: ", dateString);
  return(dateString);
}
function onDayPress(day){
  console.log("PRESSED THE THING:::" ,day);
  props.onDayPress(day);
}
const job1 = {key:'job1', color: 'blue', selectedDotColor: 'blue'};
const job2 = {key:'job2', color: 'green'};

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={ dateNow(new Date()) }
        renderItem={renderItem.bind(this)}
        renderEmptyDate={renderEmptyDate.bind(this)}
        rowHasChanged={rowHasChanged.bind(this)}
        onDayPress={(day)=>{ onDayPress(day) }}
        hideKnob={props.hideKnob}
        loadItemsForMonth={loadItems.bind(this)}
        markedDates={{
          '2020-07-25': {marked: true, dotColor: '#50cebb', textColor: 'black'},
          '2020-07-26': {startingDay: true, color: '#50cebb', textColor: 'black'},
          '2020-07-27': {color: '#70d7c7', textColor: 'black'},
          '2020-07-28': {color: '#70d7c7', textColor: 'black', marked: true, dotColor: 'black'},
          '2020-07-29': {color: '#70d7c7', textColor: 'black'},
          '2020-07-30': {endingDay: true, color: '#50cebb', textColor: 'black'},
          '2020-07-31': {marked: true, dotColor: 'rgba(218,134,36,1)', textColor: 'black'},
          '2020-08-01': {marked: true, dotColor: '#50cebb', textColor: 'black'},
          '2020-08-02': {startingDay: true, color: '#50cebb', textColor: 'black'},
          '2020-08-03': {color: '#70d7c7', textColor: 'black'},
          '2020-08-04': {color: '#70d7c7', textColor: 'black', marked: true, dotColor: 'black'},
          '2020-08-05': {color: '#70d7c7', textColor: 'black'},
          '2020-08-06': {endingDay: true, color: '#50cebb', textColor: 'black'},
          '2020-08-07': {marked: true, dotColor: 'rgba(218,134,36,1)', textColor: 'black'},
        }}
        markingType={'period'}
      // markedDates={{
      //    '2017-05-08': {textColor: '#43515c'},
      //    '2017-05-09': {textColor: '#43515c'},
      //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
      //    '2017-05-21': {startingDay: true, color: 'blue'},
      //    '2017-05-22': {endingDay: true, color: 'gray'},
      //    '2017-05-24': {startingDay: true, color: 'gray'},
      //    '2017-05-25': {color: 'gray'},
      //    '2017-05-26': {endingDay: true, color: 'gray'}}}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      // hideExtraDays={false}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventItemContainer: {
  },
  buttonContainer:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  eventButton: {
    flex: 1,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1,
    width: '16%',
    paddingLeft: 5,
  },
  eventButtonInner: {
    alignSelf: 'center',
    marginLeft: '15%',
    fontSize: 22,
    color: 'white',
  },
  eventItemTop:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventTitleContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginVertical: 10
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },

});
