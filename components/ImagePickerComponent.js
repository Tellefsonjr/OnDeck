import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Avatar, IconButton } from "react-native-paper";
import { withFormikControl } from "react-native-formik";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Colors from "../constants/Colors";

import * as Permissions from 'expo-permissions';


class ImagePickerComponent extends React.Component {
  state = {
    image: this.props.value ? this.props.value : null,
  };
  getPermissionsAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    this.selectImage();
  };
  selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.5
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.setFieldValue(this.props.input.name, this.state.image);
    };
    console.log(result);
  };

  render() {
    const { errors, value, setFieldValue, input } = this.props;
    console.log("PROPS:::: ", `"${this.props.value}"`);
    let { image } = this.state;
    return (
      <TouchableHighlight style={ styles.avatarPickerContainer } onPress={ () => this.getPermissionsAsync() }>
        { image ?
          <Avatar.Image
            size={50}
            style={ styles.avatar }
            source={{ uri: image }}
          />
          :
          <Avatar.Icon
            size={50}
            style={ styles.avatar }
            icon='image-plus'
          />
        }
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  avatarPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatar: {
    height: 50,
    width: 50,
    backgroundColor: Colors.primary
  }
});
export default withFormikControl(ImagePickerComponent);
