import { Platform, PermissionsAndroid } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";

export const getCurrentLocation = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new Error("Location permission denied");
    }
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Current Location:", latitude, longitude);

        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};

export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number
) => {
  try {
    const json = await Geocoder.from(latitude, longitude);
    const address = json.results[0]?.formatted_address;
    return address;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};
