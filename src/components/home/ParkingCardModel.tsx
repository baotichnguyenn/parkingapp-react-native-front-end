import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
  Linking,
} from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { moderateScale, scale } from "react-native-size-matters";

import {
  Car_Location,
  Parking_Logo,
  RightTurn,
  StarIcon,
} from "@/constants/SvgIcons";
import CustomButton from "../global/CustomButton";
import { Colors } from "@/constants/Colors";

import { useNavigation } from "@react-navigation/native";

import Feather from "react-native-vector-icons/Feather";

type ParkingCardModelProps = {
  visible: boolean;
  onClose: () => void;
  parking?: any; // Define a more specific type if available
};

const ParkingCardModel: React.FC<ParkingCardModelProps> = ({
  visible,
  onClose,
  parking,
}) => {
  const navigation = useNavigation();
  const parkingTypes = [{ type: parking.location_type, id: "1" }];
  const openMap = (
    latitude: number,
    longitude: number,
    label: string = "Location"
  ) => {
    const latLng = `${latitude},${longitude}`;
    const query =
      Platform.OS === "ios" ? `?q=${label}&ll=${latLng}` : `?q=${latLng}`;
    const url = Platform.select({
      ios: `http://maps.apple.com/${query}`,
      android: `geo:${latLng}?q=${latLng}(${label})`,
    });

    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Error opening map:", err)
      );
    } else {
      console.error("Error: Map URL is undefined");
    }
  };
  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <Pressable
        style={{ flex: 1, justifyContent: "flex-end" }}
        onPress={onClose}
      >
        <View style={{ backgroundColor: "black" }}>
          <View style={styles.ratingContainer}>
            <StarIcon />
            <Text style={styles.ratingText}>4.4</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.mainContainer}>
            <Feather name="x" size={24} color={Colors.tintColorDark} />
          </TouchableOpacity>
          <View>
            <Image
              resizeMode="cover"
              style={{ width: "100%", borderRadius: 10, height: 179 }}
              source={require("@/assets/images/parking1.png")}
            />
            <TouchableOpacity
              onPress={() =>
                openMap(
                  parking?.latitude,
                  parking?.longitude,
                  parking?.location
                )
              }
              style={{ position: "absolute", right: 22, bottom: 20 }}
            >
              <RightTurn />
            </TouchableOpacity>
          </View>

          <View
            style={{
              position: "absolute",
              top: 14,
              opacity: 0.8,
              paddingVertical: moderateScale(16),
              paddingHorizontal: moderateScale(5),
              borderRadius: moderateScale(60),
              backgroundColor: Colors.grey100,
            }}
          >
            <Text numberOfLines={1} style={styles.itemTitle}>
              Mall Gozilas Parking
            </Text>
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 11,
                color: "white",
              }}
            >
              {parking?.location?.split(",")[0]}
            </Text>
          </View>

          <View
            style={{
              gap: 14,
              paddingTop: moderateScale(8),
              paddingHorizontal: moderateScale(16),
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Car_Location />
              <Text style={styles.descTitle}>Available 3+ min ago</Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Parking_Logo />
              <Text style={styles.descTitle}>
                {parking?.distance_km} km away 1 min
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: moderateScale(10),
                paddingTop: moderateScale(3),
              }}
            >
              <Text style={styles.descTitle}>Parking Type</Text>

              <FlatList
                horizontal
                contentContainerStyle={{
                  paddingHorizontal: 12,
                  paddingTop: 20,
                  paddingBottom: 18,
                }}
                ItemSeparatorComponent={() => (
                  <View style={{ marginRight: 12 }} />
                )}
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      style={{
                        padding: 9,
                        backgroundColor: "#20242C",
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: Colors.grey200,
                      }}
                    >
                      <Text
                        style={{
                          paddingHorizontal: moderateScale(1),
                          color: "white",
                          fontSize: 14,
                          fontFamily: Fonts.bold,
                        }}
                      >
                        {item.type}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                data={parkingTypes}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>

          <CustomButton
            title="Request Parking Spot"
            onPress={() =>
              (navigation as any).navigate("BookingDetails", { parking })
            }
            containerStyle={{
              paddingVertical: 14,
              marginHorizontal: moderateScale(25),
            }}
          />
        </View>
      </Pressable>
    </Modal>
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
    paddingVertical: 6,
    right: moderateScale(29),
    top: 15,
    zIndex: 100,
  },
  mainContainer: {
    position: "absolute",

    flexDirection: "row",
    alignItems: "center",

    right: moderateScale(5),
    top: 4,
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
  descTitle: {
    fontFamily: Fonts.medium,
    color: Colors.whitePure,
    fontSize: moderateScale(14),
  },
});
export default ParkingCardModel;
