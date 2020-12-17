import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import Moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Button, } from 'react-native-paper';
import { NativeModules } from 'react-native'

const LOCALE = Platform.OS == 'ios' ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier;

export default function AgendaItem(props){
    const item = props.item;
    const company = item.company;
    const job = item.job;

    const displayTime = (time) => {
        Moment.locale(LOCALE);
        let timeValue = Moment(time).format('h:mm A');
        return (timeValue);
      }
    return (
        <View style={ styles.item }>
      <View style={ styles.eventItemTop }>
        <Text style={{ fontWeight: 'bold'}}>{displayTime(job.dates.time_start.seconds)} - {displayTime(job.dates.time_end.seconds)}</Text>
        <Avatar.Image size={28} source={{ uri: company.logo }} />
      </View>
      <View style={ styles.eventTitleContainer }>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons name="human-greeting" size={18} style={{ marginRight: 5, }}/>
          <Text> { job.title } </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Text>@{company.name}</Text>
        </View>
      </View>
      <View style={ styles.buttonContainer }>
        <Button icon="phone" color='rgba(40,140,31,1)' onPress={() => console.log("Pressed Phone")} mode='contained' style={[ styles.eventButton, { borderTopLeftRadius: 5, borderBottomLeftRadius: 5, } ]} labelStyle={ styles.eventButtonInner }   />
        <Button icon="message-text-outline" color='rgba(242,156,85,1)' onPress={() => console.log("Pressed Message")} mode='contained' style={ styles.eventButton } labelStyle={ styles.eventButtonInner } />
        <Button icon="information-outline" color='rgba(77,177,249,1)' onPress={() => console.log("Pressed Info")} mode='contained' style={ styles.eventButton } labelStyle={ styles.eventButtonInner } />
        <Button icon="map-outline" color='rgba(85,116,242,1)' onPress={() => console.log("Pressed Navigation")} mode='contained' style={ styles.eventButton } labelStyle={ styles.eventButtonInner }  />
        <Button icon="cancel" color='rgba(221,104,46,1)' onPress={() => console.log("Pressed Phone")} mode='contained' style={[styles.eventButton, { borderTopRightRadius: 5, borderBottomRightRadius: 5, } ]} labelStyle={ styles.eventButtonInner }   />
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    eventItemContainer: {
    },
    buttonContainer:{
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    },
    eventButton: {
        flex: 1,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 1,
        width: '16%',
        paddingLeft: 5,
      },
      eventButtonInner: {
        alignSelf: 'center',
        marginLeft: '15%',
        fontSize: 22,
        color: 'white',
      },
      eventItemTop:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      eventTitleContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
      },
      item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginVertical: 10
      },
})
