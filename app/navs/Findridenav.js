import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from '../screens/MapScreen'
import RideListScreen from '../screens/RideListScreen';
const Stack = createNativeStackNavigator();
const Findridenav = () => {
  return ( 
    <Stack.Navigator>
        <Stack.Screen name="MapScreen" component={MapScreen} initialParams={{ screenName: 'RideListScreen' }} options={{ headerShown: false }}/>
        <Stack.Screen name="RideListScreen" component={RideListScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
  )
}

export default Findridenav