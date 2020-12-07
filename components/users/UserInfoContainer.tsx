import { MaterialCommunityIcons } from '@expo/vector-icons'
import _ from 'lodash';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Paragraph, Chip } from 'react-native-paper'
import JOB_CATEGORIES from '../../data/stubbed/dummy-job-categories';


const UserInfoContainer = (props) => {
    const user = props.user;
    const renderJobCategories = () => {
        return JOB_CATEGORIES.map((cat, index) => {
            return (
                _.includes(user.preferences.jobCategories, cat.id) ? 
                <Chip
                    key={index}
                    icon={cat.icon}
                    style={{ padding: 0 }}
                    textStyle={{ fontSize: 12 }}
                >
                    {cat.title}
                </Chip>
                : null
            )
        })
    }
    return (
        <View style={styles.infoContainer}>
          <View style={styles.iconTextPair}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              style={{ marginRight: 10, alignSelf: "center" }}
            />
            <Paragraph> {user.location.location.address.formatted} </Paragraph>
          </View>
          <View style={styles.iconTextPair}>
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              style={{ marginRight: 10, alignSelf: "center" }}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            { user.preferences.jobCategories.length > 0 ? renderJobCategories() : <Text> None </Text> }
            </ScrollView>
          </View>
          <View style={styles.iconTextPair}>
            <MaterialCommunityIcons
              name="certificate"
              size={20}
              style={{ marginRight: 10, alignSelf: "center" }}
            />
            <Paragraph> White card </Paragraph>
          </View>
          <View style={styles.iconTextPair}>
            <MaterialCommunityIcons
              name="bag-personal-outline"
              size={20}
              style={{ marginRight: 10, alignSelf: "center" }}
            />
            <Paragraph style={{ flex: 1, flexWrap: "wrap" }}>
              PPE: high visibility clothing, steel-toe boots, hard hat, ear
              plugs, face mask
            </Paragraph>
          </View>
        </View>
    )
}

export default UserInfoContainer

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        marginTop: 5,
        padding: 20,
      },
      iconTextPair: {
        flexDirection: "row",
        marginBottom: 5,
      },
      horizontalList: {
        flexDirection: "row",
      },
})
