import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Picker, Platform } from 'react-native';
import Slider from '@react-native-community/slider';

import { Avatar, Button, Title, Paragraph, Modal, TouchableRipple, TextInput, Checkbox} from 'react-native-paper';
import Colors from '../../constants/Colors.ts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as _ from 'lodash';
import CATEGORIES from '../../data/stubbed/dummy-job-categories';
import JOBS from '../../data/stubbed/dummy-jobs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export interface Props {
  visible: boolean;
  job?: object;
}

const JobFilterModal: React.FC<Props> = (props) => {
  const [ filters, setFilters ] = useState( props.filters );
  console.log("FILTERS: ", filters);
  const renderCategoryOptions = () => {
    //_.filter(newJobs, function(item){
    //   return item.categories.some((e) => categories.includes(e))
    // });
    return (CATEGORIES.map( (cat, i) => {
      var count = _.filter(JOBS, function(item){
        return item.categories.includes(cat.id);
      }).length;
      console.log("Should be checked?", cat.title, filters.categories.length > -1 && filters.categories.includes(cat.id)? "True" : "False",);
      return (
        <View key={"checkbox"+i} style={{ flex: 1}}>
          <Checkbox.Item
            label={`${cat.title} (${count})`}
            labelStyle={{ fontSize: 14}}
            status={ filters.categories.length > -1 && filters.categories.includes(cat.id)? "checked" : "unchecked" }
            // status={ filters.categories.length > -1? filters.categories.includes(cat.id) ? 'checked' : 'unchecked' : 'unchecked'}
            onPress={() => { handleCheckPressed(cat.id) }}
          />
        </View>
      );
    }))
  };

  const handleCheckPressed = (categoryId) => {
    const newCategories = filters.categories.includes(categoryId)?
      _.without(filters.categories, categoryId) : [...filters.categories, categoryId];
    const newFilters = {
      ...filters,
      categories: newCategories,
    };
    setFilters( newFilters );
  };

  const handleSubmit = () => {
    const sanitizedFilters = { ...filters, pay: filters.pay.toString()}
    props.handleSubmit(filters);
    props.dismissModal();
  };
  return (
        <Modal visible={props.visible} onDismiss={props.dismissModal} contentContainerStyle={ styles.modalContainer}>


          <View style={ styles.headerContainer }>
            <Title>Filters</Title>
            <Paragraph>Results: (58) </Paragraph>
          </View>

          <View style={ styles.inputContainer }>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            extraScrollHeight={ Platform.OS == 'ios' ? -150 : 90 }
            keyboardShouldPersistTaps={'handled'}
          >
          <View style={ styles.inputContainer }>
            <TextInput
              label="Job Title"
              mode="outlined"
              value={ filters.search }
              onChangeText={ text => setFilters({ ...filters, search: text})}
              style={ styles.textInput }
              />
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput
                  label="Location"
                  mode="outlined"
                  value={ filters.location }
                  onChangeText={ text => setFilters({ ...filters, location: text})}
                  style={ [styles.textInput, { flex: 3 }] }
                  />
                <TextInput
                  label="Radius(km)"
                  mode="outlined"
                  value={ filters.radius }
                  onChangeText={ text => setFilters({ ...filters, radius: text})}
                  style={ [styles.textInput, { flex: 1, fontSize: 11}] }
                  labelStyle={{ fontSize: 10}}
                  dense={true}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
                    <TextInput
                      label="Pay"
                      mode="outlined"
                      value={ filters.pay.toString() }
                      onChangeText={ text => setFilters({ ...filters, pay: text})}
                      style={ [styles.textInput, { flex: 3 }] }
                      labelStyle={{ fontSize: 10}}
                      dense={true}
                      />
                    <View style={{ flex: 2, alignItems: 'center'}}>
                      <Picker
                        style={{ height: 50, width: 100}}
                        itemStyle={{ height: 50, width: '100%'}}
                        selectedValue={ filters.payRate }
                        onValueChange={ currentPayRate => setFilters({ ...filters, payRate: currentPayRate})}
                      >
                        <Picker.Item label='/hr' value='hr' />
                        <Picker.Item label='/day' value='day' />
                        <Picker.Item label='/wk' value='wk' />
                        <Picker.Item label='/mo' value='mo' />
                        <Picker.Item label='/yr' value='yr' />
                      </Picker>
                    </View>

                  </View>
                  <View style={{ flex: 1, }}>
                    <Slider
                      step={1}
                      minimumValue={0}
                      maximumValue={100}
                      value={parseInt(filters.pay, 10)}
                      onValueChange={slideValue => setFilters({ ...filters, pay: slideValue})}
                      minimumTrackTintColor="#1fb28a"
                      maximumTrackTintColor="#d3d3d3"
                      thumbTintColor="#b9e4c9"
                    />
                  </View>

                </View>
          </View>
          <View style={ styles.optionContainer }>
            <View style={{ flex: 1,}}>
              <Paragraph> Categories </Paragraph>
              <ScrollView style={{ }} contentContainerStyle={{ }}>
                { renderCategoryOptions() }
              </ScrollView>
            </View>
            <View style={{ flex: 1,}}>
              <Paragraph> Another Filter </Paragraph>
              <ScrollView style={{ }} contentContainerStyle={{ }}>
                { renderCategoryOptions() }
              </ScrollView>
            </View>
            <View style={{ flex: 1,}}>
              <Paragraph> Another Filter </Paragraph>
              <ScrollView style={{ }} contentContainerStyle={{ }}>
                { renderCategoryOptions() }
              </ScrollView>
            </View>
          </View>
          </KeyboardAwareScrollView>
          </View>
          <View style={ styles.footerContainer }>
            <Button icon='check-circle' mode='contained' onPress={ () => handleSubmit() }> Save </Button>
          </View>
        </Modal>

  );
}


const styles = StyleSheet.create({
  modalContainer:{
    height: '80%',
    marginHorizontal: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(50,50,50,1)',
  },
  inputContainer: {
    flex: 4,
  },
  textInput: {
    height: 40,
    padding: 1,
  },
  optionContainer: {
    marginVertical: 10,
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  footerContainer: {
    justifyContent: 'flex-end',
  }
});

export default JobFilterModal;
