import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { FC } from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { scale } from "react-native-size-matters";
interface ChipItemProps {
  item: string;
  index?: number;
  isSelected: boolean;
  onPress?: () => void;
  containerStyle?: object;
  labelStyle?: object;
  // Add any other props you need
}
const ChipItem: FC<ChipItemProps> = ({
  item,

  isSelected,
  onPress,
  containerStyle,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chipContainer,
        isSelected && {
          backgroundColor: Colors.primary,
        },
        containerStyle,
      ]}
    >
      <Text
        style={[
          styles.chipText,
          isSelected && {
            color: Colors.black,
          },
          labelStyle,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  chipText: {
    fontFamily: Fonts.semiBold,
    fontSize: scale(11),
    color: Colors.white,
  },
  chipContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.black600,
    borderWidth: 1,
    borderColor: Colors.grey100,
    borderRadius: 24,
  },
});
export default ChipItem;
