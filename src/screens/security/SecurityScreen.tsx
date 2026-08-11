import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "@/components/global/HeaderComp";
import { ThemeButton } from "@/components/ThemeButton";
import { Colors } from "@/constants/Colors";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";
import SwitchToggle from "react-native-switch-toggle";

const SecurityScreen = () => {
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);
  const [isTouchIDEnabled, setIsTouchIDEnabled] = useState(false);
  const [isRememberMeEnabled, setIsRememberMeEnabled] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <HeaderComp
        title="Security"
        showDots={false}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />

      <View style={styles.container}>
        <Text style={styles.label}>Touch ID</Text>
        <SwitchToggle
          switchOn={isTouchIDEnabled}
          onPress={() => setIsTouchIDEnabled(!isTouchIDEnabled)}
          circleColorOff={Colors.tintColorDark}
          circleColorOn={Colors.tintColorDark}
          backgroundColorOn={Colors.primary}
          backgroundColorOff={Colors.grey80}
          containerStyle={styles.toggleContainer}
          circleStyle={styles.circle}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Face ID</Text>
        <SwitchToggle
          switchOn={isFaceIDEnabled}
          onPress={() => setIsFaceIDEnabled(!isFaceIDEnabled)}
          circleColorOff={Colors.tintColorDark}
          circleColorOn={Colors.tintColorDark}
          backgroundColorOn={Colors.primary}
          backgroundColorOff={Colors.grey80}
          containerStyle={styles.toggleContainer}
          circleStyle={styles.circle}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Remember Me</Text>
        <SwitchToggle
          switchOn={isRememberMeEnabled}
          onPress={() => setIsRememberMeEnabled(!isRememberMeEnabled)}
          circleColorOff={Colors.tintColorDark}
          circleColorOn={Colors.tintColorDark}
          backgroundColorOn={Colors.primary}
          backgroundColorOff={Colors.grey80}
          containerStyle={styles.toggleContainer}
          circleStyle={styles.circle}
        />
      </View>
      <ThemeButton
        title="Change Password"
        onPress={() => {}}
        style={styles.buttonChange}
        textStyle={styles.buttonTextChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonChange: {
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 13,
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 24,
    bottom: 36,
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  buttonTextChange: {
    color: Colors.primary,
    fontSize: moderateScale(16),
    fontFamily: Fonts.medium,
  },
  container: {
    paddingHorizontal: moderateScale(24),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

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

    padding: moderateScale(6),
  },
  circle: {
    width: moderateScale(18),
    height: moderateScale(18),
    left: moderateScale(-4),
    borderRadius: 9,
    backgroundColor: "white",
  },
});
export default SecurityScreen;
