import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  Text,
  Image,
  View,
  Dimensions,
  Animated,
  Easing,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Button, TextInput, Avatar, Paragraph } from "react-native-paper";
import Colors from "../constants/Colors.ts";
// import { Text, View, } from '../components/Themed';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Wave from "react-native-waveview";
import * as _ from "lodash";
import { useSelector, useDispatch, connect as connectRedux } from "react-redux";
import * as authActions from "../store/actions/auth"; //Redux Actions
import * as userActions from "../store/actions/users"; //Redux Actions
import * as companyActions from "../store/actions/companies"; //Redux Actions

import RegisterForm1 from "../components/auth/RegisterForm1";
import RegisterForm2 from "../components/auth/RegisterForm2";
import RegisterForm3 from "../components/auth/RegisterForm3";
import RegisterForm4 from "../components/auth/RegisterForm4";

import Logo from "../assets/images/OD_Logo.svg";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "formik";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const RegisterScreen = (props) => {
  const dispatch = useDispatch();
  // console.log("USER ID: ", userId);
  const [animated, setAnimated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(props.authError);
  const [page, setPage] = useState(1);
  const [input, setInput ] = useState({
    auth: {
        email: "",
        password: "",
    },
    user: {
        type: "",
        contactInfo: {
          email: "",
          phone: "",
        },
        fullName: "",
        location: {
          currentLocation: "",
          home: {
            address: "",
            latitude: "",
            longitude: "",
          },
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
          certificates: [{ type: "", frontImage: "", backImage: "" }],
          resume: "",
        },
        companyRefId: "",
    },
    company: {
        refId: "",
        name: "",
        ein: "",
        icon: "",
        categories: [],
        description: "",
        locations: [
          {
            address: "",
            siteName: "",
            siteId: "",
          },
        ],
        jobs: [],
        teamMembers: [],
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
  const prevPage = () => {
    page == 1 ? setPage(1) : setPage(page - 1);
  };
  const nextPage = (values) => {
    console.log("input.user on NextPage: ", input.user, page);
    if (input.user.type == "") {
      setInput({
          ...input,
          user: values
      });
    }
    if (input.user.type == "Labourer") {
      console.log("User flow: ");
      setInput({
          ...input,
          user: values
      });
      if (page == 3) {
          console.log("Setting user and auth", input);
        signUpHandler(input);
      }
    } else if (input.user.type == "Business") {
      if ( page == 1 || page == 2 ){
        console.log("~~~~~~~~~~~~~Page1or2BusinessAction~~~~~~~~~~~~~~~~");
        setInput({
          ...input,
          user: values,
        });
      };
      if (page == 3) {
        console.log("~~~~~~~~~~~~~Page3BusinessAction~~~~~~~~~~~~~~~~");
        setInput({
          ...input,
          company: values,
        })
      };
      if (page == 4) {
        console.log("~~~~~~~~~~~~~Page4BusinessAction~~~~~~~~~~~~~~~~");
        signUpHandler(input);
      } else {
        console.log("Found an edge case in NextPage()");
      }
      // console.log("GOing to nexT PaGE", page+1);
    }
    setPage(page + 1);
  };
  const signUpHandler = async (values) => {
    console.log("VALUES AT SIGNUPHANDLER: ", values);
    setError(null);
    setIsLoading(true);
    let tempInput = input;
    console.log('TEMP INPUT AT SIGN UP HANDLER~~~~~~~', tempInput);
    tempInput.user.companyRefId = tempInput.company.refId;
    tempInput.auth = values;
    let tempUser = input.user;
    tempUser.contactInfo.email = tempInput.auth.email;
    setInput({
        ...input,
        user: tempUser
    });
    props.signUp(input);
    setIsLoading(false);
  };
  const handleSetType = (type) => {
    let newUser = input.user;
    newUser.type = type;
    setInput({
        ...input,
        user: newUser
    });
    console.log(input.user);
  };
  const handleSetJobTypes = (types) => {
    let tempUser = input.user;
    tempUser.preferences.jobCategories = types;
    setInput({
        ...input,
        user: tempUser
    });
    console.log(input.user);
  };
  const handleSetCompanyTypes = (types) => {
    let tempCompany = input.company;
    tempCompany.categories = types;
    setInput({
      ...input,
      company: tempCompany
    });
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Dismiss", onPress: () => setError(null) }]);
    }
  }, [error]);

  const showPage = () => {
    switch (page) {
      case 1:
        return (
            <RegisterForm2
              page={page}
              handleNext={nextPage}
              handlePrev={prevPage}
              handleSetType={handleSetType}
              user={input.user}
            />
        );

      case 2:
        return (
            <RegisterForm3
              page={page}
              handleNext={nextPage}
              handlePrev={prevPage}
              handleSetJobTypes={handleSetJobTypes}
              user={input.user}
            />
        );

      case 3:
        if (input.user.type == 'Labourer'){
            return (
                <RegisterForm1
                  page={page}
                  handleNext={nextPage}
                  handlePrev={prevPage}
                  handleSignUp={signUpHandler}
                  error={error}
                  isLoading={isLoading}
                  auth={input.auth}
                />
              );
        } else {
            return (
                <RegisterForm4
                  page={page}
                  handleNext={nextPage}
                  handlePrev={prevPage}
                  handleSetCompanyTypes={handleSetCompanyTypes}
                  company={input.company}
                />
              );
        }
      case 4:
        return (
            <RegisterForm1
              page={page}
              handleNext={nextPage}
              handlePrev={prevPage}
              handleSignUp={signUpHandler}
              error={error}
              isLoading={isLoading}
              auth={input.auth}
            />
          );
    }
  };

  const renderStepIcons = () => {
    let pages = [
        { 
            icon: 'account-details',
            title: 'About You',
        },
        {
            icon: 'account-settings',
            title: 'Preferences',
        },
        {
            icon: input.user.type == 'Business' ? 'store' : 'account-key',
            title: input.user.type == 'Business' ? 'Your Company' : 'Login Info',
        },
    ];
    if(input.user.type == 'Business'){
        pages.push({
            icon: 'account-key',
            title: 'Login Info'
        })
    };
    return(
        pages.map((p, index) => {
            let isCurrent = page == index + 1 ? true : false;
            return(
                <View key={index} style={{ alignItems: "center" }}>
                    <Paragraph>{p.title}</Paragraph>
                    <Avatar.Icon
                    size={isCurrent ? 60 : 50}
                    icon={p.icon}
                    style={{
                        backgroundColor:
                        isCurrent ? Colors.primary : Colors.primaryLight,
                        elevation: 10,
                    }}
                    />
                </View>
            )
        })
        
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.logoNameContainer}>
          <Text style={styles.logoName}></Text>
        </View>
        <View style={ styles.logoContainer }>
            <Logo width={250} height={250} fill={"#fff"} />

        </View>

        <Wave
          style={styles.wave}
          H={300}
          waveParams={[
            { A: 50, T: 600, fill: "rgba(98,194,255,.8)" },
            { A: 60, T: 540, fill: "rgba(0,135,221,.8)" },
            { A: 70, T: 500, fill: "rgba(3,102,163,.7)" },
          ]}
          speed={12000}
          animated={animated}
        />
      </View>

      <View style={styles.formContainer}>
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10%",
            }}
            >
            { renderStepIcons(page) }  
        </View>
        <View style={{ flex: 10, width: "100%" }}>{showPage()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
  },
  logoContainer: {
    zIndex: 2,
    alignItems: "center",
    opacity: 0.75,
  },
  logoNameContainer: {
    zIndex: 3,
    marginTop: "5%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.75,
  },
  logoName: {
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic",
    textShadowOffset: {
      width: 50,
      height: 50,
    },
    textShadowColor: "rgba(0,0,0,.75)",
    textShadowRadius: 10,
  },
  formContainer: {
    zIndex: 4,
    marginTop: -50,
    flex: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255, .9)",
  },
  waveContainer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width * 1.2,
    aspectRatio: 1,
    position: "absolute",
    zIndex: 1,
    overflow: "hidden",
  },
  wave: {
    width: 500,
    height: Dimensions.get("window").height,
    aspectRatio: 1,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "white",
  },
  textInput: {
    backgroundColor: "rgba(255,255,255,.7)",
    height: 40,
  },
});

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        companyId: state.firebase.profile.companyId,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (input) => dispatch(authActions.signUp(input)),
        createCompany: (input) => dispatch(companyActions.create(input)),
    }
};


export default compose(
  connectRedux(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => ['companies'])
)(RegisterScreen);