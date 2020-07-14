import React from 'react';
import { StyleSheet, ScrollView, ImageBackground, View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Surface, TouchableRipple, } from 'react-native-paper';
import Colors from '../../constants/Colors.ts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as _ from 'lodash';
import CATEGORIES from '../../data/stubbed/dummy-job-categories';

export interface Props {
  key: string;
  job?: object;
}

const JobListItem: React.FC<Props> = (props) => {

  function renderJobCategoryIcon(categoryId){
    return(
      _.find(CATEGORIES, { id: categoryId}).icon
    )
  };
  return (
    <TouchableRipple
      onPress={() => props.onPress(props.job) }
      >
      <View style={styles.cardContainer}>
      <Card elevation={2} style={ styles.card }>
        <View style={{ borderBottomWidth: .5, borderBottomColor: Colors.secondaryDark }}>
          <Card.Title title={props.job.title} subtitle={props.company.name}
            left={ (p) =>
              <Avatar.Image
                size={40} {...p}
                source={{ uri: props.company.icon }}
                style={{ marginTop: '60%'}}
                />
            }
            style={{ paddingBottom: 0}} />
           <View style={{ flexDirection: 'row', marginLeft: 70, marginTop: -10, paddingBottom: 2}}>
             <MaterialCommunityIcons name="star" size={18} />
             <MaterialCommunityIcons name="star" size={18} />
             <MaterialCommunityIcons name="star" size={18} />
             <MaterialCommunityIcons name="star" size={18} />
             <MaterialCommunityIcons name="star-outline" size={18} />
           </View>
        </View>
        <Card.Content style={ styles.cardInner}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
          <Text style={ styles.detailText }> { props.job.pay.amount } { props.job.pay.rate} </Text>
          <Text style={ styles.detailText }> { props.company.locations[props.job.location].address.city }, { props.company.locations[props.job.location].address.state } { props.job.location.country } </Text>
        </View>

        </Card.Content>

        { // ~~~ UNCOMMENT TO SHOW BUTTONS ~~~
          // <Card.Actions style={{ justifyContent: 'flex-end'}}>
          //   <Button color={Colors.error} labelStyle={{ color: Colors.errorDark }} mode="text">Pass</Button>
          //     <View style={{width: 2}} />
          //   <Button color={Colors.secondary} labelStyle={{ color: Colors.textDark, fontWeight: 'bold' }} mode="contained">Details</Button>
          // </Card.Actions>
        }
      </Card>
      <View style = { styles.separator }/>
      </View>
    </TouchableRipple>
  );
}


const styles = StyleSheet.create({
  cardContainer:{
    marginHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    paddingBottom: 10,
  },
  card: {
    width: '100%',
  },
  cardInner: {
    width: '100%',
    paddingBottom: 5,
  },
  detailText: {
    color: 'rgba(66,66,66,1)',
  }
});

export default JobListItem;
