import React, { useState } from 'react';
import {Alert, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Agenda} from 'react-native-calendars';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';


export default function AgendaComponent(props) {
  console.log("PROPS", props);
  const [ items, setItems ] = useState( { } );


  function loadItems(day) {
    console.log("LoadingITems: ", day);
  setTimeout(() => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
        const numItems = Math.floor(Math.random() * 3 + 1);
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
    <TouchableOpacity
      style={[styles.item, { height: item.height }]}
      onPress={() => Alert.alert(item.name)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
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
    console.log("DATESTRING: ", dateString);
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
          '2020-07-05': {marked: true, dotColor: '#50cebb'},
          '2020-07-06': {startingDay: true, color: '#50cebb', textColor: 'black'},
          '2020-07-07': {color: '#70d7c7', textColor: 'black'},
          '2020-07-08': {color: '#70d7c7', textColor: 'black', marked: true, dotColor: 'black'},
          '2020-07-09': {color: '#70d7c7', textColor: 'black'},
          '2020-07-10': {endingDay: true, color: '#50cebb', textColor: 'black'},
          '2020-07-11': {marked: true, dotColor: 'rgba(218,134,36,1)', textColor: 'black'},
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
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
