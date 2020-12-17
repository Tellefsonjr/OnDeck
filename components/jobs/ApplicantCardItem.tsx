import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Avatar, IconButton, Paragraph, Title } from "react-native-paper";
import Colors from "../../constants/Colors";
import Rating from "../shared/Rating";
import UserInfoContainer from "../users/UserInfoContainer";
import Animated, { add, interpolate, concat, Extrapolate } from "react-native-reanimated";
import {
  usePanGestureHandler,
  withSpring,
  mix,
  mixColor,
  useSharedValue,
} from "react-native-redash/lib/module/v1";
import { PanGestureHandler } from "react-native-gesture-handler";

const AVATAR_SIZE = 128;
const PADDING = 16;
const ACTION_PADDING = 24;

const { width: wWidth, height: wHeight } = Dimensions.get("window");
const width = wWidth * 0.9;

interface ApplicantCartItemProps {
  position: Animated.Node<number>;
  user: Object;
  approve: (user) => void;
  skip: (user) => void;
  decline: (user) => void;
}

const ApplicantCardItem = ({
  position,
  user,
  approve,
  skip,
  decline,
}: ApplicantCartItemProps) => {
  // const user = props.user;
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const backgroundColor = mixColor(
    position,
    "#f2faf9",
    Colors.secondaryLightest
  );
  const translateYOffset = mix(position, 0, -50);
  const scale = mix(position, 1, 0.9);
  const translateX = withSpring({
    value: translation.x,
    velocity: velocity.x,
    state,
    snapPoints: [-width, 0, width],
    onSnap: ([x]) => x !== 0 && skip(user),
  });
  const translateY = add(
    translateYOffset,
    withSpring({
      value: translation.y,
      velocity: velocity.y,
      state,
      snapPoints: [0]
    })
  );
  const skipOpacity = interpolate( translation.x, {
    inputRange: [-width /2, 0, width /2],
    outputRange: [1, 0, 1]
  });
  const skipPosition = interpolate( translation.x, {
    inputRange: [-width, 0, width],
    outputRange: [width / 2, 0, -width / 2],
    extrapolate: Extrapolate.CLAMP
  })

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.applicantContainer,
            { zIndex: 1},
            { backgroundColor },
            { transform: [{ translateX }, { translateY }, { scale }] },
          ]}
        >
          <View style={styles.avatar}>
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
              style={styles.avatarPlayIcon}
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
          <View style={{ flex: 1, overflow: "hidden" }}>
            <UserInfoContainer user={user} />
          </View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[ StyleSheet.absoluteFill, styles.action, {zIndex: 0, opacity: skipOpacity, transform: [{translateX: skipPosition}]} ]}>
              <View style={ styles.skip }>
                <Text style={ styles.skipText }>Skip?</Text>
              </View>
          </Animated.View>
      <View style={styles.buttonContainer}>
        <IconButton
          size={30}
          icon="account-remove"
          color={Colors.light.background}
          style={[styles.button, { backgroundColor: Colors.error }]}
          onPress={() => decline(user)}
        />
        <IconButton
          size={30}
          icon="account-clock"
          color={Colors.light.background}
          style={[styles.button, { backgroundColor: Colors.secondary }]}
          onPress={() => skip(user)}
        />
        <IconButton
          size={30}
          icon="account-check"
          color={Colors.light.background}
          style={[styles.button, { backgroundColor: Colors.primary }]}
          onPress={() => approve(user)}
        />
      </View>
    </View>
  );
};

export default ApplicantCardItem;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexGrow: 1,
    padding: 16,
    backgroundColor: Colors.light.background,
    elevation: 10,
  },
  applicantContainer: {
    width: width,
    alignItems: "center",
    height: "90%",
    padding: 8,
    borderRadius: PADDING,
  },
  avatar: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
  },
  avatarPlayIcon: {
    position: "absolute",
    left: AVATAR_SIZE / 2 + PADDING,
    top: AVATAR_SIZE / 2 + PADDING,
  },
  horizontalList: {
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    borderRadius: 24,
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  skip: {
    borderRadius: 24,
    borderWidth: 8,
    borderColor: Colors.secondary,
    padding: ACTION_PADDING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.secondary,
  }
});
