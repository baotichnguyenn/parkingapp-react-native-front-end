import React from "react";
import { Colors } from "@/constants/Colors";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Fonts } from "@/constants/Fonts";
import { EmailIcon } from "../../constants/SvgIcons";
import { scale } from "react-native-size-matters";
import HeaderComp from "@/components/global/HeaderComp";
import { SafeAreaView } from "react-native-safe-area-context";

const CheckMailScreen = () => {
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
          <EmailIcon style={styles.logo} />
          {/* <Image source={require('./assets/logo.png')} style={styles.logo} /> */}
          <Text style={styles.title}>Check Your Mail</Text>

          <View>
            <Text style={styles.infoText}>
              We have sent a password recover instructions {`\n`}
              to your emaill
            </Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Open Email App</Text>
          </TouchableOpacity>
          <View style={styles.boottomText}>
            <TouchableOpacity onPress={() => navigation.navigate("CreatePass")}>
              <Text style={styles.forgotPassword}>
                {" "}
                Skip, i&#39;ll confirm later
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.boottomTextlast}>
        <Text style={{ color: Colors.whitePure, fontFamily: Fonts.regular }}>
          Did not receive the email? Check your spam filter or{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.forgotPassword}> try another email address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,

    paddingTop: scale(79),
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 59,
  },
  title: {
    color: Colors.whitePure,
    fontSize: 28,
    fontFamily: Fonts.bold,
    textAlign: "center",
  },

  infoText: {
    color: Colors.whitePure,
    fontSize: 14,
    marginTop: 16,
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 16,
    fontFamily: Fonts.regular,
  },

  forgotPassword: {
    color: Colors.primary,
    textAlign: "right",
    fontFamily: Fonts.regular,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 13,
    borderRadius: 12,
    marginTop: 18,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.black100,
    fontSize: 16,
    fontFamily: Fonts.bold,
  },

  boottomText: {
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    bottom: -50,
    justifyContent: "center",
  },

  boottomTextlast: {
    flexDirection: "row", // or 'column'
    flexWrap: "wrap",
    position: "absolute",
    width: "100%",
    bottom: 46,

    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default CheckMailScreen;
