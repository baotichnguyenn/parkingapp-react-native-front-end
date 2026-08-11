import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import React from "react";
import { ParkingCarIcon } from "@/constants/SvgIcons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

type ParkingSlotCardProps = {
  item: any; // Replace 'any' with the correct type if available
  user: any; // Replace 'any' with the correct type if available
};

type RootStackParamList = {
  ParkingReceipt: { item: any };
  // add other routes if needed
};

const ParkingSlotCard = ({ item, user }: ParkingSlotCardProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={{ flexDirection: "row", gap: 1 }}>
            <Text
              style={{
                fontSize: moderateScale(12),
                color: Colors.whitePure,
                fontFamily: Fonts.regular,
              }}
            >
              Slot
            </Text>
            <Text style={styles.slotId}>{item?.slot}</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 5 }}>
            <ParkingCarIcon />
            <Text style={styles.idText}>#{item?.id?.split("-")[0]}</Text>
          </View>
        </View>
        <View style={styles.leftContent}>
          <View style={styles.subleftContent}>
            {" "}
            <Image
              source={require("../../assets/pngs/mall.png")}
              style={styles.mallImage}
            />
            <View style={styles.slotInfo}>
              <Text style={styles.mallName}>{item?.location}</Text>

              <Text style={styles.sublocation}>{item?.sublocation}</Text>
            </View>
          </View>

          <Text style={styles.hoursText}>{item?.hours}</Text>
        </View>

        <View style={styles.lastContent}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ParkingReceipt", {
                item: { ...item, ...user },
              })
            }
          >
            <Text style={styles.detailsText}>See Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
export default ParkingSlotCard;
