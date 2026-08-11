// PinSpotLocationScreen.js
import darkMapStyle from "@/assets/mapStyles/darkMapStyle";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { SpotLocation, YellowLocationIcon } from "@/constants/SvgIcons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

import Geocoder from "react-native-geocoding";
import { useLocationStore } from "../../store/locationStore";

const PinSpotLocationScreen = () => {
  const setLocationInStore = useLocationStore((state) => state.setLocation);

  const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY;
  if (!GOOGLE_MAP_API_KEY) {
    throw new Error("GOOGLE_MAP_API_KEY is not defined");
  }
  Geocoder.init(GOOGLE_MAP_API_KEY);
  const [location, setLocation] = useState({
    latitude: 42.3601,
    longitude: -71.0589,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [address, setAddress] = useState({
    street: "Ivory Elephant street, 630",
    city: "Massachusetts",
    zipCode: "MA 01003",
    country: "USA",
  });

  //   const [address, setAddress] = useState({
  //   street: '',
  //   city: '',
  //   zipCode: '',
  //   country: '',
  // });

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack(); // If on the first slide, go back to previous screen
  };
  // const handleDragMap = (region: import("react-native-maps").Region) => {
  //   setLocation(region);
  // };
  const handleDragMap = async (region: Region) => {
    setLocation(region);

    try {
      const geoResult = await Geocoder.from(region.latitude, region.longitude);
      if (geoResult.results.length > 0) {
        const components = geoResult.results[0].address_components;

        const getComponent = (type) =>
          components.find((c) => c.types.includes(type))?.long_name || "";

        setAddress({
          street: getComponent("route") + ", " + getComponent("street_number"),
          city: getComponent("locality") || getComponent("sublocality"),
          zipCode: getComponent("postal_code"),
          country: getComponent("country"),
        });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const handleNext = () => {
    const { latitude, longitude } = location;
    const fullAddress = `${address.street}, ${address.city}, ${address.zipCode}, ${address.country}`;

    setLocationInStore({ latitude, longitude }, fullAddress);
    console.log("Location set in store:", {
      latitude,
      longitude,
      address: fullAddress,
    });
    navigation.goBack(); // Go back to the carousel screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />

      {/* Header Text */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Is the pin in the right spot?</Text>
        <Text style={styles.subHeaderText}>
          Your address is only shared with guests{`\n`} after they have made
          their reservation
        </Text>
      </View>

      {/* Address Card */}
      <View style={styles.addressCard}>
        <YellowLocationIcon />
        <View style={styles.addressTextContainer}>
          <Text style={styles.addressText}>{address.street}</Text>
          <Text style={styles.addressText}>
            {address.city}, {address.zipCode}, {address.country}
          </Text>
        </View>
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          provider={"google"}
          style={styles.map}
          region={location}
          customMapStyle={darkMapStyle}
          onRegionChangeComplete={handleDragMap}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
            <View style={styles.markerContainer}>
              <SpotLocation
                height={40}
                width={40}
                color={Colors.spotlocationColor}
              />
            </View>
          </Marker>
        </MapView>
        <Text style={styles.mapInstructionText}>
          Drag the map to reposition the pin
        </Text>
        <View style={styles.buttonBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    position: "relative",
  },
  headerContainer: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(60),
  },
  headerText: {
    color: "white",
    marginBottom: 8,
    fontSize: 20,
    fontFamily: Fonts.bold,
  },
  subHeaderText: {
    color: Colors.grey100,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(11),
    paddingTop: 10,
  },
  addressCard: {
    backgroundColor: Colors.black600,
    marginHorizontal: 29,
    borderRadius: 12,
    flexDirection: "row",
    padding: 6,
    alignItems: "center",
    position: "relative",
    zIndex: 50,
    top: 75,
    width: moderateScale(270),
  },
  addressDot: {
    width: 10,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: 10,
  },
  addressTextContainer: {
    flex: 1,
    marginLeft: 1,
  },
  addressText: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.bold,
    lineHeight: 25,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: Colors.black,
    zIndex: 1,
    top: moderateScale(-15),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapInstructionText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: 26 }],
    backgroundColor: Colors.black600,
    fontSize: 12,
    color: "white",
    paddingHorizontal: 12,

    paddingTop: 7,
    paddingBottom: 9,
    fontFamily: Fonts.regular,
    borderRadius: 12,
    textAlign: "center",
  },
  markerContainer: {
    alignItems: "center",
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,

    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "30%",
    alignItems: "center",
  },
  backButtonText: {
    color: Colors.black100,
    fontSize: 16,
    fontFamily: Fonts.plusjakartaSansSemiBold,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,

    width: "34%",
    alignItems: "center",
  },
  nextButtonText: {
    color: Colors.black100,
    fontSize: 16,
    fontFamily: Fonts.plusjakartaSansSemiBold,
  },
});

export default PinSpotLocationScreen;
