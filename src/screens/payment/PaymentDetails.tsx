import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import HeaderComp from "@/components/global/HeaderComp";
import {
  BmwIcon,
  DividerIcon,
  DotIcon,
  MarkerIconMap,
  PaymentSuccessIcon,
  StarIcon,
} from "@/constants/SvgIcons";
import { StyleSheet } from "react-native";
import { Fonts } from "@/constants/Fonts";
import CustomButton from "@/components/global/CustomButton";

const PaymentDetails = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.black }}>
      <HeaderComp title="Parking Detail" />
      <ScrollView style={{ flex: 1 }}>
        {/*  Payment Success Section*/}
        <View style={styles.successContainer}>
          <PaymentSuccessIcon style={{ alignSelf: "center", marginTop: -80 }} />
          <Text style={styles.titleText}>Payment successful!</Text>
          <View style={styles.circleContainer}>
            <View style={styles.leftCircle} />
            <DividerIcon />
            <View style={styles.rightCircle} />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.paymentText}>Total Payment</Text>
            <Text style={styles.priceText}>$62.00</Text>
          </View>
          <View style={styles.devider} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 24,
              alignItems: "center",
            }}
          >
            <Text style={styles.whiteText}>Invoice Number</Text>
            <Text style={[styles.whiteText, { color: Colors.primary }]}>
              #135675323
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 24,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={styles.whiteText}>Payment Method</Text>
            <Text style={[styles.whiteText]}>Bank Central Asia</Text>
          </View>
        </View>
        {/* Parking Details Section */}
        <View style={styles.parkingDetailsContainer}>
          <Text style={styles.parkingText}>Parking Detail</Text>
          {/* Timing */}
          <View
            style={{
              marginTop: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.whiteText}>
              Parking <Text style={{ color: Colors.primary }}>#A-13 (F1)</Text>
            </Text>
            <Text style={styles.whiteText}>Time 2:50:49</Text>
          </View>
          {/* Parking area details */}
          <View style={styles.itemContainer}>
            <Image
              style={{ height: 48, width: 48, borderRadius: 6 }}
              source={require("@/assets/images/parking.png")}
            />
            <View style={{ gap: 5 }}>
              <Text style={[styles.whiteText, { fontFamily: Fonts.bold }]}>
                Jordan Keria Parking
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <MarkerIconMap />
                  <Text style={[styles.paymentText, { fontSize: 12 }]}>
                    San Francisco, CA
                  </Text>
                </View>
                <DotIcon />
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <StarIcon />
                  <Text
                    style={[
                      styles.parkingText,
                      { color: Colors.warning, fontSize: 12 },
                    ]}
                  >
                    4.4{" "}
                    <Text style={{ color: Colors.grey50, fontSize: 11 }}>
                      (532){" "}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <Text style={[styles.whiteText, { color: Colors.grey600 }]}>
              Vehicle
            </Text>
            <Text style={[styles.whiteText, { fontFamily: Fonts.bold }]}>
              <BmwIcon /> BMW 320i Sport
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.whiteText, { color: Colors.grey600 }]}>
              Times
            </Text>
            <Text style={[styles.whiteText, { fontFamily: Fonts.bold }]}>
              2.5 Hours
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text
              style={[
                styles.whiteText,
                { color: Colors.grey600, fontSize: 16 },
              ]}
            >
              Total
            </Text>
            <Text
              style={[
                styles.whiteText,
                { color: Colors.primary, fontFamily: Fonts.bold, fontSize: 16 },
              ]}
            >
              $13.2
            </Text>
          </View>
        </View>
      </ScrollView>
      <CustomButton
        title="Parking Receipt"
        labelStyle={{ fontSize: 16 }}
        containerStyle={{
          marginHorizontal: 22,
          paddingVertical: 14,
          marginTop: 24,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  successContainer: {
    marginHorizontal: 22,
    backgroundColor: Colors.black600,
    // height: 200,
    marginTop: 80,
    borderRadius: 24,
    paddingBottom: 70,
  },
  titleText: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.white,
    textAlign: "center",
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: -24,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  leftCircle: {
    backgroundColor: Colors.black,
    height: 47,
    width: 32,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  rightCircle: {
    backgroundColor: Colors.black,
    height: 47,
    width: 32,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  paymentText: {
    fontFamily: Fonts.medium,
    color: Colors.grey50,
    fontSize: 16,
  },
  priceText: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    fontSize: 36,
  },
  devider: {
    borderWidth: 0.5,
    marginHorizontal: 26,
    borderColor: Colors.grey50,
    marginTop: 20,
    marginBottom: 15,
  },
  whiteText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.white,
  },
  parkingDetailsContainer: {
    padding: 17,
    backgroundColor: Colors.black600,
    marginTop: 50,
    marginHorizontal: 22,
    borderRadius: 8,
  },
  parkingText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.white,
  },
  itemContainer: {
    flexDirection: "row",
    gap: 13,
    marginTop: 16,
  },
});

export default PaymentDetails;
