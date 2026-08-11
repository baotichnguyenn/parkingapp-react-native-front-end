import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "@/components/global/HeaderComp";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "@/constants/Fonts";

import { Formik } from "formik";

import { Colors } from "@/constants/Colors";
import { ThemeButton } from "@/components/ThemeButton";

const AddNewCard = () => {
  const handleAddCard = async () => {
    console.log("card added ");
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      <HeaderComp
        title="Add New Card"
        showDots={false}
        isQrScreen={false}
        backgroundColor={Colors.black}
      />

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Formik
            initialValues={{
              cardNumber: "831316103214231",
              cardHolderName: "Robert Fox",
              expired: "11/25",
              cvvCode: "7538",
            }}
            onSubmit={handleAddCard}
          >
            {({
              handleChange,
              handleBlur,

              values,
            }) => (
              <>
                <Text style={styles.text}>Card Number</Text>

                <TextInput
                  placeholder=""
                  style={styles.input}
                  placeholderTextColor={Colors.whitePure}
                  onChangeText={handleChange("cardNumber")}
                  onBlur={handleBlur("cardNumber")}
                  value={values.cardNumber}
                  keyboardType="default"
                />

                <Text style={styles.text}>Card Holder Name</Text>

                <TextInput
                  placeholder=""
                  style={styles.input}
                  placeholderTextColor={Colors.whitePure}
                  onChangeText={handleChange("cardHolderName")}
                  onBlur={handleBlur("cardHolderName")}
                  value={values.cardHolderName}
                  keyboardType="default"
                />

                <Text style={styles.text}>Expired</Text>

                <TextInput
                  placeholder=""
                  style={styles.input}
                  placeholderTextColor={Colors.whitePure}
                  onChangeText={handleChange("expired")}
                  onBlur={handleBlur("expired")}
                  value={values.expired}
                  keyboardType="default"
                />

                <Text style={styles.text}>CVV Code</Text>
                <TextInput
                  placeholder=""
                  style={styles.input}
                  placeholderTextColor={Colors.whitePure}
                  onChangeText={handleChange("cvvCode")}
                  onBlur={handleBlur("cvvCode")}
                  value={values.cvvCode}
                  keyboardType="default"
                />
              </>
            )}
          </Formik>
        </View>
      </View>

      <ThemeButton
        title="Add Card"
        onPress={handleAddCard}
        style={styles.buttonChange}
        textStyle={styles.buttonTextChange}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(10),
  },

  buttonChange: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    padding: 13,
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 24,
    bottom: 36,
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  buttonTextChange: {
    color: Colors.black100,
    fontSize: moderateScale(16),
    fontFamily: Fonts.medium,
  },
  text: {
    color: Colors.whitePure,
    paddingBottom: 8,
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

  inputContainer: {
    paddingTop: moderateScale(17),
  },
});
export default AddNewCard;
