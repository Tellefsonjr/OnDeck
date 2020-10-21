// This is the First page of the registration form, 
// It needs to start with registering an email and password to authorize with Firebase and return a userId.
// The userId from Firebase will be mapped later on to a profile record.

import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View, Alert, ActivityIndicator, ScrollView} from 'react-native';
import { Card, TextInput, Title, Paragraph, Button, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import validation from '../../data/validation/UserValidation';
import DynamicForm from '../DynamicForm';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';

export default function RegisterForm2(props) {
  const [ userType, setUserType ] = useState( props.user.type );
  const [ showTypeCards, setShowTypeCards ] = useState( true );
  const userId = useSelector(state => state.auth.userId);
  const fields = [
    [ {label: 'Avatar', type: 'image-picker', name: 'profile.avatar', size: 'med'},
      {
        label: "Full Name",
        type: "input",
        name: "fullName",
        placeholder: "John Doe",
        icon: "",
        size: "mlrg",
      },
    ],
    [
      {
        label: "Phone Number",
        type: "input",
        name: "contactInfo.phone",
        placeholder: "123456789",
        icon: "phone-outline",
        size: "lrg",
      },
      {
        label: "Location",
        type: "input",
        name: "location.home.address",
        placeholder: "Perth, WA, Australia",
        icon: "map-marker-outline",
        size: "lrg",
      },
      {
        label: "Bio",
        type: "input",
        name: "profile.bio",
        placeholder: "Short description of yourself. Maybe say what you're looking for.!",
        icon: "account-details",
        size: "lrg",
      },
    ],
    [ {label: 'Select Certificate', type: 'select', name: 'profile.certificates[0].type', default: 'Select Certificate', icon: 'account-card-details', size: 'sm',
    data: ['White Card', 'Blue Card', 'Yellow Card'],},
      { label: 'Front', type: 'document-picker', name: 'profile.certificates[0].frontImage', size: 'sm' },
      { label: 'Back', type: 'document-picker', name: 'profile.certificates[0].backImage', size: 'sm' },
    ],
  ];

  const toggleShowTypeCards = () => {
    setShowTypeCards(!showTypeCards);
  };
  const handleSetType = (type) => {
    props.handleSetType(type);
    toggleShowTypeCards();
  };
  const handleSubmit = (values) => {
    // console.log("VALUES on Second PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~: ", values);
    values.userId = userId;
    props.handleNext(values);
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
        <Paragraph style={{ fontStyle: 'italic'}}>
          Tell us more about yourself.
        </Paragraph>
      </View>
        
      <View style={ styles.formContainer }>
        {
          showTypeCards ?
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
                <Card elevation={30} onPress={() => handleSetType("Labourer")}>
                <Card.Content style={{ alignItems: 'center'}}>
                    <Icon name="hard-hat" size={40} />
                  </Card.Content>
                  <Card.Title title="Labourer" subtitle="I am looking for work." />
                </Card>
                <Card elevation={30} style={{  marginTop: 20, padding: 5, width: '100%'}}  onPress={() => handleSetType("Business")}>
                <Card.Content style={{ width: '100%', alignItems: 'center'}}>
                    <Icon name="store" size={40} />
                  </Card.Content>
                  <Card.Title title="Business" subtitle="I am looking for labourers." />                  
                </Card>
            </View>
          :
          <View>
          <TouchableHighlight onPress={ () => toggleShowTypeCards() } style={{ padding: 10, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <Paragraph>I am a labourer</Paragraph>
            <Avatar.Icon size={50} icon={props.user.type == "Labourer"? 'hard-hat' : 'store'} style={{backgroundColor:Colors.primary}} />
            </View>
            
          </TouchableHighlight>
          <ScrollView>

          <DynamicForm
            fields={fields}
            data={props.user}
            validation={validation}
            paginated={ true }
            page={ props.page }
            handleCancel={ props.handlePrev }
            handleSubmit={ handleSubmit }
          />
          </ScrollView>

          </View>
          
        }
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    paddingBottom: 50
  },
  formContainer: {
    height: '90%',
    marginTop: 5

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
