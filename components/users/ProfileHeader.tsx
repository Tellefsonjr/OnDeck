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
    auth: state.firebase.auth,
    user: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (userId) => dispatch(userActions.get(userId)),
  };
};

const ProfileHeader = (props) => {
  // console.log("USER~~~~~~: ", loggedInUser);
  // console.log("~~~~~~PROPS FROM HEADER: ", props);
  const user = props.user;
  console.log("PROFILE HEADER, USER~~~~~~~: ", user);
  console.log("PROFILE HEADER, Auth~~~~~~~: ", props.auth);

  return (
        <TouchableOpacity onPress={ () => props.navProps.navigate("Profile", {userId: props.auth.uid })}
            style={[styles.profileImage, { paddingLeft: props.paddingLeft }]} >
        <Avatar.Image
            size={props.size}
            source={
              user && !user.isEmpty
                ? { uri: user.profile.avatar }
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
