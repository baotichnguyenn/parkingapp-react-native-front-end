import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { moderateScale } from "react-native-size-matters";
import Feather from "react-native-vector-icons/Feather";

const CalendarComp = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Date</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markingType={"custom"}
        markedDates={
          selectedDate
            ? {
                [selectedDate]: {
                  customStyles: {
                    container: {
                      backgroundColor: Colors.primary,
                      borderRadius: 8,
                    },
                    text: {
                      color: "black",
                    },
                  },
                },
              }
            : {}
        }
        theme={{
          backgroundColor: Colors.grey100,
          calendarBackground: Colors.black600,
          textSectionTitleColor: Colors.tintColorDark,
          selectedDayBackgroundColor: Colors.primary,

          selectedDayTextColor: "black",
          todayTextColor: Colors.primary,
          dayTextColor: Colors.tintColorDark,
          textDisabledColor: Colors.green200,
          arrowColor: Colors.tintColorDark,
          monthTextColor: Colors.tintColorDark,
          textDayFontFamily: Fonts.medium,
          textMonthFontFamily: Fonts.medium,
          textDayHeaderFontFamily: Fonts.medium,
        }}
        renderArrow={(direction) => (
          <View style={styles.arrowButton}>
            <Feather
              name={direction === "left" ? "chevron-left" : "chevron-right"}
              size={25}
              color={Colors.tintColorDark}
            />
          </View>
        )}
        style={styles.calendar}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button]}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.applyBtn]}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CalendarComp;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.black600,
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",

    marginHorizontal: 26,
  },
  arrowButton: {
    backgroundColor: Colors.darkgrey,
    padding: 4,
    borderWidth: 1,

    borderColor: "white",

    borderRadius: 90,
    marginHorizontal: -10,
  },
  arrowText: {
    color: Colors.tintColorDark,
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
  title: {
    color: Colors.tintColorDark,
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    textAlign: "center",
    marginBottom: 10,
  },
  calendar: {
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 16,
    paddingBottom: moderateScale(22),
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  cancelBtnText: {
    color: Colors.error,
  },
  applyBtn: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.black100,
    fontFamily: Fonts.medium,

    fontSize: 16,
  },
});
