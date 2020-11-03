import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Button, Title, Chip } from 'react-native-paper'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Colors from "../../constants/Colors.ts";
import { Formik } from 'formik';
import Slider from '@react-native-community/slider';
import { Icon } from 'react-native-vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as _ from 'lodash';
import JOB_CATEGORIES from '../../data/stubbed/dummy-job-categories';

import validation from '../../data/validation/JobValidation';

const job = {
    companyId: 'insertCompanyId',
    categories: [1],
    title: "",
    description: "",
    location: {
        address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
        },
        geo: {
            lat: '',
            long: '',
        }
    },
    dates: {
        date_start: "",
        date_end: "",
        time_start: "",
        time_end: "",
        frequency: [],
        onCall: false,
    },
    pay: {
        amount: 0,
        rate: "",
        estimated: false,
        tips: false,
    }
};

const categoryChips = (categories, setFieldValue) => {
    return JOB_CATEGORIES.map( (cat) => {
        let selected = _.includes(categories, cat.id)? true : false;
        return (
            <Chip icon={cat.icon} selected={selected} onPress={ () => {
                setFieldValue('categories', selected ? _.without(categories, cat.id) : _.concat(categories, cat.id))
            }}
            > 
                {cat.title} 
            </Chip>
        )
    })
}

export class JobForm extends Component {
    static propTypes = {
        prop: PropTypes,
    }
    render() {
        return (
            <View style={styles.container}>
                <Title> Add Job </Title>
                <Formik
                    initialValues={job}
                    validationSchema={validation}
                    onSubmit={values => console.log(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, isValid, isSubmitting, setFieldValue, values }) => (
                        <View style={ styles.formContainer }>
                            <KeyboardAwareScrollView
                                enableOnAndroid={true}
                                enableAutomaticScroll={true}
                                extraScrollHeight={ Platform.OS == 'ios' ? -150 : 90 }
                                keyboardShouldPersistTaps={'handled'}
                                style={{ }}
                                contentContainerStyle={ styles.scrollView }
                            >
                            <TextInput
                                label="Title"
                                value={values.title}
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                style={ styles.lrg }
                            />
                            <TextInput
                                label="Description"
                                value={values.description}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                style={ styles.lrg }
                            />
                            <TextInput
                                label="Location"
                                value={values.location.address.line1}
                                onChangeText={handleChange('location.address.line1')}
                                onBlur={handleBlur('location.address.line1')}
                                style={ styles.lrg }
                            />
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                { categoryChips(values.categories, setFieldValue) }
                            </ScrollView>
                            <View style={ styles.horizontal }>
                                <TextInput
                                    label="Pay"
                                    value={values.pay.amount.toString()}
                                    placeholder={values.pay.amount.toString()}
                                    onChangeText={ (value) => {
                                        let newValue = parseInt(value, 10);
                                        newValue = isNaN(newValue) ? '' : newValue;
                                        setFieldValue('pay.amount', newValue);
                                    } }
                                    onBlur={handleBlur('pay.amount')}
                                    style={ styles.small }
                                />
                                <Slider
                                    style={{alignSelf: 'center', width: '90%', height: 40}}
                                    minimumValue={15}
                                    maximumValue={60}
                                    minimumTrackTintColor="#84F8D5"
                                    maximumTrackTintColor="#00B981"
                                    step={.5}
                                    onValueChange={(value) => {
                                        let newValue = parseInt(value, 10);
                                        newValue = isNaN(newValue) ? '' : newValue;
                                        setFieldValue('pay.amount', newValue);
                                    }}
                                />
                            </View>
                            
                           
                            

                            <View style={styles.buttonContainer}>
                                <Button
                                    style={styles.submitButton} 
                                    icon="check" 
                                    mode="contained" 
                                    onPress={handleSubmit}
                                    color={ isValid ? Colors.primary : Colors.primary.light}
                                > 
                                    Submit 
                                </Button>
                            </View>
                            </KeyboardAwareScrollView>
                        </View>
                    )}
                </Formik>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.light.background,
    },
    formContainer: {
        padding: 10,
    },
    scrollView: {

    },
    small: {
        width: '15%',
        marginRight: 5, 
        
    },
    med: {
        width: '40%',
        marginRight: '15%', 

    },
    lrg: {
        width: '95%',
    
    },
    horizontal: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    submitButton: {
        width: '40%',
    }
})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(JobForm)
