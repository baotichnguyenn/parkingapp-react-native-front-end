import React, { useState } from "react";
import { Colors } from "@/constants/Colors";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { moderateScale, scale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";

import { ThemeButton } from "@/components/ThemeButton";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { useToast } from "@/services/ToastContext";
import HeaderComp from "@/components/global/HeaderComp";
import { SafeAreaView } from "react-native-safe-area-context";

import EmailChangeModal from "@/components/UserProfile/EmailChangeModel";

const ChangeMailScreen = () => {
  const { showToast } = useToast();
  const [showEmailModel, setShowEmailModel] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // const [isXHRLoading, setIsXHRLoading] = useState(false);
  const isXHRLoading = false;
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  const handleSubmit = async (values: FormikValues) => {
    setShowEmailModel(true);
    // showToast('E-mail changed successfully', 'success');
    // navigation.navigate('Account')
    console.log(values);
  };
  const handleSkipp = async () => {
    // setShowEmailModel(true);
    showToast("E-mail changed successfully", "success");
    navigation.navigate("Account");
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
            Insert New Email{" "}
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
                paddingVertical: 5,
                fontFamily: Fonts.regular,
              }}
            >
              Please insert your new email address
            </Text>
          </View>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
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
                  name="email"
                  placeholder="New Email Address"
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
                  title="Change My Email"
                  onPress={handleSubmit}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              </>
            )}
          </Formik>
        </View>
      </View>

      <Modal
        transparent
        visible={showEmailModel}
        animationType="fade"
        onRequestClose={() => setShowEmailModel(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowEmailModel(false)}>
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.backdrop}
              activeOpacity={1}
              onPressOut={() => setShowEmailModel(false)}
            />

            <View style={styles.content}>
              <EmailChangeModal
                email=""
                onButtonPress={() => {
                  // logic to open email app
                }}
                description="We already send email verification your new email address"
                onSkipPress={handleSkipp}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 24,
    paddingHorizontal: 24,

    paddingTop: scale(48),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.fakebgBlur, // Semi-transparent background for fake blur
    justifyContent: "center",

    alignItems: "center",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  content: {
    paddingTop: 24,
    gap: moderateScale(12),
    // width:'auto'
    marginTop: moderateScale(160),
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
    marginTop: 12,
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

export default ChangeMailScreen;
