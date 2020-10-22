import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useSelector} from 'react-redux';

import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';

export default function ProfileHeader(props) {
  const loggedInUser = useSelector(state => state.auth.userId);
  // console.log("USER~~~~~~: ", loggedInUser);
  // console.log("~~~~~~PROPS FROM HEADER: ", props);
  return (
        <TouchableOpacity onPress={ () => props.navProps.navigate("Profile", {userId: loggedInUser })}
            style={[styles.profileImage, { paddingLeft: props.paddingLeft }]} >
        <Avatar.Image
            size={props.size}
            source={ require("../../assets/images/ProfileIcon.png") }
          />   
        </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
  profileImage: {
  }

});
