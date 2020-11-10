import React, { useRef, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator, HelperText, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { googleConfig } from "../googleConfig.js";
import * as Location from 'expo-location';
import _ from "lodash";
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Colors from "../constants/Colors";

const GooglePlacesInput = (props:any) => {
    const [ error, setError ] = useState("");
    const [ location, setLocation ] = useState({});
    const [ input, setInput ] = useState("");
    const [ selectedLocation, setSelectedLocation ] = useState({});
    const [ predictions, setPredictions ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setError('Permission to access location was denied');
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location.coords);
        })();
      }, []);
    
      let text = 'Waiting..';
      if (error) {
        text = error;
      } else if (location) {
        text = JSON.stringify(location);
        // console.log("GOt location: ", location);
      }
      const getPredictions = async () => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&location=${location ? location.latitude : null},${location ? location.longitude : null}&radius=500&key=${googleConfig.apiKey}`
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            console.log("JSON: ", `\"${json.status}\"`);
            json.status == "OK" ? setPredictions(json.predictions) : setError(json.error_message);
        } catch (err) {
            console.log("Error: ", err);
            setError(err);
        }
        setIsLoading(false)
    };
    const debouncedGetPredictions = _.debounce(getPredictions, 1000);
    const onChangeLocation = async (value:string) => {
        let location = location ?? null;
        setInput(value);
        console.log("Changing Location: ", value, location);
        setIsLoading(true)
        debouncedGetPredictions();
        

    };

    // const onChangeLocationDebounced = _.debounce((text) => onChangeLocation(text), 250);

    const handleSelectLocation = async (id:string) => {
        console.log("Searching for place: ", id);
        let fields = "address_component,adr_address,formatted_address,geometry,icon,name,place_id,plus_code,type";
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=${fields}&key=${googleConfig.apiKey}`
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            console.log("Details Response: ", json);
            // json.status == "OK" ? setSelectedLocation(json.predictions) : setError(json.error_message);
            setInput(json.result.formatted_address);
            setSelectedLocation({
                address: {
                    formatted: json.result.formatted_address,
                },
                geometry: json.result.geometry,
            });
            setPredictions([]);
            props.handleUpdate({
                currentLocation: location,
                location: {
                    address: {
                        formatted: json.result.formatted_address,
                    },
                    geometry: json.result.geometry,
                }
                });
        } catch (err) {
            console.log("Error: ", err);
            setError(err);
        }
    };
    const renderPredictions = ({item}) => {
        return (
                    <TouchableOpacity style={ styles.resultContainer } onPress={() => handleSelectLocation(item.place_id)}>
                        <Text> {item.description} </Text>
                    </TouchableOpacity>
                    
                )
    };
    const renderListHeader = () => {
        return (
            <View style={{ alignItems: 'flex-end', height: 15}}>
            {
                isLoading ?
                <ActivityIndicator animating={true} color={Colors.primary} size='small' hidesWhenStopped={true} />
                :
                null
            }
            </View>
        );
    };
    return (
        <SafeAreaView style={{  flex: 1, width: '100%', height: '100%', }}>
            <TextInput placeholder="Enter location..." value={input} onChangeText={ (text) => onChangeLocation(text)} />
            <HelperText style={{height: error? 14 : 0 }} type="error" visible={error?? false}>{error}</HelperText>
            <View style={{ flex: 1, width: '100%', height: '100%',}}>

            <FlatList
                data={predictions}
                extraData={predictions}
                keyExtractor={ item => item.id}
                renderItem={renderPredictions}
                style={{ flex: 1, }}
                contentContainerStyle={{
                  }}
                ListHeaderComponent = { renderListHeader() }
            />
                        </View>

        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    input: {
        marginVertical: 0,
    },
    resultContainer: {
        marginVertical: 0,
        // height: 30,
    },
    resultText: {
        fontSize: 16,
    }
})

export default GooglePlacesInput;
