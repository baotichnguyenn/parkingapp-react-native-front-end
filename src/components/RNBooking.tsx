import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
} from "react-native";
import { getDayOfWeek, getMonthName } from "./helper";
import { Colors } from "@/constants/Colors";

const SLOT_SIZE = 50;
const GAP = 1;

const defaultColors = {
  dateTimeBoxBackground: "#e8eaf6",
  backgroundColor: "#2196f3",
  availableSlotColor: "#90caf9",
  selectedSlotColor: "#0d47a1",
  todayColor: "#0d47a1",
  bookedSlotColor: "#4A4A4A",
  gapColor: "#eeeeee",
  notAvailableSlotColor: Colors.tintColorDark,
  doneButtonColor: "#4CAF50",
};

interface BookingData {
  slots: string[];
  bookedSlots: { date: string; slots: string[] }[];
  availableSlots: { date: string; slots: string[] }[];
}

interface SelectedSlot {
  date: string;
  day: number;
  slot: string;
}

interface RNBookingProps {
  onDateChange?: (date: Date) => void;
  onSlotSelection?: (selectedSlots: SelectedSlot[]) => void;
  onDone?: (selectedSlots: SelectedSlot[]) => void;
  bookingData: BookingData;
  colors?: typeof defaultColors;
  slotSize?: number;
  scrollToCurrentDate?: boolean;
  hideSlotInfoFooter?: boolean;
  multiSelect?: boolean;
  showDoneButton?: boolean;
}

