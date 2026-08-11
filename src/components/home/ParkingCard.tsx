import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { CompassIcon, StarIcon } from "@/constants/SvgIcons";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { scale } from "react-native-size-matters";

type ParkingCardProps = {
  item?: any;
  index?: number;
  onpress?: () => void;
};

const ParkingCard = ({ item, onpress }: ParkingCardProps) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={{
        gap: 8,
        width: 180,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      }}
    >
      <View style={styles.ratingContainer}>
        <StarIcon />
        <Text style={styles.ratingText}>4.4</Text>
      </View>
      <Image
        resizeMode="cover"
        style={{ height: 140, width: 180, borderRadius: 10 }}
        source={require("@/assets/images/parking1.png")}
      />
      <View style={{ gap: 8 }}>
        <View>
          <Text numberOfLines={1} style={styles.itemTitle}>
            Mall Gozilas Parking
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: Fonts.regular,
              fontSize: 11,
              color: Colors.whiteText,
            }}
          >
            {item?.location}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 13,
              color: Colors.whiteText,
            }}
          >
            ${item?.hourly_rate}/
            <Text style={{ fontFamily: Fonts.medium, fontSize: 12 }}>
              Hours
            </Text>
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CompassIcon />
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 12,
                color: Colors.white,
              }}
            >
              {" "}
              {item?.distance_km}km
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  ratingContainer: {
    position: "absolute",
    backgroundColor: Colors.grey900,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 3,
    right: 10,
    top: 10,
    zIndex: 100,
  },
  ratingText: {
    fontFamily: Fonts.semiBold,
    fontSize: scale(12),
    color: Colors.whiteText,
  },
  itemTitle: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    fontSize: 16,
  },
});
export default ParkingCard;
