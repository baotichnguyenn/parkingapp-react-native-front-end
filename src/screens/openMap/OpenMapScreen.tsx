import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import darkMapStyle from "@/assets/mapStyles/darkMapStyle";
import Search from "@/components/Search";
import { Colors } from "@/constants/Colors";
import { moderateScale, scale, WINDOW } from "@/utils/Scale";
import { CarkitIcon, UserLocationIcon } from "@/constants/SvgIcons";
import { Fonts } from "@/constants/Fonts";
import ParkingCard from "@/components/home/ParkingCard";
import HeaderComp from "@/components/global/HeaderComp";
import ParkingCardModel from "@/components/home/ParkingCardModel";
import { getParkingData } from "@/services/ParkingApi.service";
import FilterSheet from "@/components/home/FilterSheet";
import Suggestions from "@/components/home/Suggestions";
import { GOOGLE_MAP_API_KEY } from "@/constants/Config";
import Geocoder from "react-native-geocoding";
import { getCurrentLocation } from "@/utils/Location.util";

const OpenMapScreen = () => {
  const [location, setlocation] = useState({
    latitude: 42.358181,
    longitude: -71.093086,
  });

  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleFilterApply = (data: any[]) => {
    setFilteredData(data);
    // optionally update UI or trigger fetch
  };

  const [searchQuery, setsearchQuery] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  const fetchSuggestions = async (input: string) => {
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
  const handleLocationPress = (item: { description: string }) => {
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
  // const filteredData = data.filter(item =>
  //   item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  // );
  const [showFilterSheet, setshowFilterSheet] = useState(false);

  const [showModel, setShowModel] = useState(false);
  const [parkingsData, setparkingsData] = useState([]);
  const [activeParking, setactiveParking] = useState(null);
  useEffect(() => {
    (async () => {
      await getAllNearbyParkings();
    })();
  }, [location]);
  useEffect(() => {
    console.log("Fetching Users Current Location");

    (async () => {
      const loc = await getCurrentLocation();
      console.log(loc);
    })();
  }, []);

  const getAllNearbyParkings = async () => {
    try {
      const data = await getParkingData({ ...location, page: 1 });
      if (data.status == 200) {
        console.log(data.data);

        setparkingsData(data.data?.parkings);
      }
    } catch (error) {
      console.error("Error fetching parking data:", error);
    }
  };

  const displayData = filteredData.length > 0 ? filteredData : parkingsData;
  useEffect(() => {
    console.log("displayData", filteredData);
  }, [displayData]);

  return (
    <View style={{ backgroundColor: Colors.black, flex: 1 }}>
      {showFilterSheet && (
        <FilterSheet
          visible={showFilterSheet}
          parkingData={parkingsData}
          onClose={() => setshowFilterSheet(false)}
          onApplyFilter={handleFilterApply}
        />
      )}
      <MapView
        provider={PROVIDER_DEFAULT}
        showsUserLocation={false}
        // showsMyLocationButton
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
          {/* <Image
            source={require('@/assets/images/icon80.png')}
            style={{width: 45, height: 45, resizeMode: 'contain'}}
          /> */}
          <UserLocationIcon width={50} height={50} />
        </Marker>
        {displayData?.map((item) => (
          <Marker
            key={item.id}
            onPress={() => {
              setactiveParking(item);
              setShowModel(true);
            }}
            style={{ height: 30, width: 35 }}
            coordinate={{
              latitude: parseFloat(item?.latitude) || location.latitude,
              longitude: parseFloat(item?.longitude) || location.longitude,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 3,
                paddingHorizontal: 5,
              }}
            >
              <Text style={{ fontFamily: Fonts.semiBold, color: Colors.black }}>
                ${Math.round(item.hourly_rate)}
              </Text>
            </TouchableOpacity>
          </Marker>
        ))}
      </MapView>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          position: "absolute",
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            // marginTop: 24,
            backgroundColor: "transparent",
            // position: 'absolute',

            width: "100%",
          }}
        >
          <HeaderComp
            title="Nearby You"
            showDots={false}
            isQrScreen={false}
            backgroundColor=""
          />
          <View>
            <Search
              searchQuery={searchQuery}
              setSearchQuery={(query) => {
                fetchSuggestions(query);
                setsearchQuery(query);
              }}
            />
            <Suggestions
              style={{
                marginHorizontal: 20,
                width: WINDOW.width - 48,
                top: 50,
              }}
              suggestions={suggestions}
              onPress={handleLocationPress}
            />
            <View style={{ marginHorizontal: 20 }}></View>
          </View>
        </View>
        <View>
          <View style={{ alignSelf: "flex-end", margin: 16, gap: 8 }}>
            {/* <TouchableOpacity>
              <NavigateIcon />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => setshowFilterSheet(true)}>
              <CarkitIcon />
            </TouchableOpacity>
          </View>
          <View
            style={{
              // position: 'absolute',
              bottom: 0,
              backgroundColor: Colors.black,
              width: "100%",
              paddingTop: 16,
            }}
          >
            <View
              style={{
                height: 5,
                backgroundColor: Colors.whiteText,
                width: 70,
                alignSelf: "center",
                borderRadius: 5,
                marginBottom: 18,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 24,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.titleText}>
                Found ({displayData?.length})
              </Text>
              <Text style={styles.seeAllText}>See All</Text>
            </View>
            <FlatList
              horizontal
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 30,
              }}
              ItemSeparatorComponent={() => (
                <View style={{ marginRight: 12 }} />
              )}
              renderItem={({ item, index }) => (
                <ParkingCard
                  item={item}
                  index={index}
                  onpress={() => {
                    setactiveParking(item);
                    setShowModel(true);
                  }}
                />
              )}
              data={displayData}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      {showModel && (
        <ParkingCardModel
          parking={activeParking}
          visible={showModel}
          onClose={() => setShowModel(false)}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  card1: {
    borderRadius: 100,
    borderColor: Colors.grey200,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 78,
    height: 38,
    flexDirection: "row",
    gap: 6,
    padding: moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: scale(10),
    // marginBottom: moderateScale(24),
  },
  text1: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: "white",
  },
  activeText: {
    color: Colors.primary,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    top: "20%",
  },

  activecard: {
    borderRadius: 16,
    backgroundColor: Colors.black100,
    borderWidth: 0,
    borderColor: Colors.darkbluegrey,
    marginRight: 12,
    minWidth: 80,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.white,
  },
  seeAllText: {
    color: Colors.primary,
    fontSize: scale(14),
    fontFamily: Fonts.regular,
  },
});

export default OpenMapScreen;
