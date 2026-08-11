import { Text, type TextProps, StyleSheet } from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { moderateScale, verticalScale } from "../utils/Scale";
import { Colors } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(24),
    fontFamily: "SfUiDisplayMedium",
  },
  defaultSemiBold: {
    fontSize: moderateScale(18),
    lineHeight: verticalScale(24),
    fontFamily: "SfUiDisplaySemibold",
  },
  title: {
    fontSize: moderateScale(32),
    fontFamily: "SfUiDisplayBold",
    lineHeight: verticalScale(32),
  },
  subtitle: {
    fontSize: moderateScale(20),
    fontFamily: "SfUiDisplayMedium",
  },
  link: {
    lineHeight: verticalScale(30),
    fontSize: moderateScale(16),
    color: Colors.tintColorLight,
  },
});
