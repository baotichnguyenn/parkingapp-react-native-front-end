import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";

type ToastType = "success" | "error" | "info";

const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.toastTitle}
      text2Style={styles.toastMessage}
      renderLeadingIcon={() => (
        <Ionicons
          name="checkmark-circle"
          size={20}
          color={Colors.vineGreen}
          style={styles.iconLeft}
        />
      )}
      renderTrailingIcon={() => (
        <Ionicons
          name="close"
          size={20}
          color={Colors.grey100}
          style={styles.iconRight}
          onPress={() => Toast.hide()}
        />
      )}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.toastTitle}
      text2Style={[styles.toastMessage, { color: "red" }]}
      renderLeadingIcon={() => (
        <Ionicons
          name="alert-circle"
          size={20}
          color={Colors.redOrange}
          style={styles.iconLeft}
        />
      )}
      renderTrailingIcon={() => (
        <Ionicons
          name="close"
          size={20}
          color={Colors.grey100}
          style={styles.iconRight}
          onPress={() => Toast.hide()}
        />
      )}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={styles.infoToast}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.toastTitle}
      text2Style={[styles.toastMessage, { color: "blue" }]}
      renderLeadingIcon={() => (
        <Ionicons
          name="information-circle"
          size={20}
          color={Colors.skyBlue}
          style={styles.iconLeft}
        />
      )}
      renderTrailingIcon={() => (
        <Ionicons
          name="close"
          size={20}
          color={Colors.grey100}
          style={styles.iconRight}
          onPress={() => Toast.hide()}
        />
      )}
    />
  ),
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <Toast config={toastConfig} position="top" topOffset={50} />
    </>
  );
};

export const useToast = () => {
  const showToast = (message: string, type: ToastType = "success") => {
    Toast.show({
      text2: message,
      type: type,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 50,
      position: "top",
    });
  };

  return { showToast };
};

const styles = StyleSheet.create({
  successToast: {
    backgroundColor: Colors.darkLiver,
    fontFamily: Fonts.regular,
    padding: 2,
    width: moderateScale(330),
    borderLeftWidth: 0,
    marginHorizontal: moderateScale(21),

    borderRadius: 4,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  errorToast: {
    backgroundColor: Colors.darkLiver,
    fontFamily: Fonts.regular,
    right: 8,
    borderLeftWidth: 0,
    marginHorizontal: moderateScale(21),
    borderRadius: 4,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  infoToast: {
    backgroundColor: Colors.darkLiver,
    fontFamily: Fonts.regular,
    right: 8,
    borderLeftWidth: 0,
    marginHorizontal: moderateScale(21),
    borderRadius: 4,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  toastContent: {
    paddingHorizontal: 10,
    flex: 1,
  },
  toastTitle: {
    fontSize: 15,

    fontWeight: "600",
    color: "white",
  },
  toastMessage: {
    fontSize: 14,

    right: 9,
    color: Colors.green10,
    fontFamily: Fonts.regular,
  },
  iconLeft: {
    marginLeft: 10,
    alignSelf: "center",
  },
  iconRight: {
    marginRight: 10,
    alignSelf: "center",
    padding: 5,
  },
});
