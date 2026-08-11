import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Colors } from "@/constants/Colors";
import CustomButton from "../global/CustomButton";
import { StyleSheet } from "react-native";
import { Fonts } from "@/constants/Fonts";
import { scale } from "react-native-size-matters";
import { CloseIcon } from "@/constants/SvgIcons";
interface CheckOutSheetProps {
  visible: boolean;
  onClose: () => void;
}
const CheckOutSheet: FC<CheckOutSheetProps> = ({ visible, onClose }) => {
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
          <Text style={styles.text}>Do you want to end your session early</Text>
          <View
            style={{
              gap: 24,
              marginTop: 40,
              paddingHorizontal: 26,
              paddingBottom: 10,
            }}
          >
            <CustomButton
              title="Cancel"
              labelStyle={{ color: Colors.white, fontSize: 16 }}
              containerStyle={{
                backgroundColor: Colors.error,
              }}
            />

            <CustomButton
              labelStyle={{ fontSize: 16, color: Colors.black }}
              title="End Session"
              containerStyle={{}}
            />
          </View>
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
});
export default CheckOutSheet;
