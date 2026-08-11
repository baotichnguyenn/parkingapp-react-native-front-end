import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import { authConstantsForBookingDetails } from "@/constants/AppConstants";

import { Fonts } from "@/constants/Fonts";
import {
  Car_Booking_Icon,
  Location_Icon,
  Star_Icon,
} from "@/constants/SvgIcons";

import Carousel from "react-native-snap-carousel";
import { Image } from "react-native";
import { Colors } from "@/constants/Colors";

import Dropdown from "@/components/global/DropDown";
import ReviewCard from "@/components/PilotProfile/ReviewCard";
import TimeChart from "@/components/PilotProfile/TimeChart";
import HeaderComp from "@/components/global/HeaderComp";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    title: "Design Meeting",
    hours: "2 hr",
    image: require("@/assets/pngs/OccupierImg.png"),
  },
  {
    id: "2",
    title: "Development",
    hours: "5 hr",
    image: require("@/assets/pngs/OccupierImg.png"),
  },

  {
    id: "3",
    title: "Design Meeting",
    hours: "2 hr",
    image: require("@/assets/pngs/OccupierImg.png"),
  },
  {
    id: "4",
    title: "Development",
    hours: "5 hr",
    image: require("@/assets/pngs/OccupierImg.png"),
  },
];

interface ItemCardProps {
  title: string;
  hours: string;
  image: string;
  isLast: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ title, hours, image, isLast }) => (
  <>
    {" "}
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Image source={image} style={styles.image1} />
        <Text style={styles.title1}>{title}</Text>
      </View>
      <Text style={styles.hours}>{hours}</Text>
    </View>
    <View
      style={{
        borderBottomColor: Colors.greyBorder,
        borderBottomWidth: 0.2,
        opacity: 0.4,
        marginVertical: 12,
        ...(isLast && { marginTop: 41 }),
      }}
    />
  </>
);

const ParkingDetailsScreen = () => {
  const navigation = useNavigation<any>();

  const carouselRef = useRef<Carousel<any> | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item }: any) => (
    <View style={{ paddingHorizontal: 24 }}>
      <TouchableOpacity onPress={() => navigation.navigate("YourDetails")}>
        {" "}
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <HeaderComp
        title="Park Details"
        showDots={true}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.Container}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.MainContainer}>
              <View>
                <Carousel
                  ref={carouselRef}
                  data={authConstantsForBookingDetails.onBoardingSlides}
                  renderItem={renderItem}
                  sliderWidth={width}
                  itemWidth={width}
                  // loop
                  vertical={false}
                  onSnapToItem={(index) => setActiveSlide(index)}
                />
                <View style={styles.paginationContainer}>
                  {authConstantsForBookingDetails.onBoardingSlides.map(
                    (_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.dot,
                          activeSlide === index ? styles.activeDot : {},
                        ]}
                      />
                    )
                  )}
                </View>
              </View>

              {/* Parking Details */}
              <View style={{ paddingHorizontal: 24 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 4,
                  }}
                >
                  <View style={{}}>
                    <Text style={styles.title}>
                      {
                        authConstantsForBookingDetails.onBoardingSlides[0]
                          ?.title
                      }
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.regular,
                        fontSize: 12,
                        color: Colors.grey100,
                      }}
                    >
                      {
                        authConstantsForBookingDetails.onBoardingSlides[0]
                          ?.location
                      }
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 3,
                      paddingRight: 6,
                    }}
                  >
                    <Star_Icon
                      height={moderateScale(20)}
                      width={moderateScale(20)}
                    />
                    <Text
                      style={{
                        fontFamily: Fonts.semiBold,
                        fontSize: 16,
                        color: "white",
                      }}
                    >
                      {
                        authConstantsForBookingDetails.onBoardingSlides[0]
                          ?.ratings
                      }
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: moderateScale(12),
                    gap: 8,
                  }}
                >
                  {/* Slot Tag */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: moderateScale(8),
                      paddingVertical: moderateScale(3),
                      backgroundColor: Colors.offwhite,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.darkRed,
                        fontFamily: Fonts.medium,
                        fontSize: moderateScale(12),
                      }}
                    >
                      {authConstantsForBookingDetails.onBoardingSlides[0]?.slot}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      backgroundColor: Colors.darkgreen10,
                      borderRadius: 12,
                    }}
                  >
                    <Location_Icon style={{ marginRight: 4 }} />
                    <Text
                      style={{
                        color: Colors.forestGreen,
                        fontFamily: Fonts.medium,
                        fontSize: moderateScale(12),
                      }}
                    >
                      {
                        authConstantsForBookingDetails.onBoardingSlides[0]
                          ?.distance
                      }
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      backgroundColor: Colors.orange10,
                      borderRadius: 12,
                    }}
                  >
                    <Car_Booking_Icon style={{ marginRight: 4 }} />
                    <Text
                      style={{
                        color: Colors.midgreen,
                        fontFamily: Fonts.medium,
                        fontSize: moderateScale(12),
                      }}
                    >
                      {
                        authConstantsForBookingDetails.onBoardingSlides[0]
                          ?.totalCars
                      }
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.secondContainer}>
          <Text style={[styles.title, { paddingLeft: moderateScale(12) }]}>
            Occupier
          </Text>

          <FlatList
            data={DATA}
            keyExtractor={(DATA, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ItemCard
                title={item.title}
                hours={item.hours}
                image={item.image}
                isLast={index === DATA.length - 1}
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: moderateScale(24),
              paddingRight: moderateScale(12),
              paddingTop: verticalScale(16),
              gap: 10,
            }}
          />
        </View>

        <View style={styles.thirdContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: moderateScale(12),
              paddingTop: verticalScale(18),
            }}
          >
            <Text style={[styles.title, { marginTop: 0 }]}>Popular Times</Text>
            <Dropdown
              options={["All", "Monday", "Tuesday"]}
              defaultValue="Saturday"
              onSelect={(val) => console.log("Selected:", val)}
            />
          </View>

          <View style={styles.chartContainer}>
            <TimeChart />
          </View>

          <View style={styles.forthContainer}>
            <ReviewCard />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    // paddingHorizontal:moderateScale(23)
  },
  secondContainer: {
    paddingLeft: moderateScale(12),
    paddingRight: moderateScale(22),
  },
  thirdContainer: {
    paddingLeft: moderateScale(12),
    paddingRight: moderateScale(22),
  },
  forthContainer: {
    // paddingLeft:moderateScale(12),},
  },
  MainContainer: {},
  imageContainer: {
    height: verticalScale(160),

    // marginHorizontal: 6,
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
    fontSize: moderateScale(14),
    marginTop: verticalScale(15),

    lineHeight: verticalScale(35),
    color: "white",
    fontFamily: Fonts.bold,
  },
  image: {
    width: "100%",
    height: verticalScale(150),
    resizeMode: "stretch",

    // justifyContent: 'center',
    borderRadius: scale(12),

    // resizeMode: 'cover',
    // alignSelf: 'center',
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  image1: {
    width: moderateScale(40),
    height: moderateScale(30),

    // marginRight: 12,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    gap: scale(11),
  },
  title1: {
    color: Colors.whitePure,
    fontSize: moderateScale(14),
    fontWeight: "medium",
  },
  hours: {
    color: Colors.greyBorder,
    fontSize: 14,

    marginBottom: moderateScale(14),
  },

  chartContainer: {
    marginBottom: 30,

    left: 12,
  },
  chart: {
    borderRadius: 40,
    marginVertical: 8,
  },
});
export default ParkingDetailsScreen;
