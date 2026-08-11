import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import {
  TickSquare,
  TickSquareActive,
  GoogleIcon,
  FbIcon,
} from "@/constants/SvgIcons";
import { ThemePassword } from "../../components/ThemePassword";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { ThemeButton } from "@/components/ThemeButton";
import { loginOwnerAuth, loginUserAuth } from "@/services/UsersApi.services";
import { Fonts } from "@/constants/Fonts";
import { useToast } from "@/services/ToastContext";

import { AsyncStorageService } from "@/services/AsyncStorageService";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useToast } from '@/services/ToastContext';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { moderateScale } from "react-native-size-matters";

const LoginScreen = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_AUTH_WEB_CLIENT_ID, // from Firebase project settings
      offlineAccess: false,
      iosClientId: process.env.GOOGLE_AUTH_IOS_CLIENT_ID,
    });
  }, []);
  const { showToast } = useToast();
  const navigation = useNavigation();
  const [isOwner, setIsOwner] = React.useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isXHRLoading, setIsXHRLoading] = useState(false);
  const storage = new AsyncStorageService();
  const toggleCheckbox = () => setIsChecked(!isChecked);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("Google User Info:", userInfo);

      showToast("Google sign-in successful!", "success");

      // navigation.navigate('Tabs'); // customize as needed
    } catch (error) {
      console.log("Google Sign-In Error:", error);
      showToast("Google sign-in failed. Please try again.", "error");
    }
  };

  const handleLogin = async (values: FormikValues) => {
    setIsXHRLoading(true);
    try {
      const data = await loginUserAuth({
        email: values.email,
        password: values.password,
      });

      console.log("User created:", data);

      if (data?.data?.message) {
        storage.setAuthData(data?.data?.user);
        showToast(data.data.message, "success");
      } else {
        showToast("Login successful!", "success");
      }

      navigation.navigate("Tabs");
    } catch (error: any) {
      console.log("error", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";

      showToast(errorMessage, "error");
    }

    setIsXHRLoading(false);
  };
  const handleLoginForOwner = async (values: FormikValues) => {
    setIsXHRLoading(true);
    try {
      const data = await loginOwnerAuth({
        email: values.email,
        password: values.password,
      });

      console.log("User created:", data);

      if (data?.data?.message) {
        storage.setOwnerAuthData(data?.data?.owner);
        showToast(data.data.message, "success");
      } else {
        showToast("Login successful!", "success");
      }

      navigation.navigate("PilotProfile");
    } catch (error: any) {
      console.log("error", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";

      showToast(errorMessage, "error");
    }

    setIsXHRLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.black} />
        {/* <Image source={require('./assets/logo.png')} style={styles.logo} /> */}
        {isOwner ? (
          <Text style={styles.title}>Sign in As Owner</Text>
        ) : (
          <Text style={styles.title}>Sign in to Your Account</Text>
        )}
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={isOwner ? handleLoginForOwner : handleLogin}
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
                autoCapitalize="none"
                placeholderTextColor={Colors.grey100}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <ThemePassword
                name="password"
                placeholder="Your Password"
                onChangeText={handleChange}
                onBlur={handleBlur}
                values={values}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <View style={styles.midView}>
                <Pressable
                  onPress={toggleCheckbox}
                  style={styles.rememberMeView}
                >
                  <View style={[styles.checkbox, isChecked && styles.checked]}>
                    {isChecked ? <TickSquareActive /> : <TickSquare />}
                    {/* {isChecked && <Text style={styles.checkmark}>✓</Text>} */}
                  </View>
                  <Text style={styles.label}>Remember Me</Text>
                </Pressable>
                <TouchableOpacity
                  style={styles.forgotPasswordBtn}
                  onPress={() => navigation.navigate("ResetPassword")}
                >
                  <Text style={styles.forgotPassword}>Forgot Password</Text>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Sign in</Text>
                        </TouchableOpacity> */}
              <ThemeButton
                isLoading={isXHRLoading}
                disabled={isXHRLoading}
                title="Sign in"
                onPress={handleSubmit}
                style={styles.button}
                textStyle={styles.buttonText}
              />

              <View style={styles.orSignInWith}>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    color: Colors.grey100,
                    fontFamily: Fonts.medium,
                  }}
                >
                  or Sign in with{" "}
                </Text>
              </View>

              <View style={styles.SocialIconsView}>
                <TouchableOpacity
                  style={styles.SocialIcon}
                  onPress={handleGoogleSignIn}
                >
                  <GoogleIcon />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.SocialIcon}
                  onPress={() => console.log("Facebook Sign In")}
                >
                  <FbIcon />
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <View style={styles.boottomText}>
          <Text
            style={{
              color: Colors.whitePure,
              fontFamily: Fonts.medium,
              fontSize: 14,
            }}
          >
            Don’t have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.forgotPassword}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        {!isOwner ? (
          <View style={styles.lastboottomText}>
            <Text
              style={{
                color: Colors.whitePure,
                fontFamily: Fonts.medium,
                fontSize: 14,
              }}
            >
              Or
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsOwner(true);
              }}
            >
              <Text style={styles.forgotPassword}> Sign In as an Owner</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.black,
    justifyContent: "center",
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
    marginBottom: 36,
    textAlign: "center",
    fontFamily: Fonts.bold,
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
    color: Colors.error,
    marginTop: -18,
    marginBottom: 5,
  },
  forgotPassword: {
    color: Colors.primary,
    textAlign: "right",
    fontFamily: Fonts.medium,
    fontSize: 14,
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

  forgotPasswordBtn: {
    alignItems: "center",
  },
  rememberMeView: {
    flexDirection: "row",
    alignItems: "center",
  },
  midView: {
    alignItems: "center",
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkbox: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  checked: {
    backgroundColor: Colors.grey20,
  },
  checkmark: {
    color: Colors.tintColorDark,
    fontWeight: "bold",
  },
  label: {
    color: Colors.whitePure,
    fontSize: 16,
  },

  orSignInWith: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  SocialIconsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingHorizontal: 108,
  },
  SocialIcon: {
    width: moderateScale(64),
    height: moderateScale(64),
    padding: 16,
    marginRight: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: Colors.white200,
  },
  boottomText: {
    flexDirection: "row",

    position: "absolute",
    width: "100%",
    bottom: 56,
    justifyContent: "center",
    alignSelf: "center",
  },
  lastboottomText: {
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    bottom: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default LoginScreen;
