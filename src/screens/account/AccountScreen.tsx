import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "@/components/global/HeaderComp";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";
import { Edit_Option } from "@/constants/SvgIcons";

import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { Colors } from "@/constants/Colors";
import { ThemeButton } from "@/components/ThemeButton";

import EmailChangeModal from "@/components/UserProfile/EmailChangeModel";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorageService } from "@/services/AsyncStorageService";
const AccountScreen = () => {
  const genderOptions = ["Male", "Female"];

  const [showEmailModel, setShowEmailModel] = useState(false);

  const [selectedGender, setSelectedGender] = useState("Male");

  const [isEditMode, setIsEditMode] = useState(false);
  const navigation = useNavigation<any>();

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

  const handleSignup = async (values: FormikValues) => {
    console.log("Signup values:", values);
  };
  const handleLogOut = async () => {
    const storage = new AsyncStorageService();
    storage.removeAuthData();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" as never }],
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <HeaderComp
        title="Account"
        isEdit={!isEditMode}
        isEditPress={() => setIsEditMode(true)}
        showDots={false}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />
<ScrollView>
      <View style={styles.container}>
        <View
          style={{
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

          <View style={styles.editOption}>
            {" "}
            <Edit_Option />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Formik
            validationSchema={signupValidationSchema}
            initialValues={{
              username: "John Smith",
              email: "j@gmail.com",
              dateOfBirth: "22/10/1998",
              Country: "India",
            }}
            onSubmit={handleSignup}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <Text style={styles.text}>Username</Text>
                {isEditMode ? (
                  <TextInput
                    placeholder=""
                    style={styles.input}
                    placeholderTextColor={Colors.whitePure}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    keyboardType="default"
                  />
                ) : (
                  <Text style={styles.staticText}>
                    {values.username || "N/A"}
                  </Text>
                )}

                <Text style={styles.text}>Email</Text>
                <View style={{ position: "relative" }}>
                  {isEditMode ? (
                    <>
                      <TextInput
                        placeholder=""
                        style={styles.input}
                        placeholderTextColor={Colors.whitePure}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        keyboardType="email-address"
                      />
                      <TouchableOpacity
                        // onPress={() => setShowEmailModel(true)}
                        onPress={() => {
                          console.log("Pressed Change");
                          setShowEmailModel(true);
                        }}
                        style={{
                          position: "absolute",
                          right: 10,
                          top: "50%",
                          transform: [{ translateY: -25 }],
                          zIndex: 1,
                          padding: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Fonts.medium,
                            color: Colors.primary,
                            fontSize: 14,
                          }}
                        >
                          Change
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <Text style={styles.staticText}>
                      {values.email || "N/A"}{" "}
                    </Text>
                  )}
                </View>

                <Text style={styles.text}>Date of Birth</Text>
                {isEditMode ? (
                  <TextInput
                    placeholder=""
                    style={styles.input}
                    placeholderTextColor={Colors.whitePure}
                    onChangeText={handleChange("dateOfBirth")}
                    onBlur={handleBlur("dateOfBirth")}
                    value={values.dateOfBirth}
                    keyboardType="default"
                  />
                ) : (
                  <Text style={styles.staticText}>
                    {values.dateOfBirth || "N/A"}
                  </Text>
                )}

                <Text style={styles.text}>Country</Text>
                {isEditMode ? (
                  <TextInput
                    placeholder=""
                    style={styles.input}
                    placeholderTextColor={Colors.whitePure}
                    onChangeText={handleChange("Country")}
                    onBlur={handleBlur("Country")}
                    value={values.Country}
                    keyboardType="default"
                  />
                ) : (
                  <Text style={styles.staticText}>
                    {values.Country || "N/A"}
                  </Text>
                )}

                <Text style={styles.text}>Gender</Text>
                <View style={styles.timeOptionsContainer}>
                  {genderOptions.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={styles.timeOption}
                      onPress={() => setSelectedGender(time)}
                    >
                      <View
                        style={[
                          styles.radioButton,
                          selectedGender === time
                            ? styles.radioButtonSelected
                            : {},
                        ]}
                      >
                        {selectedGender === time && (
                          <View style={styles.radioButtonInner} />
                        )}
                      </View>
                      <Text style={styles.timeOptionText}>{time}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {isEditMode && (
                  <>
                    <ThemeButton
                      title="Save Changes"
                      onPress={handleSubmit}
                      style={styles.buttonChange}
                      textStyle={styles.buttonTextChange}
                    />
                  </>
                )}

                {!isEditMode && (
                  <ThemeButton
                    title="Log Out"
                    onPress={handleLogOut}
                    style={styles.button}
                    textStyle={styles.buttonText}
                  />
                )}
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
            <View style={styles.content}>
              <EmailChangeModal
                email="robertxxx@gmail.com"
                onButtonPress={() => {
                  // logic to open email app
                }}
                onSkipPress={() => navigation.navigate("ChangeMail")}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(10),
    flex: 1,
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: -18,
    marginBottom: 5,
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
    marginTop: moderateScale(140),
  },

  staticText: {
    color: Colors.whitePure,
    fontSize: moderateScale(14),
    fontFamily: Fonts.regular,
    backgroundColor: Colors.white20,
    padding: 13,
    borderRadius: 8,
    marginBottom: 24,
  },

  button: {
    borderColor: Colors.error,
    borderWidth: 1,
    padding: 13,
    borderRadius: 12,
    marginTop: 33,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.error,
    fontSize: moderateScale(16),
    fontFamily: Fonts.medium,
  },

  buttonChange: {
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 13,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  buttonTextChange: {
    color: Colors.primary,
    fontSize: moderateScale(16),
    fontFamily: Fonts.medium,
  },
  text: {
    color: Colors.whitePure,
    paddingBottom: 10,
    fontFamily: Fonts.medium,
    fontSize: moderateScale(14),
  },
  input: {
    height: 50,
    color: Colors.whitePure,
    backgroundColor: Colors.white200,
    borderWidth: 1,
    borderRadius: 8,
    padding: 13,
    fontSize: moderateScale(14),
    fontFamily: Fonts.regular,
    marginBottom: 24,
  },
  editOption: {
    position: "absolute",
    bottom: 0,
    right: moderateScale(112),
    backgroundColor: Colors.raisinBlack,
    padding: moderateScale(8),
    borderRadius: moderateScale(20),
    elevation: 5,
  },
  inputContainer: {
    paddingTop: moderateScale(17),
  },
  timeOptionsContainer: {
    marginBottom: 24,
    flexDirection: "row",
    gap: 12,
  },
  timeOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.darkGrey100,
    // backgroundColor: Colors.grey100,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: Colors.red200,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  timeOptionText: {
    color: Colors.whitePure,
    marginLeft: 12,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
  },
});
export default AccountScreen;
