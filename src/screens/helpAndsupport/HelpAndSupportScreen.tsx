import HeaderComp from "@/components/global/HeaderComp";
import Search from "@/components/Search";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Minus_Icon } from "@/constants/SvgIcons";

import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to Settings > Account > Reset Password and follow the instructions.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact support via email at support@example.com or call us at +1 (234) 567-890.",
  },
  {
    question: "Where can I find the app’s privacy policy?",
    answer:
      "Our privacy policy is available in the Legal & Policy section accessible from the main menu.",
  },
  {
    question: "Can I use the app offline?",
    answer:
      "Some features work offline, but for full functionality, an internet connection is required.",
  },
];

const HelpSupportScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  //   const isExpanded = expandedIndex !== null;

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <HeaderComp
        title="Help & Support"
        showDots={false}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />

      <Search searchQuery="" setSearchQuery={() => {}} />

      <ScrollView contentContainerStyle={styles.container}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity
              onPress={() => toggleExpand(index)}
              style={styles.questionContainer}
            >
              <Text
                style={[
                  styles.question,
                  expandedIndex === index && styles.questionExpanded,
                ]}
              >
                {faq.question}
              </Text>
              <Text
                style={[
                  styles.toggleSymbol,
                  expandedIndex === index && styles.questionExpanded,
                ]}
              >
                {expandedIndex === index ? <Minus_Icon /> : "+"}
              </Text>
            </TouchableOpacity>

            {expandedIndex === index && (
              <View style={styles.ansBg}>
                {" "}
                <Text style={styles.answer}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 10,

    flexGrow: 1,
  },

  scrollIndicator: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  questionExpanded: {
    color: Colors.primary,
  },
  faqItem: {
    marginBottom: 15,

    paddingBottom: 10,
    fontSize: moderateScale(14),
    color: Colors.grey100,
    fontFamily: Fonts.medium,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.medium,
    color: "white",
    flex: 1,
  },
  toggleSymbol: {
    fontSize: moderateScale(18),

    color: "white",
    paddingHorizontal: 10,
  },
  answer: {
    marginTop: 2,
    fontSize: 16,
    color: Colors.darkGrey300,

    lineHeight: 24,
    fontFamily: Fonts.medium,
  },
  ansBg: {
    backgroundColor: Colors.black100,
    // padding:9,
    paddingVertical: 8,

    marginTop: 12,
    paddingLeft: 12,
    paddingRight: 14,
  },
});

export default HelpSupportScreen;
