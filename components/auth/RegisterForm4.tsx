// This is the First page of the registration form, 
// It needs to start with registering an email and password to authorize with Firebase and return a userId.
// The userId from Firebase will be mapped later on to a profile record.

import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View, Alert, ActivityIndicator, ScrollView} from 'react-native';
import { Card, TextInput, Title, Paragraph, Button, Avatar, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import uuid from 'react-native-uuid';

import validation from '../../data/validation/CompanyValidation';
import DynamicForm from '../DynamicForm';
import * as _ from 'lodash';
import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';
import COMPANY_CATEGORIES from '../../data/stubbed/dummy-company-categories';

export default function RegisterForm4(props) {
  const [ companyTypes, setCompanyTypes ] = useState([]);
  const [ showTypeCards, setShowTypeCards ] = useState( true );
  // console.log(" USER AT PAGE 3: ", props.user);
  // name: "",
  //       ein: "",
  //       logo: '',
  //       rating: '',
  //       categories: [],
  //       description: "",
  //       locations: [],
  //       jobs: [],
  //       teamMembers: [],
  const fields = [
    [ {label: 'Company Icon', type: 'image-picker', name: 'logo', size: 'med'},
      {
        label: "Company Name",
        type: "input",
        name: "name",
        placeholder: "Stark Industries",
        icon: "store",
        size: "mlrg",
      },
      {
        label: "Description",
        type: "input",
        name: "description",
        placeholder: "Short description of yourself. Maybe say what you're looking for.!",
        icon: "comment-text-outline",
        size: "lrg",
      },
    ],
    [
      {
        label: "EIN",
        type: "input",
        name: "ein",
        placeholder: "123456789",
        icon: "account-badge-horizontal-outline",
        size: "lrg",
      },
      {
        label: "Site Name",
        type: "input",
        name: "locations.[0].siteName",
        placeholder: "Perth, WA, Australia",
        icon: "map-marker-outline",
        size: "lrg",
      },
      {
        label: "Address",
        type: "input-location",
        name: "locations.[0].address",
        placeholder: "Perth, WA, Australia",
        icon: "map-marker-outline",
        size: "lrg",
      },
    ],
  ];

  const toggleShowTypeCards = () => {
    setShowTypeCards(!showTypeCards);
  };
  const handleSetTypes = () => {
    props.handleSetCompanyTypes(companyTypes);
    toggleShowTypeCards();
  };
  const toggleSelectTypes = (categoryId, selected) => {
    let temp = companyTypes;
    selected ? setCompanyTypes(_.without(temp, categoryId)) : setCompanyTypes([ ...companyTypes, categoryId]);  
    // console.log("Toggling, companyTypes: ", temp);  
  };
  const renderTypeCards = () => {
    // id: 3,
    // title: "Gig",
    // description: "Gigs are temporary, flexible jobs where you will be considered a contractor or freelancer.",
    // icon: "run-fast"
    return(COMPANY_CATEGORIES.map((cat) => {
      let selected = companyTypes.includes(cat.id);
      // console.log(selected, cat.id);
      return(
        <Card key={cat.id} elevation={15} onPress={() => toggleSelectTypes(cat.id, selected)} style={{ opacity: selected ? .8 : 1, width: '100%', marginVertical: 5 }}>
          
          <Card.Title title={cat.title}
          left={({props}) => <Avatar.Icon {...props} size={40} style={{backgroundColor: Colors.primary}}  icon={cat.icon} />}
          right={({props}) => <IconButton {...props} size={30} icon='information-outline' onPress={ () => Alert.alert(cat.title, cat.description)} />}

          />
        </Card>
      )
    }));
  };
  const handleSubmit = (values) => {
    // console.log("SUBMITTING COMPANY: ", values);
    let refId = uuid.v4();
    let siteId = uuid.v4();
    // console.log("SITE ID: ", siteId);
    let company = values;
    company.locations[0].siteId = siteId;
    company.refId = refId;
    props.handleNext(values);
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: 'center'}}>
        <Paragraph style={{ fontStyle: 'italic'}}>
          Let's create your company account.
        </Paragraph>
      </View>
        
      <View style={ styles.formContainer }>
        {
          showTypeCards ?
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', }}>
                  <Title style={{ flex: 1, flexWrap: 'wrap', }}>Which industry(ies) best describe your business?</Title>
                </View>
                <View style={{flex: 8, padding: 5, width: '100%', marginTop: 20, }}>
                  <ScrollView style={{  }} contentContainerStyle={{ width: '100%',}}>
                  { renderTypeCards() }
                  </ScrollView>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <TouchableHighlight onPress={ () => toggleSelectTypes() } style={{ padding: 10, }}>
                    <Paragraph>Skip for now</Paragraph>
                  </TouchableHighlight>
                  <Button disabled={companyTypes.length > 0 ? false : true} onPress={() => handleSetTypes()} style={{}}
                  type="submit"
                  icon={"check-circle-outline"}
                  mode="contained"
                  title="Submit"
                  color="#00578A">
                  Submit
                </Button>
                </View>
                
            </View>
          :
          <View>
          
          <DynamicForm
            fields={fields}
            data={props.company}
            validation={validation}
            paginated={ true }
            page={ props.page }
            handleCancel={ props.handlePrev }
            handleSubmit={ handleSubmit }
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
    width: '100%',
    borderRadius: 5,
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
