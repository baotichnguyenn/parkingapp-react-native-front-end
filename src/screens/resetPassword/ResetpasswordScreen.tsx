import React from "react";
import { Colors } from "@/constants/Colors";

import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";

import { ThemeButton } from "@/components/ThemeButton";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";

import HeaderComp from "@/components/global/HeaderComp";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetpasswordScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // const [isXHRLoading, setIsXHRLoading] = useState(false);
  const isXHRLoading = false;
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

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

          <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
            Reset Password{" "}
          </Text>

          <View>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                marginTop: 16,
                marginBottom: 22,
                textAlign: "center",
                lineHeight: 26,
                paddingVertical: 16,
                fontFamily: Fonts.regular,
              }}
            >
              Enter the email associated with your account {`\n`}
              and we’ll send an email with instructions{`\n`}
              to reset your password
            </Text>
          </View>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={() => navigation.navigate("CheckMail")}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  placeholder="Your Email Address"
                  style={styles.input}
                  placeholderTextColor={Colors.grey100}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />

                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <ThemeButton
                  isLoading={isXHRLoading}
                  disabled={isXHRLoading}
                  title="Send Instruction"
                  onPress={handleSubmit}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 24,
    paddingHorizontal: 24,

    paddingTop: scale(48),
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 30,
  },
  title: {
    color: Colors.whitePure,
    fontSize: 28,

    textAlign: "center",
    fontFamily: Fonts.bold,
    // marginBottom: 36,
  },

  input: {
    height: 50,
    color: Colors.whitePure,
    backgroundColor: Colors.white200,
    borderWidth: 1,
    borderRadius: 8,
    padding: 13,
    fontSize: 14,
    marginBottom: 24,
    fontFamily: Fonts.regular,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: -18,
    marginBottom: 5,
  },
  forgotPassword: {
    color: Colors.primary,
    textAlign: "right",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 13,
    borderRadius: 12,
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
    bottom: 56,
    justifyContent: "center",
  },
});

export default ResetpasswordScreen;
