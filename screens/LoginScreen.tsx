import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ScrollView, ImageBackground, TouchableWithoutFeedback, Text, Image, View, Dimensions, Animated, Easing, Platform, ActivityIndicator, Alert } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import Colors from '../constants/Colors.ts';
// import { Text, View, } from '../components/Themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Wave from 'react-native-waveview';
import * as _ from 'lodash';
import { useSelector, useDispatch, connect } from 'react-redux';
import * as authActions from '../store/actions/auth'; //Redux Actions
import * as userActions from '../store/actions/users'; //Redux Actions


import Logo from '../assets/images/OD_Logo.svg';


const LoginScreen = ( props ) => {
  const [ currentRotation, setCurrentRotation ] = useState(-(Math.floor(Math.random() * 30 ) + 20));
  const [ nextRotation, setNextRotation ] = useState((Math.floor(Math.random() * 30 ) + 20));
  const [ animated, setAnimated ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(props.authError);
  const [ input, setInput ] = useState({
    email: '',
    password: '',
  })
  // const spinValue = useRef(new Animated.Value(0)).current;

  // const useAnimate = (startDelay = 500) => {
  
  //   const animate = (toValue) => {
  //     Animated.timing(
  //       spinValue,
  //       {
  //         toValue: toValue,
  //         duration: 6000,
  //         easing: Easing.inOut(Easing.quad),
  //         useNativeDriver: true
  //       }
  //     ).start(() => {
  //       const newValue = toValue == 0? 1 : 0;
  //       //console.log("Newvalue: ", Platform.OS, newValue);
  //       newValue == 1? setNextRotation((Math.floor(Math.random() * 30 ) + 20)) : setCurrentRotation(-(Math.floor(Math.random() * 30 ) + 20));
  //       // console.log("Finished Animation", toValue, currentRotation, nextRotation);
  //       animate(newValue);
  //     });
  //   };

  //   useEffect(() => {
  //     const timeout = setTimeout(() => animate(), startDelay);
  //     return () => clearTimeout(timeout);
  //   }, []);
  
  //   return spinValue;
  // };
  const authHandler = () => {
    setError(null);
    setIsLoading(true);
    props.login(input);
    console.log("Signed in user: ", props.auth);

  }

  useEffect( () => {
    if(props.authError){ 
      Alert.alert('An props.authError occurred!', props.authError, [{ text: 'Dismiss', onPress: () => setIsLoading(false) }])
    }
  }, [props.authError])


  return (
    <View style={ styles.container }>
      <View>
      <View style={ styles.logoNameContainer }>
        <Text style={ styles.logoName }>OnDeck</Text>
      </View>
      {/* <View style={ [styles.logoContainer, { transform: [{ rotate: useAnimate()}] }, {perspective: 1000}] }> */}
      <View style={ [styles.logoContainer,]} >
        <Logo width={250} height={250} fill={'#fff'} />
      </View>

        <Wave
            style={ styles.wave }
            H={ 300 }
            waveParams={[
                {A: 50, T: 600, fill: 'rgba(98,194,255,.8)'},
                {A: 60, T: 540, fill: 'rgba(0,135,221,.8)'},
                {A: 70, T: 500, fill: 'rgba(3,102,163,.7)'},
            ]}
            speed={12000}
            animated={true}
        />
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={ Platform.OS == 'ios' ? -150 : 90 }
        keyboardShouldPersistTaps={'handled'}
        style={{ }}
        contentContainerStyle={{  alignItems: 'center', justifyContent: 'space-between'}}
      >
        <View style={{ flex: 1, width: '80%', backgroundColor: 'transparent', justifyContent: 'space-between',}}>
          <TextInput onChangeText={(text) => setInput({...input, email: text})} label="Email" mode="outlined" style={ styles.textInput } value={ input.email } keyboardType="email-address"/>
          <TextInput onChangeText={(text) => setInput({...input, password: text})} label="Password" mode="outlined" style={ styles.textInput } value={ input.password } secureTextEntry keyboardType="default"/>
        </View>
        <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: 10, }}>
          <View style={{ width: '40%', backgroundColor: 'transparent', justifyContent: 'space-between',}}>
            { isLoading == true ? 
              <ActivityIndicator size="small" color={Colors.primary} />
            :
              <Button color='rgba(95,54,221,.9)' mode="contained" style={ styles.submitButton } onPress={ () => {setAnimated(false); authHandler()}}> Login </Button>
            }
            <Button color='rgba(95,54,221,.9)' mode="contained" style={ styles.submitButton } onPress={ () => {setAnimated(false); props.navigation.navigate('Register')}}> Register </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(41,117,198,1)',
    flex: 1,
  },
  logoContainer: {
    zIndex: 2,
    alignItems: 'center',
  },
  logoNameContainer: {
    zIndex: 3,
    marginTop: '5%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logoName: {
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textShadowOffset: {
      width: 50,
      height: 50,
    },
    textShadowColor: 'rgba(0,0,0,.75)',
    textShadowRadius: 10,
  },
  waveContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width * 1.2,
    aspectRatio: 1,
    position: 'absolute',
    zIndex: 1,
    overflow: 'hidden'
  },
  wave: {
    width: 500,
    height: Dimensions.get('window').height,
    aspectRatio: 1,
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: 'white',
},
textInput: {
  backgroundColor: 'rgba(255,255,255,.7)',
  height: 40,
},
submitButton: {
  marginVertical: 2.5,
  backgroundColor: 'rgba(95,54,221,.9)'
}
});

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth,
      authError: state.auth.authError,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (input) => dispatch(authActions.login(input))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);