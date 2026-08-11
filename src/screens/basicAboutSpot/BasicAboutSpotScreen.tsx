import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import {
  Bike,
  Car_active_Icon,
  Car_Icon,
  Motorcycle,
  TimeIcon,
  Truck_Icon,
} from "@/constants/SvgIcons";
import { useOwnerStore } from "../../store/ownerParkingStore";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale } from "react-native-size-matters";

const BasicAboutSpotScreen = () => {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const {

    closesAt,
    opensAt,
    setTimingsClosesAt,
    setTimingsOpenAt,
  } = useOwnerStore();
  const { vehicleType, toggleVehicleType } = useOwnerStore();

  const accessTypeOptions = ["Unrestricted", "Gated", "Valet Service"];

  const SpotOfferOptions = [
    "Free Parking",
    "Paid Parking",
    "Discounted Parking",
    "Subscription Parking",
  ];
  const vehicleOptions = [
    { id: "Car", Icon: Car_Icon, label: "SUV", ActiveIcon: Car_active_Icon },
    {
      id: "Truck",
      Icon: Truck_Icon,
      label: "Truck",
      ActiveIcon: Car_active_Icon,
    },
    { id: "Bike", Icon: Bike, label: "Sedan", ActiveIcon: Car_active_Icon },
    {
      id: "Motorcycle",
      Icon: Motorcycle,
      label: "Coupes",
      ActiveIcon: Car_active_Icon,
    },
  ];
  const handleSelection = (place: string) => {
    setSelectedPlace(place);
  };

  const handleNext = () => {
    // Navigate to next screen with selected place
    console.log("Selected place:", selectedPlace);
    // navigation.navigate('NextScreen', { selectedPlace });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <HeaderComp
        title=""
        showDots={false}
 
        isQrScreen={false}
        backgroundColor=Colors.black
      />
       */}

      {/* Header */}
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Share some basics about{`\n`}your spot!
          </Text>
        </View>

        {/* Vehicle section */}
        <View
          style={{
            paddingHorizontal: moderateScale(24),
            paddingTop: moderateScale(23),
          }}
        >
          <View style={styles.vehicleOptionsContainer}>
            {vehicleOptions.map((vehicle) => {
              let SvgIcons = vehicle.Icon;

              const isSelected = vehicleType?.includes(vehicle.id);
              if (isSelected) {
                SvgIcons = vehicle.ActiveIcon;
              }
              const isCar = vehicle.id === "Car";

              return (
                <View key={vehicle.id} style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={[
                      styles.vehicleOption,
                      isSelected && { backgroundColor: Colors.primary },
                      isSelected && isCar
                        ? styles.vehicleOptionSelectedCar
                        : {},
                      isSelected && !isCar ? styles.vehicleOptionSelected : {},
                    ]}
                    onPress={() => toggleVehicleType(vehicle.id)}
                  >
                    <SvgIcons
                      height={moderateScale(32)}
                      width={moderateScale(32)}
                      color={isSelected ? Colors.black : Colors.primary}
                    />
                  </TouchableOpacity>

                  <Text
                    style={[
                      styles.vehicleOptionText,
                      isSelected && isCar
                        ? styles.vehicleOptionTextSelectedCar
                        : {},
                      isSelected && !isCar
                        ? styles.vehicleOptionTextSelected
                        : {},
                    ]}
                  >
                    {vehicle.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <Text style={styles.headerTitleAccess}>Access Type</Text>

        <View style={[styles.optionsContainer]}>
          {accessTypeOptions.map((place, index) => {
            const isLast =
              index === accessTypeOptions.length - 1 ||
              index === accessTypeOptions.length - 2;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  { marginBottom: moderateScale(isLast ? 18 : 49) },
                  selectedPlace === place && styles.selectedOption,
                ]}
                onPress={() => handleSelection(place)}
              >
                <Text style={styles.optionText}>{place}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.headerTitleAccess, { paddingTop: 0 }]}>
          Tell drivers what your{`\n`}spot has to offer!
        </Text>

        <View style={styles.optionsContainer}>
          {SpotOfferOptions.map((place, index) => {
            const isLast =
              index === SpotOfferOptions.length - 1 ||
              index === SpotOfferOptions.length - 2;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  { marginBottom: moderateScale(isLast ? 18 : 49) },
                  selectedPlace === place && styles.selectedOption,
                ]}
                onPress={() => handleSelection(place)}
              >
                <Text style={styles.optionText}>{place}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.headerTitleAccess, { paddingTop: 0 }]}>
          Operation Hours
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 25,
            paddingTop: moderateScale(4),
          }}
        >
          <View style={{}}>
            <Text style={styles.sectionTitle}>From</Text>
            {showFromPicker && (
              <RNDateTimePicker
                value={fromTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedTime) => {
                  if (selectedTime) {
                    setFromTime(selectedTime);
                    setTimingsOpenAt(moment(selectedTime).format("HH:mm"));

                    console.log("Selected vehicle type:", opensAt);
                  }
                  setShowFromPicker(false);
                }}
              />
            )}
            <View style={styles.dateContainer}>
              <TouchableOpacity onPress={() => setShowFromPicker(true)}>
                <TimeIcon />
              </TouchableOpacity>
              <Text style={styles.timeText}>
                {moment(fromTime).format("hh:mm A")}
              </Text>
            </View>
          </View>
          {/* TO Time */}
          <View style={{}}>
            <Text style={styles.sectionTitle}>To</Text>
            {showToPicker && (
              <RNDateTimePicker
                value={toTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedTime) => {
                  if (selectedTime) {
                    setToTime(selectedTime);
                    setTimingsClosesAt(moment(selectedTime).format("HH:mm"));
                    console.log("Selected vehicle type:", closesAt);
                  }
                  setShowToPicker(false);
                }}
              />
            )}
            <View style={styles.dateContainer}>
              <TouchableOpacity onPress={() => setShowToPicker(true)}>
                <TimeIcon />
              </TouchableOpacity>
              <Text style={styles.timeText}>
                {moment(toTime).format("hh:mm A")}
              </Text>
            </View>
          </View>
        </View>
        {/* Next Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

  headerTitleAccess: {
    color: Colors.tintColorDark,
    fontSize: 20,
    fontFamily: Fonts.medium,
    paddingTop: moderateScale(18),
    paddingHorizontal: moderateScale(28),
    marginBottom: 16,
    // paddingTop: moderateScale(46),
    lineHeight: 25,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(21),
    paddingTop: moderateScale(5),
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
    // marginBottom: moderateScale(24),
    paddingHorizontal: moderateScale(27),
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    color: "white",
    fontSize: scale(16),
    fontFamily: Fonts.semiBold,
    marginBottom: moderateScale(5),
    paddingLeft: moderateScale(38),
  },

  vehicleOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 16,
  },
  vehicleOption: {
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: Colors.black200,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    width: scale(60),
    height: scale(60),
  },
  vehicleOptionSelectedCar: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  vehicleOptionSelected: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  vehicleOptionText: {
    marginTop: moderateScale(7),
    color: Colors.white,
    justifyContent: "space-around",
    fontSize: scale(12),
    fontFamily: Fonts.medium,
    paddingLeft: moderateScale(10),
  },
  vehicleOptionTextSelectedCar: {
    // color: '#111',
    // fontWeight: '500',
    color: Colors.primary,
  },
  vehicleOptionTextSelected: {
    color: Colors.primary,
    fontWeight: "500",
  },
  dateContainer: {
    backgroundColor: Colors.black200,
    paddingLeft: 20,
    paddingRight: 35,
    paddingVertical: 12,
    gap: 8,
    // width:159,
    borderRadius: 100,
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    flex: 1,
  },
  timeText: {
    fontFamily: Fonts.regular,
    color: Colors.grey100,
    fontSize: scale(14),
  },
});

export default BasicAboutSpotScreen;
