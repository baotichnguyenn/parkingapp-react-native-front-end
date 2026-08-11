import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import moment from "moment-timezone"; // Ensures timezone handling
import { Colors } from "@/constants/Colors";

import { StyleSheet } from "react-native";
import { CloseIcon } from "@/constants/SvgIcons";
import { Fonts } from "@/constants/Fonts";
import { scale } from "react-native-size-matters";
import RNBooking from "../RNBooking";
import { getCheckinCheckoutDifference } from "../helper";

const defaultColors = {
  dateTimeBoxBackground: Colors.dateTimeBoxBackground,
  backgroundColor: Colors.backgroundColor,
  availableSlotColor: Colors.availableSlotColor,
  selectedSlotColor: Colors.selectedSlotColor,
  todayColor: Colors.todayColor,
  bookedSlotColor: Colors.bookedSlotColor,
  gapColor: Colors.gapColor,
  notAvailableSlotColor: Colors.tintColorDark,
  doneButtonColor: "#4CAF50",
};
interface BookingData {
  slots: string[];
  bookedSlots: { date: string; slots: string[] }[];
  availableSlots: { date: string; slots: string[] }[];
}

interface OperatingHours {
  opens_at: string;
  closes_at: string;
}

interface SlotBookingProps {
  operatingHours: OperatingHours;
  unavailableSlots: string[];
  date: string;
  visible: boolean;
  onClose: () => void;
  onConfirm: (slotsData: any) => void;
}
type SelectedSlot = {
  date: string; // timestamp as string
  day: number;
  slot: string;
};

const SlotBooking = ({
  operatingHours,
  unavailableSlots,
  date,
  visible,
  onClose,
  onConfirm,
}: SlotBookingProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  // const [selectedDate, setSelectedDate] = useState(date);
  const selectedDate = date;
  const generateTimeSlots = () => {
    const slots = [];
    const start = moment().startOf("day");
    const end = moment().endOf("day");

    while (start.isBefore(end)) {
      slots.push(start.format("hh:mm A"));
      start.add(30, "minutes");
    }
    return slots;
  };

  const prepareBookingData = () => {
    const allSlots = generateTimeSlots();

    const opensAtLocal = moment.utc(operatingHours.opens_at).local();
    const closesAtLocal = moment.utc(operatingHours.closes_at).local();

    const operatingSlots = allSlots.filter((slot) => {
      const slotMoment = moment(slot, "hh:mm A");
      return (
        slotMoment.isSameOrAfter(opensAtLocal, "minute") &&
        slotMoment.isSameOrBefore(closesAtLocal, "minute")
      );
    });

    const localUnavailable = unavailableSlots.map((utcTime) =>
      moment.utc(utcTime).local().format("hh:mm A")
    );

    const available = operatingSlots.filter(
      (slot) => !localUnavailable.includes(slot)
    );

    const targetDate = moment.utc(date).startOf("day").valueOf();
    // const booked = operatingSlots.filter((slot) =>
    //   localUnavailable.includes(slot)
    // );
    setBookingData({
      slots: allSlots,
      availableSlots: [
        {
          date: String(targetDate),
          slots: available,
        },
      ],
      bookedSlots: [
        {
          date: String(targetDate),
          slots: [],
        },
      ],
    });
    console.log({
      slots: allSlots,
      availableSlots: [
        {
          date: targetDate,
          slots: allSlots,
        },
      ],
      bookedSlots: [],
    });
  };

  const sendBookingToServer = async (slot: string) => {
    // const utcDateTime = moment(`${selectedDate} ${slot}`, "YYYY-MM-DD hh:mm A")
    //   .local()
    //   .utc()
    //   .toISOString();

    // TODO: Make API call here to book
    // await api.post('/book', { datetime: utcDateTime });

    // Update local UI
    setSelectedSlot(slot);
    console.log(selectedSlot);
    setBookingData((prev) => {
      if (!prev) return prev;
      const updatedBooked = [...(prev.bookedSlots[0]?.slots || []), slot];
      const updatedAvailable =
        prev.availableSlots[0]?.slots.filter((s) => s !== slot) || [];
      return {
        slots: prev.slots,
        availableSlots: [
          {
            date: prev.availableSlots[0].date,
            slots: updatedAvailable,
          },
        ],
        bookedSlots: [
          {
            date: String(moment.utc(selectedDate).startOf("day").valueOf()),
            slots: updatedBooked,
          },
        ],
      };
    });
    console.log(bookingData);
  };
  useEffect(() => {
    console.log(bookingData);
  }, [bookingData]);

  const handleSlotPress = (slot: string) => {
    sendBookingToServer(slot);
  };

  useEffect(() => {
    prepareBookingData();
  }, [operatingHours, unavailableSlots, selectedDate]);

  if (!bookingData) return null;

  const handleDone = (slots: SelectedSlot[]) => {
    console.log("Final selected slots:", slots);

    // Format the selected slots for easier use
    const formattedSlots = slots.map((slot) => ({
      date: new Date(parseInt(slot.date)).toDateString(),
      day: slot.day,
      slot: slot.slot,
      timestamp: slot.date,
    }));
    const slotsData = getCheckinCheckoutDifference(formattedSlots);
    console.log(slotsData);
    onClose();
    onConfirm(slotsData);
  };
  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        {/* Header Container */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <CloseIcon />
          </TouchableOpacity>
          <Text style={styles.filterText}>Select Slots</Text>
        </View>

        <RNBooking
          hideSlotInfoFooter={false}
          scrollToCurrentDate={false}
          bookingData={bookingData}
          colors={defaultColors}
          onDone={handleDone}
          onDayPress={(date) => {
            console.log(date);

            handleSlotPress(date);
          }}
          // onDateChange={handleDateChange}
          onDateChange={(props) => {
            console.log(props);
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    backgroundColor: Colors.black600,
    paddingVertical: 10,
    paddingLeft: 15,
  },
  closeButton: {
    backgroundColor: Colors.black,
    padding: 12,
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    fontSize: scale(20),
    textAlign: "center",
    position: "absolute",
    alignSelf: "center",
  },
});
export default SlotBooking;
