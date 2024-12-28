import React, { useState, useRef } from 'react';
import { View, StyleSheet,TouchableOpacity, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import { GOOGLE_MAPS_API } from '../.env';
import RideListScreen from './RideListScreen';

const MapScreen = ({route: navigationRoute}) => {
  const { screenName } = navigationRoute.params || {};
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showContinue, setShowContinue] = useState(false);
  const [route, setRoute] = useState(null);
  const mapRef = useRef(null);
  const navigation = useNavigation(); 
  

  const handleRouteReady = (result) => {
    setRoute(result);
    // Automatically zoom in and fit to the route coordinates
    const coordinates = result.coordinates;
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
    setShowContinue(true);
  };
  const handleContinue = () => {
    if (screenName) {
      navigation.navigate(screenName, { source, destination });
    } else {
      console.warn("No screen name provided for navigation.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Source Location Autocomplete */}
      
      <View style={styles.inputContainer}>
        <Icon name="location-on" size={24} color="#286ef0" style={styles.icon} />
        <GooglePlacesAutocomplete
          placeholder="Enter Source Location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            const sourceLocation = details.geometry.location;
            setSource(sourceLocation);
          }}
          enablePoweredByContainer={false}
          styles={{
            container: { flex: 1 },
            textInput: styles.textInput,
          }}
          query={{
            key: GOOGLE_MAPS_API,
            language: 'en',
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
      </View>

      {/* Destination Location Input with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="flag" size={24} color="#286ef0" style={styles.icon} />
        <GooglePlacesAutocomplete
          placeholder="Enter Destination Location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            const destinationLocation = details.geometry.location;
            setDestination(destinationLocation);
          }}
          enablePoweredByContainer={false}
          styles={{
            container: { flex: 1 },
            textInput: styles.textInput,
          }}
          query={{
            key: GOOGLE_MAPS_API,
            language: 'en',
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
      </View>


      {/* Map View with Route */}
      <View style={{ flex: 1 }}>
        <MapView ref={mapRef} style={styles.map}>
          {source && (
            <Marker coordinate={{ latitude: source.lat, longitude: source.lng }} title="Source" />
          )}
          {destination && (
            <Marker coordinate={{ latitude: destination.lat, longitude: destination.lng }} title="Destination" />
          )}

          {/* Using MapViewDirections for routing between source and destination */}
          {source && destination && (
            <MapViewDirections
              origin={{ latitude: source.lat, longitude: source.lng }}  // Source coordinates
              destination={{ latitude: destination.lat, longitude: destination.lng }}  // Destination coordinates
              apikey={GOOGLE_MAPS_API}  // API key for Directions API
              strokeWidth={3}  // Set the width of the route path
              strokeColor="black"  // Set the color of the route path
              onReady={handleRouteReady}  // Handle the route once it's ready
            />
          )}
        </MapView>
      </View>
      {/* Continue Button */}
      {showContinue && (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  map: {
    flex: 1,
    height: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 3,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  continueButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 5,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
  },
});
