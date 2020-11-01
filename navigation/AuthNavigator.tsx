import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import EventsScreen from '../screens/EventsScreen';
import RegisterScreen from '../screens/RegisterScreen';

import BottomTabNavigator from './BottomTabNavigator';
import { BottomTabParamList, HomeParamList, BrowseParamList } from '../types';

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const colorScheme = useColorScheme();
  console.log("Got to Auth Navigator");
  return (
    <AuthStack.Navigator
      screenOptions={{ headerTitle: null }}
      initialRouteName="Login"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false
         }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options= {{
          headerShown: false
         }}
      />
    </AuthStack.Navigator>
  );
}


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const LoginStack = createStackNavigator<LoginParamList>();

function LoginNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: null }}
      />

    </LoginStack.Navigator>
  );
}
