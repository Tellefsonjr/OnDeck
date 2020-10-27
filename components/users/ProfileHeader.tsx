import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch, connect } from "react-redux";

import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth.userId,
    user: state.users.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (userId) => dispatch(userActions.get(userId)),
  };
};

const ProfileHeader = (props, getUser) => {
  const loggedInUser = useSelector(state => state.auth.userId);
  // console.log("USER~~~~~~: ", loggedInUser);
  // console.log("~~~~~~PROPS FROM HEADER: ", props);
  return (
        <TouchableOpacity onPress={ () => props.navProps.navigate("Profile", {userId: loggedInUser })}
            style={[styles.profileImage, { paddingLeft: props.paddingLeft }]} >
        <Avatar.Image
            size={props.size}
            source={
              props.user && props.user.profile.avatar
                ? { uri: props.user.profile.avatar }
                : require("../../assets/images/ProfileIcon.png")
            }
          />   
        </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
  profileImage: {
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
