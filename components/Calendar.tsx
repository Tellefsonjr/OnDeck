import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar as Calendar } from 'react-native-calendars';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function CalendarComponent(props) {
  const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};

  return (
    <View>
      <Calendar
      markedDates={{
        '2017-10-25': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'},
        '2017-10-26': {dots: [massage, workout], disabled: true}
      }}
      markingType={'multi-dot'}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
