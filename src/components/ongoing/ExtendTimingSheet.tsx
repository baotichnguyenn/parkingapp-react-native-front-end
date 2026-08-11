import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";
import { Colors } from "@/constants/Colors";
import CustomButton from "../global/CustomButton";
import { StyleSheet } from "react-native";
import { Fonts } from "@/constants/Fonts";
import { scale } from "react-native-size-matters";
import ChipItem from "../home/ChipItem";
import { CloseIcon } from "@/constants/SvgIcons";
interface ExtendTimingSheetProps {
  visible: boolean;
  onClose: () => void;
}
const ExtendTimingSheet: FC<ExtendTimingSheetProps> = ({
  visible,
  onClose,
}) => {
  const [selectedTime, setselectedTime] = useState(0);
  return (
    <Modal transparent onRequestClose={onClose} visible={visible}>
      <Pressable
        onPress={onClose}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <View style={{ backgroundColor: Colors.black100, paddingVertical: 16 }}>
          <View style={styles.handle} />
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <CloseIcon style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <Text style={styles.text}>Choose the extension amount</Text>
          <View style={styles.chipContainerView}>
            <View style={{ gap: 14 }}>
              <ChipItem
                isSelected={selectedTime === 15}
                onPress={() => setselectedTime(15)}
                item={"15 mins"}
                containerStyle={styles.chipContainer}
                labelStyle={styles.chipText}
              />
              <ChipItem
                isSelected={selectedTime === 60}
                onPress={() => setselectedTime(60)}
                item={"1 hour"}
                containerStyle={styles.chipContainer}
                labelStyle={styles.chipText}
              />
            </View>
            <View style={{ gap: 14 }}>
              <ChipItem
                isSelected={selectedTime === 30}
                onPress={() => setselectedTime(30)}
                item={"30 mins"}
                containerStyle={styles.chipContainer}
                labelStyle={styles.chipText}
              />
              <ChipItem
                isSelected={selectedTime === 120}
                onPress={() => setselectedTime(120)}
                item={"2 hour"}
                containerStyle={styles.chipContainer}
                labelStyle={styles.chipText}
              />
            </View>
          </View>

          <CustomButton
            title="Extend :)"
            labelStyle={{ fontSize: 16 }}
            containerStyle={{ marginHorizontal: 26 }}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
const styles = StyleSheet.create({
  handle: {
    width: 70,
    alignSelf: "center",
    backgroundColor: Colors.grey600,
    height: 5,
    borderRadius: 3,
  },
  chipText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  chipContainer: {
    paddingHorizontal: 40,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: scale(16),
    color: Colors.white,
    textAlign: "center",
    marginTop: 8,
  },
  chipContainerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
});
export default ExtendTimingSheet;
