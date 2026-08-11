import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { WINDOW } from "@/utils/Scale";
import { FlatList } from "react-native";
import { Fonts } from "@/constants/Fonts";

type Suggestion = {
  description: string;
  [key: string]: any;
};

type SuggestionsProps = {
  suggestions: Suggestion[];
  onPress: (item: Suggestion) => void;
  style?: object;
};

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  onPress,
  style,
}) => {
  return (
    <View
      style={[
        {
          marginTop: "6%",
          borderRadius: 5,
          backgroundColor: Colors.black600,
          position: "absolute",
          width: "100%",
          maxHeight: WINDOW.height * 0.8,
          alignSelf: "center",
          zIndex: 1,
          top: 70,
        },
        style,
      ]}
    >
      <FlatList
        data={suggestions}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            style={{
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: Colors.whiteText,
                fontFamily: Fonts.semiBold,
              }}
            >
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Suggestions;
