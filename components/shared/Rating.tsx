import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Paragraph } from 'react-native-paper'

export default function Rating(props) {
    return (
        <View
        style={[
          styles.horizontalList,
          { alignItems: "center", marginLeft: "7%", alignSelf: "center" },
        ]}
      >
        <MaterialCommunityIcons name="star" size={20} />
        <MaterialCommunityIcons name="star" size={20} />
        <MaterialCommunityIcons name="star" size={20} />
        <MaterialCommunityIcons name="star" size={20} />
        <MaterialCommunityIcons name="star-outline" size={20} />
        <Paragraph style={{ opacity: 0.8, marginLeft: 5 }}>{props.rating}</Paragraph>
      </View>
    )
}

const styles = StyleSheet.create({
    horizontalList: {
        flexDirection: 'row',
    },
})
