import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { moderateScale, scale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { WINDOW } from "@/utils/Scale";
import { useOwnerStore } from "../../store/ownerParkingStore";

import {
  useLocationStore,
  useLocationTypeStore,
} from "../../store/locationStore";
import { AsyncStorageService } from "../../services/AsyncStorageService";
import { useNavigation } from "@react-navigation/native";
import { usePhotoStore } from "../../store/ownerPhotoStore";
import { createOwnerParking } from "../../services/OwnerApi.Services";

const SetPriceScreen = () => {
  const {
    priceRange,
    setPriceRange,

    setTotalSlots,
    clearPriceRange,
    clearTimings,
    clearTotalSlots,
    clearVehicleType,
  } = useOwnerStore();
  const { clearPhotos } = usePhotoStore();
  const { clearLocationType } = useLocationTypeStore();
  const { clearLocation } = useLocationStore();

  const navigation = useNavigation();

  const range = priceRange
    ? [priceRange.minCharge, priceRange.maxCharge]
    : [0, 10000];

  const handleSliderChange = (values: number[]) => {
    setPriceRange({ minCharge: values[0], maxCharge: values[1] });
  };

  const handleNext = async () => {
    try {
      const { address, location } = useLocationStore.getState();
      const { priceRange, totalSlots, opensAt, closesAt, vehicleType } =
        useOwnerStore.getState();
      const { coverPhoto, additionalPhotos } = usePhotoStore.getState();
      const { locationType } = useLocationTypeStore.getState();

      const storage = new AsyncStorageService();
      const authData = await storage.getOwnerAuthData();

      if (!authData?.id || !address || !priceRange) {
        Alert.alert(
          "Missing Data",
          "Make sure all fields are filled correctly."
        );
        return;
      }

      const formData = new FormData();
      console.log("Owner ID:", authData.id);
      console.log("Address:", address);
      console.log("Price Range:", priceRange);
      console.log("Vehicle Type:", vehicleType);
      console.log("Opens At:", opensAt);
      console.log("Closes At:", closesAt);
      console.log("Location Type:", locationType);
      console.log("Cover Photo:", coverPhoto);
      formData.append("ownerId", authData.id);
      formData.append("address", address);
      formData.append("latitude", location?.latitude.toString());
      formData.append("longitude", location?.longitude.toString());
      formData.append("totalSlots", totalSlots?.toString());
      formData.append("minCharge", (priceRange.minCharge * 100).toString());
      formData.append("maxCharge", (priceRange.maxCharge * 100).toString());
      formData.append("vehicleTypes", JSON.stringify(vehicleType));
      formData.append("opensAt", opensAt);
      formData.append("closesAt", closesAt);
      formData.append("locationType", locationType);

      if (coverPhoto?.uri) {
        formData.append("images", {
          uri: coverPhoto.uri,
          name: coverPhoto.name ?? "cover.jpg",
          type: coverPhoto.type ?? "image/jpeg",
        });
      } else {
        console.log("No valid cover photo selected");
      }
      if (additionalPhotos && additionalPhotos.length > 0) {
        additionalPhotos.forEach((photo, index) => {
          if (photo?.uri) {
            formData.append("images", {
              uri: photo.uri,
              name: photo.name ?? `additional_${index}.jpg`,
              type: photo.type ?? "image/jpeg",
            });
          } else {
            console.log(`No valid additional photo at index ${index}`);
          }
        });
      }

      //await debugFormData(formData);
      console.log("formdata", formData);

      const response = await createOwnerParking(formData);
      console.log("Parking created:", response.data);
      Alert.alert("Success", "Parking location registered!");
    } catch (error) {
      console.error("API Error:", error);
      console.log("Error details:", error);

      Alert.alert("Error", "Failed to create parking location.");
    } finally {
      clearLocation();
      clearLocationType();
      clearPriceRange();
      clearTotalSlots();
      clearVehicleType();
      clearPhotos();
      clearTimings();
      navigation.navigate("PilotProfile");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lastly, set your price range</Text>
        <Text
          style={{
            paddingLeft: moderateScale(10),
            color: Colors.grey100,
            fontFamily: Fonts.regular,
            fontSize: moderateScale(11),
          }}
        >
          This can affect your availability based on real time {`\n`} demand,
          you can change it anytime.
        </Text>
      </View>

      <View style={styles.headerContainer}>
        <View style={{ paddingTop: 24 }}>
          <Text style={styles.titleText}>Price Range</Text>

          <MultiSlider
            values={[range[0], range[1]]}
            sliderLength={WINDOW.width - 54}
            onValuesChange={handleSliderChange}
            min={0}
            max={100}
            step={1}
            containerStyle={{ alignSelf: "center" }}
            selectedStyle={{ backgroundColor: Colors.primary }}
            unselectedStyle={{ backgroundColor: Colors.grey100 }}
            trackStyle={{ height: 2 }}
            markerStyle={{
              backgroundColor: Colors.primary,
              height: 16,
              width: 16,
              borderRadius: 10,
            }}
            pressedMarkerStyle={{ backgroundColor: Colors.primary }}
            allowOverlap={false}
            snapped
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>$ {range[0] * 100}</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>$ {range[1] * 100}</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingTop: 24 }}>
          <Text style={styles.titleText}>Total Slots</Text>
          <TextInput
            style={{
              backgroundColor: Colors.black600,
              borderWidth: 1,
              borderColor: Colors.grey100,
              borderRadius: 16,
              paddingHorizontal: 16,
              height: 48,
              color: Colors.white,
              fontFamily: Fonts.regular,
              fontSize: scale(14),
              marginTop: moderateScale(20),
            }}
            placeholder="Total Slots"
            placeholderTextColor={Colors.grey100}
            keyboardType="numeric"
            defaultValue="1"
            onChangeText={(text) => {
              const number = Number(text);
              if (!isNaN(number) && number >= 0) {
                setTotalSlots(number);
              }
            }}
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: moderateScale(23),
  },
  backButton: {
    marginBottom: 16,
  },
  headerTitle: {
    color: Colors.tintColorDark,
    fontSize: 20,
    fontFamily: Fonts.medium,
    paddingLeft: moderateScale(10),
    marginBottom: moderateScale(10),

    lineHeight: 25,
  },

  headerContainer: {
    paddingHorizontal: moderateScale(23),
  },
  titleText: {
    fontFamily: Fonts.bold,
    fontSize: scale(15),
    color: Colors.white,
  },
  closeButton: {
    backgroundColor: Colors.black600,
    padding: 12,
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  filterText: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    fontSize: scale(20),
    textAlign: "center",
    position: "absolute",
    alignSelf: "center",
  },
  valueContainer: {
    paddingVertical: 8,
    backgroundColor: Colors.black600,
    borderWidth: 1,
    borderColor: Colors.grey100,
    borderRadius: 16,
    paddingHorizontal: 40,
  },
  valueText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.white,
  },
  bottomContainer: {
    padding: 16,
    marginTop: "auto",
    top: 1,

    paddingHorizontal: moderateScale(27),
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "600",
  },
});
export default SetPriceScreen;
