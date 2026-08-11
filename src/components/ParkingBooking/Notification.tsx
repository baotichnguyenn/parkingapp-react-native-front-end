import { Fonts } from "@/constants/Fonts";
import { Info, Wallet_Icon } from "@/constants/SvgIcons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import TabBar from "./TabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "../global/HeaderComp";
import { Colors } from "@/constants/Colors";

type NotificationItemType = {
  id: string;
  type: "profile" | "success" | "warning";
  message: string;
  time: string;
};

const NotificationItem = ({ item }: { item: NotificationItemType }) => {
  return (
    <View style={styles.notificationItem}>
      {item.type === "success" ? (
        <View style={styles.iconContainer}>
          <Wallet_Icon />
        </View>
      ) : item.type === "warning" ? (
        <View style={[styles.iconContainer, styles.warningIcon]}>
          <Info />
        </View>
      ) : (
        <View style={styles.profileIcon}>
          <Image
            source={require("@/assets/pngs/profile.png")}
            style={styles.profileImage}
          />
        </View>
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  );
};

const Notification = () => {
  const notifications = [
    {
      id: "1",
      section: "Today",
      data: [
        {
          id: "1-1",
          type: "profile",
          message: "Thank you for using our parking service at Plaza Mall",
          time: "2 hours Ago",
        },
        {
          id: "1-2",
          type: "success",
          message: "Booking payment at sebira mall parking was successful",
          time: "1 day Ago",
        },
        {
          id: "1-3",
          type: "profile",
          message: "Thank you for using our parking service at Plaza Mall",
          time: "3 hours Ago",
        },
      ],
    },
    {
      id: "2",
      section: "Yesterday",
      data: [
        {
          id: "2-1",
          type: "success",
          message: "Booking payment at Alazia mall parking was successful",
          time: "1 day Ago",
        },
        {
          id: "2-2",
          type: "warning",
          message: "Your parking time is only 30 minutes, extend it now",
          time: "1 day Ago",
        },
      ],
    },
  ];

  const renderItem = ({
    item,
  }: {
    item: { id: string; section: string; data: NotificationItemType[] };
  }) => {
    return (
      <View>
        <Text style={styles.sectionHeader}>{item.section}</Text>
        {item.data.map((notification) => (
          <NotificationItem key={notification.id} item={notification} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComp
        title="Parking Booking"
        showDots={true}
        onPressDots={() => console.log("Dots pressed")}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />
      <ScrollView>
        <View>
          <View style={{ paddingTop: 10 }}>
            <TabBar
              text1="Messages"
              text2="Notification"
              activeTab="Notification"
            />
          </View>

          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
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
  listContainer: {
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(26),
    marginTop: moderateScale(25),
  },
  sectionHeader: {
    color: Colors.whitePure,
    fontSize: moderateScale(16),
    fontFamily: Fonts.bold,
    marginTop: 16,
    marginBottom: moderateScale(31),
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.green100,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: Colors.whitePure,
    fontFamily: Fonts.medium,
    fontSize: moderateScale(14),
  },
  warningIcon: {
    backgroundColor: Colors.red100,
  },
  warningIconText: {
    color: Colors.whitePure,
    fontWeight: "bold",
    fontSize: 16,
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.green200,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: 36,
    height: 36,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  messageText: {
    color: Colors.whitePure,

    fontFamily: Fonts.medium,
    fontSize: moderateScale(14),
  },
  timeText: {
    color: Colors.silver,
    fontSize: moderateScale(12),
    fontFamily: Fonts.medium,
    marginTop: 4,
  },
});

export default Notification;
