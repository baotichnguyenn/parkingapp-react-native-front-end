import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import HeaderComp from "@/components/global/HeaderComp";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";
import {
  About_Icon,
  AccountLogo,
  Help_Icon,
  Lock_Icon,
  Notification_Profile,
  Policy_Icon,
  RightPrimary,
  Wallet_Profile,
} from "@/constants/SvgIcons";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";

const data = [
  { id: "1", logo: AccountLogo, title: "Account", route: "Account" },
  {
    id: "2",
    logo: Wallet_Profile,
    title: "Payment Method",
    route: "MyPayment",
  },
  { id: "3", logo: Lock_Icon, title: "Security", route: "Security" },
  {
    id: "4",
    logo: Notification_Profile,
    title: "Notification",
    route: "Notification",
  },
  {
    id: "5",
    logo: Policy_Icon,
    title: "Legal and Policies",
    route: "LegalAndPolicies",
  },
  {
    id: "6",
    logo: Help_Icon,
    title: "Help & Support",
    route: "HelpAndSupport",
  },
  { id: "7", logo: About_Icon, title: "About Us", route: "AccountScreen" },
];

const UserProfileSetting = () => {
  const navigation = useNavigation() as any;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <HeaderComp
        title="Profile Settings"
        isBack={false}
        showDots={false}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />

      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              right: moderateScale(6),
              gap: 15,
              alignItems: "center",
              marginBottom: moderateScale(26),
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("@/assets/pngs/ProfileImage.png")}
              style={styles.image}
            />
            <Text style={styles.imageText}>RobortFox</Text>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const LogoComponent = item.logo;

              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate(item.route)}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: moderateScale(12),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: moderateScale(12),
                    }}
                  >
                    <View
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 14,
                        backgroundColor: Colors.grey200,
                        borderRadius: 100,
                      }}
                    >
                      <LogoComponent width={20} height={20} />
                    </View>

                    <Text
                      style={{
                        color: Colors.tintColorDark,
                        fontSize: moderateScale(15),
                        fontFamily: Fonts.medium,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>

                  <RightPrimary />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(24),
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  imageText: {
    color: "white",
    fontSize: moderateScale(16),
    fontFamily: Fonts.medium,
  },
});
export default UserProfileSetting;
