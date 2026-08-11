import React from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { EyeOpen, EyeClosed } from "@/constants/SvgIcons";

interface ThemePasswordProps {
  name: string;
  placeholder: string;
  onChangeText: CallableFunction;
  onBlur: CallableFunction;
  values: any;
}

export const ThemePassword: React.FC<ThemePasswordProps> = ({
  name,
  placeholder,
  onChangeText,
  onBlur,
  values,
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={Colors.grey100}
        placeholder={placeholder || "Your Password"}
        style={styles.input}
        onChangeText={onChangeText(name)}
        onBlur={onBlur(name)}
        value={values[name]}
        secureTextEntry={!passwordVisible}
      />
      <TouchableOpacity
        onPress={() => setPasswordVisible(!passwordVisible)}
        style={styles.iconContainer}
      >
        {passwordVisible ? <EyeOpen /> : <EyeClosed />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 50,
    flex: 1,
    color: Colors.whitePure,
    backgroundColor: Colors.white300,
    borderWidth: 1,
    borderRadius: 8,
    padding: 13,
    marginBottom: 24,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
  },
});
