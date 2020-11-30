import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useSelector, useDispatch, connect } from "react-redux";

// Screens
import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

import { RootStackParamList } from "../types";
import * as authActions from "../store/actions/auth"; //Redux Actions
import * as userActions from "../store/actions/users"; //Redux Actions

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import ProfileHeader from '../components/users/ProfileHeader';

const AuthContext = React.createContext();

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
const Navigation = (props, colorScheme) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const isSignUp = useSelector((state) => state.auth.isSignUp);

  const [authContext, setAuthContext] = useState({
    user: {
      email: email,
      token: token,
      userId: userId,
      isSignUp: isSignUp,
    },
  });
  React.useEffect(() => {

  })
  // React.useEffect(() => {
  //   let userData;
  //   // Fetch the token from storage then navigate to our appropriate place
  //   if (!isSignUp) {
  //     const tryLogin = async () => {
  //       userData = await AsyncStorage.getItem("userData");
  //       console.log("UserData found: ", userData);
  //       if (!userData) {
  //         console.log("No user data found, first catch");
  //         setAuthContext({
  //           user: {
  //             email: null,
  //             token: null,
  //             userId: null,
  //             isSignUp: isSignUp,
  //           },
  //         });
  //         // if no cached data for user, don't try transforming data
  //         return;
  //       }
  //       const transformedData = JSON.parse(userData);
  //       setAuthContext(transformedData);
  //       const { token, userId, expirationDate, email } = transformedData;
  //       // console.log("~~~~~~~~~~~~~~~~~~~~~TRANSFORMED DATA~~~~~~~~~~~~", transformedData, userId, token, email);
  //       dispatch(
  //         authActions.authenticate(
  //           transformedData.user.userId,
  //           transformedData.user.token,
  //           transformedData.user.email,
  //           false
  //         )
  //       );
  //       if (new Date(expirationDate) <= new Date()) {
  //         console.log(
  //           "Expiry: ",
  //           expirationDate,
  //           " >= ",
  //           new Date().toISOString()
  //         );
  //         return;
  //       }
  //     };
  //     tryLogin();


  //     // console.log("Auth Context: ", authContext);
  //   }
  // }, [email, userId, token, isSignUp]);
  // console.log("NAVIGATION CONTAINER PROPS: ", props);
  // console.log("Props.auth.check: ", props.auth.uid);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        { (props.profile.isEmpty && !props.profile.isLoaded) || !props.auth.isLoaded || !props.auth.uid ? (
          <Stack.Screen
            name="AuthScreen"
            component={AuthNavigator}
            options={{
              tabBarVisible: false,
              headerShown: false,
            }}
          />
        ) : (
            <Stack.Screen
              name="Root"
              component={AppNavigator}

            />
        )}
        {/* { returnRootScreen(props.auth.uid) } */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const returnRootScreen = (userId) => {
  const dispatch = useDispatch();

  dispatch(
    userActions.login(
      userId
    )
  );
  return (
    <Stack.Screen
      name="Root"
      component={AppNavigator}

    />
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

// function RootNavigator(props) {
//   console.log("Got to RootNav");
//   return (

//   );
// }

const mapStateToProps = (state) => {
  console.log("Index Navigator Profile~~~~~~", state.firebase.profile.isLoaded);
  console.log("Index Navigator Auth~~~~~~", state.firebase.auth.uid);

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    firebase: state.firebase.auth ? state.firebase : null,
    authError: state.firebase.auth ? state.auth.authError : null,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
