import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import React, { FC } from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { scale } from "react-native-size-matters";
interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}
const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  containerStyle,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, containerStyle]}
    >
      <Text style={[styles.buttonText, labelStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.black600,
    fontFamily: Fonts.semiBold,
    fontSize: scale(13),
  },
});
export default CustomButton;
