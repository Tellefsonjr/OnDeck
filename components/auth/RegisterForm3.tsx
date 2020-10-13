// This is the First page of the registration form, 
// It needs to start with registering an email and password to authorize with Firebase and return a userId.
// The userId from Firebase will be mapped later on to a profile record.

import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View, Alert, ActivityIndicator, ScrollView} from 'react-native';
import { Card, TextInput, Title, Paragraph, Button, Avatar, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import validation from '../../data/validation/UserValidation';
import DynamicForm from '../DynamicForm';
import * as _ from 'lodash';
import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';
import JOB_CATEGORIES from '../../data/stubbed/dummy-job-categories';

export default function RegisterForm3(props) {
  const [ jobTypes, setJobTypes ] = useState([]);
  const [ showTypeCards, setShowTypeCards ] = useState( true );
  const fields = [
    [         
      {label: 'Auto Update Location?', type: 'switch', name: 'preferences.autoUpdateLocation', icon: 'map-marker-off', icon2: 'map-marker-check', size: 'med'},
      {label: 'Receive Notification?', type: 'switch', name: 'preferences.notifications', icon: 'bell-off', icon2: 'bell-ring', size: 'med'},
    ],
    [         
      {label: 'Theme', type: 'switch', name: 'preferences.theme', icon: 'brightness-2', icon2: 'brightness-5', size: 'med'},
      {label: 'Theme', type: 'switch', name: 'preferences.theme', icon: 'brightness-2', icon2: 'brightness-5', size: 'med'},
    ],
  ];

  const toggleShowTypeCards = () => {
    setShowTypeCards(!showTypeCards);
  };
  const handleSetType = (type) => {
    props.handleSetType(type);
    toggleShowTypeCards();
  };
  const toggleSelectType = (categoryId, selected) => {
    let temp = jobTypes;
    selected ? setJobTypes(_.filter(temp, categoryId)) : setJobTypes([ ...jobTypes, categoryId]);  
    console.log("Toggling, JobTypes: ", temp);  
  };
  const renderTypeCards = () => {
    // id: 3,
    // title: "Gig",
    // description: "Gigs are temporary, flexible jobs where you will be considered a contractor or freelancer.",
    // icon: "run-fast"
    return(JOB_CATEGORIES.map((cat) => {
      let selected = jobTypes.includes(cat.id);
      console.log(selected, cat.id);
      return(
        <Card key={cat.id} elevation={15} onPress={() => toggleSelectType(cat.id, selected)} style={{ opacity: selected ? .8 : 1, width: '100%', marginVertical: 5 }}>
          
          <Card.Title title={cat.title}
          left={({props}) => <Avatar.Icon {...props} size={40} style={{backgroundColor: Colors.primary}}  icon={cat.icon} />}
          right={({props}) => <IconButton {...props} size={30} icon='information-outline' onPress={ () => Alert.alert(cat.title, cat.description)} />}

          />
        </Card>
      )
    }));
  };
  return (
    <View style={styles.container}>
        <Title>Preferences</Title>
        <Paragraph>
          Customize your experience.
        </Paragraph>
      <View style={ styles.formContainer }>
        {
          showTypeCards ?
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                
                <Title>What type of jobs are you looking for?</Title>
                <View style={{ flexWrap: 'wrap', width: '90%',  flexDirection: 'row', justifyContent: 'space-around', padding: 5,}}>
                { renderTypeCards() }
                </View>
                
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                  <TouchableHighlight onPress={ () => toggleShowTypeCards() } style={{ padding: 10, }}>
                    <Paragraph>Skip for now</Paragraph>
                  </TouchableHighlight>
                </View>
                
            </View>
          :
          <View>
          
          <DynamicForm
            fields={fields}
            data={props.user}
            validation={validation}
            paginated={ true }
            page={ props.page }
            handleCancel={ props.handlePrev }
            handleSubmit={ props.handleNext }
          />
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
