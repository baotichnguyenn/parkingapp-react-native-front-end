// components/IntroScreen.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

type Step = {
  id: number;
  title: string;
  description: string;
};

type IntroScreenProps = {
  steps: Step[];
  onStart: () => void;
};

const IntroScreen: React.FC<IntroScreenProps> = ({ steps, onStart }) => (
  <View style={{ flex: 1, padding: 20, backgroundColor: Colors.black }}>
    <Text style={styles.mainHeading}>Getting ready with SPOTLY</Text>

    <ScrollView
      style={styles.stepsContainer}
      showsVerticalScrollIndicator={false}
    >
      {steps.map((step) => (
        <View key={step.id} style={styles.stepCard}>
          <Text style={styles.stepTitle}>
            <Text style={{ fontSize: 14 }}>{step.id}.</Text> {step.title}
          </Text>
          <Text
            style={[
              styles.stepDescription,
              steps.length === step.id && { paddingRight: moderateScale(40) },
            ]}
          >
            {step.description}
          </Text>
        </View>
      ))}
    </ScrollView>

    <TouchableOpacity style={styles.getStartedButton} onPress={onStart}>
      <Text style={styles.getStartedText}>Get Started</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.plusjakartaSansBold,
    color: "white",
    marginBottom: moderateScale(2),
  },
  stepsContainer: {
    flex: 1,
    marginTop: moderateScale(54),
    paddingHorizontal: moderateScale(5),
  },
  stepCard: {
    backgroundColor: Colors.black600,
    borderRadius: 12,
    padding: moderateScale(8),
    paddingHorizontal: moderateScale(14),
    marginBottom: moderateScale(46),
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: "white",
    marginBottom: moderateScale(10),
  },
  stepDescription: {
    fontSize: moderateScale(11),
    color: Colors.grey100,
    lineHeight: moderateScale(16),
    fontFamily: Fonts.regular,
    paddingHorizontal: moderateScale(11),
    paddingRight: moderateScale(99),
  },
  getStartedButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScale(20),
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
});

export default IntroScreen;
