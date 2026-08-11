import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";
import {
  Bike,
  Car_active_Icon,
  Car_Icon,
  IconBlack,
  MarkerIcon,
  Motorcycle,
  NotificationIcon,
  Truck_Icon,
} from "@/constants/SvgIcons";
import darkMapStyle from "@/assets/mapStyles/darkMapStyle";
import CardComponent from "@/components/home/CardComponent";
import { useNavigation } from "@react-navigation/native";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  getAddressFromCoordinates,
  getCurrentLocation,
} from "@/utils/Location.util";
import ParkingCard from "@/components/home/ParkingCard";
import { getParkingData } from "@/services/ParkingApi.service";

import Suggestions from "@/components/home/Suggestions";
import { GOOGLE_MAP_API_KEY } from "@/constants/Config";

import Geocoder from "react-native-geocoding";

import { getLetestData } from "@/services/UsersApi.services";
import { AsyncStorageService } from "@/services/AsyncStorageService";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const height = useBottomTabBarHeight();
  // const mapRef = useRef<MapView>(null);
  const [letestData, setLetestData] = useState<any>(null);
  const [location, setlocation] = useState({
    latitude: 42.358181,
    longitude: -71.093086,
  });
  const [filter, setfilter] = useState<string | null>(null);

  const [filterdData, setfilterdData] = useState([]);
  const [parkingsData, setparkingsData] = useState([]);
  const [suggestions, setsuggestions] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [address, setaddress] = useState("");
  const [activeSesion, setactiveSesion] = useState(null);

  const vehicleOptions = [
    { id: "Car", Icon: Car_Icon, label: "Car", ActiveIcon: Car_active_Icon },
    {
      id: "Truck",
      Icon: Truck_Icon,
      label: "Truck",
      ActiveIcon: Car_active_Icon,
    },
    { id: "Bike", Icon: Bike, label: "Bike", ActiveIcon: Car_active_Icon },
    {
      id: "Motorcycle",
      Icon: Motorcycle,
      label: "Motorcycle",
      ActiveIcon: Car_active_Icon,
    },
  ];
  Geocoder.init(GOOGLE_MAP_API_KEY);

  useEffect(() => {
    (async () => {
      const loc = await getCurrentLocation();
      console.log(loc);
      const address = await getAddressFromCoordinates(
        loc.latitude,
        loc.longitude
      );
      console.log(address);

      setaddress(address);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await getAllNearbyParkings();
      const storage = new AsyncStorageService();
      const authData = await storage.getAuthData();
      if (authData?.id) {
        const latest = await getLetestData(authData.id);
        console.log("getLetestData", latest.data);
        const ongoing = latest?.data?.bookingHistory?.filter(
          (item: any) => item?.actual_check_out == null
        );

        console.log("ongoing", ongoing);
        if (ongoing?.length > 0) {
          setactiveSesion(ongoing?.[0]);
          console.log("________________________________");

          console.log(ongoing?.[0]);
        }
        setLetestData(latest.data);
        console.log("letestData", latest.data);
      }
    })();
  }, [location]);

  useEffect(() => {
    const filterdata = filterdData?.filter((item) =>
      item?.vehicle_types?.includes(filter)
    );
    setparkingsData(filterdata);
  }, [filter]);

  const fetchSuggestions = async (input) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_MAP_API_KEY}`
      );

      const data = await response.json();
      console.log(data);

      setsuggestions(data.predictions);
    } catch (error) {
      console.log("Error fetching suggestions: ", error);
    }
  };

  const getAllNearbyParkings = async () => {
    try {
      const data = await getParkingData({ ...location, page: 1 });
      if (data.status == 200) {
        console.log(data.data);
        setfilterdData(data?.data?.parkings);
        setparkingsData(data.data?.parkings);
      }
    } catch (error) {
      console.error("Error fetching parking data: ", error);
    }
  };
  const handleLocationPress = (item: any) => {
    Geocoder.from(item?.description)
      .then((json) => {
        const location = json.results[0].geometry.location;
        setlocation({
          ...location,
          latitude: location.lat,
          longitude: location.lng,
        });
        setsearchQuery(item?.description);
        setsuggestions([]);
        console.log("Latitude:", location.lat);
        console.log("Longitude:", location.lng);
      })
      .catch((error) => console.warn(error));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.primary} />
      {/* Header Component */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          {" "}
          <Image
            style={styles.avtarImage}
            source={require("@/assets/images/slide1.png")}
          />
        </TouchableOpacity>

        <View style={styles.locationContainer}>
          <Text style={[styles.lightText, { textAlign: "center" }]}>
            Your location
          </Text>
          <View style={styles.headerLocation}>
            <MarkerIcon />
            <Text numberOfLines={1} style={[styles.semibold]}>
              {address}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <NotificationIcon />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: height }}
        style={{ flex: 1 }}
      >
        {/* Welcome Section */}
        <View
          style={{
            backgroundColor: Colors.primary,
            paddingLeft: 21,
            paddingRight: 16,
          }}
        >
          <Text style={styles.headerTitle}>
            Welcome {letestData?.user?.name ?? "Alex"},{"\n"}It’s time to park!
          </Text>
          <View>
            <View style={styles.searchContainer}>
              <IconBlack />
              <TextInput
                // onFocus={() => navigation.navigate('NearbyYou')}
                placeholder="Search..."
                style={styles.input}
                value={searchQuery}
                onChangeText={(input) => {
                  fetchSuggestions(input);
                  setsearchQuery(input);
                }}
                placeholderTextColor={Colors.black100}
              />
            </View>

            <Suggestions
              suggestions={suggestions}
              onPress={handleLocationPress}
            />
          </View>
        </View>

        {/* Search Section */}
        <View style={[styles.ongoingContainer, { paddingBottom: 110 }]}>
          <Text style={styles.ongoingText}>Ongoing Session</Text>
        </View>

        {/* Ongoing Session Section */}
        <View style={styles.ongoingSection}>
          {activeSesion && <CardComponent item={activeSesion} />}
        </View>

        {/* Vehicle Type Section */}
        <View style={styles.vehicleType}>
          {vehicleOptions?.map((item) => {
            let SvgIcons = item.Icon;
            const isSelected = filter === item.id;
            if (isSelected) {
              SvgIcons = item.ActiveIcon;
            }
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setfilter(item.id)}
                style={[styles.containerIcon]}
              >
                <View
                  style={[
                    styles.svgIconContainer,
                    isSelected && { backgroundColor: Colors.primary },
                  ]}
                >
                  <SvgIcons />
                </View>
                <Text
                  style={[
                    styles.lightText,
                    { color: isSelected ? Colors.primary : Colors.white },
                  ]}
                >
                  {item.id}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={{
            paddingTop: 30,
            // paddingLeft: 21,
          }}
        >
          <View style={styles.headerParking}>
            <Text style={styles.titleText}>Best Parking</Text>
            <TouchableOpacity onPress={() => navigation.navigate("NearbyYou")}>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: Colors.primary,
                  fontSize: scale(14),
                }}
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal: 20 }}
            ItemSeparatorComponent={() => <View style={{ marginRight: 12 }} />}
            renderItem={({ item, index }) => (
              <ParkingCard item={item} index={index} />
            )}
            data={parkingsData}
          />
        </View>

        {/* Nearby Section */}
        <View style={{ paddingTop: 24 }}>
          <View style={styles.headerParking}>
            <Text style={styles.titleText}>Nearby You</Text>
            <Text
              onPress={() => navigation.navigate("OpenMap")}
              style={styles.mapText}
            >
              Open Map
            </Text>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              provider={
                Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_GOOGLE
              }
              showsUserLocation={false}
              customMapStyle={darkMapStyle}
              style={{ flex: 1, borderRadius: 20 }}
              onRegionChange={() => {}}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                style={{ height: 100, width: 100 }}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              >
                <Image
                  source={require("@/assets/images/icon80.png")}
                  style={{ width: 45, height: 45, resizeMode: "contain" }}
                />
              </Marker>
              {parkingsData?.map((item) => (
                <Marker
                  key={item.id}
                  style={{ height: 30, width: 35 }}
                  coordinate={{
                    latitude:
                      parseFloat(item?.latitude ?? "") || location.latitude,
                    longitude:
                      parseFloat(item?.longitude ?? "") || location.longitude,
                  }}
                >
                  <View style={styles.markerContainer}>
                    <Text
                      style={{
                        fontFamily: Fonts.semiBold,
                        color: Colors.black,
                      }}
                    >
                      ${Math.round(item.hourly_rate ?? 0)}
                    </Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          </View>
        </View>

        {/* Recommendation Section */}
        {/* <View style={{paddingTop: 24}}>
          <View style={styles.headerParking}>
            <Text style={styles.titleText}>Recommendation</Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: Colors.primary,
                  fontSize: scale(14),
                }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{paddingHorizontal: 20}}
            ItemSeparatorComponent={() => <View style={{paddingVertical: 8}} />}
            renderItem={renderRecommendations}
            data={[2, 3, 4]}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.primary,
    paddingLeft: 28,
    paddingRight: 21,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 25,
  },
  avtarImage: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
  },
  lightText: {
    fontFamily: Fonts.medium,
    fontSize: scale(11.5),
  },
  semibold: {
    fontFamily: Fonts.semiBold,
    fontSize: scale(14),
  },
  headerLocation: { flexDirection: "row", alignItems: "center", gap: 10 },
  locationContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: "50%",
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Colors.black100,
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: Colors.black100,
    flexDirection: "row",
    marginTop: 24,
    // marginBottom: 30,
    borderRadius: 8,
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: Colors.searchBg,
    // paddingVertical: 10,
    gap: 12,
  },
  input: {
    paddingVertical: 13,
    flex: 1,
    fontFamily: Fonts.regular,
  },
  ongoingText: {
    fontFamily: Fonts.bold,
    color: Colors.black100,
    fontSize: 20,
  },
  ongoingContainer: {
    backgroundColor: Colors.primary,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 25,
    gap: 15,
  },
  containerIcon: {
    // justifyContent: 'center',
    alignItems: "center",
    gap: 8,
    // flex: 1,
    width: scale(60),
    // height:scale(80)
  },
  svgIconContainer: {
    backgroundColor: Colors.grey400,
    borderWidth: 1,
    borderColor: Colors.svgIconContaner,
    borderRadius: 12,
    // height: 60,
    // width: 60,
    width: scale(60),
    height: scale(60),
    justifyContent: "center",
    alignItems: "center",
  },
  headerParking: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 21,
  },
  titleText: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.white,
  },
  itemTitle: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    fontSize: 16,
  },

  ratingText: {
    fontFamily: Fonts.semiBold,
    fontSize: scale(12),
    color: Colors.whiteText,
  },
  vehicleType: {
    paddingLeft: 28,
    paddingRight: 18,
    gap: 16,
    paddingTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ongoingSection: {
    flex: 1,
    backgroundColor: Colors.black,
    marginTop: -95,
    borderRadius: 24,
    marginHorizontal: 25,
  },
  mapText: {
    fontFamily: Fonts.regular,
    color: Colors.primary,
    fontSize: scale(14),
  },
  mapContainer: {
    height: 189,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.grey100,
    borderRadius: 20,
    overflow: "hidden",
  },
  markerContainer: {
    backgroundColor: "white",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
});

export default HomeScreen;
