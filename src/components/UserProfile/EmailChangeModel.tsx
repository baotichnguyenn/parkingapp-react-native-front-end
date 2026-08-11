import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Email_Verify } from "@/constants/SvgIcons";
import { verticalScale } from "react-native-size-matters";

type EmailChangeModalProps = {
  email?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
  onSkipPress?: () => void;
  skipText?: string;
  logo?: React.ReactNode;
};

const EmailChangeModal = ({
  email = "example@email.com",
  title = "Email Verification Sent",
  description = "We already sent an email verification to ",
  buttonLabel = "Open Email App",
  onButtonPress,
  onSkipPress,
  skipText = "Skip, I'll confirm later",
  logo = <Email_Verify style={styles.logo} />,
}: EmailChangeModalProps) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.black} />

        {logo}

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.infoText}>
          {description}
          {email}
        </Text>

        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </TouchableOpacity>

        <View style={styles.boottomText}>
          <TouchableOpacity
            onPress={onSkipPress || (() => navigation.goBack())}
          >
            <Text style={styles.forgotPassword}>{skipText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black100,
    padding: 47,
    justifyContent: "center",
    margin: 24,

    borderRadius: 12,
    paddingBottom: verticalScale(50),
  },
  logo: {
    width: 65,
    height: 65,
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    color: Colors.whitePure,
    fontSize: 20,
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
    // position: 'absolute',
    width: "100%",
    bottom: -20,
    justifyContent: "center",
  },
});

export default EmailChangeModal;
