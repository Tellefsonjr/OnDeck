import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ScrollView, ImageBackground, TouchableWithoutFeedback, Text, Image, View, Dimensions, Animated, Easing, Platform, Alert, ActivityIndicator } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Colors from '../constants/Colors.ts';
// import { Text, View, } from '../components/Themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Wave from 'react-native-waveview';
import * as _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../store/actions/users'; //Redux Actions

import RegisterForm1 from '../components/auth/RegisterForm1';
import RegisterForm2 from '../components/auth/RegisterForm2';
import RegisterForm3 from '../components/auth/RegisterForm3';

import Logo from '../assets/images/OD_Logo.svg';


export default function RegisterScreen(props) {
    const dispatch = useDispatch();
    const [currentRotation, setCurrentRotation] = useState(-(Math.floor(Math.random() * 30) + 20));
    const [nextRotation, setNextRotation] = useState((Math.floor(Math.random() * 30) + 20));
    const [animated, setAnimated] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState();
    const [ page, setPage ] = useState( 1 );
    const [input, setInput] = useState({
        email: '',
        password: '',
    })
    const prevPage = (  ) => {
        page == 1 ? setPage(1) : setPage(page-1);
    };
    const nextPage = (  ) => {
        page == 3 ? setPage(3) : setPage( page+1);
    };

    const signUpHandler = async (input) => {
        setError(null);
        setIsLoading(true);
        try {
          await dispatch(userActions.signUp(input));
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    const spinValue = useRef(new Animated.Value(0)).current;

    const useAnimate = (startDelay = 500) => {

        const animate = (toValue) => {
            Animated.timing(
                spinValue,
                {
                    toValue: toValue,
                    duration: 6000,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true
                }
            ).start(() => {
                const newValue = toValue == 0 ? 1 : 0;
                //console.log("Newvalue: ", Platform.OS, newValue);
                newValue == 1 ? setNextRotation((Math.floor(Math.random() * 30) + 20)) : setCurrentRotation(-(Math.floor(Math.random() * 30) + 20));
                // console.log("Finished Animation", toValue, currentRotation, nextRotation);
                animate(newValue);
            });
        };

        useEffect(() => {
            const timeout = setTimeout(() => animate(), startDelay);
            return () => clearTimeout(timeout);
        }, []);

        return spinValue;
    };

    useEffect( () => {
        if(error){ 
          Alert.alert('An error occurred!', error, [{ text: 'Dismiss' }])
        }
      }, [error])


    const showPage = () => {
        switch (page) {
            case 1:
                return <RegisterForm1 page={page} handleNext={ nextPage } handlePrev={ prevPage } handleSignUp={ signUpHandler } error={error} isLoading={isLoading} />;

            case 2: 
                return <RegisterForm2 page={page} handleNext={ nextPage } handlePrev={ prevPage } />;

            case 3: 
                return <RegisterForm3 page={page} handleNext={ nextPage } handlePrev={ prevPage } />;
        }
    }



    return (
        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
                <View style={styles.logoNameContainer}>
                    <Text style={styles.logoName}></Text>
                </View>
                <Animated.View style={[styles.logoContainer, { transform: [{ rotate: useAnimate() }] }, { perspective: 1000 }]}>
                    <Logo width={250} height={250} fill={'#fff'} />
                </Animated.View>

                <Wave
                    style={styles.wave}
                    H={300}
                    waveParams={[
                        { A: 50, T: 600, fill: 'rgba(98,194,255,.8)' },
                        { A: 60, T: 540, fill: 'rgba(0,135,221,.8)' },
                        { A: 70, T: 500, fill: 'rgba(3,102,163,.7)' },
                    ]}
                    speed={12000}
                    animated={animated}
                />
            </View>

            <View style={ styles.formContainer }>
                {
                    showPage()
                }

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundContainer: {
        flex: 1
    },
    logoContainer: {
        zIndex: 2,
        alignItems: 'center',
        opacity: .75,
    },
    logoNameContainer: {
        zIndex: 3,
        marginTop: '5%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        opacity: .75,
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
    formContainer: {
        marginTop: -20,
        flex: 15,
        justifyContent: 'center', 
        alignItems: 'center',
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
});
