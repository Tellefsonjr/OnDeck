import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import Agenda from '../components/Agenda';


export default function EventsScreen() {
  const handleDayPressed = (day: String) => {
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
