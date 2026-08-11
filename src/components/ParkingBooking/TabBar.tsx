import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { moderateScale } from "react-native-size-matters";

type TabBarProps = {
  text1: string;
  text2: string;
  onTabChange?: (selectedTab: string) => void;
  activeTab: string;
};

const TabBar: React.FC<TabBarProps> = ({
  text1,
  text2,
  onTabChange,
  activeTab,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>(activeTab);

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    onTabChange?.(tab);
  };

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[
          styles.tabBase,
          selectedTab === text1 ? styles.tabActive : styles.tabInactive,
        ]}
        onPress={() => handleTabPress(text1)}
      >
        <Text
          style={
            selectedTab === text1
              ? styles.tabTextActive
              : styles.tabTextInactive
          }
        >
          {text1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tabBase,
          selectedTab === text2 ? styles.tabActive : styles.tabInactive,
        ]}
        onPress={() => handleTabPress(text2)}
      >
        <Text
          style={
            selectedTab === text2
              ? styles.tabTextActive
              : styles.tabTextInactive
          }
        >
          {text2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    marginHorizontal: 24,
    borderRadius: 9,
    backgroundColor: Colors.black600,
  },
  tabBase: {
    flex: 1,
    paddingVertical: 12,
    margin: 3,
    alignItems: "center",
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabInactive: {
    backgroundColor: "transparent",
  },
  tabTextActive: {
    color: Colors.black100,
    fontFamily: Fonts.bold,
    fontSize: moderateScale(12),
  },
  tabTextInactive: {
    color: Colors.grey100,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(12),
  },
});

export default TabBar;
