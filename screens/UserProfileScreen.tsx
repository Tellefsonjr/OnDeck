import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  Platform,
} from "react-native";
import {
  Button,
  TextInput,
  Avatar,
  Modal,
  IconButton,
  Title,
  Paragraph,
  Chip,
} from "react-native-paper";
import Colors from "../constants/Colors.ts";
// import { Text, View, } from '../components/Themed';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch, connect } from "react-redux";
import { Video } from 'expo-av';

import * as userActions from "../store/actions/auth"; //Redux Actions
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import JOB_CATEGORIES from "../data/stubbed/dummy-job-categories";
import ProfileCard from "../assets/images/ProfileCard.svg";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";



const UserProfileScreen = (props) => {
  // console.log("~~~USER ON PROFILE : ", props);
  const user = props.user.profile;
  const [toggleImage, setToggleImage] = useState(false);
  const [toggleVideo, setToggleVideo] = useState(false);

  const [ isEditing, setIsEditing ] = useState(false);
  const editable = props.user && props.auth.uid;
  // TO DO: Either edit in line / pop up modal / nav to screen
  // const [ editUser, setEditUser ] = useState(props.user);
  const renderJobCategories = () => {
    return <Text>hello</Text>;
  };
  const avatar = user.profile && user.profile.avatar ? user.profile.avatar : null;
  return (
    <View style={styles.container}>
      {/* TO DO...Get Reauth working.... */}
      {
        editable ? (
          <View style={styles.editContainer}>
            {isEditing ? (
              <View style={ styles.horizontalList }>
                <IconButton
                  icon="close"
                  color={Colors.dark.text}
                  size={30}
                  onPress={() => setIsEditing(!isEditing)}
                />
                <IconButton
                  icon="check"
                  color={Colors.dark.text}
                  size={30}
                  onPress={() => console.log("Pressed Save")}
                />
              </View>
            ) : (
              <IconButton
                icon="pencil-outline"
                color={Colors.dark.text}
                size={30}
                onPress={() => setIsEditing(!isEditing)}
              />
            )}
          
        </View>
        ) : (
          <IconButton
          icon="pencil-outline"
          style={{ display: 'none'}}
          color={Colors.dark.text}
          size={30}
          onPress={() => console.log("Pressed invisible button!")}
        />
        )
      }


      <View style={styles.cardContainer}>
        <View style={styles.avatarContainer}>
          <TouchableWithoutFeedback onPress={() => setToggleImage(true)}>
            <View style={{ paddingBottom: 0, marginBottom: '-5%'}}>
            <Avatar.Image
              size={128}
              source={
                user.profile.avatar
                  ? { uri: user.profile.avatar }
                  : require("../assets/images/ProfileIcon.png")
              }
            />
            <IconButton
              icon="play-circle-outline"
              style={{ alignSelf: 'flex-end', marginTop: '-10%', marginRight: -15}}
              color={Colors.light.text}
              size={35}
              onPress={() => setToggleVideo(true)}
            />
            </View>

          </TouchableWithoutFeedback>
          <Title>{user.fullName}</Title>
          <View
            style={[
              styles.horizontalList,
              { alignItems: "center", marginLeft: "7%", alignSelf: "center" },
            ]}
          >
            <MaterialCommunityIcons name="star" size={20} />
            <MaterialCommunityIcons name="star" size={20} />
            <MaterialCommunityIcons name="star" size={20} />
            <MaterialCommunityIcons name="star" size={20} />
            <MaterialCommunityIcons name="star-outline" size={20} />
            <Paragraph style={{ opacity: 0.8, marginLeft: 5 }}>4.0</Paragraph>
          </View>
          <View style={{ padding: 5 }}>
            <Paragraph>{user.profile.bio}</Paragraph>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.iconTextPair}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              style={{ marginRight: 10, alignSelf: "center" }}
            />
            <Paragraph> {user.location.location.address.formatted} </Paragraph>
          </View>
          <View style={styles.iconTextPair}>
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              style={{ marginRight: 10, alignSelf: "center" }}
            />
            <View style={styles.horizontalList}>
              <Chip
                icon="information"
                style={{ padding: 0 }}
                textStyle={{ fontSize: 12 }}
              >
                Gig
              </Chip>
              <Chip
                icon="information"
                style={{ padding: 0 }}
                textStyle={{ fontSize: 12 }}
              >
                Full-Time
              </Chip>
              <Chip
                icon="information"
                style={{ padding: 0 }}
                textStyle={{ fontSize: 12 }}
              >
                Part-Time
              </Chip>
              <Chip
                icon="information"
                style={{ padding: 0 }}
                textStyle={{ fontSize: 12 }}
              >
                Skilled
              </Chip>
              <Chip
                icon="information"
                style={{ padding: 0 }}
                textStyle={{ fontSize: 12 }}
              >
                Unskilled
              </Chip>
            </View>
          </View>
          <View style={styles.iconTextPair}>
            <MaterialCommunityIcons
              name="certificate"
              size={20}
              style={{ marginRight: 10, alignSelf: "center" }}
            />
            <Paragraph> White card </Paragraph>
          </View>
          <View style={styles.iconTextPair}>
            <MaterialCommunityIcons
              name="bag-personal-outline"
              size={20}
              style={{ marginRight: 10, alignSelf: "center" }}
            />
            <Paragraph style={{ flex: 1, flexWrap: "wrap" }}>
              PPE: high visibility clothing, steel-toe boots, hard hat, ear
              plugs, face mask
            </Paragraph>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            icon="file-document-outline"
            mode="contained"
            compact={true}
            color={Colors.primary}
          >
            documents
          </Button>
          <Button
            icon="comment-text-multiple-outline"
            mode="contained"
            compact={true}
            color={Colors.primary}
          >
            reviews
          </Button>
          <Button
            icon="tooltip-text-outline"
            mode="contained"
            compact={true}
            color={Colors.primary}
          >
            contact
          </Button>
        </View>
      </View>

      {toggleImage ? (
        <Modal
          visible={toggleImage}
          onDismiss={() => setToggleImage(!toggleImage)}
          style={styles.modal}
        >
          <TouchableWithoutFeedback
            style={styles.modalContainer}
            onPress={() => setToggleImage(!toggleImage)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.exitContainer}>
                <IconButton
                  icon="close"
                  color={Colors.dark.text}
                  size={30}
                  onPress={() => setToggleImage(!toggleImage)}
                />
              </View>
              <View style={styles.modalAvatarContainer}>
                <Avatar.Image
                  style={styles.modalAvatar}
                  size={360}
                  source={
                    avatar
                      ? { uri: user.profile.avatar }
                      : require("../assets/images/ProfileIcon.png")
                  }
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null }
      { toggleVideo ? (
        <Modal
          visible={toggleVideo}
          onDismiss={() => setToggleVideo(!toggleVideo)}
          style={styles.modal}
         >
          <View style={styles.modalVideoContainer}>
          <Video
            source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            useNativeControls={true}
            resizeMode="contain"
            style={{ height: '100%', width: '100%'}} />
        </View>
        </Modal>
        ) : null }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(41,117,198,1)",
    flex: 1,
  },
  editContainer: {
    alignItems: "flex-end",
  },
  cardContainer: {
    flex: 1,
    marginTop: "5%",
    backgroundColor: "white",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  avatarContainer: {
    flex: 6,
    alignItems: "center",
    marginTop: "-15%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  infoContainer: {
    marginTop: 5,
    flex: 4,
    padding: 20,
  },
  iconTextPair: {
    flexDirection: "row",
    marginBottom: 5,
  },
  modal: {},
  modalContainer: {
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalVideoContainer: {
    height: '60%',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  exitContainer: {
    alignItems: "flex-end",
  },
  modalAvatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  horizontalList: {
    flexDirection: "row",
  },
});
UserProfileScreen.navigationOptions = (navData:any) => {
  console.log("NAVIGATION: PROFILE SCREEN", navData);
  return {
    // headerTitle: userId.title,
    // headerRight: (
    //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    //     <Item title="Menu" iconName="menu" onPress={ () => { navData.navigation.openDrawer()}} />
    //   </HeaderButtons>
    // )
  };
};

const mapStateToProps = (state:any, ownProps:any) => {
  const user = state.firebase.auth;
  console.log(" USER ON PROFILE SCREEN: ", ownProps);
  return {
    auth: state.firebase.auth,
    user: state.firebase,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (userId) => dispatch(userActions.get(userId)),
  };
};

// const mapStateToProps = (state:any) => {
//   let company = _.find(state.firestore.ordered.companies, { refId: state.firebase.profile.companyRefId});
//   let companyId = company ? company.id : null;
//   return({
//     company: company,
//     companyId: companyId,  
//     jobs: _.filter(state.firestore.ordered.jobs, { companyId: companyId}),
//   })
// };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => ['users'])
)(UserProfileScreen)
