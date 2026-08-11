import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { CompassIcon, StarIcon } from "@/constants/SvgIcons";
import { StyleSheet } from "react-native";

interface RecommendationItem {
  // Update these fields to match the actual structure of your item prop
  // Example fields:
  // name: string;
  // address: string;
  // price: number;
  // rating: number;
  // distance: number;
}

interface RecommendationProps {
  item: RecommendationItem;
}

const Recommendation: React.FC<RecommendationProps> = () => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          flex: 1,
        }}
      >
        <Image
          style={{ height: 75, width: 75, borderRadius: 12 }}
          source={require("@/assets/images/parking.png")}
        />
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: Fonts.semiBold,
                fontSize: scale(16),
                color: Colors.whiteText,
                flex: 1,
              }}
            >
              Jordan Keria Parking
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: Fonts.regular,
                fontSize: scale(11),
                color: Colors.whiteText,
                flex: 1,
              }}
            >
              Ivory Elephant street
            </Text>
          </View>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: Fonts.bold,
                fontSize: 13,
                color: Colors.whiteText,
              }}
            >
              $6/
              <Text style={{ fontFamily: Fonts.medium, fontSize: 12 }}>
                Hours
              </Text>
              {"  |  "}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <StarIcon />
              <Text style={styles.ratingText}> 4.4</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CompassIcon width={12} height={12} />
        <Text
          style={{
            fontFamily: Fonts.medium,
            fontSize: scale(12),
            color: Colors.white,
          }}
        >
          {" "}
          1.24km
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  ratingText: {
    fontFamily: Fonts.semiBold,
    fontSize: scale(12),
    color: Colors.whiteText,
  },
});
export default Recommendation;
