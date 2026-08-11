import HeaderComp from "@/components/global/HeaderComp";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Chain_Icon } from "@/constants/SvgIcons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

const QRCodeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <HeaderComp
        title=""
        showDots={false}
        isQrScreen={true}
        backgroundColor={Colors.black}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.qrContainer}>
          <View style={styles.qrContainer}>
            <View style={{ paddingRight: moderateScale(24) }}>
              {" "}
              <Text style={styles.title}>Scan to park now</Text>
            </View>

            <View style={{ bottom: moderateScale(28), paddingTop: 40 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <QRCode
                  value="www.google.com"
                  size={260}
                  color="white"
                  backgroundColor="black"
                />
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: moderateScale(24) }}>
            <Text style={styles.description}>
              Scan the QR Code to start your parking {`\n`}session. You can
              check out anytime.{"     "}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.linkButtonContainer}>
          <Chain_Icon />
        </TouchableOpacity>
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.scanButton}>
            <Text style={styles.scanButtonText}>Scan QR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: moderateScale(18),
    fontFamily: Fonts.montserratSemiBold,

    alignSelf: "center",

    marginTop: moderateScale(60, 0.1),
    marginBottom: moderateScale(28),
  },
  qrContainer: {
    position: "relative",
  },

  description: {
    color: Colors.grey100,

    fontFamily: Fonts.montserratMedium,
    textAlign: "center",

    marginTop: moderateScale(76),

    fontSize: moderateScale(14),
    lineHeight: moderateScale(18),
  },
  linkButtonContainer: {
    marginTop: moderateScale(62),

    justifyContent: "center",
    alignItems: "center",
  },
  linkButton: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: 30,
    backgroundColor: Colors.darkgrey,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: moderateScale(0),
    flexDirection: "row",
    borderRadius: 30,

    height: moderateScale(85),
    backgroundColor: Colors.grey200,
    justifyContent: "space-between",
  },
  scanButton: {
    backgroundColor: Colors.primary,
    paddingVertical: moderateScale(26),
    paddingHorizontal: moderateScale(28),
    borderRadius: 20,
    marginVertical: moderateScale(6),

    left: moderateScale(10),

    width: moderateScale(150),
    alignItems: "center",
  },
  scanButtonText: {
    color: "black",
    fontFamily: Fonts.montserratSemiBold,
    fontSize: moderateScale(16),
  },
  searchButton: {
    paddingVertical: moderateScale(26),
    paddingHorizontal: moderateScale(28),
    borderRadius: 20,
    marginVertical: moderateScale(5),

    width: "45%",
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontFamily: Fonts.montserratMedium,
    fontSize: moderateScale(16),
  },
});

export default QRCodeScreen;
