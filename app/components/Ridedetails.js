import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Picker,TouchableOpacity, Modal, FlatList } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore methods
import { FIRESTORE_DB } from "../firebase"; // Assuming firebase is initialized in this file
import {Dropdown} from 'react-native-element-dropdown';
import { useIsFocused } from "@react-navigation/native";

const RideDetails = ({ route, navigation }) => {
  const { source, destination } = route.params; // Receive source and destination from params
  const [driverName, setDriverName] = useState("");
  const [numberOfPassengers, setNumberOfPassengers] = useState(1); // Default 1 passenger
  const [vehicleType, setVehicleType] = useState("Car"); // Default vehicle type is "Car"
  const [isFocus, setIsFocus] = useState(false);
  const [message, setMessage] = useState("");
  const vehicletypes = [
    { label: "Car", value: "car" },
    { label: "Bike", value: "bike" }
  ];
  
  const handleConfirmDetails = async () => {
    const rideDetails = {
      driverName,
      numberOfPassengers,
      vehicleType,
      source,
      destination,
      createdAt: new Date(),
    };

    try {
      // Add a new document to the 'rides' collection
      await addDoc(collection(FIRESTORE_DB, "rides"), rideDetails);
      console.log("Ride added to Firestore:", rideDetails);
      setMessage("Ride created successfully!");
    } catch (error) {
      console.error("Error adding ride to Firestore:", error);
      setMessage("Failed to create ride.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Ride Details</Text>
      <TextInput
        value={driverName}
        style={styles.input}
        placeholder="Driver Name"
        placeholderTextColor="#888" // Specify placeholder color
        onChangeText={setDriverName}
      />
      
      <View style={styles.incrementorContainer}>
        <Text style={styles.label}>Number of Passengers</Text>
        <View style={styles.incrementor}>
          <Button title="-" onPress={() => setNumberOfPassengers(Math.max(1, numberOfPassengers - 1))} />
          <Text style={styles.incrementorText}>{numberOfPassengers}</Text>
          <Button title="+" onPress={() => setNumberOfPassengers(numberOfPassengers + 1)} />
        </View>
      </View>
      <View style ={styles.pickerContainer}>
        <Text style={styles.label}>Type of vehicle</Text>
        <Dropdown 
          style={[styles.dropdown,isFocus &&{borderColor:'blue'}]}
          placeholder={vehicleType ? vehicleType : 'Select vehicle type'}
          itemTextStyle={{color:'black'}}
          labelField="label"
          valueField="value"
          data={vehicletypes}
          onFocus={() => setIsFocus(true)}
          onChange={item => {
            setVehicleType(item.value);
            setIsFocus(false);
          }}
          ></Dropdown>
      </View>
      <Button title="Confirm Ride Details" onPress={handleConfirmDetails} />
      {message && <Text style={{ color: message.includes("successfully") ? 'green' : 'red' ,textAlign:"center"}}>{message}</Text>}
    </View>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff", // Ensure background contrasts with placeholder
    color: "#333", // Text color
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  incrementorContainer: {
    marginBottom: 16,
  },
  incrementor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  incrementorText: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  placeholder: {
    color: "#888",
  },
  dropdownStyle: {
    backgroundColor: "#f8f8f8",
  },
});
