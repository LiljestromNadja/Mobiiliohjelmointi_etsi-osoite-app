import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View, Keyboard } from "react-native";
import MapView, { Marker } from "react-native-maps";
//import { API_TOKEN } from "@env";


   
export default function App() {

  const [input, setInput] = useState('');
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const initialRegion = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  }

const apitoken =  API_TOKEN;

const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${apitoken}&location=${input}`;

const showLocationOnMap = async (input) => {

  

  try {
    const response = await fetch(url);
    const data = await response.json();

    const lat = data.results[0].locations[0].latLng.lat;
    const lng = data.results[0].locations[0].latLng.lng;
    
    console.log('DATA RESULTS',data.results);
    console.log('DATA RESULTS LOCATIONS',data.results[0].locations);
    console.log('haettu: ', data.results[0].providedLocation.location);
    console.log('length',data.results[0].locations.length);
    console.log('latitude',lat,'longitude', lng);  
    console.log(data.results[0].locations[0].adminArea1, data.results[0].locations[0].adminArea5, data.results[0].locations[0].postalCode);
    
    setRegion({ ...region, latitude: lat, longitude: lng})

  } catch (error) {
    Alert.alert('Error', error);
    console.log('ERROR', error);
    
    }

    setInput('');
    Keyboard.dismiss();

};


  return (
    <View style={styles.container}> 
      <MapView
        style={styles.mapViewStyle}
        initialRegion={initialRegion} 
        region={region}
        >
        <Marker
        coordinate={region}>
        </Marker>
      </MapView>
      <StatusBar style="auto" />

      <TextInput 
        placeholder="Give address (and city) here" 
        style={styles.inputStyle}      
        value={input}
        onChangeText={(input) => setInput(input)}        
      />
      <Button onPress={showLocationOnMap} title="Show" ></Button>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapViewStyle: { 
    flex: 1,
    height: "100", 
    width: "100%"
   }, 
   inputStyle: {
    borderRadius: 1
   }
});