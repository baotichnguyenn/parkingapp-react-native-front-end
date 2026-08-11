import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import MapView, { Marker } from "react-native-maps";
import {
  ParkingCarIcon,
  Star_Icon,
  Time_Icon,
  UserLocationIcon,
} from "@/constants/SvgIcons";
import HeaderComp from "@/components/global/HeaderComp";
import darkMapStyle from "@/assets/mapStyles/darkMapStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import CustomButton from "@/components/global/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { AsyncStorageService } from "@/services/AsyncStorageService";
import {
  confirmParking,
  getPaymentDetails,
  getPaymentIntent,
  ReserveParkingSlot,
} from "@/services/ParkingApi.service";
import { useStripe } from "@stripe/stripe-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const item = {
  id: "1",
  name: "Jordan Keria Parking",
  street: "Ivory Elephant street",
  price: "$5",
  rating: "4.4",
  distance: "1.24km",

  image: require("@/assets/pngs/booking_img.png"),
};
const BookingScreen = () => {
  const routes = useRoute();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigation = useNavigation<any>();
  const { parkingData, vehicleType, timeEstimate } = routes?.params || {};

  // const [location, setlocation] = useState({
  //   latitude: 23.114169,
  //   longitude: 72.541817,
  // });

  const location = {
    latitude: 23.114169,
    longitude: 72.541817,
  };
  const [paymentIntent, setpaymentIntent] = useState(null);
  const setup = async (paymentIntent) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Spotly",
      paymentIntentClientSecret: paymentIntent, // retrieve this from your server
    });
    if (error) {
      // handle error
    }
  };
  const checkout = async () => {
    console.log("Payment Intent:", paymentIntent?.clientSecret);

    const { error, paymentOption } = await presentPaymentSheet();

    if (error) {
      console.log(error);

      // handle error
    } else {
      await handleCreateBooking();
      console.log(paymentOption);

      console.log("error");

      // success
    }
  };
  const percent = parkingData.hourly_rate * timeEstimate;
  const serviceCharge = percent / 10;
  const totalPriceCalculate = percent + serviceCharge;
  const handleCreateBooking = async () => {
    try {
      const paymentDetails = await getPaymentDetails(
        paymentIntent?.paymentIntentId
      );
      const storage = new AsyncStorageService();
      const authData = await storage.getAuthData();

      if (paymentDetails?.data?.payment_status !== "succeeded") {
        console.log("Payment not successful");
        return;
      }
      console.log(paymentDetails?.data);

      const reservedSlot = await ReserveParkingSlot(
        parkingData?.id, // parkingId
        authData?.id, // userId
        new Date().toISOString(), // checkin_date_time
        new Date(
          new Date().setHours(new Date().getHours() + Number(timeEstimate))
        ).toISOString(), // checkout_date_time
        vehicleType, // vehicleType
        parkingData?.hourly_rate,
        totalPriceCalculate
      );

      if (reservedSlot?.status != 200) {
        console.log("Booking successful:", reservedSlot?.data);
        return;
      }
      console.log(reservedSlot?.data);
      const confirmBooking = await confirmParking({
        reservationId: reservedSlot?.data?.reservationId,
        payment_id: paymentDetails?.data?.payment_id,
        payment_time: paymentDetails?.data?.payment_time,
        payment_amount: paymentDetails?.data?.payment_amount,
        payment_status: paymentDetails?.data?.payment_status,
      });
      console.log("Confirm Booking Response:", confirmBooking);

      if (confirmBooking?.status == 200) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Tabs" }],
        });

        Alert.alert(
          "Booking Confirmed",
          "Your parking slot has been successfully booked."
        );
        console.log("Booking successful:", confirmBooking?.data);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while processing your booking.");
      console.log(JSON.stringify(error, null, 2));
    }
  };

  useEffect(() => {
    createStripePaymentIntent();
  }, []);
  const createStripePaymentIntent = async () => {
    try {
      const storage = new AsyncStorageService();
      const authdata = await storage.getAuthData();
      console.log("Req8uesting payment intent with data:");

      const paymentIntent = await getPaymentIntent(
        totalPriceCalculate,
        authdata?.email,
        authdata?.id
      );
      console.log(paymentIntent);

      if (paymentIntent?.status == 200) {
        await setup(paymentIntent?.data?.clientSecret);
        setpaymentIntent(paymentIntent?.data);
        console.log(paymentIntent?.data);
      } else {
        console.log("Error creating payment intent:", paymentIntent?.message);
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };
  return (
    <View style={{ backgroundColor: Colors.black, flex: 1 }}>
      <MapView
        provider={"google"}
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
          <UserLocationIcon width={50} height={50} />
        </Marker>
        <Marker
          style={{ height: 30, width: 35 }}
          coordinate={{
            latitude: location.latitude + 1,
            longitude: location.longitude,
          }}
        >
          <View
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
              $99
            </Text>
          </View>
        </Marker>
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
          <SafeAreaView edges={["top"]} />
          <HeaderComp
            title="Booking"
            showDots={false}
            isQrScreen={false}
            backgroundColor=""
          />
          <View style={styles.container1}>
            <View style={styles.itemContainer}>
              <View
                style={{
                  width: moderateScale(80),
                  height: moderateScale(79),
                  borderRadius: 8,
                  // overflow: 'hidden',
                }}
              >
                <Image
                  source={item.image}
                  style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                />
              </View>

              {/* </View> */}
              <View style={styles.contentContainer}>
                <Text numberOfLines={1} style={styles.parkingName}>
                  {item.name}
                </Text>
                <Text numberOfLines={1} style={styles.streetName}>
                  {parkingData?.location?.split(",")[0]}
                </Text>

                <View style={styles.detailsRow}>
                  <Text style={styles.priceText}>
                    {parkingData?.hourly_rate}
                    <Text style={styles.priceData}>/Hours</Text>
                  </Text>
                  <View style={styles.separator} />
                  <View style={styles.ratingContainer}>
                    <Star_Icon />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.distanceContainer}>
                <View style={styles.distanceBadge}>
                  <Time_Icon />
                  <Text style={styles.distanceText}>
                    {parkingData?.distance_km}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <ScrollView>
          <View
            style={[
              styles.container1,
              { paddingHorizontal: 14, paddingTop: 24 },
            ]}
          >
            <View style={{}}>
              <View>
                <View style={[styles.itemContainer, { marginBottom: 16 }]}>
                  <View
                    style={{
                      width: moderateScale(80),
                      height: moderateScale(79),
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  </View>

                  {/* </View> */}
                  <View style={styles.contentContainer}>
                    <Text numberOfLines={1} style={styles.parkingName}>
                      {item.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.streetName}>
                      {parkingData?.location?.split(",")[0]}
                    </Text>

                    <View style={styles.detailsRow}>
                      <Text style={styles.priceText}>
                        {/* {item.price} */}
                        {parkingData.hourly_rate}
                        <Text style={styles.priceData}>/Hours</Text>
                      </Text>
                      <View style={styles.separator} />
                      <View style={styles.ratingContainer}>
                        <Star_Icon />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.distanceContainer}>
                    <View style={styles.distanceBadge}>
                      <Time_Icon />
                      <Text style={styles.distanceText}>
                        {parkingData?.distance_km}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.divider}></View>

                <View style={[styles.position, { paddingTop: 18 }]}>
                  <Text style={[styles.streetName, { fontSize: 12 }]}>
                    Jordan Keria Parking
                  </Text>
                  <View style={styles.distanceContainer}>
                    <View style={styles.distanceBadge}>
                      <Time_Icon />
                      <Text
                        style={[styles.distanceText, { color: Colors.primary }]}
                      >
                        {parkingData?.distance_km}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.position, { paddingTop: 24 }]}>
                  <Text style={[styles.streetName, { fontSize: 12 }]}>
                    Vehicle
                  </Text>
                  <View style={styles.distanceContainer}>
                    <View style={styles.distanceBadge}>
                      <ParkingCarIcon />
                      <Text style={styles.distanceText}>{vehicleType}</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.position, { paddingVertical: 18 }]}>
                  <Text style={[styles.streetName, { fontSize: 12 }]}>
                    Times
                  </Text>
                  <Text
                    style={{
                      color: "#FEFEFE",
                      fontFamily: Fonts.medium,
                      fontSize: moderateScale(12),
                    }}
                  >
                    {/* {timeEstimate} Hours */}
                    {timeEstimate} Hours
                  </Text>
                </View>
                <View style={[styles.position, { paddingVertical: 18 }]}>
                  <Text style={[styles.streetName, { fontSize: 12 }]}>
                    Base Price
                  </Text>
                  <Text
                    style={{
                      color: "#FEFEFE",
                      fontFamily: Fonts.medium,
                      fontSize: moderateScale(12),
                    }}
                  >
                    {/* {timeEstimate} Hours */}$ {parkingData.hourly_rate}
                  </Text>
                </View>
                <View style={[styles.position, { paddingVertical: 18 }]}>
                  <Text style={[styles.streetName, { fontSize: 12 }]}>
                    Service Charges
                  </Text>
                  <Text
                    style={{
                      color: "#FEFEFE",
                      fontFamily: Fonts.medium,
                      fontSize: moderateScale(12),
                    }}
                  >
                    {/* {timeEstimate} Hours */}$ {serviceCharge.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.divider}></View>
                <View
                  style={[
                    styles.position,
                    { paddingTop: 16, paddingBottom: 24 },
                  ]}
                >
                  <Text
                    style={{
                      color: "#FEFEFE",
                      fontFamily: Fonts.medium,
                      fontSize: moderateScale(14),
                    }}
                  >
                    TOTAL
                  </Text>
                  <Text
                    style={{
                      color: Colors.primary,
                      fontFamily: Fonts.medium,
                      fontSize: moderateScale(14),
                    }}
                  >
                    ${totalPriceCalculate.toFixed(2)}
                  </Text>
                </View>
              </View>
              <CustomButton
                title="Confirm"
                onPress={checkout}
                containerStyle={{
                  marginTop: 26,
                  marginBottom: 23,
                  marginHorizontal: moderateScale(25),
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    // flex: 1,

    // marginTop: moderateScale(22),
    backgroundColor: Colors.black600,

    marginHorizontal: scale(24),
    paddingTop: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  listContainer: {
    paddingBottom: 70,
    // Space for the Sort By button
  },

  position: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,

    backgroundColor: "black",
  },
  divider: {
    opacity: 0.06,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 2,
    top: moderateScale(3),
  },
  parkingListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  parkingFoundText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  text: {
    fontSize: 16,
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignSelf: "center",
    color: "white",
  },

  card: {
    backgroundColor: Colors.black600,
    marginHorizontal: scale(24),

    borderRadius: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: Colors.black200,
    borderRadius: 24,
  },
  avatarContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray, // Slightly lighter gray
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  blueCircle: {
    position: "absolute",
    width: 24,
    height: 24,
    backgroundColor: Colors.blue100, // Blue accent
    borderRadius: 12,
    left: -8,
  },
  carImage: {
    width: 32,
    height: 24,
    zIndex: 1,
  },
  headerTextContainer: {
    flex: 1,
    gap: 6,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  menuButton: {
    flexDirection: "row",
    width: 24,
    justifyContent: "space-between",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.grey800, // Gray for dots
  },
  location: {
    color: Colors.grey800, // Gray text
    fontSize: 14,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 16,
    paddingHorizontal: 19,
    padding: 6,
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    color: Colors.grey800, // Gray text
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  checkoutButton: {
    backgroundColor: Colors.primary, // Lime green
    borderRadius: 100, // Large value for fully rounded corners
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  checkoutText: {
    color: Colors.darkText, // Dark text
    fontSize: 16,
    fontWeight: "500",
  },
  arrowIcon: {
    marginLeft: 4,
  },

  headerText: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    marginBottom: 20,
  },

  itemContainer: {
    flexDirection: "row",
    marginBottom: moderateScale(10),
  },
  image: {
    width: scale(74),
    height: verticalScale(75),
    borderRadius: 12,
  },
  contentContainer1: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "space-between",
  },
  parkingName: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
  streetName: {
    color: Colors.white200,
    fontFamily: Fonts.regular,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(10),
  },
  priceText: {
    color: "white",
    fontFamily: Fonts.bold,
    fontSize: 12,
  },

  priceData: {
    color: "white",
    fontSize: 10,
    fontFamily: Fonts.medium,
  },
  separator: {
    width: 1,
    height: 14,
    backgroundColor: Colors.greySeperator,
    marginHorizontal: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    color: "white",
    fontSize: 14,
    marginLeft: 4,
  },
  distanceContainer: {
    justifyContent: "center",
    paddingLeft: 8,
  },
  distanceBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "center",
    justifyContent: "center",
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.brightGreen, // Bright green color
    marginRight: 4,
  },
  distanceText: {
    color: "white",
    fontSize: 14,
  },
  sortByContainer: {
    position: "absolute",
    bottom: 20,

    alignSelf: "center",
  },
  sortByButton: {
    backgroundColor: Colors.brightGreen, // Bright green color
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    width: 98,
  },
  sortByText: {
    color: "black",
    fontFamily: Fonts.semiBold,
    fontSize: 14,

    marginRight: 4,
  },
  caretDownContainer: {
    paddingTop: 2,
  },

  listContainer1: {
    paddingHorizontal: 40,
  },
  card1: {
    borderRadius: 16,
    borderColor: Colors.grey100,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 78,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    marginBottom: 24,
  },
  text1: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.grey100,
  },
  activeText: {
    color: Colors.primary,
  },

  activecard: {
    borderRadius: 16,
    backgroundColor: Colors.black100,
    borderWidth: 0,

    marginRight: 12,
    minWidth: 80,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default BookingScreen;
