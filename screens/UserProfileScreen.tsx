import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text, View, Platform } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import Colors from '../constants/Colors.ts';
// import { Text, View, } from '../components/Themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../store/actions/auth'; //Redux Actions


import Logo from '../assets/images/OD_Logo.svg';


export default function UserProfileScreen(props) {
  const dispatch = useDispatch();

  return (
    <View style={ styles.container }>
        <Text> User Profile Screen </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(41,117,198,1)',
    flex: 1,
  },
  
});
