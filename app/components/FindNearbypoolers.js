import { getDocs, query, collection, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase"; // Firestore instance
import { addDoc } from "firebase/firestore"; // Firestore instance
import { serverTimestamp } from 'firebase/firestore';

export const createRide = async (rideDetails) => {
  try {
    const ridesCollection = collection(FIRESTORE_DB, "rides");
    const docRef = await addDoc(ridesCollection, rideDetails);
    console.log("Ride created with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating ride:", error);
    throw error;
  }
};


// Function to find nearby poolers
export const findNearbyPoolers = async (source, destination, radius = 5) => {
  try {
    const poolersRef = collection(FIRESTORE_DB, "finders");
    const q = query(poolersRef);
    console.log("creator Source:", source);
    console.log("creator Destination:", destination);

    const snapshot = await getDocs(q);
    const poolers = [];
    snapshot.forEach((doc) => {
      const data = doc.data();

      // Calculate the distance between current pooler and source/destination
      const isSourceNearby = calculateDistance(
        source.latitude,
        source.longitude,
        data.source.latitude,
        data.source.longitude
      ) <= radius;

      const isDestinationNearby = calculateDistance(
        destination.latitude,
        destination.longitude,
        data.destination.latitude,
        data.destination.longitude
      ) <= radius;

      if (isSourceNearby && isDestinationNearby) {
        poolers.push({ id: doc.id, ...data });
      }
    });

    return poolers;
  } catch (error) {
    console.error("Error finding nearby poolers:", error);
    return [];
  }
};

// Helper function to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
