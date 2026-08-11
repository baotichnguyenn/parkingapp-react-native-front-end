import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Carousel from "react-native-snap-carousel";
import { Colors } from "@/constants/Colors";

import {
  Bike,
  Car_active_Icon,
  Car_Booking_Icon,
  Car_Icon,
  DateIcon,
  Location_Icon,
  Motorcycle,
  Star_Icon,
  TimeIcon,
  Truck_Icon,
} from "@/constants/SvgIcons";
import { Fonts } from "@/constants/Fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { WINDOW } from "@/utils/Scale";
import moment from "moment";
import HeaderComp from "@/components/global/HeaderComp";
import { useNavigation, useRoute } from "@react-navigation/native";
import SlotBooking from "@/components/home/SlotBooking";
const { width } = Dimensions.get("window");

const authConstants = {
  onBoardingSlides: [
    {
      id: "1",
      title: "Jordan Keria Parking",
      location: "467 Stutler Lane,Altoona,PA 16602",
      slot: "4 slot left",
      distance: "1.2 km",
      totalCars: "500 cars",
      ratings: "4.7",
      // image: Booking_Img,
      image: require("@/assets/pngs/booking.png"),
    },
    {
      id: "2",
      title: "Jordan Keria Parking",
      location: "467 Stutler Lane,Altoona,PA 16602",
      slot: "4 slot left",
      distance: "1.2 km",
      ratings: "4",
      totalCars: "500 cars",
      image: require("@/assets/pngs/booking.png"),
    },
  ],
};
const BooingDetailsScreen = () => {
  const routes = useRoute();
  const parkingData = routes.params?.parking;

  console.log(
    "🚀 ~ file: BookingDetailsScreen.tsx:20 ~ parkingData:",
    parkingData
  );
  const navigation = useNavigation<any>();

  const [selectedVehicle, setSelectedVehicle] = useState("Car");

  const [date, setDate] = useState(new Date());
  const [time, settime] = useState(new Date());
  const [showTime, setshowTime] = useState(false);

  const [showDate, setshowDate] = useState(false);
  type TimeData = {
    checkinTime: string;
    differenceMinutes: number | string;
    // Add other properties if needed
  };
  const [timeData, settimeData] = useState<TimeData | null>(null);

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

  const carouselRef = useRef<Carousel<any> | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slotModel, setSlotModel] = useState(false);

  const renderItem = ({ item }: any) => (
    <View style={{ paddingHorizontal: 24 }}>
      <Image source={item.image} style={Styles.image} resizeMode="cover" />
    </View>
  );
  return (
    <SafeAreaView style={Styles.container}>
      <HeaderComp
        title="Booking Details"
        isQrScreen={false}
        backgroundColor={Colors.black}
      />
      <ScrollView style={{ flex: 1 }}>
        {/* Parking Details */}
        <View style={Styles.MainContainer}>
          {/* Parking Images */}
          <View>
            <Carousel
              ref={carouselRef}
              data={authConstants.onBoardingSlides}
              renderItem={renderItem}
              sliderWidth={width}
              itemWidth={width}
              // loop
              vertical={false}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <View style={Styles.paginationContainer}>
              {authConstants.onBoardingSlides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    Styles.dot,
                    activeSlide === index ? Styles.activeDot : {},
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Parking Details */}
          <View style={{ paddingHorizontal: 24 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 4,
              }}
            >
              <View style={{}}>
                <Text style={Styles.title}>
                  {authConstants.onBoardingSlides[0]?.title}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.regular,
                    fontSize: 12,
                    color: Colors.grey100,
                  }}
                >
                  {parkingData?.location ||
                    authConstants.onBoardingSlides[0]?.location}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                  paddingRight: 6,
                }}
              >
                <Star_Icon
                  height={moderateScale(20)}
                  width={moderateScale(20)}
                />
                <Text
                  style={{
                    fontFamily: Fonts.semiBold,
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  {authConstants.onBoardingSlides[0]?.ratings}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingTop: moderateScale(12),
                gap: 8,
              }}
            >
              {/* Slot Tag */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: moderateScale(8),
                  paddingVertical: moderateScale(3),
                  backgroundColor: Colors.offwhite,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    color: Colors.darkRed,
                    fontFamily: Fonts.medium,
                    fontSize: moderateScale(12),
                  }}
                >
                  {parkingData?.total_slots} Slots
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  backgroundColor: Colors.darkgreen10,
                  borderRadius: 12,
                }}
              >
                <Location_Icon style={{ marginRight: 4 }} />
                <Text
                  style={{
                    color: Colors.forestGreen,
                    fontFamily: Fonts.medium,
                    fontSize: moderateScale(12),
                  }}
                >
                  {parkingData?.distance_km} km
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  backgroundColor: Colors.orange10,
                  borderRadius: 12,
                }}
              >
                <Car_Booking_Icon style={{ marginRight: 4 }} />
                <Text
                  style={{
                    color: Colors.midgreen,
                    fontFamily: Fonts.medium,
                    fontSize: moderateScale(12),
                  }}
                >
                  {/* {authConstants.onBoardingSlides[0]?.totalCars} */}
                  {parkingData?.total_slots}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Vehicle section */}
        <View
          style={{
            paddingHorizontal: moderateScale(24),
            paddingTop: moderateScale(23),
          }}
        >
          <Text style={Styles.sectionTitle}>Select Vehicle</Text>
          <View style={Styles.vehicleOptionsContainer}>
            {vehicleOptions.map((vehicle) => {
              let SvgIcons = vehicle.Icon;
              const isSelected = selectedVehicle === vehicle.id;
              if (isSelected) {
                SvgIcons = vehicle.ActiveIcon;
              }
              const isCar = vehicle.id === "Car";

              return (
                <View key={vehicle.id} style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={[
                      Styles.vehicleOption,
                      isSelected && { backgroundColor: Colors.primary }, // Change background when selected
                      isSelected && isCar
                        ? Styles.vehicleOptionSelectedCar
                        : {},
                      isSelected && !isCar ? Styles.vehicleOptionSelected : {},
                    ]}
                    onPress={() => setSelectedVehicle(vehicle.id)}
                  >
                    <SvgIcons
                      height={moderateScale(32)}
                      width={moderateScale(32)}
                      color={isSelected ? Colors.black : Colors.primary} // icon becomes black when selected
                    />
                  </TouchableOpacity>

                  <Text
                    style={[
                      Styles.vehicleOptionText,
                      isSelected && isCar
                        ? Styles.vehicleOptionTextSelectedCar
                        : {},
                      isSelected && !isCar
                        ? Styles.vehicleOptionTextSelected
                        : {},
                    ]}
                  >
                    {vehicle.label}
                  </Text>
                </View>
              );
            })}
          </View>

          {/*  Date and time section*/}
          {showDate && (
            <RNDateTimePicker
              value={date}
              onError={() => setshowDate(false)}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={(e, date) => {
                if (date) {
                  setDate(date);
                }
                setshowDate(false);
              }}
            />
          )}
          {showTime && (
            <RNDateTimePicker
              value={time}
              onError={() => setshowTime(false)}
              mode={"time"}
              is24Hour={true}
              display="default"
              onChange={(date, time) => {
                if (time) {
                  settime(time);
                }
                setshowTime(false);
              }}
            />
          )}

          <Text style={Styles.sectionTitle}>Date and Time</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              paddingBottom: 16,
            }}
          >
            <View style={Styles.dateContainer}>
              <TouchableOpacity
                onPress={() => {
                  // setshowDate(true);
                  setSlotModel(true);
                }}
              >
                <DateIcon />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: Colors.grey100,
                  fontSize: scale(14),
                }}
              >
                {moment(date).format("DD/MM/YYYY")}
              </Text>
            </View>
            <View style={Styles.dateContainer}>
              <TouchableOpacity
                onPress={() => {
                  setshowTime(true);
                }}
              >
                <TimeIcon />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: Colors.grey100,
                  fontSize: scale(14),
                }}
              >
                {timeData
                  ? timeData?.checkinTime
                  : moment(time).format("hh:mm A")}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Footer */}
      <View style={Styles.footer}>
        <View>
          <Text style={Styles.totalPriceLabel}>Total Price</Text>
          <View style={Styles.priceContainer}>
            <Text style={Styles.priceValue}>${parkingData?.hourly_rate}</Text>
            <Text style={Styles.priceUnit}>/hour</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[Styles.startButton]}
          onPress={() => {
            if (!timeData) {
              Alert.alert("Select Slot", "Please select Atleast one slot");
              return;
            }
            navigation.navigate("Booking", {
              parkingData: parkingData,
              vehicleType: selectedVehicle,
              timeEstimate:
                parseFloat(String(timeData?.differenceMinutes)) / 60,

              date: moment(date).format("DD/MM/YYYY"),
              time: timeData?.checkinTime,
            });
          }}
        >
          <Text style={Styles.startButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* <SlotBooking /> */}
      <SlotBooking
        onConfirm={(data) => {
          settimeData(data);
        }}
        visible={slotModel}
        onClose={() => setSlotModel(false)}
        operatingHours={{
          opens_at: parkingData?.availability_period?.start, // 5 AM UTC
          closes_at: parkingData?.availability_period?.end, // 5 PM UTC
        }}
        unavailableSlots={parkingData?.unavailable_slots || []}
        date={new Date().toISOString()} // Target date
      />
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  MainContainer: {},
  imageContainer: {
    height: verticalScale(160),

    // marginHorizontal: 6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.fakebgBlur, // Semi-transparent background for fake blur
    justifyContent: "center",
    // bottom: 29,
    alignItems: "center",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  paginationContainer: {
    flexDirection: "row",

    alignSelf: "center",
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(8),
    backgroundColor: Colors.white200,
    marginHorizontal: scale(5),
    marginTop: 12,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: scale(24),
    height: scale(8),
    borderRadius: scale(12),
  },
  title: {
    fontSize: moderateScale(20),
    marginTop: verticalScale(15),

    lineHeight: verticalScale(35),
    color: "white",
    fontFamily: Fonts.semiBold,
  },
  description: {
    fontSize: moderateScale(16),
    marginTop: verticalScale(8),
    paddingHorizontal: scale(8),
  },
  image: {
    width: "100%",
    height: verticalScale(150),
    resizeMode: "stretch",

    // justifyContent: 'center',
    borderRadius: scale(12),

    // resizeMode: 'cover',
    // alignSelf: 'center',
  },
  sectionTitle: {
    color: "white",
    fontSize: scale(14),
    fontFamily: Fonts.semiBold,
    marginBottom: moderateScale(9),
  },

  vehicleOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 16,
    // gap:30,
    paddingHorizontal: scale(6),
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
  timeOptionsContainer: {
    marginBottom: 24,
    flexDirection: "row",
    gap: 12,
  },
  timeOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.darkGrey100,
    backgroundColor: Colors.grey100,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: Colors.red200,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  timeOptionText: {
    color: Colors.grey300,
    marginLeft: 12,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
  },
  footer: {
    // position: 'absolute',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
    borderColor: Colors.grey100,
    backgroundColor: Colors.black100,
    paddingHorizontal: 24,
    width: WINDOW.width,
    alignSelf: "center",
  },

  totalPriceLabel: {
    color: Colors.grey100,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  priceValue: {
    color: "white",
    fontFamily: Fonts.semiBold,
    fontSize: moderateScale(20),
  },
  priceUnit: {
    color: Colors.grey100,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(16),
    marginLeft: 2,
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 150,
    alignItems: "center",
  },
  startButtonText: {
    color: Colors.black100,
    fontSize: 16,
    paddingHorizontal: moderateScale(25),
    fontFamily: Fonts.semiBold,
  },
  dateContainer: {
    backgroundColor: Colors.black200,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    flex: 1,
  },
});
export default BooingDetailsScreen;
