import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FindNearbyRides } from "../components/Findnearbyrides"; // Import the nearby ride query function
import { serverTimestamp } from 'firebase/firestore';
import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB} from '../firebase';
import { Icon } from 'react-native-elements';


const RideListScreen = ({ route, navigation }) => {
  const { source, destination } = route.params; // Passed source and destination
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getNearbyRides = async () => {
      setLoading(true);
      try {
        const rides = await FindNearbyRides(source, destination);
        setRides(rides);
      } catch (error) {
        console.error("Error finding nearby rides:", error);
      } finally {
        setLoading(false);
      }
    };

    if (source && destination) {
      getNearbyRides();
    }
  }, [source, destination]);

  const addFinder = async () => {
    try {
      const finderData = {
        source,
        destination,
        timestamp: serverTimestamp(), // Adds a Firestore server timestamp
      };
      await addDoc(collection(FIRESTORE_DB, "finders"), finderData);
      console.log("Finder added successfully");
    } catch (error) {
      console.error("Error adding finder:", error);
    }
  };

  // Fetch nearby rides on mount
  useEffect(() => {
    const fetchRides = async () => {
      await addFinder();
      const results = await FindNearbyRides(source, destination, 15); // 5 km radius
      setRides(results);
      setLoading(false);
    };
    fetchRides();
  }, [source, destination]);

  // Render single ride in FlatList
  const renderRide = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("RideDetails", { ride: item })}
    >
      <View style={styles.listitemcontainer}>
        <Image style={styles.vehicleimage} source={require('../assets/uberGo.png')}/>
        <View style={styles.textcontainer}>
          <Text>{item.driverName}</Text>
        </View>
        <View style={styles.rightcontainer}>
          <Icon type="material-icons" name="person" size={20}  />
          <Text>{item.numberOfPassengers}</Text>
        </View>
        {/*<View style={{flexDirection:"row"}}>
        <Text style={{flexDirection:"row"}}>{item.driverName}</Text>
          <Image
            source={require("../assets/group.jpg")} // Placeholder person icon
            style={styles.personIcon}
          />
          <Text style={styles.passengerCount}>{item.numberOfPassengers}</Text>
        </View>*/}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <MapView style={styles.map} initialRegion={{
        latitude: source.latitude,
        longitude: source.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}>
        {rides.map((ride, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: ride.source.latitude,
              longitude: ride.source.longitude,
            }}
            title={`Ride by ${ride.driverName}`}
          >
            <Image source={require("../assets/car.png")} style={styles.markerIcon} />
          </Marker>
        ))}
      </MapView>

      {/* FlatList Section */}
      <View style={styles.listContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Loading rides...</Text>
        ) : rides.length === 0 ? (
          <Text style={styles.emptyText}>No rides found nearby</Text>
        ) : (
          <FlatList
            data={rides}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderRide}
          />
        )}
      </View>
    </View>
  );
};

export default RideListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    flexDirection:"row",
    backgroundColor:"white",
    paddingTop: 10,
    alignItems: "center",
  },
  rideItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 3,
  },
  carIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rideInfo: {
    flex: 1,
  },
  rideName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  passengerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  personIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  passengerCount: {
    fontSize: 14,
    color: "#666",
  },
  markerIcon: {
    width: 30,
    height: 30,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  listitemcontainer:{
    flexDirection:"row",
    padding:15,
  },
  textcontainer:{
    flexDirection:"row"
  }
});