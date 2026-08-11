import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { moderateScale } from "react-native-size-matters";

type DropdownProps<T> = {
  options: T[];
  keyExtractor?: (item: T, index: number) => string;
  labelExtractor?: (item: T) => string;
  onSelect: (item: T) => void;
  defaultValue?: T;
  placeholder?: string;
  containerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  renderItem?: (
    item: T,
    onPress: (e: GestureResponderEvent) => void
  ) => React.ReactNode;
};

function Dropdown<T>({
  options,
  keyExtractor = (_, i) => i.toString(),
  labelExtractor = (item) => item?.toString?.() ?? "",
  onSelect,
  defaultValue,
  placeholder = "Select an option",
  containerStyle,
  dropdownStyle,
  itemTextStyle,
  renderItem,
}: DropdownProps<T>) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<T | undefined>(defaultValue);

  const toggleDropdown = () => setVisible(!visible);

  const handleSelect = (item: T) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderDefaultItem = ({ item }: { item: T }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
      <Text style={[styles.itemText, itemTextStyle]}>
        {labelExtractor(item)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown}>
        <View style={[styles.buttonContainer, containerStyle]}>
          <Text style={styles.selectedText}>
            {selected ? labelExtractor(selected) : placeholder}
          </Text>
          <Feather
            name={visible ? "chevron-up" : "chevron-down"}
            size={18}
            color={Colors.whitePure}
            style={{ paddingTop: 2 }}
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleDropdown}
        >
          <View style={[styles.dropdown, dropdownStyle]}>
            <FlatList
              data={options}
              renderItem={
                renderItem
                  ? ({ item }) => renderItem(item, () => handleSelect(item))
                  : renderDefaultItem
              }
              keyExtractor={keyExtractor}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonContainer: {
    backgroundColor: Colors.grey100,
    borderRadius: 16,
    padding: 3,
    paddingHorizontal: moderateScale(9),
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
  },
  selectedText: {
    color: "white",
    fontFamily: Fonts.regular,
    fontSize: moderateScale(11),
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    width: Dimensions.get("window").width * 0.8,
    maxHeight: 300,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    color: Colors.grey100,
    fontFamily: Fonts.regular,
  },
});

export default Dropdown;
