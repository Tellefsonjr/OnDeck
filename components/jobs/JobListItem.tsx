import React from 'react';
import { StyleSheet, ScrollView, ImageBackground, View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Surface, TouchableRipple, } from 'react-native-paper';
import Colors from '../../constants/Colors.ts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import * as _ from 'lodash';
import CATEGORIES from '../../data/stubbed/dummy-job-categories';

export interface Props {
  key: string;
  job?: object;
}

const JobListItem: React.FC<Props> = (props) => {
  // console.log("Job applicants: ", props.job.applicants, props.job.approvedApplicant);
  const job = props.job;
  const userType = props.userType;
  const currency = {
    usd: "$",
    aud: "$",
    eur: "€",
  }
  function renderJobCategoryIcon(categoryId){
    return(
      _.find(CATEGORIES, { id: categoryId}).icon
    )
  };
  // console.log("~JOB List Item~", job.applicants.length);
  return (
    <View style={{ backgroundColor: 'rgba(0,0,0,0)', flex: 1 }}>
    <TouchableRipple
      style={{ backgroundColor: 'rgba(0,0,0,0)'}}
      onPress={() => props.onPress(props.job) }
      >
      <View style={styles.cardContainer}>
      <Card elevation={2} style={ styles.card }>
        <View style={{ borderBottomWidth: .5, borderBottomColor: Colors.secondaryDark }}>
          <Card.Title title={props.job.title} subtitle={props.company.name}
            left={ (p) =>
              <Avatar.Image
                size={40} {...p}
                source={{ uri: props.company.icon ? props.company.icon : props.company.logo}}
                style={{ marginTop: '60%'}}
                />
            }
            right={ (props) =>
              ( userType == "Labourer" ?
                <AnimatedCircularProgress
                  size={60}
                  width={5}
                  fill={58}
                  tintColor={ Colors.warning }
                  tintColorSecondary={ Colors.secondary }
                  rotation={0}
                  onAnimationComplete={() => console.log('onAnimationComplete')}
                  style={{ marginRight: 10, marginTop: 10, }}
                  backgroundColor="#3d5875" 
                  
                  >
{
                    (fill) => (
                      <>
                      <Text>
                        58%
                      </Text>
                      <Text style={{ fontSize: 12}}>
                        Match
                      </Text>
                      </>
                    )
                  }
                  </AnimatedCircularProgress>
                  :
                  <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10, }}>
                    { job.isFilled ?
                      <Avatar.Image
                        size={40}
                        source={{ uri: job.approvedApplicant.avatar}}
                        style={{ marginTop: '60%'}}
                      />
                      :
                      <>
                    <MaterialCommunityIcons name="account-search" size={30} />
                    <Text> { job.applicants.length.toString() } </Text>
                    </>
                    }

                  </View>
              )
            }
            style={{ paddingBottom: 0}} />
           <View style={{ flexDirection: 'row', marginLeft: 70, marginTop: -10, paddingBottom: 2, alignItems: 'center'}}>
             <MaterialCommunityIcons name="star" size={18} />
             <MaterialCommunityIcons name="star" size={18} />
             <MaterialCommunityIcons name="star" size={18} />
             <MaterialCommunityIcons name="star" size={18} />
             <MaterialCommunityIcons name="star-outline" size={18} />
             <Text>4.0</Text>
           </View>
        </View>
        <Card.Content style={ styles.cardInner}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
          <Text style={ styles.detailText }> { _.get(currency, props.job.pay.currency)} { props.job.pay.amount } { props.job.pay.rate} </Text>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name="map-marker" size={18} style={{ marginLeft: 5, marginRight: -4,  }}/>
          <Text style={ styles.detailText }> { _.truncate(props.job.location.location.address.formatted, {'length': 38} )} </Text>

          </View>
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
      </View>
    </TouchableRipple>
    </View>
  );
}


const styles = StyleSheet.create({
  cardContainer:{
    // marginHorizontal: 10,
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
