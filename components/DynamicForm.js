/* @flow weak */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}', icon: {name}, size: [sm, med, mlrg, lrg]}
// validation for these forms stored in data/validation

import React, { PureComponent } from 'react';
import {
  View,Text, StyleSheet, Form, Picker, Keyboard, TouchableWithoutFeedback, ActivityIndicator, Platform
} from 'react-native';
import { Formik, FieldArray, Field } from 'formik';
import { withFormikControl } from 'react-native-formik';
import Colors from '../constants/Colors';
import { Button, TextInput, Menu, RadioButton, IconButton, HelperText } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Switch from './SwitchComponent';
import ImagePickerComponent from './ImagePickerComponent';
import DocumentPickerComponent from './DocumentPickerComponent';

import * as _ from 'lodash';

class DynamicForm extends PureComponent {

  renderSelect = ( input, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, i, initialValues, inputs ) => {
    return(
      <FieldArray name={input.name} >
      {(arrayHelpers) => (
        <View style={_.get(styles, `picker${input.size}`)}>
        <Picker
          name={input.name}
          style={ Platform.OS == 'ios' ? _.get(styles, `pickerContainerIOS${input.size}`) : '' }
          itemStyle={_.get(styles, `pickerItem${input.size}`)}
          visible={true}
          style={ styles.pickerContainer }
          selectedValue={ _.get(values, input.name) }
          label={input.label}
          prompt={input.label}
          onValueChange={ (itemValue, itemIndex) => {
            setFieldTouched(input.name);
            setFieldValue(input.name, itemValue);
            console.log("Item changed: ", input.name, values.profile.certificates[0].type, itemValue);
            } }
          prompt={ input.label }
        >
        
          <Picker.Item name={input.name} label={input.default} value='default' />
      
      { input.data.map((d, index) => (
            <Field
              type="select"
              id={input.name}
              name={input.name}
              key={index}
              as={Picker.Item}
              name={input.name}
              label={ d }
              value={ d } />
          )

            )
        }
        </Picker>
        
        </View>
        )}
      </FieldArray>
    )
  }

  renderText = (input, handleChange, values, errors, setFieldTouched, i, inputs, nextInput) => {
    return(
      <TextInput
            name={input.name}
            style={ [_.get(styles, `text${input.size}`), styles.textInput] }
            onChangeText={handleChange(input.name)}
            value={values[input.name]}
            label={input.label}
            placeholder={input.placeholder}
            theme={{colors: {primary: 'blue'}}}
            ref={(inputRef) => {  this[input.name] = inputRef; }}
            blurOnSubmit={ nextInput != 'none' ? false : true }
            onBlur={ () => setFieldTouched(input.name)}
            enablesReturnKeyAutomatically={true}
            returnKeyType={ nextInput != 'none' ? 'next' : 'done' }
            onSubmitEditing={() => {
              nextInput != 'none'?  this[nextInput].focus() : this[input.name].blur();
              }}
            keyboardType={input.name=="email" ? 'email-address' : input.name=="phone" ? 'phone-pad' : 'default'}
            secureTextEntry={ input.name == "password" ? true : false }
            type='text'
            multiline={ input.name=="profile.bio" ? true : false}
            numberOfLines={ input.name=="profile.bio" ? 3 : 1 }
      />
      )
  }
  renderSwitch = (input, setFieldValue, values, errors, i) => {
    return(
      <Switch
        input={input} setFieldValue={setFieldValue}
        value={ _.get( values, input.name)} errors={errors} i={i}
      />
          )
  }
  renderNumber = (input, values, errors, touched, isValid, setFieldValue, setFieldTouched, i, inputs, nextInput) => {
    return(
      <TextInput
            name={input.name}
            style={ [_.get(styles, `text${input.size}`), styles.textInput] }
            onChangeText={ (value) => {
              let newValue = parseInt(value, 10);
              newValue = isNaN(newValue) ? '' : newValue;
              setFieldValue(input.name, newValue);
            }
            }
            value={_.get(values, input.name).toString()}
            label={input.label}
            keyboardType={'numbers-and-punctuation'}
            placeholder={input.placeholder}
            theme={{colors: {primary: 'blue'}}}
            ref={(inputRef) => {  this[input.name] = inputRef; }}
            blurOnSubmit={ nextInput != 'none' && nextInput ? false : true }
            onFocus={ () => setFieldTouched(input.name)}
            enablesReturnKeyAutomatically={true}
            returnKeyType={ nextInput != 'none' ? 'next' : 'done' }
            onSubmitEditing={() => {
              nextInput != 'none'?  this[nextInput].focus() : this[input.name].blur();
              }}
            type='text'
      />
      )
  };
  renderImagePicker = (input, setFieldValue, handleChange, values, errors, i) => {
    return(
        <ImagePickerComponent value={ _.get( values, input.name)}
                input={input}
                errors={errors} i={i}
                setFieldValue={setFieldValue}
             />      
          )
  };
  renderDocumentPicker = (input, setFieldValue, handleChange, values, errors, i) => {
    return(
      <View style={{ width: '30%', }}>

        <DocumentPickerComponent value={ _.get( values, input.name)}
                input={input}
                errors={errors} i={i}
                setFieldValue={setFieldValue}
             /> 
            </View>            
          )
  };

