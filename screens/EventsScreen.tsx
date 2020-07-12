import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Agenda from '../components/Agenda';


export default function EventsScreen() {
  const handleDayPressed = (day) => {
    console.log("EventsScreen pressed: ", day);
  };
  return (
    <View style={styles.container}>
      <Agenda onDayPress={handleDayPressed} hideKnob={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
