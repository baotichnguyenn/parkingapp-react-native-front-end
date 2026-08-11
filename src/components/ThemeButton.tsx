import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { moderateScale, scale, verticalScale } from "../utils/Scale";
import { Colors } from "@/constants/Colors";

interface ThemeButtonProps {
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
  customIcon?: React.ReactNode;
  disabled?: boolean;
  customRightIcon?: React.ReactNode;
  position?: "absolute" | "relative" | "static";
}

export const ThemeButton: React.FC<ThemeButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  style,
  textStyle,
  customIcon,
  disabled,
  customRightIcon,
  position,
}) => {
  const loaderComponent = () => (
    <ActivityIndicator color={Colors.black100} size="large" />
  );

  const normalComponent = () => (
    <>
      {customIcon}
      <ThemedText type="defaultSemiBold" style={[styles.text, textStyle]}>
        {title}
      </ThemedText>
      {customRightIcon && (
        <TouchableOpacity
          style={[styles.customRightIcon, { position: position || "absolute" }]}
        >
          {customRightIcon}
        </TouchableOpacity>
      )}
    </>
  );
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={style}
      activeOpacity={0.8}
    >
      {isLoading ? loaderComponent() : normalComponent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(30),
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(20),
    width: "100%",
    borderWidth: scale(2),
    // borderColor: Colors.grey100,
  },
  text: {
    fontSize: moderateScale(17),
    color: Colors.black,
    marginLeft: scale(4),
  },
  customRightIcon: {
    right: scale(20),
  },
});
