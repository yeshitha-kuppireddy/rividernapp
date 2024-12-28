import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from '../screens/MapScreen';
import CreateRide from '../screens/CreateRide';
import RideDetails from '../components/Ridedetails';

const Stack = createNativeStackNavigator();

const Createridenav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="MapScreen" component={MapScreen} initialParams={{ screenName: 'CreateRide' }} options={{ headerShown: false }}/>
        <Stack.Screen name="CreateRide" component={CreateRide} options={{ headerShown: false }}/>
        <Stack.Screen name="RideDetails" component={RideDetails} options={{ headerShown: false }}/>
      </Stack.Navigator>
  )
}

export default Createridenav;