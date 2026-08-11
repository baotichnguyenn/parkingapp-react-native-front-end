import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Star_Icon, Time_Icon } from "@/constants/SvgIcons";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const parkingData = [
  {
    id: "1",
    name: "Jordan Keria Parking",
    street: "Ivory Elephant street",
    price: "$5",
    rating: "4.4",
    distance: "1.24km",
    // Icon: Parking,
    image: require("@/assets/pngs/booking_img0.png"),
  },
  {
    id: "2",
    name: "Krobi Elija Parking",
    street: "Ivory Elephant street",
    price: "$6",
    rating: "4.4",
    distance: "1.6km",
    // Icon: Parking,
    image: require("@/assets/pngs/booking_img.png"),
  },
  {
    id: "3",
    name: "Embana Parking",
    street: "Ivory Elephant street",
    price: "$5",
    rating: "4.4",
    distance: "1.24km",
    // Icon: Parking,
    image: require("@/assets/pngs/booking_img1.png"),
  },
  {
    id: "4",
    name: "Embana Parking",
    street: "Ivory Elephant street",
    price: "$5",
    rating: "4.4",
    distance: "1.24km",
    // Icon:  Parking
    image: require("@/assets/pngs/booking_img2.png"),
  },
  {
    id: "5",
    name: "Embana Parking",
    street: "Ivory Elephant street",
    price: "$5",
    rating: "4.4",
    distance: "1.24km",
    // Icon:  Parking
    image: require("@/assets/pngs/booking_img3.png"),
  },

  {
    id: "6",
    name: "Jordan Keria Parking",
    street: "Ivory Elephant street",
    price: "$5",
    rating: "4.4",
    distance: "1.24km",
    // Icon: Parking,
    image: require("@/assets/pngs/booking_img4.png"),
  },
  {
    id: "7",
    name: "Krobi Elija Parking",
    street: "Ivory Elephant street",
    price: "$6",
    rating: "4.4",
    distance: "1.6km",
    // Icon: Parking,
    image: require("@/assets/pngs/booking_img1.png"),
  },
  {
    id: "8",
    name: "Embana Parking",
    street: "Ivory Elephant street",
    price: "$5",
    rating: "4.4",
    distance: "1.24km",
    // Icon: Parking,
    image: require("@/assets/pngs/booking_img2.png"),
  },
  {
    id: "9",
    name: "Embana Parking",
    street: "Ivory Elephant street",
    price: "$5",
    rating: "4.4",
    distance: "1.24km",
    // Icon:  Parking
    image: require("@/assets/pngs/booking_img.png"),
  },
  {
    id: "10",
    name: "Embana Parking",
    street: "Ivory Elephant street",
    price: "$5",
    rating: "4.4",
    distance: "1.24km",
    // Icon:  Parking
    image: require("@/assets/pngs/booking_img3.png"),
  },
];
type ParkingItemType = {
  id: string;
  name: string;
  street: string;
  price: string;
  rating: string;
  distance: string;
  image: any;
  // Icon?: React.ComponentType<any>;
};

type ParkingItemsProps = {
  item: ParkingItemType;
};

const ParkingItems = ({ item }: ParkingItemsProps) => {
  // const SvgIcon = item.Icon;
  return (
    <View style={styles.itemContainer}>
      {/* <View style={styles.image}> */}
      {/* <SvgIcon width={80} height={79}  /> */}
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
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      </View>

      {/* </View> */}
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.parkingName}>
          {item.name}
        </Text>
        <Text numberOfLines={1} style={styles.streetName}>
          {item.street}
        </Text>

        <View style={styles.detailsRow}>
          <Text style={styles.priceText}>
            {item.price}
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
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
      </View>
    </View>
  );
};

export default ParkingItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "black",
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 2,
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
  listContainer: {
    paddingBottom: 70,
    // Space for the Sort By button
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: moderateScale(16),
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
