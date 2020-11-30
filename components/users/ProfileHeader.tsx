import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch, connect } from "react-redux";

import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';
import { Text, View } from '../Themed';



const ProfileHeader = (props) => {
  // console.log("~~ FROM::: ", props.from);
  const user = props.user;
  const navigation = props.navProps;
  // console.log("PROFILE HEADER, USER~~~~~~~: ", user);
  // console.log("PROFILE HEADER, Auth~~~~~~~: ", props.auth);
  // console.log("PROFILE HEADER:::: ", user.userId);
  // console.log("PROFILE PROPS NAVIGATION::: ", props.navProps);
  // console.log("PROFILE HEADER NAVIGATION: ", navigation); 

  return (
        <TouchableOpacity onPress={ () => props.navigation.navigate("Profile", { userId: user.userId }) }
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

const mapStateToProps = (state, ownProps) => {
  // state.firebase.auth.uid ? console.log("Profile HEader auth uid: ", state.firebase.auth.uid) : console.log("No Profile Found.")
  // console.log(" ProfileHeader: ", state.firebase.auth.uid ? state.firebase.profile.userId : "No Profile Found");
  return {
    auth: state.firebase.auth,
    user: state.firebase.auth.uid ? state.firebase.profile : null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (userId) => dispatch(userActions.get(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
