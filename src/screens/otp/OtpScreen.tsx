import React, { useState } from "react";
import { Colors } from "@/constants/Colors";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Fonts } from "@/constants/Fonts";
import { OtpInput } from "react-native-otp-entry";
import { scale } from "react-native-size-matters";
import { VerifyEmailOtp } from "@/services/UsersApi.services";

import { ThemeButton } from "@/components/ThemeButton";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { useToast } from "@/services/ToastContext";
import HeaderComp from "@/components/global/HeaderComp";
import { SafeAreaView } from "react-native-safe-area-context";

type OtpScreenRouteProp = RouteProp<RootStackParamList, "Otp">;

const OtpScreen = () => {
  const { showToast } = useToast();
  const navigation = useNavigation<any>();
  const route = useRoute<OtpScreenRouteProp>();
  // const [isXHRLoading, setIsXHRLoading] = useState(false);
  const isXHRLoading = false;
  const email = route.params?.email ?? "dummy@example.com";
  const isOwner = route.params?.isOwner ?? false;
  const [otp, setOtp] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOTPChange = (value: string) => {
    setOtp(value);
  };

  const handleOtpSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log(isSubmitting);

      const response = await VerifyEmailOtp({ email, otp });
      console.log("OTP verified:", response.data);
      console.log("OTP verified:", response.data);

      if (response?.data?.message) {
        showToast(response.data.message, "success");
      } else {
        showToast("Otp verified successfully!", "success");

        // navigation.navigate('CheckMail'); // or wherever you want to go after success
      }
      {
        !isOwner
          ? navigation.navigate("Tabs")
          : navigation.navigate("PilotProfile");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "OTP verification failed. Please try again.";
      showToast(errorMessage, error);
      console.log("OTP verification error:", error);
    }

    setIsSubmitting(false);
  };

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
          {/* <Image source={require('./assets/logo.png')} style={styles.logo} /> */}
          <Text style={styles.title}>Enter OTP Code</Text>

          <View>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                marginTop: 16,
                marginBottom: 10,
                textAlign: "center",
                lineHeight: 26,
                paddingVertical: 16,
                fontFamily: Fonts.regular,
              }}
            >
              We have just sent you 6 digit code via your email{" "}
              <Text style={{ fontFamily: Fonts.bold }}>{email}</Text>
            </Text>
          </View>

          <View style={styles.wrapper}>
            <OtpInput
              numberOfDigits={6}
              onTextChange={handleOTPChange}
              focusColor="white"
              type="numeric"
              blurOnFilled={true}
              theme={{
                containerStyle: styles.containerOne,
                pinCodeContainerStyle: styles.pinCodeBox,
                focusedPinCodeContainerStyle: styles.focusedBox,
                pinCodeTextStyle: styles.textStyle,
              }}
            />
          </View>

          {/* <TouchableOpacity
          style={styles.button}
            onPress={handleOtpSubmit}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity> */}

          <ThemeButton
            isLoading={isXHRLoading}
            disabled={isXHRLoading}
            title="Continue"
            onPress={handleOtpSubmit}
            //  onPress={()=>{}}
            style={styles.button}
            textStyle={styles.buttonText}
          />
          <View style={styles.boottomText}>
            <Text
              style={{ color: Colors.whitePure, fontFamily: Fonts.regular }}
            >
              Didn’t receive code?{" "}
            </Text>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}> Resend Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,

    paddingTop: scale(48),
  },

  title: {
    color: Colors.whitePure,
    fontSize: 28,
    fontFamily: Fonts.bold,
    textAlign: "center",
    // marginBottom: 36,
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
    marginTop: 32,
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
    fontFamily: Fonts.regular,
  },
  wrapper: {
    marginTop: 0,
    width: "95%",
    // paddingHorizontal: 50,
    alignSelf: "center",
    gap: 1,
  },
  containerOne: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pinCodeBox: {
    width: 50,
    height: 56,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: Colors.white200,
    justifyContent: "center",
    alignItems: "center",
  },
  focusedBox: {
    borderColor: "black",
  },
  textStyle: {
    fontSize: 28,
    fontFamily: Fonts.bold,

    color: "white",
    textAlign: "center",
  },
});

export default OtpScreen;
