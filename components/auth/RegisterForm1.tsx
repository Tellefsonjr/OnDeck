// This is the First page of the registration form,
// It needs to start with registering an email and password to authorize with Firebase and return a userId.
// The userId from Firebase will be mapped later on to a profile record.

import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Card, TextInput, Title, Paragraph, Button , Portal, Provider, Modal} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import validation from "../../data/validation/AuthValidation";
import DynamicForm from "../DynamicForm";

import Colors from "../../constants/Colors";
import { MonoText } from "../StyledText";

export default function RegisterForm1(props) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [ showModal, setShowModal ] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  }
  const renderIndicators = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons
          name={props.page >= 1 ? "circle" : "circle-outline"}
          size={14}
          color="white"
        />
        <MaterialCommunityIcons
          name={props.page >= 2 ? "circle" : "circle-outline"}
          size={14}
          color="white"
        />
        <MaterialCommunityIcons
          name={props.page >= 3 ? "circle" : "circle-outline"}
          size={14}
          color="white"
        />
      </View>
    );
  };
  const fields = [
    [
      {
        label: "Email",
        type: "input",
        name: "email",
        placeholder: "email@example.com",
        icon: "email-outline",
        size: "lrg",
      },
      {
        label: "Password",
        type: "input",
        name: "password",
        placeholder: "*******",
        icon: "lock-outline",
        size: "lrg",
      },
    ],
  ];
  return (
    <View style={styles.container}>
        <Title>Login Information</Title>
        <Paragraph>
          Let's start with the basics, enter your email and password below.{" "}
        </Paragraph>
      <View style={ styles.formContainer }>
        <TouchableHighlight onPress={() => toggleModal() }>
          <Paragraph style={{ color: Colors.text, opacity: .7}}> Terms and Conditions </Paragraph>
        </TouchableHighlight>
        <DynamicForm
          fields={fields}
          data={props.auth}
          validation={validation}
          paginated={ true }
          page={ props.page }
          handleCancel={ props.handlePrev }
          handleSubmit={ props.handleSignUp }
        />
        { showModal ? 
        <Portal>
          <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={{ alignItems: 'center' }}>
              <View style={{ padding: 10, height: '90%', width: '90%', backgroundColor: 'white', borderRadius: 5}}>

            <Title>Terms and Conditions</Title>
            <ScrollView contentContainerStyle={{ padding: 5}}>
              <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam dignissim diam quis enim lobortis scelerisque. Et malesuada fames ac turpis egestas maecenas pharetra. Ut eu sem integer vitae justo eget magna. Diam quam nulla porttitor massa id neque. Semper eget duis at tellus. Tristique sollicitudin nibh sit amet. Purus in massa tempor nec feugiat nisl pretium. Vel fringilla est ullamcorper eget. Pellentesque pulvinar pellentesque habitant morbi tristique senectus.</Paragraph>

              <Paragraph>Sed faucibus turpis in eu mi. At risus viverra adipiscing at in. Amet facilisis magna etiam tempor orci eu lobortis elementum. Arcu non odio euismod lacinia at quis. Egestas maecenas pharetra convallis posuere morbi leo urna molestie. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Sed lectus vestibulum mattis ullamcorper velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Est placerat in egestas erat imperdiet sed euismod.</Paragraph>

              <Paragraph>Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Leo a diam sollicitudin tempor. Nunc sed velit dignissim sodales ut eu. Id ornare arcu odio ut sem nulla pharetra diam. Parturient montes nascetur ridiculus mus mauris. Nec ullamcorper sit amet risus nullam eget felis eget nunc. Nunc sed velit dignissim sodales ut eu sem integer. Placerat orci nulla pellentesque dignissim. Nec ultrices dui sapien eget mi. Pharetra convallis posuere morbi leo urna molestie. Posuere morbi leo urna molestie. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat.</Paragraph>

              <Paragraph>Ut diam quam nulla porttitor massa. Nunc consequat interdum varius sit amet mattis vulputate enim nulla. Sit amet commodo nulla facilisi nullam. Id ornare arcu odio ut sem. Purus in massa tempor nec feugiat nisl pretium fusce. Sit amet cursus sit amet. Molestie at elementum eu facilisis sed odio morbi quis. Nec feugiat nisl pretium fusce. Mattis molestie a iaculis at erat. Mi ipsum faucibus vitae aliquet nec ullamcorper. Pulvinar neque laoreet suspendisse interdum consectetur libero. Faucibus in ornare quam viverra orci sagittis eu volutpat. Vivamus at augue eget arcu dictum varius duis at. Vestibulum rhoncus est pellentesque elit ullamcorper. Neque vitae tempus quam pellentesque nec nam.</Paragraph>

              <Paragraph>Commodo quis imperdiet massa tincidunt nunc pulvinar. Convallis a cras semper auctor neque vitae tempus. Pretium fusce id velit ut tortor pretium viverra suspendisse. Consectetur adipiscing elit ut aliquam purus sit amet. Id donec ultrices tincidunt arcu non. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Vulputate sapien nec sagittis aliquam. Ac turpis egestas integer eget aliquet nibh praesent.</Paragraph>
            </ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'space-between'}}>
              <Button color={Colors.primary} onPress={() => setShowModal(false)}>Close</Button>
            </View>
            </View>

          </Modal>
        </Portal>

        :
        null
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    elevation: 10,
    padding: 10,
    paddingBottom: 50
  },
  formContainer: {
    height: '90%',
    marginTop: 20

  },
  textInput: {
    marginVertical: 10,
    height: 40,
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  submitButton: {
    marginVertical: 2.5,
    backgroundColor: "rgba(95,54,221,.9)",
  },
});
