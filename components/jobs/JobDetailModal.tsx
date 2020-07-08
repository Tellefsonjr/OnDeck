import * as React from 'react';
import { StyleSheet, ScrollView, ImageBackground, View, Text } from 'react-native';
import { Avatar, Button, Title, Paragraph, Modal, TouchableRipple, Provider, Portal} from 'react-native-paper';
import Colors from '../../constants/Colors.ts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as _ from 'lodash';
import CATEGORIES from '../../data/stubbed/dummy-job-categories';

export interface Props {
  visible: boolean;
  job?: object;
}

const JobDetailModal: React.FC<Props> = (props) => {

  function renderJobCategoryIcon(categoryId){
    return(
      _.find(CATEGORIES, { id: categoryId}).icon
    )
  };
  return (
        <Modal visible={props.visible} onDismiss={props.dismissModal} contentContainerStyle={ styles.modalContainer}>
          <Text>Example Modal</Text>
        </Modal>

  );
}


const styles = StyleSheet.create({
  modalContainer:{
    height: '80%',
    marginHorizontal: 10,
    backgroundColor: 'white',
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

export default JobDetailModal;
