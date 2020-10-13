import React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';

import CustomHeaderButton from '../components/HeaderButton';
import ProfileHeader from '../components/users/ProfileHeader';

import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import SosScreen from '../screens/SosScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import EventsScreen from '../screens/EventsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

import * as authActions from '../store/actions/auth'; //Redux Actions


const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
     let iconName;
     if (route.name === 'Home') {
        iconName = focused
        ? 'home'
        : 'home-outline';
      } else if (route.name === 'SOS') {
        iconName = focused
        ? 'access-point'
        : 'access-point';
      } else if (route.name === 'Browse') {
        iconName = focused
        ? 'magnify'
        : 'magnify';
      } else if (route.name === 'Events') {
        iconName = focused
        ? 'calendar-text'
        : 'calendar-text-outline';
      }
return <MaterialCommunityIcons name={iconName} size={size} color={color}     />;
        },
      })}
      tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      }}
    >
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="SOS" component={Sos} />
        <Tab.Screen name="Browse" component={Browse} />
        <Tab.Screen name="Events" component={Events} />
    </Tab.Navigator>
  );
}
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator(props) {
  console.log("Home navigator props", props.navigation);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: "Home",
          headerLeft: () => (
            <ProfileHeader size={36} paddingLeft={15}/>
          ),
          headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName="menu" onPress={ () => { props.navigation.toggleDrawer()}} />
          </HeaderButtons>
          )
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


function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  console.log("DRAWER PROPS: ", props.navigation.navigate);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />
      <DrawerItem label={() => <Text style={{ color: 'white' }}>Logout</Text>}
        style={{backgroundColor: Colors.secondary, position: 'absolute', bottom: 10, width: '92%'}} 
        onPress={() => {
          dispatch(authActions.logout()); 
          // props.navigation.navigate("Auth", { screen: 'LoginScreen'})
        }}
          icon= {() => (
            <MaterialCommunityIcons name='logout' size={36} color="white" />
          )}
      />

    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Profile" component={ UserProfileScreen } options={{
          drawerIcon: () => (
            <ProfileHeader size={36} paddingLeft={0} />
          )
          }}
        />
        <Drawer.Screen name="Home" component={ TabNavigator } options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name='home-outline' size={36} />
          ) }} />
        <Drawer.Screen name="Settings" style={{ position: 'absolute', bottom: 0}} component={ SettingsScreen } options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name='cogs' size={36} />
          ) }} />
    </Drawer.Navigator>

  )
}