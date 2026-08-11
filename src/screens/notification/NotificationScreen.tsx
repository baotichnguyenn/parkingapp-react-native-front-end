import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "@/components/global/HeaderComp";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";
import SwitchToggle from "react-native-switch-toggle";
import { Colors } from "@/constants/Colors";

const NotificationScreen = () => {
  const [isSoundnabled, setIsSoundnabled] = useState(false);
  const [isVibratenabled, setIsVibratenabled] = useState(false);
  const [isMessageEnabled, setIsMessageEnabled] = useState(false);
  const [isOfferEnabled, setIsOfferEnabled] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <HeaderComp
        title="Notifications"
        showDots={false}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />
      <View style={styles.container}>
        <Text style={styles.label}>Sound</Text>
        <SwitchToggle
          switchOn={isSoundnabled}
          onPress={() => setIsSoundnabled(!isSoundnabled)}
          circleColorOff={Colors.tintColorDark}
          circleColorOn={Colors.tintColorDark}
          backgroundColorOn={Colors.primary}
          backgroundColorOff={Colors.grey80}
          containerStyle={styles.toggleContainer}
          circleStyle={styles.circle}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Vibrate</Text>
        <SwitchToggle
          switchOn={isVibratenabled}
          onPress={() => setIsVibratenabled(!isVibratenabled)}
          circleColorOff={Colors.tintColorDark}
          circleColorOn={Colors.tintColorDark}
          backgroundColorOn={Colors.primary}
          backgroundColorOff={Colors.grey80}
          containerStyle={styles.toggleContainer}
          circleStyle={styles.circle}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Message</Text>
        <SwitchToggle
          switchOn={isMessageEnabled}
          onPress={() => setIsMessageEnabled(!isMessageEnabled)}
          circleColorOff={Colors.tintColorDark}
          circleColorOn={Colors.tintColorDark}
          backgroundColorOn={Colors.primary}
          backgroundColorOff={Colors.grey80}
          containerStyle={styles.toggleContainer}
          circleStyle={styles.circle}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>New Offers</Text>
        <SwitchToggle
          switchOn={isOfferEnabled}
          onPress={() => setIsOfferEnabled(!isOfferEnabled)}
          circleColorOff={Colors.tintColorDark}
          circleColorOn={Colors.tintColorDark}
          backgroundColorOn={Colors.primary}
          backgroundColorOff={Colors.grey80}
          containerStyle={styles.toggleContainer}
          circleStyle={styles.circle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: moderateScale(24),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingBottom: moderateScale(32),
    padding: 20,
  },

  label: {
    color: Colors.tintColorDark,
    fontSize: 18,
    fontFamily: Fonts.semiBold,
  },
  toggleContainer: {
    width: moderateScale(44),
    height: moderateScale(24),
    borderRadius: 30,
    // half of height for rounded ends

    padding: moderateScale(6),

    // padding: 1,
  },
  circle: {
    width: moderateScale(18),
    height: moderateScale(18),
    left: moderateScale(-4),
    borderRadius: 9,
    backgroundColor: "white",
  },
});
export default NotificationScreen;
