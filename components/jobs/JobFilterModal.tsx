import React, { useState } from 'react';
import { StyleSheet, ScrollView, View,  } from 'react-native';
import { Avatar, Button, Title, Paragraph, Modal, TouchableRipple, TextInput, Checkbox} from 'react-native-paper';
import Colors from '../../constants/Colors.ts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as _ from 'lodash';
import CATEGORIES from '../../data/stubbed/dummy-job-categories';
import JOBS from '../../data/stubbed/dummy-jobs';

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
      search: filters.search,
      categories: newCategories,
    };
    setFilters( newFilters );
  };

  const handleSubmit = () => {
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

          <View style={ styles.footerContainer }>
            <Button icon='check-circle' mode='contained' onPress={ () => handleSubmit() }> Save </Button>
          </View>
        </Modal>

  );
}


const styles = StyleSheet.create({
  modalContainer:{
    height: '70%',
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
    flex: 3,
  },
  textInput: {
    height: 40,
    padding: 1,
  },
  optionContainer: {
    marginVertical: 10,
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  footerContainer: {
    justifyContent: 'flex-end',
  }
});

export default JobFilterModal;
