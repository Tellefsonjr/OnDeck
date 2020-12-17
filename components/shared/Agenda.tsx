import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from "react-native";
import { Button, Avatar } from "react-native-paper";
import { Agenda } from "react-native-calendars";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Moment from "moment";
import "moment-recur";

import Colors from "../../constants/Colors";
import { MonoText } from "./StyledText";
import _ from "lodash";
import AgendaItem from "./AgendaItem";

export default AgendaComponent = (props) => {
  const [items, setItems] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  function loadItems(month) {
//    // TO DO - This function is WAY inefficient, need to sort through fewer arrays...
    // setIsRefreshing(true);
    const tempItems = [];
    let tempMarked = markedDates;
//    // map through each job, then dates to push job item in between items
    props.jobs.map((job, index) => {
      let company = _.find(props.companies, { id: job.companyId });
      let startDate = Moment(job.dates.date_start.toDate());
      let endDate = Moment(job.dates.date_end.toDate());
      let numDays = Math.ceil(
        Moment.duration(endDate.diff(startDate)).asDays()
      );

//      // in each job, set a recurrence based on job.dates.days
      let recurrence = Moment.recur({
        start: Moment(startDate).format("YYYY-MM-DD"),
        end: Moment(endDate).format("YYYY-MM-DD"),
      })
        .every(job.dates.days)
        .daysOfWeek();
      // console.log("Recurrence: ", recurrence)

      //load dates based on recurrence dates
      const dates = recurrence.next(numDays, "YYYY-MM-DD");
      // console.log("DATES: ", dates);

//      // iterate over each date, checking IF items[date] doesn't already include the job item, otherwise push into items

      for (let i = -90; i <= 90; i++) {
        const time = month.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime] && !_.includes(dates, strTime)) {
//          //No current item, and not a date in recurrence range
          // console.log("First: ", !items[strTime] && !_.includes(dates, strTime), job.id, strTime, i)
          items[strTime] = [];
        } else if (
          !items[strTime] &&
          _.includes(dates, strTime) &&
          !_.some(items[strTime], { id: job.id })
        ) {
//         //No current item, but date in recurrence range
          // console.log("Second, ", !items[strTime] && _.includes(dates, strTime) && !_.some(items[strTime], { id: job.id}), job.id, strTime);

          items[strTime] = [
            {
              name: "Item for " + strTime,
              height: 20,
              id: job.id,
              job: {
                id: job.id,
                dates: job.dates,
                title: job.title,
              },
              company: {
                id: company.id,
                logo: company.logo,
                name: company.name,
              },
            },
          ];
          if (!tempMarked[strTime]) {
            tempMarked[strTime] = {};
          }
          tempMarked[strTime] = {
            marked: true,
            dotColor: "#50cebb",
            textColor: "black",
          };
        } else if (
          items[strTime] &&
          _.includes(dates, strTime) &&
          !_.some(items[strTime], { id: job.id })
        ) {
//          //current item already, date also in recurrence range
          console.log(
            "Third, ",
            items[strTime] &&
              _.includes(dates, strTime) &&
              !_.some(items[strTime], { id: job.id }),
            job.id,
            strTime
          );
          console.log(items[strTime]);
          items[strTime].push({
            name: "Item for " + strTime,
            height: 20,
            id: job.id,
            job: {
              id: job.id,
              dates: job.dates,
              title: job.title,
            },
            company: {
              id: company.id,
              logo: company.logo,
              name: company.name,
            },
          });
          if (!tempMarked[strTime]) {
            tempMarked[strTime] = {};
          }
          tempMarked[strTime] = {
            marked: true,
            dotColor: "#50cebb",
            textColor: "black",
          };
        }

      }
    });

    //console.log("Setting Items!");

    const newItems = {};
    const newMarked = {};

    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    Object.keys(tempMarked).forEach((key) => {
      newMarked[key] = tempMarked[key];
    });
    // console.log("New items: ", newItems);
    setItems(newItems);
    setMarkedDates(newMarked);
    setIsRefreshing(false);
  }

  function renderItem(item) {
    console.log("Rendering Items");
    return <AgendaItem item={item} />;
  }

  function renderEmptyDate() {
    // return (
    //   <View style={styles.emptyDate}>
    //     <Text style={ styles.emptyText }>No jobs today, feel free to take a break :)</Text>
    //   </View>
    // );
  }

  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
  function onDayPress(day) {
    console.log("PRESSED THE THING:::", day);
    props.onDayPress(day);
  }
  const job1 = { key: "job1", color: "blue", selectedDotColor: "blue" };
  const job2 = { key: "job2", color: "green" };

  return (
    <Agenda
      items={items}
      selected={new Date()}
      renderItem={(item) => renderItem(item)}
      renderEmptyDate={(date) => renderEmptyDate(date)}
      rowHasChanged={(r1, r2) => {
        return r1.name !== r2.name;
      }}
      onDayPress={(day) => {
        onDayPress(day);
      }}
      // hideKnob={props.hideKnob}
      loadItemsForMonth={(month) => loadItems(month)}
      refreshing={isRefreshing}
      markedDates={markedDates}
      onDayChange={(day) => {
        console.log("day changed", day);
      }}
      markingType={"period"}
      // Specify what should be rendered instead of ActivityIndicator
      renderEmptyData={() => {
        return <Text>No Jobs for this day, pick a marked date! </Text>;
      }}
      // markedDates={{
      //    '2017-05-08': {textColor: '#43515c'},
      //    '2017-05-09': {textColor: '#43515c'},
      //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
      //    '2017-05-21': {startingDay: true, color: 'blue'},
      //    '2017-05-22': {endingDay: true, color: 'gray'},
      //    '2017-05-24': {startingDay: true, color: 'gray'},
      //    '2017-05-25': {color: 'gray'},
      //    '2017-05-26': {endingDay: true, color: 'gray'}}}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      // hideExtraDays={false}
      style={{ flex: 1 }}
      theme={{
        backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: Colors.textSecondary,
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: Colors.primaryLight,
    todayTextColor: Colors.secondary,
    dayTextColor: Colors.primaryDark,
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: Colors.secondaryDark,
    arrowColor: 'orange',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: 'blue',
    indicatorColor: 'blue',
    // textDayFontFamily: 'monospace',
    // textMonthFontFamily: 'monospace',
    // textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 14,
        agendaDayTextColor: Colors.primaryLight,
        agendaDayNumColor: Colors.primaryDark,
        agendaTodayColor: Colors.secondary,
        agendaKnobColor: Colors.primary,
        
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  emptyText: {
    color: Colors.textSecondary
  }
});
