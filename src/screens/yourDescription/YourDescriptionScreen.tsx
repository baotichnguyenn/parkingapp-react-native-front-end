import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Fonts } from "@/constants/Fonts";
import { moderateScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

const YourDescriptionScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create your description</Text>

        <Text
          style={{
            paddingLeft: moderateScale(10),
            color: Colors.grey100,
            fontFamily: Fonts.regular,
            fontSize: moderateScale(11),
          }}
        >
          Share what makes your spot ideal :)
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={() => {}}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginBottom: 16,
  },
  headerTitle: {
    color: Colors.tintColorDark,
    fontSize: 20,
    fontFamily: Fonts.medium,
    paddingLeft: moderateScale(10),
    marginBottom: moderateScale(10),

    lineHeight: 25,
  },

  bottomContainer: {
    padding: 16,
    marginTop: "auto",

    top: 1,
    paddingHorizontal: moderateScale(27),
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "600",
  },
});
export default YourDescriptionScreen;
