import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, IconButton, Paragraph, Title } from 'react-native-paper';
import Colors from '../../constants/Colors';
import Rating from '../shared/Rating';
import UserInfoContainer from '../users/UserInfoContainer';

const AVATAR_SIZE = 128;
const PADDING = 16;


const ApplicantCardItem = (props) => {
    const user = props.user;
    return (
        <View style={ styles.container }>
            <View style={ styles.applicantContainer }>
            <View style={ styles.avatar }>
                <Avatar.Image
                size={128}
                source={
                    user.profile.avatar
                    ? { uri: user.profile.avatar }
                    : require("../../assets/images/ProfileIcon.png")
                }
                />
                <IconButton
                icon="play-circle-outline"
                style={ styles.avatarPlayIcon }
                color={Colors.light.text}
                size={35}
                onPress={() => console.log("Pressed applicant play button")}
                />
            </View>
            <Title>{user.fullName}</Title>

          <Rating rating={user.rating} />
          
          <View style={{ padding: 5 }}>
            <Paragraph>{user.profile.bio}</Paragraph>
          </View>
            <View style={{ flex: 1, overflow: 'hidden',}}>
            <UserInfoContainer user={user} />

          </View>
          </View>

          <View style={ styles.buttonContainer }>
        <IconButton size={30} icon="account-remove" color={ Colors.light.background } style={ [styles.button, {backgroundColor: Colors.error }] }
           onPress={ () => props.decline(user) }
        />
        <IconButton size={30} icon="account-clock" color={ Colors.light.background } style={ [styles.button, {backgroundColor: Colors.secondary }] }
          onPress={ () => props.skip(user) }
        />
        <IconButton size={30} icon="account-check" color={ Colors.light.background } style={ [styles.button, {backgroundColor: Colors.primary }] }
          onPress={ () => props.approve(user) }
        />
      </View>
        </View>
    )
}

export default ApplicantCardItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,

    },
    applicantContainer: {
      alignItems: 'center',
      borderWidth: 1,
      height: "90%",
      borderColor: Colors.dark.background,
      padding: 8,
      borderRadius: PADDING
    },
    avatar: {
        height: AVATAR_SIZE,
        width: AVATAR_SIZE,
    },
    avatarPlayIcon: {
        position: 'absolute',
        left: AVATAR_SIZE / 2 + PADDING,
        top: AVATAR_SIZE / 2 + PADDING,
    },
    horizontalList: {
        flexDirection: 'row',
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    button: {
      borderRadius: 24,
      
    }

})
