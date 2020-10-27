import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ScrollView, ImageBackground, TouchableWithoutFeedback, Text, Image, View, Dimensions, Animated, Easing, Platform, Alert, ActivityIndicator } from 'react-native';
import { Button, TextInput, Avatar, Paragraph } from 'react-native-paper';
import Colors from '../constants/Colors.ts';
// import { Text, View, } from '../components/Themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Wave from 'react-native-waveview';
import * as _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth'; //Redux Actions
import * as userActions from '../store/actions/users'; //Redux Actions
import * as companyActions from '../store/actions/companies'; //Redux Actions


import RegisterForm1 from '../components/auth/RegisterForm1';
import RegisterForm2 from '../components/auth/RegisterForm2';
import RegisterForm3 from '../components/auth/RegisterForm3';
import RegisterForm4 from '../components/auth/RegisterForm4';

import Logo from '../assets/images/OD_Logo.svg';
import AsyncStorage from '@react-native-community/async-storage';


export default function RegisterScreen(props) {
    const dispatch = useDispatch();
    const [currentRotation, setCurrentRotation] = useState(-(Math.floor(Math.random() * 30) + 20));
    const [nextRotation, setNextRotation] = useState((Math.floor(Math.random() * 30) + 20));
    // console.log("USER ID: ", userId);
    const [animated, setAnimated] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState();
    const [ page, setPage ] = useState( 1 );
    const [ authInput, setAuthInput ] = useState({
        email: '',
        password: '',
    });
    const [userInput, setUserInput] = useState({
        userId: '',
        type: '',
        contactInfo: {
            email: '',
            phone: '',
        },
        fullName: '',
        location: {
            currentLocation: '',
            home: {
                address: '',
                latitude: '',
                longitude: ''
            }
        },
        preferences: {
            autoUpdateLocation: false,
            notifications: false,
            theme: "default",
            jobCategories: [],
        },
        profile: {
            avatar: null,
            bio: "",
            certificates: [
                {type: '', frontImage: '', backImage: ''}
            ],
            resume: "",
        },

    });
    // address: {
    //     line1: "71 Hobart St",
    //     line2: "",
    //     zipCode: "",
    //     city: "Riverstone",
    //     state: "NSW",
    //     country: "Australia",
    //   },
    // coordinates: {
    //     lat: "-33.6607668",
    //     long: "150.8740506",
    //   }
    const [ companyInput, setCompanyInput ] = useState({
        companyId: '',
        name: "",
        ein: "",
        icon: '',
        categories: [],
        description: "",
        locations: [
            {
                address: '',
                siteName: '',
                siteId: '',
            },
        ],
        jobs: [],
        teamMembers: [],
    });
    const prevPage = (  ) => {
        page == 1 ? setPage(1) : setPage(page-1);
    };
    const nextPage = ( values ) => {
        console.log("UserInput on NextPage: ", userInput, page);
        if(userInput.type == '' || userInput.type == "Labourer"){
            console.log("User flow: ");
            setUserInput(values);
            if(page == 3){
                createUser(values)
            };
        } else if (userInput.type == "Business") {
            console.log("VALUES AFTER NEXT: ", "PAGE: ", page, values, userInput);
            if(page==4){
                console.log("~~~~~~~~~~~~~Page4Action~~~~~~~~~~~~~~~~")
                createBusiness(values);
                createUser(userInput);
            } else {
                setUserInput(values);
            };
            // console.log("GOing to nexT PaGE", page+1);
        };
        setPage(page+1);
    };
    const signUpHandler = async (input) => {
        setError(null);
        setIsLoading(true);
        try {
          const user = await dispatch(authActions.signUp(input));
        //   console.log( "User Authorized: ", user);

        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
        let tempUser = userInput;
        tempUser.contactInfo.email = input.email;
        setUserInput(tempUser);
        setIsLoading(false);
        nextPage(userInput);
      };
      const createUser = async (input) => {
        setError(null);
        setIsLoading(true);
        try {
          const user = await dispatch(userActions.create(input));
          let userData = await AsyncStorage.getItem('userData');
          let authContext = {
                email: userData.email,
                token: userData.token,
                userId: userData.userId,
                isSignUp: false,
          };
          if(authContext){
              await dispatch(authActions.authenticate(authContext));
              await dispatch(userActions.get(authContext.userId));
              setIsLoading(false);
          };
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }

    };
    const createBusiness = async (values) => {
        console.log("CREATING BUSINESS", values);
        let userId = userInput.userId;
        let company = values;
        company.teamMembers.push(userId);
        console.log("Then create business");
        setError(null);
        setIsLoading(true);
        try {
          const newCompany = await dispatch(companyActions.create(company));
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
    };
    const handleSetType = (type) => {
        setUserInput({
            ...userInput,
            type: type
        });
        console.log(userInput);
    };
    const handleSetJobTypes = (types) => {
        let newUserInputs = userInput;
        newUserInputs.preferences.jobCategories = types;
        setUserInput(newUserInputs);
        console.log(userInput);
    };
    const handleSetCompanyTypes = (types) => {
        let newCompanyInput = companyInput;
        newCompanyInput.categories = types;
        setCompanyInput(newCompanyInput);

    };

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
                return <RegisterForm1 page={ page } handleNext={ nextPage } handlePrev={ prevPage } handleSignUp={ signUpHandler } error={error} isLoading={isLoading} auth={ authInput } />;

            case 2: 
                return <RegisterForm2 page={ page } handleNext={ nextPage } handlePrev={ prevPage } handleSetType={ handleSetType }  user={ userInput } />;

            case 3: 
                return <RegisterForm3 page = { page } handleNext={ nextPage } handlePrev={ prevPage } handleSetJobTypes={ handleSetJobTypes } user={ userInput } />;
            case 4:
                return <RegisterForm4 page = { page } handleNext={ nextPage } handlePrev={ prevPage } handleSetCompanyTypes={ handleSetCompanyTypes } company={ companyInput } />;
        }
    };
    



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
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '10%'}}>
                    <View style={{ alignItems: 'center',}}>
                        <Paragraph>Login Info</Paragraph>
                        <Avatar.Icon size={page==1? 60 : 50} icon="account-key" style={{backgroundColor: page >=1? Colors.primary: Colors.primaryLight, elevation: 10}}/>
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <Paragraph> { userInput.type == '' || userInput.type == 'Labourer' ? '- - -' : '-'} </Paragraph>
                    </View>
                    <View style={{ alignItems: 'center',}}>
                        <Paragraph>About You</Paragraph>
                        <Avatar.Icon size={ page==2? 60 : 50}  icon="account-details" style={{backgroundColor: page >=2? Colors.primary: Colors.primaryLight, elevation: 10}}/>
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <Paragraph> {userInput.type == '' || userInput.type == 'Labourer' ? '- - -' : '-'} </Paragraph>
                    </View>
                    <View style={{ alignItems: 'center',}}>
                        <Paragraph>Preferences</Paragraph>
                        <Avatar.Icon size={ page==3? 60 : 50}  icon="account-settings" style={{backgroundColor: page >=3? Colors.primary: Colors.primaryLight, elevation: 10}}/>
                    </View>
                    { userInput.type !='' && userInput.type == 'Business' ? (
                        <>
                        <View style={{ paddingTop: 20 }}>
                            <Paragraph> - </Paragraph>
                        </View>
                        <View style={{ alignItems: 'center',}}>
                            <Paragraph>Business Setup</Paragraph>
                            <Avatar.Icon size={ page==4? 60 : 50}  icon="store" style={{backgroundColor: page >=4? Colors.primary: Colors.primaryLight, elevation: 10}}/>
                        </View>
                        </>
                    ) : ( null )}
                </View> 
                <View style={{ flex: 10, width: '100%' }}>
                {
                    showPage()
                }
                </View>

                
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
        zIndex: 4,
        marginTop: -50,
        flex: 15,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: "rgba(255,255,255, .9)",
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
