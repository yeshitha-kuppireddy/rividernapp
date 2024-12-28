import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { findNearbyPoolers,createRide } from "../components/FindNearbypoolers"; 
import RideDetails from "../components/Ridedetails";

const PoolerListScreen = ({ route, navigation }) => {
  const { source, destination } = route.params; // Passed source and destination
  const [poolers, setPoolers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rideCreated, setRideCreated] = useState(false); // Track if ride is created

  useEffect(() => {
    const fetchPoolers = async () => {
      const results = await findNearbyPoolers(source, destination, 5); // 5 km radius
      setPoolers(results);
      setLoading(false);
    };
    fetchPoolers();
  }, [source, destination]);

  // Render single pooler in FlatList
  const renderPooler = ({ item }) => (
    <TouchableOpacity
      style={styles.poolerItem}
      onPress={() => navigation.navigate("PoolerDetails", { pooler: item })}
    >
      <Image
        source={require("../assets/group.jpg")} // Placeholder person icon
        style={styles.personIcon}
      />
      <View style={styles.poolerInfo}>
        <Text style={styles.poolerName}>Pooler ID: {item.id}</Text>
        <Text style={styles.poolerDestination}>
          Destination: {item.destination.latitude}, {item.destination.longitude}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: source.latitude,
          longitude: source.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {poolers.map((pooler, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: pooler.source.latitude,
              longitude: pooler.source.longitude,
            }}
            title={`Pooler ${pooler.id}`}
          >
            <Image source={require("../assets/group.jpg")} style={styles.markerIcon} />
          </Marker>
        ))}
      </MapView>

      {/* FlatList Section */}
      <View style={styles.listContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Loading poolers...</Text>
        ) : poolers.length === 0 ? (
          <Text style={styles.emptyText}>No poolers found nearby</Text>
        ) : (
          <FlatList
            data={poolers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPooler}
          />
        )}
      </View>

      {/* Create Ride Button */}
      <View style={styles.createRideButtonContainer}>
        <TouchableOpacity
          style={styles.createRideButton}
          onPress={() =>
            navigation.navigate("RideDetails", { source, destination })
          }
        >
          <Text style={styles.createRideButtonText}>Create Ride</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
};

export default PoolerListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  poolerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  personIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  poolerInfo: {
    flex: 1,
  },
  poolerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  poolerDestination: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
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
  createRideButtonContainer: {
    padding: 20,
    alignItems: "center",
  },
  createRideButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  createRideButtonText: {
    color: "#666",
    fontSize: 16,
  },
  rideCreatedText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
