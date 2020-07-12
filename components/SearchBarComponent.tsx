import React, { useState } from 'react';
import {Alert, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import { Searchbar } from 'react-native-paper';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';


export default function SearchBarComponent(props) {
  const [ searchQuery, setSearchQuery ] = useState('');


  function onChangeSearch(query) {
    console.log("ON SEARCHBAR, QUERY CHANGED: ", query);
    setSearchQuery(query);
    props.handleChangeSearch(query);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});
