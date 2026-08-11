import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";
import { Arrow_Left, Dots, Qr_left_Icon } from "@/constants/SvgIcons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
type HeaderProps = {
  title: string;
  isQrScreen?: boolean;

  onPressDots?: () => void;
  showDots?: boolean;
  backgroundColor?: string;
  isBack?: boolean;
  isEdit?: boolean;
  isEditPress?: () => void;
};
const HeaderComp: React.FC<HeaderProps> = ({
  title,
  isQrScreen = false,
  isBack = true,

  onPressDots = () => {},
  showDots = true,
  isEdit = false,
  isEditPress = () => {},
  backgroundColor = Colors.black,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={[styles.headerContainer, { backgroundColor }]}>
      {isBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={isQrScreen ? styles.QrbackButton : styles.backButton}
        >
          {isQrScreen ? (
            <Qr_left_Icon />
          ) : (
            <Arrow_Left fill={Colors.whitePure} />
          )}
        </TouchableOpacity>
      ) : null}
      <View style={styles.titleContainer}>
        <Text style={styles.centerText} numberOfLines={1} adjustsFontSizeToFit>
          {title}
        </Text>
      </View>
      {isEdit ? (
        <TouchableOpacity onPress={isEditPress}>
          <Text
            style={{
              color: Colors.primary,
              fontFamily: Fonts.medium,
              fontSize: moderateScale(14),
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      ) : null}
      {showDots ? (
        <TouchableOpacity onPress={onPressDots} style={styles.dotsButton}>
          <Dots />
        </TouchableOpacity>
      ) : (
        <View style={styles.dotsButton} /> // maintain layout space
      )}
    </View>
  );
};

export default HeaderComp;

const styles = StyleSheet.create({
  headerContainer: {
    height: moderateScale(80),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(16),
  },
  backButton: {
    padding: 6,
  },
  QrbackButton: {
    padding: moderateScale(14),
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",

    marginHorizontal: 10,
  },
  centerText: {
    fontFamily: Fonts.medium,
    fontSize: moderateScale(20),
    color: "white",
    textAlign: "center",

    flexShrink: 1,
  },
  dotsButton: {
    padding: 16,
  },
});
