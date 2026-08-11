import HeaderComp from "@/components/global/HeaderComp";
import CalendarComp from "@/components/ParkingBooking/Calendar";
import TabBar from "@/components/ParkingBooking/TabBar";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

import { getLetestData } from "@/services/UsersApi.services";

import { AsyncStorageService } from "@/services/AsyncStorageService";
import ParkingSlotCard from "@/components/ParkingBooking/ParkingSlotCard";

const ParkingBookingScreen = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [parkingData, setparkingData] = useState([]);
  const [user, setuser] = useState(null);
  const [active, setactive] = useState("History");
  const [allBookings, setallBookings] = useState([]);
  const getAllBookings = async () => {
    try {
      const storage = new AsyncStorageService();
      const user = await storage.getAuthData();
      const bookings = await getLetestData(user?.id);
      if (bookings?.status == 200) {
        console.log(bookings);

        setallBookings(bookings?.data?.bookingHistory || []);
        const history = bookings?.data?.bookingHistory?.filter(
          (item) => item?.actual_check_out != null
        );
        setparkingData(history);
        setuser(bookings?.data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBookings();
  }, []);
  useEffect(() => {
    if (active == "History") {
      const history = allBookings?.filter(
        (item) => item?.actual_check_out != null
      );
      setparkingData(history);
    } else {
      const history = allBookings?.filter(
        (item) => item?.actual_check_out == null
      );
      setparkingData(history);
    }
  }, [active]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp
        title="Parking Booking"
        showDots={true}
        onPressDots={() => setShowCalendar(true)}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />
      <TabBar
        text1="Ongoing"
        text2="History"
        activeTab={active}
        onTabChange={(tab) => setactive(tab)}
      />
      <ScrollView>
        <View style={styles.content}>
          {parkingData.map((item, index) => (
            <ParkingSlotCard key={index} item={item} user={user} />
          ))}
        </View>
      </ScrollView>

      <Modal
        transparent
        visible={showCalendar}
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPressOut={() => setShowCalendar(false)}
          />

          <View>
            <CalendarComp />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.fakebgBlur, // Semi-transparent background for fake blur
    justifyContent: "center",
    bottom: 29,
    // alignItems: 'center',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  content: {
    paddingHorizontal: moderateScale(23),
    paddingTop: 24,
    gap: moderateScale(12),
  },

  sublocation: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.regular,
    color: Colors.grey100,
  },
  card: {
    backgroundColor: Colors.black600,
    borderRadius: 12,
    marginBottom: 10,
    // height:moderateScale(146),
    paddingTop: moderateScale(9),
    paddingHorizontal: moderateScale(13),
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  idContainer: {
    position: "absolute",
    right: 10,
    top: 10,

    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  idText: {
    color: Colors.primary,
    fontSize: moderateScale(12),
    fontFamily: Fonts.regular,
  },
  cardContent: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: moderateScale(10),
  },
  subleftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  mallImage: {
    width: moderateScale(51),
    height: moderateScale(51),
    borderRadius: 8,
    backgroundColor: Colors.blackOlive,
  },
  slotInfo: {
    marginLeft: 10,
  },
  mallName: {
    color: "white",
    fontFamily: Fonts.semiBold,
    fontSize: moderateScale(14),
  },
  slotId: {
    color: Colors.primary,
    fontSize: moderateScale(12),
    fontFamily: Fonts.regular,
  },
  lastContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: moderateScale(16),
  },
  hoursText: {
    color: "white",
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
  },
  detailsText: {
    color: Colors.primary,
    fontSize: moderateScale(12),
    fontFamily: Fonts.regular,
    marginTop: moderateScale(13),

    borderBottomWidth: 0.5,
    borderBottomColor: Colors.primary,
    lineHeight: moderateScale(10),
  },
});

export default ParkingBookingScreen;
