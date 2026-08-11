// components/CustomHeaderOptions.tsx

import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";
import { Arrow_Left, Dots, Qr_left_Icon } from "@/constants/SvgIcons";

import type { NavigationProp } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

export const CustomBackButton = ({
  navigation,
  isQrScreen = false,
}: {
  navigation: NavigationProp<any>;
  isQrScreen?: boolean;
}) => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={isQrScreen ? styles.QrbackButton : styles.backButton}
  >
    {isQrScreen ? <Qr_left_Icon /> : <Arrow_Left fill={Colors.whitePure} />}
  </TouchableOpacity>
);

export const createHeaderOptions = ({
  navigation,
  title,
  isQrScreen = false,
  onPressDots = () => {},
  showDots = true,
  backgroundColor = Colors.black,
}: {
  navigation: NavigationProp<any>;
  title: string;
  isQrScreen?: boolean;
  onPressDots?: () => void;
  showDots?: boolean;
  backgroundColor?: string;
}) => ({
  headerShown: true,
  headerLeft: () => (
    <CustomBackButton navigation={navigation} isQrScreen={isQrScreen} />
  ),
  headerTitle: () => (
    <View style={{ marginTop: 0 }}>
      <Text style={styles.centerText} numberOfLines={1} adjustsFontSizeToFit>
        {title}
      </Text>
    </View>
  ),
  headerTitleAlign: "center" as "center",
  headerStyle: {
    backgroundColor,

    height: moderateScale(80),
  },
  headerShadowVisible: false,
  headerRight: () =>
    showDots ? (
      <TouchableOpacity
        onPress={onPressDots}
        style={{ marginTop: 0, padding: 16 }}
      >
        <Dots />
      </TouchableOpacity>
    ) : null,
});

const styles = StyleSheet.create({
  backButton: {
    padding: 6,
    marginTop: 0,
  },
  QrbackButton: {
    padding: moderateScale(14),
  },
  centerText: {
    fontFamily: Fonts.bold,
    fontSize: moderateScale(36),
    color: "white",
    paddingVertical: 4,
    marginTop: 0,
    textAlign: "center",
    flexShrink: 1,
  },
});
