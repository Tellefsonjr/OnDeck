import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import SosScreen from '../screens/SosScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import EventsScreen from '../screens/EventsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import DrawerNavigator from './AppNavigator';
import ProfileHeader from '../components/users/ProfileHeader';

import { BottomTabParamList, HomeParamList, BrowseParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
// const drawerNavigator = createDrawerNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="SOS"
        component={Sos}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="access-point" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Browse"
        component={Browse}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="magnify" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-text" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: props => 
        <ProfileHeader title="Home" navProps={props}/>
        }}
      />
      <HomeStack.Screen
        name="JobDetailScreen"
        component={JobDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </HomeStack.Navigator>
  );
}

const SosStack = createStackNavigator<SosParamList>();

function Sos() {
  return (
    <SosStack.Navigator>
      <SosStack.Screen
        name="SosScreen"
        component={SosScreen}
        options={{ headerTitle: 'Sos' }}
      />
      <SosStack.Screen
        name="JobDetailScreen"
        component={JobDetailScreen}
        options={{ headerTitle: 'OnDeck' }}
      />
    </SosStack.Navigator>
  );
}


const BrowseStack = createStackNavigator<BrowseParamList>();

function Browse() {
  return (
    <BrowseStack.Navigator>
      <BrowseStack.Screen
        name="BrowseScreen"
        component={BrowseScreen}
        options={{ headerTitle: 'Browse' }}
      />
      <BrowseStack.Screen
        name="JobDetailScreen"
        component={JobDetailScreen}
        options={{ headerTitle: 'OnDeck' }}
      />
    </BrowseStack.Navigator>
  );
}

const EventsStack = createStackNavigator<EventsParamList>();

function Events() {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name="EventsScreen"
        component={EventsScreen}
        options={{ headerTitle: 'Events' }}
      />
    </EventsStack.Navigator>
  );
}

const UserStack = createStackNavigator<SosParamList>();

function User() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
    </UserStack.Navigator>
  );
}
