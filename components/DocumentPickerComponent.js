import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Avatar, IconButton } from "react-native-paper";
import { withFormikControl } from "react-native-formik";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import Constants from 'expo-constants';
import Colors from "../constants/Colors";

import * as Permissions from 'expo-permissions';
import * as _ from 'lodash';



class DocumentPickerComponent extends React.Component {
  state = {
    document: this.props.value ? this.props.value : null,
  };
  getPermissionsAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.FILE_SYSTEM);
      if (status !== 'granted') {
        alert('Sorry, we need file system permissions to make this work!');
      }
    }
    this.selectDocument();
  };
  selectDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (!result.cancelled) {
      this.setState({ document: result.uri });
      this.props.setFieldValue(this.props.input.name, this.state.document);
    };
    console.log(result);
  };

  render() {
    const { errors, value, setFieldValue, input } = this.props;
    console.log("PROPS:::: ", `"${this.props.value}"`);
    let { document } = this.state;
    return (
      <TouchableHighlight style={ styles.documentPickerContainer } onPress={ () => this.selectDocument() }>
        { document ?
        <View style={{ alignItems: 'center'}}>
            <Text>{this.props.input.label}</Text>
            <Avatar.Image
              size={50}
              style={ styles.avatar }
              source={{ uri: document }}
          />
          {/* <Text>{ document? _.last(_.split(document, '/')).replace(/(.{8})\./, "...") : 'No file selected...' }</Text> */}
          </View>

          
          :
          <View style={{ alignItems: 'center'}}>
            <Text>{this.props.input.label}</Text>
            <Avatar.Icon
              size={50}
              style={ styles.avatar }
              icon='file-plus'
            /> 
            {/* <Text>{ document? _.last(_.split(document, '/')).replace(/(.{8})\./, "...") : 'No file selected...' }</Text> */}
            </View>
         
        }
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  documentPickerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatar: {
    height: 50,
    width: 50,
    backgroundColor: Colors.primary
  }
});
export default withFormikControl(DocumentPickerComponent);
