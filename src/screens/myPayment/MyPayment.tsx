import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "@/components/global/HeaderComp";
import { ThemeButton } from "@/components/ThemeButton";
import { Colors } from "@/constants/Colors";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";
import { useNavigation } from "@react-navigation/native";

const MyPayment = () => {
  const navigation = useNavigation() as any;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <HeaderComp
        title="My Payment"
        showDots={false}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />

      <ThemeButton
        title="Add New Card"
        onPress={() => {
          navigation.navigate("AddNewCard");
        }}
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
});
export default MyPayment;
