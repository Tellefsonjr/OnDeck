import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ScrollView, ImageBackground, TouchableWithoutFeedback, Text, Image, View, Dimensions, Animated, Easing, Platform } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import Colors from '../constants/Colors.ts';
// import { Text, View, } from '../components/Themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Wave from 'react-native-waveview';
import * as _ from 'lodash';

import Logo from '../assets/images/OD_Logo.svg';


export default function LoginScreen(props) {
  const [ currentRotation, setCurrentRotation ] = useState(-(Math.floor(Math.random() * 30 ) + 20));
  const [ nextRotation, setNextRotation ] = useState((Math.floor(Math.random() * 30 ) + 20));
  const [ input, setInput ] = useState({
    email: '',
    password: '',
  })

  const spinValue = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

  React.useEffect(() => {
    function animate(toValue){
      Animated.timing(
        spinValue,
        {
          toValue: toValue,
          duration: 6000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true
        }
      ).start(() => {
        newValue = toValue == 0? 1 : 0;
        newValue == 1? setNextRotation((Math.floor(Math.random() * 30 ) + 20)) : setCurrentRotation(-(Math.floor(Math.random() * 30 ) + 20));
        // console.log("Finished Animation", toValue, currentRotation, nextRotation);
        animate(newValue);
      });
    }
    animate(1);
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: [`${currentRotation}deg`, `${nextRotation}deg`]
  });

  return (
    <View style={ styles.container }>
      <View>
      <View style={ styles.logoNameContainer }>
        <Text style={ styles.logoName }>OnDeck</Text>
      </View>
      <Animated.View style={ [styles.logoContainer, { transform: [{ rotate: spin}] }] }>
        <Logo width={250} height={250} fill={'#fff'} />
      </Animated.View>

        <Wave
            style={ styles.wave }
            H={ 300 }
            waveParams={[
                {A: 60, T: 600, fill: 'rgba(98,194,255,.8)'},
                {A: 50, T: 540, fill: 'rgba(0,135,221,.8)'},
                {A: 45, T: 500, fill: 'rgba(3,102,163,.7)'},
            ]}
            speed={10000}
            animated={true}
        />
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={ Platform.OS == 'ios' ? -150 : 100 }
        keyboardShouldPersistTaps={'handled'}
        style={{ marginTop: '10%',}}
        contentContainerStyle={{  alignItems: 'center', justifyContent: 'space-between'}}
      >
      <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: 10, }}>
        <View style={{ width: '40%', backgroundColor: 'transparent', justifyContent: 'space-between',}}>
          <Button color='rgba(95,54,221,.9)' label="home" mode="contained" style={ styles.submitButton } onPress={ () => props.navigation.navigate('Home')}> Login </Button>
          <Button color='rgba(95,54,221,.9)' label="home" mode="contained" style={ styles.submitButton } onPress={ () => props.navigation.navigate('Home')}> Register </Button>
        </View>
      </View>
        <View style={{ flex: 1, width: '80%', backgroundColor: 'transparent', justifyContent: 'space-between',}}>
          <TextInput onChangeText={(text) => setInput({...input, email: text})} label="Email" mode="outlined" style={ styles.textInput } value={ input.email }/>
          <TextInput onChangeText={(text) => setInput({...input, password: text})} label="Password" mode="outlined" style={ styles.textInput } value={ input.password }/>
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
    marginTop: '10%',
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