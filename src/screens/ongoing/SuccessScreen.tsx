import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { Fonts } from "@/constants/Fonts";
import { scale } from "react-native-size-matters";
import { SuccessIcon } from "@/constants/SvgIcons";
import CustomButton from "@/components/global/CustomButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/AppNavigator";

const SuccessScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <View style={{ flex: 1, paddingTop: 30 }}>
        <Text style={styles.headerTitle}>Your Session has ended</Text>
        <View style={styles.iconContainer}>
          <SuccessIcon />
        </View>
        <View style={{ paddingHorizontal: 40 }}>
          <Text style={styles.headerTitle}>Your parking session has ended</Text>
          <Text style={styles.contentText}>
            Go to Bookings History section to{"\n"} view your receipt
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 24, paddingBottom: 20 }}>
        <CustomButton
          onPress={() => navigation.navigate("Tabs")}
          title="Back to Home"
          labelStyle={{ fontSize: 16 }}
          containerStyle={{ paddingVertical: 13 }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: scale(18),
    color: Colors.white,
    textAlign: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  contentText: {
    fontSize: scale(11),
    fontFamily: Fonts.medium,
    color: Colors.white,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 30,
  },
});
export default SuccessScreen;
