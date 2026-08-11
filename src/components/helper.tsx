export const getDayOfWeek = (month: number, day: number, year: number) => {
  const date = new Date(year, month, day); // JavaScript months are 0-based
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[date.getDay()];
};

const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getMonthName = (month: number) => {
  return shortMonthNames[month] || "Invalid month";
};

export const getHoursAndMinutes = (
  time12h: string
): { hours: number; minutes: number } => {
  const [time, modifier] = time12h.split(" ");

  let hours = Number(time?.split(":")[0]);
  const minutes = Number(time?.split(":")[1]);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return {
    hours: hours,
    minutes: minutes,
  };
};

export const convertTo24HourFormat = (time12h: string) => {
  const [time, modifier] = time12h.split(" ");

  if (!time) return "00:00"; // or some other fallback value

  const [rawHours, minutes] = time.split(":").map(Number);
  let hours = rawHours;

  // let [hours, minutes] = time?.split(":").map(Number);

  if (modifier?.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  }

  if (modifier?.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  // Format hours and minutes to ensure they have two digits
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

export function getCheckinCheckoutDifference(timeSlots) {
  if (!Array.isArray(timeSlots) || timeSlots.length < 2) {
    return {
      checkinTime: timeSlots[0]?.slot,
      differenceMinutes: 30,
      totalSlots: 1,
    };
  }

  // Helper function to convert time string to minutes
  function timeToMinutes(timeStr) {
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    let totalMinutes = minutes;
    if (period === "PM" && hours !== 12) {
      totalMinutes += (hours + 12) * 60;
    } else if (period === "AM" && hours === 12) {
      totalMinutes += 0; // 12 AM is 0 hours
    } else if (period === "AM") {
      totalMinutes += hours * 60;
    } else if (period === "PM" && hours === 12) {
      totalMinutes += 12 * 60; // 12 PM is 12 hours
    }

    return totalMinutes;
  }

  // Helper function to convert minutes back to readable time
  // function minutesToTime(minutes) {
  //   const hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   const period = hours >= 12 ? "PM" : "AM";
  //   const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  //   return `${displayHours.toString().padStart(2, "0")}:${mins
  //     .toString()
  //     .padStart(2, "0")} ${period}`;
  // }

  // Sort time slots by date first, then by time
  const sortedSlots = [...timeSlots].sort((a, b) => {
    // First sort by date
    const dateA = parseInt(a.date);
    const dateB = parseInt(b.date);
    if (dateA !== dateB) {
      return dateA - dateB;
    }

    // If same date, sort by time
    const timeA = timeToMinutes(a.slot);
    const timeB = timeToMinutes(b.slot);
    return timeA - timeB;
  });

  // Get first and last time slots from sorted array
  const checkinSlot = sortedSlots[0];
  const checkoutSlot = sortedSlots[sortedSlots.length - 1];

  const checkinTime = checkinSlot.slot;
  const checkoutTime = checkoutSlot.slot;

  // Get the dates for proper calculation
  const checkinDate = new Date(parseInt(checkinSlot.date));
  const checkoutDate = new Date(parseInt(checkoutSlot.date));

  // Convert to minutes for calculation
  const checkinMinutes = timeToMinutes(checkinTime);
  const checkoutMinutes = timeToMinutes(checkoutTime);

  // Calculate difference considering different dates
  let diffMinutes;
  if (checkinSlot.date === checkoutSlot.date) {
    // Same day
    diffMinutes = checkoutMinutes - checkinMinutes;
  } else {
    // Different days - calculate total minutes across days
    const daysDiff = Math.floor(
      (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
    );
    diffMinutes = daysDiff * 24 * 60 + (checkoutMinutes - checkinMinutes);
  }

  // Handle negative difference (shouldn't happen with proper sorting, but just in case)
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }

  // Convert difference to hours and minutes
  const diffHours = Math.floor(diffMinutes / 60);
  const remainingMinutes = diffMinutes % 60;

  return {
    checkinTime: checkinTime,
    checkoutTime: checkoutTime,
    differenceMinutes: diffMinutes + 30,
    differenceFormatted: `${diffHours}h ${remainingMinutes}m`,
    totalSlots: sortedSlots.length,
    sortedSlots: sortedSlots.map((slot) => ({
      date: new Date(parseInt(slot.date)).toLocaleDateString(),
      time: slot.slot,
    })),
  };
}
