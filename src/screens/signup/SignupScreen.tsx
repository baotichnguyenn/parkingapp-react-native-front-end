import React from "react";
import { Colors } from "@/constants/Colors";
import { GoogleIcon, FbIcon } from "@/constants/SvgIcons";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { ThemePassword } from "@/components/ThemePassword";
import {
  createNewOwner,
  createNewUser,
  SendEmailOtp,
} from "@/services/UsersApi.services";
import { ThemeButton } from "@/components/ThemeButton";
import { Fonts } from "@/constants/Fonts";
import { useToast } from "@/services/ToastContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const SignupScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { showToast } = useToast();
  const [isXHRLoading, setIsXHRLoading] = React.useState(false);
  const [isOwner, setIsOwner] = React.useState(false);
  const handleSignup = async (values: FormikValues) => {
    console.log("Signup values:", values);
    setIsXHRLoading(true);

    try {
      const data = await SendEmailOtp({ email: values.email });

      if (data?.status === 200 || data?.data?.success) {
        showToast(data.data.message || "OTP sent successful!", "success");

        await createNewUser({
          email: values.email,
          password: values.password,
          name: "",
          mobileNumber: values.mobileNumber,
        });

        navigation.navigate("Otp", { email: values.email, isOwner: false });
      } else {
        throw new Error(data?.data?.message || "Registration failed");
      }
    } catch (error: any) {
      console.log("error", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";

      showToast(errorMessage, "error");
    }

    setIsXHRLoading(false);
  };

  const handleSignupForOwner = async (values: FormikValues) => {
    console.log("Signup values:", values);
    setIsXHRLoading(true);

    try {
      const data = await SendEmailOtp({ email: values.email });

      if (data?.status === 200 || data?.data?.success) {
        showToast(data.data.message || "Registration successful!", "success");

        await createNewOwner({
          email: values.email,
          password: values.password,
          name: "",
          mobileNumber: values.mobileNumber,
        });

        navigation.navigate("Otp", { email: values.email, isOwner: true });
      } else {
        throw new Error(data?.data?.message || "Registration failed");
      }
    } catch (error: any) {
      console.log("error", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";

      showToast(errorMessage, "error");
    }

    setIsXHRLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.black} />

        {isOwner ? (
          <Text style={styles.title}>Sign Up for Owner</Text>
        ) : (
          <Text style={styles.title}>Sign Up for Free</Text>
        )}
        <Formik
          validationSchema={signupValidationSchema}
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            mobileNumber: "",
          }}
          onSubmit={isOwner ? handleSignupForOwner : handleSignup}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
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
              <TextInput
                placeholder="Your Mobile Number"
                style={styles.input}
                placeholderTextColor={Colors.grey100}
                onChangeText={handleChange("mobileNumber")}
                onBlur={handleBlur("mobileNumber")}
                value={values.mobileNumber}
                maxLength={10}
                keyboardType="phone-pad"
              />
              {errors.mobileNumber && touched.mobileNumber && (
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
              <ThemePassword
                name="confirmPassword"
                placeholder="Confirm Your Password"
                onChangeText={handleChange}
                onBlur={handleBlur}
                values={values}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <ThemeButton
                isLoading={isXHRLoading}
                disabled={!isValid}
                title="Sign Up"
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
                  onPress={() => console.log("Google Sign In")}
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

        <View style={[styles.boottomText]}>
          <Text
            style={{
              color: Colors.whitePure,
              fontFamily: Fonts.medium,
              fontSize: 14,
            }}
          >
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.forgotPassword}> Sign In</Text>
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
              <Text style={styles.forgotPassword}> Sign Up as an Owner</Text>
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
    color: "red",
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
    // vertical: 10,
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
    width: 64,
    height: 64,
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
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignupScreen;
