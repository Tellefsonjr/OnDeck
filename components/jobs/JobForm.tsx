import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Picker,
} from "react-native";
import { TextInput, Button, Title, Chip, IconButton } from "react-native-paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Colors from "../../constants/Colors.ts";
import { Formik } from "formik";
import Slider from "@react-native-community/slider";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Icon } from "react-native-vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as _ from "lodash";
import JOB_CATEGORIES from "../../data/stubbed/dummy-job-categories";

import validation from "../../data/validation/JobValidation";

import * as jobActions from "../../store/actions/jobs"; //Redux Actions
import GooglePlacesAutocomplete from "../GooglePlacesAutoComplete";

const JobForm = (props) => {
  // console.log("STAAAATE", props.testState);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setDateType] = useState({
    value: "start",
    type: "date",
    display: Platform.OS == "ios" ? "default" : "calendar",
  });
  // console.log("PROPS: ", props);
  const job = {
    companyId: props.company.id,
    categories: [],
    title: "",
    description: "",
    location: {
      address: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
      geo: {
        lat: "",
        long: "",
      },
    },
    dates: {
      date_start: "",
      date_end: "",
      time_start: "",
      time_end: "",
      days: [],
      onCall: false,
    },
    pay: {
      amount: 0,
      rate: "",
      currency: "",
      estimated: false,
      tips: false,
    },
    createdTime: "",
    lastModifiedTime: null,
    applicants: [],
    filled: false,
  };
  const daysOfWeek = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
  const categoryChips = (categories, setFieldValue) => {
    return JOB_CATEGORIES.map((cat) => {
      let selected = _.includes(categories, cat.id) ? true : false;
      return (
        <Chip
          icon={cat.icon}
          selected={selected}
          onPress={() => {
            setFieldValue(
              "categories",
              selected
                ? _.without(categories, cat.id)
                : _.concat(categories, cat.id)
            );
          }}
        >
          {cat.title}
        </Chip>
      );
    });
  };
  const dayChips = (days, setFieldValue) => {
    return daysOfWeek.map((day) => {
      let selected = _.includes(days, day) ? true : false;
      return (
        <Chip
          style={{
            backgroundColor: selected
              ? Colors.primaryLight
              : Colors.light.background,
          }}
          textStyle={{
            color: selected ? Colors.dark.text : Colors.light.text,
          }}
          onPress={() => {
            setFieldValue(
              "dates.days",
              selected ? _.without(days, day) : _.concat(days, day)
            );
          }}
        >
          {day}
        </Chip>
      );
    });
  };
  const handleUpdate = (value, setFieldValue) => {
    console.log("input update: ", value);
    setFieldValue("location", value);
  };
  const showDatePicker = (type) => {
    setDateType(type);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date, setFieldValue, values) => {
    if (dateType.type == "date") {
      setFieldValue(
        dateType.value == "start" ? "dates.date_start" : "dates.date_end",
        date
      );
    } else {
      setFieldValue(
        dateType.value == "start" ? "dates.time_start" : "dates.time_end",
        date
      );
    }
    hideDatePicker();
  };
  const displayTime = (time, locale) => {
    let formattedTime = time
      .toLocaleTimeString(locale)
      .match(/^([0-9]{1,2}:[0-9]{2}).*( AM| PM)$/);
    console.log("formattedTime: ", formattedTime);
    return formattedTime[1] + formattedTime[2];
  };
  const handleSubmit = (input) => {
    console.log("Submitting Job in FOrm: ", input);
    props.createJob(input);
    props.onDismiss();
  };
  return (
    <View style={styles.container}>
      <View style={[styles.horizontal, { justifyContent: "space-between" }]}>
        <Title> Add Job </Title>
        <IconButton
          icon="close"
          color={Colors.red500}
          size={20}
          onPress={props.onDismiss}
        />
      </View>

      <Formik
        initialValues={job}
        validationSchema={validation}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isSubmitting,
          setFieldValue,
          values,
        }) => (
          <View style={styles.formContainer}>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              enableAutomaticScroll={true}
              extraScrollHeight={Platform.OS == "ios" ? 0 : 90}
              keyboardShouldPersistTaps={"handled"}
              style={{ height: "90%" }}
              contentContainerStyle={styles.formScrollViewContainer}
            >
              <TextInput
                label="Title"
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                style={styles.lrg}
              />
              <TextInput
                label="Description"
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                style={styles.lrg}
              />
              <View>
                <GooglePlacesAutocomplete
                  inputName={"location"}
                  handleUpdate={(value) => handleUpdate(value, setFieldValue)}
                />
              </View>

              <View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ marginTop: 5 }}
                >
                  {dayChips(values.dates.days, setFieldValue)}
                </ScrollView>
                <View
                  style={[
                    {
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      marginTop: 5,
                    },
                  ]}
                >
                  <Button
                    style={[
                      styles.submitButton,
                      { width: "100%", marginVertical: 5 },
                    ]}
                    icon="calendar"
                    mode="contained"
                    onPress={() =>
                      showDatePicker({
                        value: "start",
                        type: "date",
                        display: Platform.OS == "ios" ? "default" : "calendar",
                      })
                    }
                    color={isValid ? Colors.primary : Colors.primary.light}
                  >
                    {values.dates.date_start
                      ? values.dates.date_start.toString().substring(0, 15)
                      : "Start Date"}
                  </Button>
                  <Button
                    style={[
                      styles.submitButton,
                      { width: "100%", marginVertical: 5 },
                    ]}
                    icon="calendar"
                    mode="contained"
                    onPress={() =>
                      showDatePicker({
                        value: "end",
                        type: "date",
                        display: Platform.OS == "ios" ? "default" : "calendar",
                      })
                    }
                    color={isValid ? Colors.primary : Colors.primary.light}
                  >
                    {values.dates.date_end
                      ? values.dates.date_end.toString().substring(0, 15)
                      : "End Date"}
                  </Button>
                  <View
                    style={[
                      styles.horizontal,
                      {
                        width: "100%",
                        marginVertical: 5,
                        justifyContent: "space-evenly",
                      },
                    ]}
                  >
                    <Button
                      style={[styles.submitButton]}
                      icon="calendar-clock"
                      mode="contained"
                      onPress={() =>
                        showDatePicker({
                          value: "start",
                          type: "time",
                          display: Platform.OS == "ios" ? "spinner" : "clock",
                        })
                      }
                      color={isValid ? Colors.primary : Colors.primary.light}
                    >
                      {values.dates.time_start
                        ? displayTime(values.dates.time_start, "en-us")
                        : "Time Start"}
                    </Button>
                    <Button
                      style={[styles.submitButton]}
                      icon="calendar-clock"
                      mode="contained"
                      onPress={() =>
                        showDatePicker({
                          value: "end",
                          type: "time",
                          display: Platform.OS == "ios" ? "spinner" : "clock",
                        })
                      }
                      color={isValid ? Colors.primary : Colors.primary.light}
                    >
                      {values.dates.time_end
                        ? displayTime(values.dates.time_end, "en-us")
                        : "Time End"}
                    </Button>
                  </View>
                </View>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode={dateType.type}
                  display={dateType.display}
                  minuteInterval={15}
                  date={
                    dateType.value == "start"
                      ? values.dates.date_start == ""
                        ? new Date()
                        : values.dates.date_start
                      : values.dates.date_end == ""
                      ? new Date()
                      : values.dates.date_end
                  }
                  onConfirm={(date) => {
                    console.log("Setting Date: ", date, dateType);
                    handleConfirm(date, setFieldValue, values);
                  }}
                  onCancel={hideDatePicker}
                />
              </View>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 5 }}
              >
                {categoryChips(values.categories, setFieldValue)}
              </ScrollView>
              <View>
                <View
                  style={[
                    styles.horizontal,
                    { justifyContent: "space-evenly" },
                  ]}
                >
                  <View
                    style={{
                      height: 60,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Picker
                      selectedValue={values.pay.currency}
                      style={{ height: "100%", width: 100 }}
                      itemStyle={{ fontSize: 14, height: "100%" }}
                      onValueChange={(itemValue, itemIndex) => {
                        // setFieldTouched(input.name);
                        setFieldValue("pay.currency", itemValue);
                      }}
                    >
                      <Picker.Item label="Select.." value="default" />
                      <Picker.Item label="$ AUD" value="aud" />
                      <Picker.Item label="$ USD" value="usd" />
                      <Picker.Item label="€ EUR" value="eur" />
                    </Picker>
                  </View>

                  <TextInput
                    label="Pay"
                    value={values.pay.amount.toString()}
                    placeholder={values.pay.amount.toString()}
                    onChangeText={(value) => {
                      let newValue = parseInt(value, 10);
                      newValue = isNaN(newValue) ? "" : newValue;
                      setFieldValue("pay.amount", newValue);
                    }}
                    onBlur={handleBlur("pay.amount")}
                    style={styles.small}
                  />
                  <View
                    style={{
                      height: 60,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Picker
                      selectedValue={values.pay.rate}
                      style={{ height: "100%", width: 100 }}
                      itemStyle={{ fontSize: 14, height: "100%" }}
                      onValueChange={(itemValue, itemIndex) => {
                        // setFieldTouched(input.name);
                        setFieldValue("pay.rate", itemValue);
                      }}
                    >
                      <Picker.Item label="Hour" value="hr" />
                      <Picker.Item label="Day" value="d" />
                      <Picker.Item label="Week" value="wk" />
                    </Picker>
                  </View>
                </View>
                <Slider
                  style={{ alignSelf: "center", width: "90%", height: 40 }}
                  minimumValue={15}
                  maximumValue={60}
                  minimumTrackTintColor="#84F8D5"
                  maximumTrackTintColor="#00B981"
                  step={0.5}
                  value={values.pay.amount}
                  onValueChange={(value) => {
                    let newValue = parseInt(value, 10);
                    newValue = isNaN(newValue) ? "" : newValue;
                    setFieldValue("pay.amount", newValue);
                  }}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  style={styles.submitButton}
                  icon="check"
                  mode="contained"
                  onPress={handleSubmit}
                  color={isValid ? Colors.primary : Colors.primary.light}
                >
                  Submit
                </Button>
              </View>
            </KeyboardAwareScrollView>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.light.background,
  },
  formContainer: {
    padding: 10,
  },
  formScrollViewContainer: {},
  scrollView: {},
  small: {
    width: "20%",
    marginRight: 5,
  },
  med: {
    width: "40%",
    marginRight: "15%",
  },
  lrg: {
    width: "95%",
  },
  horizontal: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  submitButton: {
    width: "40%",
  },
});

const mapStateToProps = (state: any, ownProps) => {
  let auth = state.firebase.auth;
  let company =
    ownProps.companyRefId && auth.isLoaded
      ? _.find(state.firestore.ordered.companies, {
          refId: ownProps.companyRefId,
        })
      : null;
  return {
    auth: auth,
    company: company,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createJob: (input) => dispatch(jobActions.create(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobForm);
