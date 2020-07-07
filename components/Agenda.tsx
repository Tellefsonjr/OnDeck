import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {Alert, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Agenda} from 'react-native-calendars';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';


export default function AgendaComponent(props) {
  const [ items, setItems ] = useState( { } );

  function loadItems(day) {
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
            height: Math.max(50, Math.floor(Math.random() * 150))
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

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems.bind(this)}
        selected={'2017-05-16'}
        renderItem={renderItem.bind(this)}
        renderEmptyDate={renderEmptyDate.bind(this)}
        rowHasChanged={rowHasChanged.bind(this)}
      // markingType={'period'}
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
