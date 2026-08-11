import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

import { SearchIcon } from "@/constants/SvgIcons";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

type SearchProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const Search = ({ searchQuery, setSearchQuery }: SearchProps) => {
  return (
    <View style={styles.inputWrapper}>
      <SearchIcon width={24} height={24} />
      <TextInput
        verticalAlign="middle"
        placeholder="Search..."
        placeholderTextColor={Colors.grey80}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.input}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 24,
    // marginTop: verticalScale(16),

    // top:-20
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    color: Colors.grey100,

    backgroundColor: Colors.white300,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginHorizontal: 24,
    // marginTop: verticalScale(16),

    // top:-20
    marginBottom: 20,
    // paddingVertical:10

    // height: 56,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.regular,
    paddingVertical: 15,
    // backgroundColor:"red"

    // paddingVertical:10
  },
});
