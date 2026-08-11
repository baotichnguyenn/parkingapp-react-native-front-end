import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import {
  Arrow_Right,
  Dots_noFill,
  OnboardingFisrt,
  OnboardingSecond,
  OnboardingThird,
} from "@/constants/SvgIcons";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import CarouselLib from "react-native-snap-carousel";

const { width } = Dimensions.get("window");

const cardData = [
  {
    id: "1",
    name: "Jordan Keria Parking",
    street: "Ivory Elephant street",
    price: " 5 / h",
    rating: "4.4",
    distance: "1.24 m",
    image: OnboardingThird,
  },
  {
    id: "2",
    name: "Krobi Elija Parking",
    street: "Ivory Elephant street",
    price: " 6 / h",
    rating: "4.4",
    distance: "1.6 m",
    image: OnboardingSecond,
  },
  {
    id: "3",
    name: "Embana Parking",
    street: "Ivory Elephant street",
    price: "5 / h",
    rating: "4.4",
    distance: "1.24 m",
    image: OnboardingFisrt,
  },
];

const Carousel = () => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.blueCircle} />
            {item.image && <item.image />}
          </View>
          <View style={styles.headerTextContainer}>
            <View style={styles.headerTop}>
              <Text style={styles.title}>{item.name}</Text>
              <TouchableOpacity style={styles.menuButton}>
                <Dots_noFill />
              </TouchableOpacity>
            </View>
            <Text style={styles.location}>{item.street}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Distance</Text>
            <Text style={styles.infoValue}>{item.distance}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Pricing</Text>
            <Text style={styles.infoValue}>
              <Text
                style={{ fontFamily: Fonts.semiBold, color: Colors.grey100 }}
              >
                $
              </Text>
              {item.price}
            </Text>
          </View>

          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Check out</Text>
            <Arrow_Right />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.paginationContainer}>
        {cardData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeSlide === index ? styles.activeDot : {}]}
          />
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <CarouselLib
        ref={carouselRef}
        data={cardData}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        vertical={false}
        loop
        onSnapToItem={(index) => setActiveSlide(index)}
      />
    </SafeAreaView>
  );
};

export default Carousel;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "black",
  },

  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(8),
    backgroundColor: Colors.white200,
    marginHorizontal: scale(4),
    justifyContent: "center",
    alignSelf: "center",
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: scale(24),
    height: scale(8),
    borderRadius: scale(8),
  },

  paginationContainer: {
    flexDirection: "row",
    // marginTop: scale(16),

    alignItems: "center",
    paddingHorizontal: scale(6),
    alignSelf: "center",
  },

  card: {
    backgroundColor: Colors.black600,
    marginHorizontal: scale(24),
    marginBottom: moderateScale(24),
    borderRadius: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: moderateScale(18, 0.2),
    backgroundColor: Colors.black200,
    borderRadius: 24,
  },
  avatarContainer: {
    height: moderateScale(60, 0.2),
    width: moderateScale(60, 0.2),
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
    fontFamily: Fonts.semiBold,
  },
  menuButton: {
    flexDirection: "row",
    width: 24,
    justifyContent: "space-between",
  },

  location: {
    color: Colors.grey100, // Gray text
    fontSize: 14,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 16,
    paddingHorizontal: moderateScale(18),
    padding: moderateScale(7),
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
    backgroundColor: Colors.primary,
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
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
});
