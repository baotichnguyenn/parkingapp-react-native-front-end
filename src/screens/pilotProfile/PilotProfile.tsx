import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { moderateScale, scale } from "react-native-size-matters";
import {
  CompassIcon,
  MarkerIcon,
  NotificationIcon,
  StarIcon,
} from "@/constants/SvgIcons";
import { SafeAreaView } from "react-native-safe-area-context";

import { LineChart } from "react-native-chart-kit";

import Dropdown from "@/components/global/DropDown";
import { useNavigation } from "@react-navigation/native";

const PilotProfile = () => {
  const navigation = useNavigation<any>();
  const [selectedTime, setSelectedTime] = useState("1D");
  const [chartData, setChartData] = useState([13, 43, 30, 35, 70, 72, 83, 90]);
  const timeDataMap = {
    "1D": [13, 20, 30, 25],
    "1W": [10, 35, 40, 30, 50, 65],
    "1M": [25, 45, 55, 60, 65],
    "3M": [40, 50, 60, 70],
    "6M": [60, 65, 70, 72, 75],
    "1Y": [70, 72, 83, 90],
    ALL: [10, 20, 30, 40, 50, 60, 70, 80, 90],
  };

  const renderParkingItem = () => {
    return (
      <TouchableOpacity
        style={{
          gap: 8,
          width: 180,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
        onPress={() => navigation.navigate("ParkingDetails")}
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
              style={{
                fontFamily: Fonts.regular,
                fontSize: 11,
                color: Colors.whiteText,
              }}
            >
              Ivory Elephant street
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
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
                1.24km
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={Colors.primary} />
      <View style={styles.headerContainer}>
        <Image
          style={styles.avtarImage}
          source={require("@/assets/images/slide1.png")}
        />
        <View style={styles.locationContainer}>
          <Text style={[styles.lightText, { textAlign: "center" }]}>
            Your location
          </Text>
          <View style={styles.headerLocation}>
            <MarkerIcon />
            <Text numberOfLines={1} style={[styles.semibold]}>
              San Diego, California
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <NotificationIcon />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingLeft: 21,
          paddingRight: 16,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: moderateScale(19),
        }}
      >
        <Text style={styles.headerTitle}>Welcome Alex</Text>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
        <View style={styles.secondMainContainer}>
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewText}>OverView</Text>

            <Dropdown
              options={["All", "Option 1", "Option 2"]}
              defaultValue="All"
              onSelect={(val) => console.log("Selected:", val)}
            />
          </View>

          <View>
            <View style={{ paddingTop: 21, gap: 4, left: 3 }}>
              <Text
                style={{
                  color: "white",
                  fontFamily: Fonts.interSemibold,
                  fontSize: 14,
                }}
              >
                Revenue
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: Fonts.interSemibold,
                  fontSize: 20,
                }}
              >
                $1500
              </Text>
            </View>
            <LineChart
              data={{
                labels: ["1D", "1W", "1M", "3M", "6M", "1Y", "ALL"],
                datasets: [
                  {
                    data: chartData,
                  },
                ],
              }}
              withDots={false}
              withInnerLines={false}
              withOuterLines={false}
              withHorizontalLabels={false}
              withVerticalLabels={false}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              // optional, defaults to 1
              chartConfig={{
                backgroundColor: "black",

                propsForBackgroundLines: {
                  strokeWidth: 0, // Remove horizontal lines
                },
                fillShadowGradientFrom: Colors.tintColorDark,
                fillShadowGradientTo: Colors.tintColorDark,
                fillShadowGradientFromOpacity: 0,
                fillShadowGradientToOpacity: 0,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: () => Colors.primary,
                labelColor: () => `white`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "1",
                  // stroke: "#ffa726"
                },
              }}
              bezier
              style={{
                borderRadius: 16,
                right: 40,
              }}
            />
            <View
              style={{ flexDirection: "row", gap: 16, paddingHorizontal: 20 }}
            >
              {Object.keys(timeDataMap).map((time) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => {
                    setSelectedTime(time);
                    setChartData(timeDataMap[time]);
                  }}
                >
                  <Text
                    style={{
                      color: selectedTime === time ? Colors.primary : "white",
                    }}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text
              style={{ color: "white", fontFamily: Fonts.inter, fontSize: 16 }}
            >
              Today
            </Text>
            <Text
              style={{ color: "white", fontSize: 16, fontFamily: Fonts.inter }}
            >
              01/04/2025
            </Text>
          </View>

          {/* count container */}

          <View style={styles.countContainer}>
            <View style={{ alignItems: "center", gap: 10 }}>
              <View style={{ gap: 3 }}>
                <Text
                  style={{
                    color: "white",
                    fontFamily: Fonts.interSemibold,
                    fontSize: 20,
                  }}
                >
                  Active Users
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontFamily: Fonts.interSemibold,
                    fontSize: 24,
                    left: 13,
                  }}
                >
                  25
                </Text>
              </View>
              <View style={{ gap: 3 }}>
                <Text
                  style={{
                    color: "white",
                    fontFamily: Fonts.interSemibold,
                    fontSize: 20,
                  }}
                >
                  Transactions
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontFamily: Fonts.interSemibold,
                    fontSize: 24,
                    left: 13,
                  }}
                >
                  43
                </Text>
              </View>
            </View>
            <View style={{ gap: 8 }}>
              <Text
                style={{
                  color: "white",
                  fontFamily: Fonts.interSemibold,
                  fontSize: 20,
                }}
              >
                Expected Earnings
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: Fonts.interlight,
                  fontSize: 40,
                }}
              >
                $123.54
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingTop: 30,
            // paddingLeft: 21,
          }}
        >
          <View style={styles.headerParking}>
            <Text style={styles.titleText}>My Parks</Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: Colors.primary,
                  fontSize: scale(14),
                }}
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal: 20 }}
            ItemSeparatorComponent={() => <View style={{ marginRight: 12 }} />}
            renderItem={renderParkingItem}
            data={[1, 2, 3, 4]}
          />
        </View>
      </ScrollView>{" "}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.primary,
    paddingLeft: 28,
    paddingRight: 21,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 25,
  },
  avtarImage: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
  },
  lightText: {
    fontFamily: Fonts.medium,
    fontSize: scale(11.5),
  },
  semibold: {
    fontFamily: Fonts.semiBold,
    fontSize: scale(14),
  },
  headerLocation: { flexDirection: "row", alignItems: "center", gap: 10 },
  locationContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: "50%",
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Colors.black100,
  },

  overviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: moderateScale(15),
  },
  overviewText: {
    fontFamily: Fonts.bold,
    fontSize: scale(20),
    color: "white",
  },

  secondMainContainer: {
    paddingHorizontal: moderateScale(15),
  },

  dateContainer: {
    paddingTop: moderateScale(35),
    paddingBottom: moderateScale(17),
    gap: 3,
    paddingHorizontal: moderateScale(10),
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(6),
  },

  headerParking: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 21,
  },
  titleText: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.white,
  },
  itemTitle: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    fontSize: 16,
  },
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
});
export default PilotProfile;
