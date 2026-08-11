import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useLocationTypeStore } from "../../store/locationStore";
import { useNavigation } from "@react-navigation/native";
import React, {  useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

const DescribeYourPlace = () => {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const navigation = useNavigation<any>();
  const { locationType, setLocationType } = useLocationTypeStore();

  const placeOptions = [
    "Private garage",
    "Residential Driveway",
    "Commercial Lot",
    "Church",
    "Hotel Parking",
    "Retail Parking",
    "Office Parking",
    "Empty Land",
    "Other",
  ];

  const handleSelection = (place: string) => {
    setSelectedPlace(place);
    setLocationType(place);
    console.log("locationType", locationType);
  };

  const handleNext = () => {
    navigation.navigate("PinSpotLocation");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Which of these best {`\n`}describe your place?
        </Text>
      </View>

      {/* Options Grid */}
      <ScrollView contentContainerStyle={styles.optionsContainer}>
        {placeOptions.map((place, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedPlace === place && styles.selectedOption,
            ]}
            onPress={() => {
              handleSelection(place);
            }}
          >
            <Text style={styles.optionText}>{place}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginBottom: 16,
  },
  headerTitle: {
    color: Colors.tintColorDark,
    fontSize: 20,
    fontFamily: Fonts.medium,
    paddingLeft: moderateScale(10),
    marginBottom: 24,
    // paddingTop: moderateScale(46),
    lineHeight: 25,
  },

  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(21),
    paddingTop: moderateScale(20),
  },

  optionButton: {
    backgroundColor: Colors.mutedGreen,

    width: "48%",
    height: moderateScale(92),
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-end",

    marginBottom: moderateScale(49),
  },
  selectedOption: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  optionText: {
    color: Colors.tintColorDark,
    fontFamily: Fonts.semiBold,
    fontSize: 14,
  },
  bottomContainer: {
    padding: 16,
    marginTop: "auto",
    // marginBottom: moderateScale(20),
    paddingHorizontal: moderateScale(27),
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DescribeYourPlace;
