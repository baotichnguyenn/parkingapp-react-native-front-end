import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Icon } from "@/constants/SvgIcons";

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
import { scale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";
import HeaderComp from "@/components/global/HeaderComp";
import { SafeAreaView } from "react-native-safe-area-context";
import { AsyncStorageService } from "@/services/AsyncStorageService";
import { ChangePassword } from "@/services/UsersApi.services";
import { useToast } from "@/services/ToastContext";
import { ThemeButton } from "@/components/ThemeButton";

const CreateNewPassScreen = () => {
  const navigation = useNavigation<any>();

  const { showToast } = useToast();

  const [isXHRLoading, setIsXHRLoading] = useState(false);

  const loginValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, ({ min }) => `Must be at least ${min} characters.`)
      .required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Both password must match.")
      .required("Confirm password is required"),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = async (values: FormikValues) => {
    setIsXHRLoading(true);

    try {
      const storage = new AsyncStorageService();
      const authData = await storage.getAuthData();
      const userId = authData?.id;
      const data = await ChangePassword(userId, values.password);

      console.log("password change data", data);
      if (data?.data?.message) {
        showToast(data.data.message, "success");
        navigation.navigate("ResetPassSuccess");
      } else {
        showToast("password change successfully!", "success");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to change password. Please try again!";
      showToast(errorMessage, "error");
    } finally {
      setIsXHRLoading(false);
    }
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
          <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
            Create New Password{" "}
          </Text>

          <View>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                marginTop: 16,
                marginBottom: 20,
                textAlign: "center",
                lineHeight: 26,

                fontFamily: Fonts.regular,
              }}
            >
              Your new password must be different from {`\n`}previous used
              password
            </Text>
          </View>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ password: "", confirmpassword: "" }}
            onSubmit={handlePasswordChange}
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
                <View style={styles.inputWrapper}>
                  <TextInput
                    // name="password"
                    placeholder="Your Password"
                    placeholderTextColor={Colors.grey100}
                    style={styles.input}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon />
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <View style={styles.inputWrapper}>
                  <TextInput
                    // name="confirmpassword"
                    placeholder="Your Confirm Password"
                    placeholderTextColor={Colors.grey100}
                    style={styles.input}
                    onChangeText={handleChange("confirmpassword")}
                    onBlur={handleBlur("confirmpassword")}
                    value={values.confirmpassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    <Icon />
                  </TouchableOpacity>
                </View>
                {errors.confirmpassword && touched.confirmpassword && (
                  <Text style={styles.errorTextConfirm}>
                    {errors.confirmpassword}
                  </Text>
                )}

                <ThemeButton
                  isLoading={isXHRLoading}
                  disabled={isXHRLoading}
                  title="Reset Password"
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

  title: {
    color: Colors.whitePure,
    fontSize: 28,

    textAlign: "center",
    fontFamily: Fonts.bold,
    // marginBottom: 36,
  },

  input: {
    height: 50,
    paddingRight: 40,
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
    fontSize: 14,
    color: "white",
    marginTop: -18,
    marginBottom: 19,
    fontFamily: Fonts.regular,
    paddingLeft: 2,
  },

  errorTextConfirm: {
    fontSize: 14,
    color: "white",
    marginTop: -18,
    marginBottom: 35,
    fontFamily: Fonts.regular,
    paddingLeft: 2,
  },

  // button: {
  //   backgroundColor: Colors.primary,
  //   padding: 13,
  //   borderRadius: 12,
  //   alignItems: 'center',
  // },
  // buttonText: {
  //   color: Colors.black100,
  //   fontSize: 16,
  //   fontFamily: Fonts.bold,
  // },
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
    bottom: 55,
    justifyContent: "center",
  },
  inputWrapper: {
    position: "relative",
  },

  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 18,
  },
});

export default CreateNewPassScreen;
