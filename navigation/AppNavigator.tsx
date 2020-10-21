import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch, connect } from 'react-redux';
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

import AuthNavigator from './AuthNavigator';
import AsyncStorage from '@react-native-community/async-storage';

import * as authActions from '../store/actions/auth'; //Redux Actions
import * as userActions from '../store/actions/users'; //Redux Actions

const AuthContext = React.createContext();


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
  console.log("Home navigator props", props.route);



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
  // console.log("DRAWER PROPS: ", props.navigation.navigate);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />
      <DrawerItem label={() => <Text style={{ color: 'white' }}>Logout</Text>}
        style={{backgroundColor: Colors.secondary, position: 'absolute', bottom: 10, width: '92%'}} 
        onPress={() => {
          dispatch(authActions.logout()); 
          props.navigation.navigate("Home", {screen: "AuthScreen"});
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
};
let App = ({ getUser, ...props }) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);
  const isSignUp = useSelector(state => state.auth.isSignUp);

  const [ authContext, setAuthContext ] = useState({
    user: {
      email: email,
      token: token,
      userId: userId,
      isSignUp: isSignUp,
    }
  });
  React.useEffect(() => {
    let userData;
    // Fetch the token from storage then navigate to our appropriate place
    if(!isSignUp){
    const tryLogin = async () => {
    userData = await AsyncStorage.getItem('userData');
    console.log("UserData found: ", userData);
    if( !userData ){
      console.log("No user data found, first catch");
      setAuthContext({
        user: {
          email: null,
          token: null,
          userId: null,
          isSignUp: isSignUp,
        }
      })
      // if no cached data for user, don't try transforming data
      return;
    };
    const transformedData = JSON.parse(userData);
    setAuthContext(transformedData);
    const { token, userId, expirationDate, email } = transformedData;
    if(new Date(expirationDate) <= new Date()){
      console.log("Expiry: ", expirationDate, " >= ", new Date().toISOString());
      return;
    }
    };
    tryLogin();
    console.log("Auth Context: ", authContext);
    }
  }, [email, userId, token, isSignUp]);


  const AppStack = createStackNavigator<AppStackParamList>();

  return (
    <AppStack.Navigator>
      { !authContext.user.token || !authContext.user.userId || authContext.user.isSignUp ? (
        <AppStack.Screen
        name="AuthScreen"
        component={AuthNavigator}
        options={{
          tabBarVisible: false,
          headerShown: false,
        }}
       />        
       ) :
      ( 
        <AppStack.Screen name="Home" component={DrawerNavigator} options={{
          headerShown: false,
        }}/>
      )
      }
    </AppStack.Navigator>

  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.user,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    getUser: (userId) => dispatch(userActions.get(userId))
  }
};
App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default App;