  renderInput = (input, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues, i, inputs, nextInput) => {
    switch (input.type) {
      case 'select':
        return(this.renderSelect(input, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, i, initialValues, inputs));
      case 'input-number':
        return(this.renderNumber(input, values, errors, touched, isValid, setFieldValue, setFieldTouched, i, inputs, nextInput));
      case 'switch':
        return(this.renderSwitch(input, setFieldValue, values, errors, i));
      case 'image-picker':
        return(this.renderImagePicker(input, setFieldValue, handleChange, values, errors, i));
      case 'document-picker':
        return(this.renderDocumentPicker(input, setFieldValue, handleChange, values, errors, i));
      case 'input':
        return(this.renderText(input, handleChange, values, errors, setFieldTouched, i, inputs, nextInput));
      return(null);
    }
  };
  renderFields = (inputs, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues) => {
    return(
      <View style={ this.props.displayColumn ? { flex: 1, flexDirection: 'row'} : ''}>
      {inputs.map((input, i) => {
        if(input.length > 1){
          return(
            <View key={i} style={ _.some(input, ['size', 'lrg']) || this.props.displayColumn ? [{ flex: 1, flexDirection: 'column'}] : styles.row } name={i}>
            {input.map((subInput, index) => {
              let nextInput = input[index+1]?
                input[index+1].name :
                _.isArray(inputs[i+1]) && (inputs[i+1][0].type == 'input' || inputs[i+1][0].type == 'input-number') ?
                 inputs[i+1][0].name :
                 'none';
            return(
                <View key={subInput.name} style={ subInput.size? [_.get(styles, subInput.size), styles.input]: ''}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                  { subInput.icon && subInput.type != 'switch' ? <Icon name={subInput.icon} size={24} color='black' /> : null }
                  {
                    this.renderInput(subInput, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues, i, inputs, nextInput)

                  }
                  
                  </View>
                  { (_.get(errors, subInput.name) && _.get(touched, subInput.name) ?
                    <Text name={subInput.name} style={{ fontSize: 10, color: 'red' }}>{_.get(errors, subInput.name)}</Text>
                    : null )
                  }
                </View>
              );
            })}
            </View>
          );
        } else {
          let nextInput = inputs[i+1] && inputs[i+1].name? inputs[i+1].name : 'none';
          return(
            <View key={input.name} style={ input.size? [_.get(styles, input.size), styles.input]: ''}  name={input.name}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            { input.icon && input.type != 'switch' ? <Icon name={input.icon} size={24} color='black' /> : null }
                {
                  this.renderInput(input, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues, i, inputs, nextInput)

                }
                  { (errors ?
                    <Text name={input.name} style={{ fontSize: 10, color: 'red', }}>{errors[input.name]}</Text>
                    : null )
                  }
              </View>
            </View>
            )
        }
        })
      }
      </View>
    )
  };
  renderIndicators = () => {
    return( 
        <View style={{ flexDirection: 'row'}}>
            <MaterialCommunityIcons name={ this.props.page >= 1 ? "circle" : "circle-outline"} size={14} color="white" />
            <MaterialCommunityIcons name={ this.props.page >= 2 ? "circle" : "circle-outline"} size={14} color="white" />
            <MaterialCommunityIcons name={ this.props.page >= 3 ? "circle" : "circle-outline"} size={14} color="white" />
        </View>
    )
  };


