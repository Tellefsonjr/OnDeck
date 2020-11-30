import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HeaderBackButton } from '@react-navigation/stack';
import { createStackNavigator} from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch, connect } from 'react-redux';
import Colors from '../constants/Colors';

import CustomHeaderButton from '../components/HeaderButton';
import ProfileHeader from '../components/users/ProfileHeader';

import HomeScreen from '../screens/HomeScreen';
import CompanyHomeScreen from '../screens/CompanyHomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import SosScreen from '../screens/SosScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import EventsScreen from '../screens/EventsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

import AuthNavigator from './AuthNavigator';
import AsyncStorage from '@react-native-community/async-storage';

import * as authActions from '../store/actions/auth'; //Redux Actions
import * as userActions from '../store/actions/users'; //Redux Actions



const Tab = createBottomTabNavigator();
function TabNavigator(props) {
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
  const user = useSelector( state => state.firebase.profile);
  return (
    <HomeStack.Navigator>
      {/* { console.log("Home Nav Props::: ", props)} */}
      <HomeStack.Screen
        name="HomeScreen"
        component={user.type && user.type == 'Labourer' ? HomeScreen : CompanyHomeScreen}
        options={{
          headerTitle: "Home",
          headerLeft: () => (
            <ProfileHeader from={"Line 85 App Navigator"} size={36} paddingLeft={15} {...props} />
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
        options={({ route, navigation }) => ({ title: route.params.title,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.goBack()
              }}
            />
          ),
          headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName="menu" onPress={ () => { props.navigation.toggleDrawer()}} />
          </HeaderButtons>
          ) })}
      />  

    </HomeStack.Navigator>
  );
}

const SosStack = createStackNavigator<SosParamList>();

function Sos(props) {
  return (
    <SosStack.Navigator>
      <SosStack.Screen
        name="SosScreen"
        component={SosScreen}
        options={{ headerTitle: 'Sos',
        headerLeft: () => (
          <ProfileHeader from={"SOS Screen Header"} size={36} paddingLeft={15} navProps={props.navigation} />
        ),
        headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Menu" iconName="menu" onPress={ () => { props.navigation.toggleDrawer()}} />
        </HeaderButtons>
        ) }}
      />
      <SosStack.Screen
        name="JobDetailScreen"
        component={JobDetailScreen}
        options={{ headerTitle: 'OnDeck',
        headerLeft: () => (
          <ProfileHeader from={"SOS Stack Job Detail Header"} size={36} paddingLeft={15} navProps={props.navigation} />
        ),
        headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Menu" iconName="menu" onPress={ () => { props.navigation.toggleDrawer()}} />
        </HeaderButtons>
        ) }}
      />
    </SosStack.Navigator>
  );
}


const BrowseStack = createStackNavigator<BrowseParamList>();

function Browse(props) {
  return (
    <BrowseStack.Navigator>
      <BrowseStack.Screen
        name="BrowseScreen"
        component={BrowseScreen}
        options={{ headerTitle: 'Browse',
        headerLeft: () => (
          <ProfileHeader from={"Browse Screen Profile Header"} size={36} paddingLeft={15} navProps={props.navigation} />
        ),
        headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Menu" iconName="menu" onPress={ () => { props.navigation.toggleDrawer()}} />
        </HeaderButtons>
        ) }}
      />
      <BrowseStack.Screen
        name="JobDetailScreen"
        component={JobDetailScreen}
        options={{ headerTitle: 'OnDeck',
        headerLeft: () => (
          <ProfileHeader from={"Job Detail Screen Profile Header"} size={36} paddingLeft={15} navProps={props.navigation} />
        ),
        headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Menu" iconName="menu" onPress={ () => { props.navigation.toggleDrawer()}} />
        </HeaderButtons>
        ) }}
      />
    </BrowseStack.Navigator>
  );
}

const EventsStack = createStackNavigator<EventsParamList>();

function Events(props) {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name="EventsScreen"
        component={EventsScreen}
        options={{ headerTitle: 'Events',
        headerLeft: () => (
          <ProfileHeader from={"Events Header Profile"} size={36} paddingLeft={15} navProps={props.navigation} />
        ),
        headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Menu" iconName="menu" onPress={ () => { props.navigation.toggleDrawer()}} />
        </HeaderButtons>
        ) }}
      />
    </EventsStack.Navigator>
  );
}
const ProfileStack = createStackNavigator<ProfileParamList>();

function Profile(props) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={UserProfileScreen}
        options={({ navigation }) => ({
          title: 'Profile',
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.goBack()
              }}
            />
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item title="Menu" iconName="menu" onPress={ () => { props.navigation.toggleDrawer()}} />
            </HeaderButtons>
            )
        })}
      />
    </ProfileStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function Settings(props) {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={({ navigation }) => ({
          title: 'Settings',
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.goBack()
              }}
            />
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item title="Menu" iconName="menu" onPress={ () => { props.navigation.toggleDrawer()}} />
            </HeaderButtons>
            )
        })}
      />
    </SettingsStack.Navigator>
  );
}


function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  // console.log("Props in Custom Drawer COntent: ", props);
  // console.log("DRAWER PROPS: ", props.navigation.navigate);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />
      <DrawerItem label={() => <Text style={{ color: 'white' }}>Logout</Text>}
        style={{backgroundColor: Colors.secondary, position: 'absolute', bottom: 10, width: '92%'}} 
        onPress={() => {
          dispatch(authActions.logout()); 
          // props.navigation.navigate("Home");
        }}
          icon= {() => (
            <MaterialCommunityIcons name='logout' size={36} color="white" />
          )}
      />

    </DrawerContentScrollView>
  );
}



const Drawer = createDrawerNavigator();
function DrawerNavigator(props) {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Profile" component={ Profile } 
      options={({ navigation }) => ({
        headerTitle: "Hello",
        drawerIcon: () => (
          <ProfileHeader from={"Drawer Profile Button"} size={36} paddingLeft={0} navProps={props.navigation} />
        ),
        headerLeft: () => (
          <ProfileHeader from={"Drawer Profile Header"}
            size={36}
            paddingLeft={15}
            navProps={navigation}
          />
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Menu"
              iconName="menu"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
      })}

        />
        <Drawer.Screen name="Home" component={ TabNavigator } options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name='home-outline' size={36} />
          ),          
           }} />
        <Drawer.Screen name="Settings" style={{ position: 'absolute', bottom: 0}} component={ Settings } options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name='cogs' size={36} />
          ), 
          headerLeft: () => (
            <ProfileHeader from={"Drawer Settings"} size={36} paddingLeft={15} navProps={props.navigation} />
          ),
          headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName="menu" onPress={ () => { props.navigation.toggleDrawer()}} />
          </HeaderButtons>
          ) }} />
    </Drawer.Navigator>

  )
};
  

export default DrawerNavigator;