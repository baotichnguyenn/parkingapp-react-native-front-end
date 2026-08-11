import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import {
  Dot_Icon,
  Location_Primary_Color,
  Star_Icon,
  Time_Icon_Big,
} from "@/constants/SvgIcons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import HeaderComp from "../global/HeaderComp";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

interface ParkingReceiptProps {
  receipt: {
    check_in: string;
    check_out: string;
    parking_name: string;
    location: string;
    capacity: number;
    name: string;
    // Add other fields as needed
  };
}

const ParkingReceipt: React.FC<ParkingReceiptProps> = ({ receipt }) => {
  const hoursDiff = moment(receipt?.check_out).diff(
    receipt?.check_in,
    "hours",
    true
  ); //
  const rounded = Math.round(hoursDiff * 2) / 2;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <HeaderComp
        title="Parking Receipt"
        showDots={true}
        onPressDots={() => console.log("Dots pressed")}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />
      <ScrollView>
        <View style={styles.container}>
          {/* Ticket Card */}
          <View style={styles.ticketCard}>
            <View style={styles.header}>
              <View style={styles.parkingInfo}>
                <Image
                  source={require("../../assets/pngs/parkingReceipt.png")}
                  style={styles.parkingIcon}
                />
                <View style={styles.parkingTextContainer}>
                  <Text style={styles.parkingName}>
                    {receipt?.parking_name}
                  </Text>
                  <View style={styles.locationRow}>
                    <Location_Primary_Color />
                    <Text style={styles.locationText}>{receipt?.location}</Text>
                    <View style={styles.ratingContainer}>
                      <Star_Icon />
                      <Text style={styles.ratingText}>
                        4.4{" "}
                        <Text
                          style={{
                            fontFamily: Fonts.regular,
                            fontSize: moderateScale(10),
                            color: Colors.grey75,
                          }}
                        >
                          ({receipt?.capacity})
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.border}></View>

            {/* Time Info */}
            <View style={styles.timeSection}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeLabel}>Arrive</Text>
                <Text style={styles.timeValue}>
                  {moment(receipt?.check_in)?.format("HH.MM")}
                </Text>
                <Text style={styles.dateValue}>
                  {moment(receipt?.check_in).format("MMM,YY")}
                </Text>
              </View>

              <View style={styles.timelineContainer}>
                <View style={styles.timeline}>
                  {/* <View style={styles.timelineDot} /> */}
                  <Dot_Icon />
                  <View style={styles.timelineLine} />

                  <Time_Icon_Big />
                  <View style={styles.timelineLine} />
                  <Dot_Icon />
                  {/* <View style={styles.timelineDot} /> */}
                </View>
              </View>

              <View style={[styles.timeColumn, { alignItems: "flex-end" }]}>
                <Text style={styles.timeLabel}>Exit</Text>
                <Text style={[styles.timeValue, { left: 0 }]}>
                  {moment(receipt?.check_out)?.format("HH.MM")}
                </Text>
                <Text style={styles.dateValue}>
                  {moment(receipt?.check_in).format("MMM,YY")}
                </Text>
              </View>
            </View>

            {/* Details */}
            <View style={styles.border}></View>
            <View style={styles.detailsSection}>
              <View style={styles.detailRow}>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>Name</Text>
                  <Text style={styles.detailValue}>{receipt?.name}</Text>
                </View>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>Vehicle</Text>
                  <Text style={styles.detailValue}>BMW 320i Sport</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>Parking Place</Text>
                  <Text style={styles.detailValue}>#23-56-76</Text>
                </View>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>Parking Spot</Text>
                  <Text style={styles.detailValue}>#A-13 (F1)</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>Duration</Text>
                  <Text style={styles.detailValue}>{rounded} hours</Text>
                </View>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>Payment Method</Text>
                  <Text style={styles.detailValue}>Credit Card</Text>
                </View>
              </View>
            </View>

            <View style={styles.borderDash}></View>

            {/* Barcode */}
            <View style={styles.barcodeContainer}>
              <Image
                source={require("../../assets/pngs/barcode.png")}
                style={styles.barcode}
                resizeMode="contain"
              />
            </View>

            {/* Left rounded cut */}
            <View style={[styles.cutCircle, styles.leftCut]} />

            {/* Right rounded cut */}
            <View style={[styles.cutCircle, styles.rightCut]} />
          </View>

          {/* Download Button */}
        </View>
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadText}>Download Receipt</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  ticketCard: {
    backgroundColor: Colors.black600,
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    padding: 16,
  },
  border: {
    borderBottomColor: Colors.grey100,
    borderBottomWidth: 1,
    marginHorizontal: moderateScale(20),
  },
  cutCircle: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "black",
    bottom: 104,
    zIndex: 10,
  },
  leftCut: {
    left: moderateScale(-18),
  },
  rightCut: {
    right: moderateScale(-18),
  },

  borderDash: {
    borderBottomColor: Colors.grey100,
    borderBottomWidth: 1,
    marginHorizontal: moderateScale(32),
    borderStyle: "dashed",
    bottom: moderateScale(4),
  },
  parkingInfo: {
    flexDirection: "row",
    // alignItems: 'center',
    marginTop: 5,
  },
  parkingIcon: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: Colors.grey20,
  },
  parkingTextContainer: {
    flex: 1,
  },
  parkingName: {
    color: "white",
    fontFamily: Fonts.bold,
    fontSize: moderateScale(14),
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(6),
  },
  locationText: {
    color: Colors.grey75,
    fontFamily: Fonts.medium,
    fontSize: moderateScale(10),
    marginLeft: moderateScale(5),
    marginRight: moderateScale(20),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: Colors.yellow10,
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    marginLeft: 4,
  },
  divider: {
    height: 2,
    backgroundColor: Colors.grey100,
    marginHorizontal: moderateScale(20),
  },
  timeSection: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-around",

    paddingBottom: moderateScale(19),
    paddingTop: 20,
  },
  timeColumn: {
    alignItems: "flex-start",
    marginHorizontal: 4,
  },
  timeLabel: {
    color: Colors.grey100,
    fontSize: moderateScale(10),
    fontFamily: Fonts.regular,
    marginBottom: moderateScale(8),
  },
  timeValue: {
    color: "white",
    fontSize: moderateScale(18),
    // marginHorizontal: moderateScale(6),
    left: 2,

    fontFamily: Fonts.bold,
    marginBottom: moderateScale(5),
  },
  dateValue: {
    color: Colors.grey100,
    fontSize: moderateScale(10),
    fontFamily: Fonts.regular,
    marginTop: 6,
  },
  timelineContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: moderateScale(20),
  },
  timeline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timelineDot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.yellow10,
    borderRadius: 4,
  },
  timelineLine: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: Colors.grey100,
    borderStyle: "dashed",
  },

  detailsSection: {
    padding: 18,
    paddingTop: moderateScale(19),
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    marginBottom: 8,
    color: Colors.grey100,
    fontSize: moderateScale(10),
    fontFamily: Fonts.regular,
  },
  detailValue: {
    color: "white",
    fontSize: moderateScale(12),
    marginBottom: 10,

    fontFamily: Fonts.bold,
  },
  barcodeContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 16,
    paddingTop: moderateScale(40),
  },
  barcode: {
    width: "90%",
    height: 60,
  },
  downloadButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: moderateScale(23),
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
  },
  downloadText: {
    color: Colors.black100,
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
});

export default ParkingReceipt;