  render() {
    const initialValues = this.props.data;
      return(
        <View style={ styles.container }>
            <Formik
            onSubmit={this.props.handleSubmit}
            validationSchema={this.props.validation}
            validateOnChange={true}
            initialValues={initialValues}>
            {({handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues }) => (
              <View style={{ flex: 1,}}>
              <View style={{ flex: 10 }}>
              <KeyboardAwareScrollView
                 enableOnAndroid={true}
                 enableAutomaticScroll={true}
                 extraScrollHeight={ Platform.OS == 'ios' ? -150 : 90 }
                 keyboardShouldPersistTaps={'handled'}
                 style={{ }}
                 contentContainerStyle={{  }}
              >
              <View>
                { this.renderFields(this.props.fields, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues) }
              </View>
              </KeyboardAwareScrollView>
              </View>
              {/* { errors || isSubmitting || !isValid ?
              console.log("Something's up: ", errors, "submitting?: ", isSubmitting, "valid?: ",isValid)
              :
              null
              } */}
              { this.props.paginated?
                <View style={styles.buttonContainer}>
                <Button onPress={this.props.handleCancel} style={ this.props.buttonIcons? styles.buttonIcon : styles.button }
                icon="chevron-left"
                mode="contained"
                title="Back"
                color="rgba(255, 61, 0, .5)">
                { this.props.buttonIcons? '' : 'Back' }
                </Button>
                <View style={ styles.spacer }>
                {
                    this.renderIndicators()
                }
                </View>
                <Button disabled={isSubmitting || !isValid} onPress={handleSubmit} style={ this.props.buttonIcons? styles.buttonIcon : styles.button }
                  disabled={ isSubmitting || Object.keys(errors).length > 0 ? true : false}
                  type="submit"
                  icon={isSubmitting? <ActivityIndicator size="small" color="#00ff00" /> : "chevron-right"}
                  mode="contained"
                  title="Next"
                  color="#00578A">
                  { this.props.buttonIcons? '' : 'Next' }
                </Button>
              </View>
              :
              <View style={styles.buttonContainer}>
                <Button onPress={this.props.handleCancel} style={ this.props.buttonIcons? styles.buttonIcon : styles.button }
                icon="cancel"
                mode="contained"
                title="Cancel"
                color="rgba(255, 61, 0, .5)">
                { this.props.buttonIcons? '' : 'Cancel' }
                </Button>
                <View style={ styles.spacer }>
                
                </View>
                <Button disabled={isSubmitting || !isValid} onPress={handleSubmit} style={ this.props.buttonIcons? styles.buttonIcon : styles.button }
                  disabled={ isSubmitting || Object.keys(errors).length > 0 ? true : false}
                  type="submit"
                  icon={isSubmitting? <ActivityIndicator size="small" color="#00ff00" /> : "check-circle-outline"}
                  mode="contained"
                  title="Submit"
                  color="#00578A">
                  { this.props.buttonIcons? '' : 'Submit' }
                </Button>
              </View>
            }
              </View>
            )
          }
          </Formik>
          </View>

  )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  tiny: {
    width: '15%',
  },
  sm: {
    width: '33%',
  },
  textsm: {
    width: '77%',
    fontSize: 12,
  },
  pickersm: {
    width: '70%',
  },
  pickerItemsm: {
    height: 100,
    fontSize: 16,
  },
  med: {
    width: '49%',
  },
  textmed: {
    width: '85%',
    fontSize: 16
  },
  medRollable: {

  },
  textmedRollable: {
    marginLeft: 5,
    fontSize: 18,
    width: '75%'
  },
  pickermed: {
    width: '80%',
    fontSize: 10,
  },
  pickerItemmed: {
    height: 100,
    fontSize: 16,
  },
  pickerContainerIOSmed: {
    width: '85%',
    height: 80,
  },
  mlrg: {
    width: '100%'
  },
  textmlrg: {
    width: '85%',
  },
  lrg: {
    width: '100%',
  },
  textlrg: {
    width: '90%',
    fontSize: 18
  },
  lrgRollable: {
    width: '100%'
  },
  textlrgRollable: {
    marginLeft: 5,
    width: '60%'
  },
  pickerlrg: {
    width: '90%',
    fontSize: 10,
  },
  pickerItemlrg: {
    height: 100,
    fontSize: 18,
  },
  pickerContainerIOSlrg: {
    width: '90%',
    height: 150,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  buttonContainer: {
    flex: 3,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    height: 35,
    width: '30%'
  },
  buttonIcon: {
    flex: 1,
    justifyContent: 'center',
    height: 35,
    width: '15%'
  },
  spacer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 50,
  },
});

export default DynamicForm;
