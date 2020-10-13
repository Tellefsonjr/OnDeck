import React from "react";
import { View } from 'react-native';
import { Text, Switch as RNSwitch } from "react-native-paper";
import { withFormikControl } from "react-native-formik";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Switch extends React.PureComponent {
  render() {
    const { errors, value, setFieldValue, input } = this.props;
    console.log("SWITCH VALUE: ", this.props.input.name, this.props.value);
    return (
      <View style={{ flexDirection: 'column', justifyContent: 'space-around'}}>
        <Text style={{ alignSelf: 'center'}}>{this.props.input.label}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          { this.props.input.icon ? <Icon name={this.props.input.icon} size={24} color='black' /> : null }
          <RNSwitch name={this.props.input.name} value={ this.props.value } onValueChange={ (value) => setFieldValue(this.props.input.name, value) } />
          { this.props.input.icon2 ? <Icon name={this.props.input.icon2} size={24} color='black' /> : null }
        </View>
      </View>
    );
  }
}

export default withFormikControl(Switch);
