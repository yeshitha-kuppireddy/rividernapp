import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.lightBlue}>RI</Text>
        <Text style={styles.defaultColor}>VI</Text>
        <Text style={styles.lightBlue}>DE</Text>
      </Text>
      
      <Text style={styles.caption}>Divide your Ride</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login/Logout</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 52,
    fontFamily: 'Impact',
    marginBottom: 10,
    flexDirection: 'row',
  },
  lightBlue: {
    color: '#5271ff',
  },
  defaultColor: {
    color: '#0f2f76',
  },
  caption: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 80,
  },
  button: {
    backgroundColor: '#000000',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Welcome;
