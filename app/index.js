import React from 'react';
import 'react-native-get-random-values';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import Welcome from './screens/welcome';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './screens/login';
import Findridenav from './navs/Findridenav';
import Createridenav from './navs/Createridenav';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="welcome" component={Welcome} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Findridenav" component={Findridenav} options={{ headerShown: false }}/>
        <Stack.Screen name="Createridenav" component={Createridenav} options={{ headerShown: false }}/>

      </Stack.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
