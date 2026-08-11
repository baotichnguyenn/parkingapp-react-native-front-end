import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { ArrowRight } from "@/constants/SvgIcons";
import { Image, StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";
import React from "react";

interface CardItem {
  name?: string;
  street?: string;
  distance?: string | number;
  hourly_rate?: string | number;
  // Add other properties as needed
}

interface CardComponentProps {
  item: CardItem;
}

const CardComponent = ({ item }: CardComponentProps) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <View style={styles.avatarContainer}>
        <View style={styles.blueCircle} />
        <Image source={require("@/assets/images/slide1.png")} />
      </View>
      <View style={styles.headerTextContainer}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>{item?.name}</Text>
          <TouchableOpacity style={styles.menuButton}>
            {/* <Dots fill="none" stroke={Colors.grey100} strokeWidth={1.5} /> */}
          </TouchableOpacity>
        </View>
        <Text style={styles.location}>{item?.street}</Text>
      </View>
    </View>
    <View style={styles.infoContainer}>
      <View style={styles.infoColumn}>
        <Text style={styles.infoLabel}>Distance</Text>
        <Text style={styles.infoValue}>{item?.distance}</Text>
      </View>
      <View style={styles.infoColumn}>
        <Text style={styles.infoLabel}>Pricing</Text>
        <Text style={styles.infoValue}>
          <Text style={{ fontFamily: Fonts.semiBold, color: Colors.grey100 }}>
            $
          </Text>
          {item?.hourly_rate}
        </Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Check out</Text>
        <ArrowRight />
      </TouchableOpacity>
    </View>
  </View>
);
export default CardComponent;
const styles = StyleSheet.create({
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
    // marginHorizontal: scale(24),
    borderRadius: 24,
    // flex:1,
    // height:'100%',
    // marginTop:'50%',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 18,
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
    fontSize: scale(20),
    fontFamily: Fonts.semiBold,
  },
  menuButton: {
    flexDirection: "row",
    width: 24,
    justifyContent: "space-between",
  },
  location: {
    color: Colors.grey700, // Gray text
    fontSize: 14,
    fontFamily: Fonts.medium,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 16,
    paddingHorizontal: 19,
    padding: 6,
    alignItems: "center",
  },
  infoColumn: {
    flex: 1,
    gap: 6,
  },
  infoLabel: {
    color: Colors.grey100,
    fontFamily: Fonts.medium, // Gray text
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: "white",
    fontSize: 18,
    fontFamily: Fonts.semiBold,
  },
  checkoutButton: {
    backgroundColor: Colors.primary, // Lime green
    borderRadius: 100, // Large value for fully rounded corners
    paddingVertical: 14,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  checkoutText: {
    color: Colors.darkText, // Dark text
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
  arrowIcon: {
    marginLeft: 4,
  },
  container1: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "black",
    paddingHorizontal: 35,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 70, // Space for the Sort By button
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
    height: 70,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  contentContainer1: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "space-between",
  },
  parkingName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  streetName: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  priceText: {
    color: "white",
    fontSize: 14,
  },
  separator: {
    width: 1,
    height: 14,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  sortByText: {
    color: "black",
    fontWeight: "bold",
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
    marginRight: 12,
    minWidth: 80,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.grey100,
  },
});
