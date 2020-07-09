import React from 'react';
import { StyleSheet, ScrollView, ImageBackground, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Surface, TouchableRipple, } from 'react-native-paper';
import Colors from '../../constants/Colors.ts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as _ from 'lodash';
import CATEGORIES from '../../data/stubbed/dummy-job-categories';

export interface Props {
  key: string;
  job?: object;
}

const JobCard: React.FC<Props> = (props) => {

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
        <Card.Title title={props.job.title} subtitle="Time: 2wk+   $$" left={ (p) =>
          <Avatar.Icon style={{ width: 28, height: 28, backgroundColor: Colors.primaryDark}} {...p} icon={ renderJobCategoryIcon(props.job.categories[0]) } />
        }
        style={{borderBottomWidth: .5, borderBottomColor: Colors.secondaryDark}} />
        <Card.Content style={ styles.cardInner}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
          <Avatar.Image size={28} source={{ uri: 'https://picsum.photos/'+((Math.floor(Math.random(0,1000)*1000)).toString()) }} />
          <Title>Company Name</Title>
        </View>
        <View style={{ flexDirection: 'row',}}>
          <Paragraph style={{flex: 1, flexWrap: 'wrap'}}>{_.truncate(props.job.description, { 'length': 29})}</Paragraph>
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
    paddingHorizontal: 10,
  },
  cardInner: {
    width: '100%'
  },
});

export default JobCard;
