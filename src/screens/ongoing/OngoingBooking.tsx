import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { StyleSheet } from "react-native";
import { verticalScale, WINDOW } from "@/utils/Scale";
import { moderateScale, scale } from "react-native-size-matters";
import { authConstants } from "@/constants/AppConstants";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Star_Icon, TimeOngoing, TimerIcon } from "@/constants/SvgIcons";
import CustomButton from "@/components/global/CustomButton";
import ExtendTimingSheet from "@/components/ongoing/ExtendTimingSheet";
import CheckOutSheet from "@/components/ongoing/CheckOutSheet";
import HeaderComp from "@/components/global/HeaderComp";

const OngoingBooking = () => {
  const carouselRef = useRef<Carousel<any> | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const { width } = Dimensions.get("window");
  const [showExtendedParking, setshowExtendedParking] = useState(false);
  const [showCheckOutSheet, setshowCheckOutSheet] = useState(false);
  const renderItem = ({ item }: any) => (
    <View style={{ paddingHorizontal: 24 }}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <HeaderComp title="Booking Details" />
      {showExtendedParking && (
        <ExtendTimingSheet
          visible={showExtendedParking}
          onClose={() => setshowExtendedParking(false)}
        />
      )}
      {showCheckOutSheet && (
        <CheckOutSheet
          visible={showCheckOutSheet}
          onClose={() => setshowCheckOutSheet(false)}
        />
      )}

      <ScrollView style={{ flex: 1 }}>
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
          <View style={styles.paginationContainer}>
            {authConstants.onBoardingSlides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeSlide === index ? styles.activeDot : {},
                ]}
              />
            ))}
          </View>
        </View>

        {/* Parking Info */}
        <View style={styles.parkingInfoContainer}>
          <View>
            <Text style={styles.title}>Monteal Parking</Text>
            <Text style={styles.addressText}>San Francissco, CA</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Star_Icon width={20} height={20} />
            <Text
              style={{
                fontFamily: Fonts.semiBold,
                fontSize: 16,
                color: "white",
              }}
            >
              4.7
            </Text>
          </View>
        </View>

        {/* Timing Info */}
        <View style={styles.timingContainer}>
          <View style={{ gap: 6 }}>
            <Text style={styles.lightText}>Arive</Text>
            <Text style={styles.timeText}>9:00</Text>
            <Text style={styles.lightText}>Jun, 24</Text>
          </View>
          <View
            style={{
              gap: 6,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.lightText}></Text>
            <View style={{ alignSelf: "center", justifyContent: "center" }}>
              <TimeOngoing />
              <TimerIcon style={{ position: "absolute", left: 1.38 * 20 }} />
            </View>
            <Text
              style={{
                color: Colors.white,
                fontFamily: Fonts.bold,
                textAlign: "center",
                fontSize: scale(11),
              }}
            >
              Time left: 03:39:00
            </Text>
          </View>
          <View style={{ gap: 6 }}>
            <Text style={styles.lightText}>Exit</Text>
            <Text style={styles.timeText}>13:30</Text>
            <Text style={styles.lightText}>Jun, 24</Text>
          </View>
        </View>

        {/* ExtendParking Button */}
        {!showExtendedParking && (
          <TouchableOpacity
            onPress={() => setshowExtendedParking(true)}
            style={styles.extendButton}
          >
            <Text style={styles.extendText}>Extend Parking</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Check out button*/}
      <View style={styles.footer}>
        <CustomButton
          onPress={() => setshowCheckOutSheet(true)}
          title="Check out"
          containerStyle={{ borderRadius: 63, paddingVertical: 14 }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: verticalScale(200),
    resizeMode: "stretch",
    borderRadius: scale(12),
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
  lightText: {
    color: Colors.grey100,
    fontSize: scale(10),
    fontFamily: Fonts.regular,
  },
  timeText: {
    fontFamily: Fonts.bold,
    fontSize: scale(18),
    color: Colors.white,
  },
  extendButton: {
    alignSelf: "center",
    backgroundColor: Colors.primary,
    marginTop: 40,
    width: "50%",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 64,
  },
  extendText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.black100,
  },
  timingContainer: {
    backgroundColor: Colors.black600,
    marginHorizontal: 13,
    paddingHorizontal: 27,
    marginTop: 24,
    paddingTop: 12,
    paddingBottom: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    borderWidth: 1,
    borderColor: Colors.grey100,
    marginTop: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderBottomWidth: 0,
    overflow: "hidden",
    width: WINDOW.width,
  },
  parkingInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  addressText: {
    color: Colors.grey500,
    fontFamily: Fonts.regular,
    fontSize: scale(12),
  },
});
export default OngoingBooking;
