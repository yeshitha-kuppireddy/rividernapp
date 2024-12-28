import React from 'react'
import { GeoFirestore } from 'geofirestore';
import { getFirestore } from 'firebase/firestore';
import { GeoPoint } from 'firebase/firestore';
import { FIRESTORE_DB} from '../firebase';
import { addDoc, collection,getDocs} from "firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';


// Function to add a new ride
export const createRide = async (rideDetails) => {
  try {
    const ridesRef = collection(FIRESTORE_DB, "rides");
    const newRide = await addDoc(ridesRef, rideDetails);
    console.log("Ride created with ID:", newRide.id);
    return { success: true, id: newRide.id };
  } catch (error) {
    console.error("Error creating ride:", error);
    return { success: false, error };
  }
};


// Haversine formula for distance calculation
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  
  const R = 6371; // Radius of Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const FindNearbyRides = async (source, destination, radius = 500) => {
  try {
    const ridesRef = collection(FIRESTORE_DB, "rides");
    const snapshot = await getDocs(ridesRef);
    const rides = [];
    console.log("Finder Source:", source);
    console.log("Finder Destination:", destination);
    
    snapshot.forEach((doc) => {
      const ride = doc.data();
      const sourceDistance = calculateDistance(
        source.lat,
        source.lng,
        ride.source.lat,
        ride.source.lng
      );
      const destinationDistance = calculateDistance(
        destination.lat,
        destination.lng,
        ride.destination.lat,
        ride.destination.lng
      );
      console.log(`Source Distance: ${sourceDistance}, Destination Distance: ${destinationDistance}`);
      console.log(`Within Radius: ${sourceDistance <= radius && destinationDistance <= radius}`);

      // Add the ride if both source and destination are within the radius
      if (sourceDistance <= radius && destinationDistance <= radius) {
        rides.push({ id: doc.id, ...ride });
      }
    });
    return rides;
  } catch (error) {
    console.error("Error finding nearby rides:", error);
    return [];
  }
};