const RNBooking: React.FC<RNBookingProps> = ({
  onDateChange,
  onSlotSelection,
  onDone,
  bookingData,
  colors = defaultColors,
  slotSize = SLOT_SIZE,
  scrollToCurrentDate = true,
  hideSlotInfoFooter = false,
  multiSelect = true,
  showDoneButton = true,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const flatListRef = useRef<FlatList>(null);

  const mergedColors = { ...defaultColors, ...colors };

  const getDaysInMonth = useCallback((month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  const slotBoxSize = useMemo(
    () => ({ height: slotSize, width: slotSize }),
    [slotSize]
  );

  const generateCalendar = useCallback(
    (month: number, year: number) => {
      const daysInMonth = getDaysInMonth(month, year);
      const days = [];
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }
      return days;
    },
    [getDaysInMonth]
  );

  const currentMonthName = useMemo(() => {
    return getMonthName(currentMonth);
  }, [currentMonth]);

  const allSlots = useMemo(
    () => [currentMonthName, ...bookingData.slots],
    [currentMonthName, bookingData.slots]
  );

  const calendar = useMemo(
    () => generateCalendar(currentMonth, currentYear),
    [currentMonth, currentYear, generateCalendar]
  );

  const handleMonthChange = useCallback(
    (direction: number) => {
      const newDate = new Date(selectedDate);
      newDate.setMonth(newDate.getMonth() + direction);
      setSelectedDate(newDate);
      onDateChange?.(newDate);
    },
    [selectedDate, onDateChange]
  );

  const getDay = useMemo(
    () => (day: number) => {
      return getDayOfWeek(currentMonth, day, currentYear);
    },
    [currentMonth, currentYear]
  );

  const formatDateKey = useCallback(
    (day: number) => {
      const date = new Date(currentYear, currentMonth, day);
      return date.getTime().toString();
    },
    [currentMonth, currentYear]
  );

  const handleSlotPress = useCallback(
    (day: number, slot: string) => {
      const dateKey = formatDateKey(day);
      const newSelection: SelectedSlot = {
        date: dateKey,
        day,
        slot,
      };

      setSelectedSlots((prev) => {
        let updated;
        const existingIndex = prev.findIndex(
          (s) => s.date === dateKey && s.slot === slot
        );

        if (existingIndex >= 0) {
          // Remove if already selected
          updated = prev.filter((_, index) => index !== existingIndex);
        } else {
          if (multiSelect) {
            // Add to selection
            updated = [...prev, newSelection];
          } else {
            // Replace selection
            updated = [newSelection];
          }
        }

        onSlotSelection?.(updated);
        return updated;
      });
    },
    [formatDateKey, multiSelect, onSlotSelection]
  );

  const checkIfToday = useMemo(
    () => (day: number) => {
      const calendarDate = new Date(currentYear, currentMonth, day);
      const todayDate = new Date();
      return (
        todayDate.setHours(0, 0, 0, 0) === calendarDate.setHours(0, 0, 0, 0)
      );
    },
    [currentMonth, currentYear]
  );

  const getDayWiseBookingInfo = useMemo(
    () => (day: number) => {
      const targetDate = new Date(currentYear, currentMonth, day);

      const dayWiseAvailableSlots =
        bookingData?.availableSlots?.find((item) => {
          // Handle both string and number timestamps
          const itemDate =
            typeof item.date === "string" ? parseInt(item.date, 10) : item.date;
          const bookingDate = new Date(itemDate);

          return (
            bookingDate.getDate() === targetDate.getDate() &&
            bookingDate.getMonth() === targetDate.getMonth() &&
            bookingDate.getFullYear() === targetDate.getFullYear()
          );
        })?.slots ?? [];

      const dayWiseBookedSlots =
        bookingData?.bookedSlots?.find((item) => {
          const itemDate =
            typeof item.date === "string" ? parseInt(item.date, 10) : item.date;
          const bookingDate = new Date(itemDate);

          return (
            bookingDate.getDate() === targetDate.getDate() &&
            bookingDate.getMonth() === targetDate.getMonth() &&
            bookingDate.getFullYear() === targetDate.getFullYear()
          );
        })?.slots ?? [];

      return {
        availableSlots: dayWiseAvailableSlots,
        bookedSlots: dayWiseBookedSlots,
      };
    },
    [
      bookingData?.availableSlots,
      bookingData?.bookedSlots,
      currentMonth,
      currentYear,
    ]
  );

  const isSlotSelected = useCallback(
    (day: number, slot: string) => {
      const dateKey = formatDateKey(day);
      return selectedSlots.some((s) => s.date === dateKey && s.slot === slot);
    },
    [selectedSlots, formatDateKey]
  );

  const scrollToToday = useCallback(() => {
    if (flatListRef?.current) {
      const today = new Date();
      if (
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear()
      ) {
        setTimeout(() => {
          flatListRef?.current?.scrollToItem({
            item: today.getDate(),
            animated: true,
          });
        }, 300);
      }
    }
  }, [currentMonth, currentYear]);

  const handleDone = useCallback(() => {
    onDone?.(selectedSlots);
  }, [selectedSlots, onDone]);

  const clearSelections = useCallback(() => {
    setSelectedSlots([]);
    onSlotSelection?.([]);
  }, [onSlotSelection]);

  useEffect(() => {
    if (scrollToCurrentDate) {
      scrollToToday();
    }
  }, [scrollToToday, scrollToCurrentDate]);

  const renderItem = useCallback(
    ({ item }: { item: number }) => {
      const isToday = checkIfToday(item);
      const { availableSlots, bookedSlots } = getDayWiseBookingInfo(item);

      return (
        <View style={[styles.dayContainer, slotBoxSize]}>
          <View
            style={{
              height: slotSize,
              width: slotSize,
              backgroundColor: mergedColors.gapColor,
            }}
          >
            <View
              style={[
                styles.slotDayBox,
                {
                  backgroundColor: isToday
                    ? mergedColors.todayColor
                    : mergedColors.dateTimeBoxBackground,
                },
              ]}
            >
              <Text style={isToday ? styles.today : styles.day}>
                {getDay(item)}
              </Text>
              <Text style={isToday ? styles.today : styles.day}>
                {item.toString()}
              </Text>
            </View>
          </View>
          {allSlots.map((time, idx) => {
            if (idx === 0) {
              return null;
            }

            const isSelected = isSlotSelected(item, time);
            const isSlotAvailable = availableSlots?.includes(time);
            const isBooked = bookedSlots?.includes(time);

            if (isBooked) {
              return (
                <View
                  key={`booked_${item}_${time}`}
                  style={{
                    height: slotSize,
                    width: slotSize,
                    backgroundColor: mergedColors.gapColor,
                  }}
                >
                  <View
                    style={[
                      styles.slotBox,
                      slotBoxSize,
                      { backgroundColor: mergedColors.bookedSlotColor },
                    ]}
                  />
                </View>
              );
            }

            if (!isSlotAvailable) {
              return (
                <View
                  key={`not_available_${item}_${time}`}
                  style={{
                    height: slotSize,
                    width: slotSize,
                    backgroundColor: mergedColors.gapColor,
                  }}
                >
                  <View
                    style={[
                      styles.slotBox,
                      slotBoxSize,
                      { backgroundColor: mergedColors.notAvailableSlotColor },
                    ]}
                  />
                </View>
              );
            }

            return (
              <TouchableOpacity
                onPress={() => handleSlotPress(item, time)}
                key={`available_${item}_${time}`}
                style={{
                  height: slotSize,
                  width: slotSize,
                  backgroundColor: mergedColors.gapColor,
                }}
              >
                <View
                  style={[
                    styles.availableSlot,
                    {
                      backgroundColor: isSelected
                        ? mergedColors.selectedSlotColor
                        : mergedColors.availableSlotColor,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    },
    [
      allSlots,
      checkIfToday,
      mergedColors,
      getDay,
      getDayWiseBookingInfo,
      handleSlotPress,
      isSlotSelected,
      slotBoxSize,
      slotSize,
    ]
  );

  const renderFooter = useCallback(() => {
    if (hideSlotInfoFooter) {
      return null;
    }
    return (
      <>
        <View style={styles.slotInfoContainer}>
          <View style={styles.slotInfoTile}>
            <Text style={styles.label}>Not Available</Text>
            <View
              style={[
                {
                  backgroundColor: mergedColors.notAvailableSlotColor,
                },
                styles.slotInfoBox,
              ]}
            />
          </View>
          <View style={styles.slotInfoTile}>
            <Text style={styles.label}>Booked</Text>
            <View
              style={[
                {
                  backgroundColor: mergedColors.bookedSlotColor,
                },
                styles.slotInfoBox,
              ]}
            />
          </View>
          <View style={styles.slotInfoTile}>
            <Text style={styles.label}>Available</Text>
            <View
              style={[
                {
                  backgroundColor: mergedColors.availableSlotColor,
                },
                styles.slotInfoBox,
              ]}
            />
          </View>
          <View style={styles.slotInfoTile}>
            <Text style={styles.label}>Selected</Text>
            <View
              style={[
                {
                  backgroundColor: mergedColors.selectedSlotColor,
                },
                styles.slotInfoBox,
              ]}
            />
          </View>
        </View>

        {showDoneButton && (
          <View style={styles.actionButtonsContainer}>
            <Text style={styles.selectionCount}>
              {selectedSlots.length} slot{selectedSlots.length !== 1 ? "s" : ""}{" "}
              selected
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={clearSelections}
                style={[styles.actionButton, styles.clearButton]}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDone}
                style={[
                  styles.actionButton,
                  styles.doneButton,
                  { backgroundColor: mergedColors.doneButtonColor },
                ]}
                disabled={selectedSlots.length === 0}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  }, [
    hideSlotInfoFooter,
    mergedColors,
    showDoneButton,
    selectedSlots.length,
    handleDone,
    clearSelections,
  ]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: mergedColors.backgroundColor },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleMonthChange(-1)}>
          <Text style={styles.label}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.label}>
          {`${selectedDate.toLocaleString("default", {
            month: "long",
          })}, ${currentYear}`}
        </Text>
        <TouchableOpacity onPress={() => handleMonthChange(1)}>
          <Text style={styles.label}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollableContent}>
          <View
            style={[
              styles.timeSlotCol,
              { backgroundColor: mergedColors.backgroundColor },
            ]}
          >
            <View style={{ width: slotSize }}>
              {allSlots.map((time, index) => (
                <View key={time} style={[styles.row, slotBoxSize]}>
                  <View
                    style={[
                      slotBoxSize,
                      { backgroundColor: mergedColors.gapColor },
                    ]}
                  >
                    <View
                      style={[
                        styles.timeSlotBox,
                        { backgroundColor: mergedColors.dateTimeBoxBackground },
                      ]}
                    >
                      <Text
                        style={
                          index === 0 ? styles.labelBold : styles.timeLabel
                        }
                      >
                        {time}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <FlatList
              data={calendar}
              ref={flatListRef}
              horizontal
              renderItem={renderItem}
              keyExtractor={(item) => item.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
        <View
          style={[
            styles.stickyFooter,
            { backgroundColor: mergedColors.backgroundColor },
          ]}
        >
          {renderFooter()}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 18,
  },
  contentContainer: {
    flex: 1,
  },
  scrollableContent: {
    flex: 1,
  },
  stickyFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  today: {
    fontSize: 12,
    color: "white",
    fontWeight: "500",
  },
  day: {
    color: "#6D6D6D",
    fontSize: 9,
  },
  labelBold: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6A6A6A",
  },
  timeLabel: {
    fontSize: 9,
    color: "#6A6A6A",
  },
  slotDayBox: {
    flex: 1,
    margin: GAP,
    justifyContent: "center",
    alignItems: "center",
  },
  timeSlotBox: {
    margin: GAP,
    flex: 1,
    backgroundColor: "#e8eaf6",
    justifyContent: "center",
    alignItems: "center",
  },
  timeSlotCol: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 200, // Add padding to prevent content from being hidden behind sticky footer
  },
  dayContainer: {
    alignItems: "center",
  },
  row: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  slotBox: {
    margin: GAP,
  },
  availableSlot: {
    flex: 1,
    margin: GAP,
  },
  slotInfoContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
  },
  slotInfoTile: {
    flexDirection: "row-reverse",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  slotInfoBox: {
    height: 20,
    width: 20,
  },
  actionButtonsContainer: {
    alignItems: "center",
  },
  selectionCount: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  doneButton: {
    minWidth: 80,
  },
  clearButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
  },
  doneButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RNBooking;
