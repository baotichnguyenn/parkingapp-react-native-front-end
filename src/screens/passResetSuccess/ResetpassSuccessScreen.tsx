import React from "react";
import { Colors } from "@/constants/Colors";
import { PassResetIcon } from "@/constants/SvgIcons";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";
import HeaderComp from "@/components/global/HeaderComp";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetpassSuccessScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <HeaderComp
        title=""
        showDots={false}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />
      <View style={styles.container}>
        <View>
          <StatusBar backgroundColor={Colors.black} />
          <PassResetIcon style={styles.logo} />
          <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
            Password Reset{" "}
          </Text>

          <View>
            <Text
              style={{
                color: "white",
                fontSize: 14,

                marginBottom: 32,
                textAlign: "center",
                lineHeight: 26,
                paddingVertical: 16,
                fontFamily: Fonts.regular,
              }}
            >
              Your password gas been reset successfully
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 24,
    paddingHorizontal: 24,

    paddingTop: scale(108),
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    // marginBottom: 59,
  },
  title: {
    color: Colors.whitePure,
    fontSize: 28,
    marginTop: 50,
    textAlign: "center",
    fontFamily: Fonts.bold,
  },

  button: {
    backgroundColor: Colors.primary,
    bottom: 20,
    padding: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.black100,
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
});

export default ResetpassSuccessScreen;
