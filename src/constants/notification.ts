export const NotificationTypes = {
  BOOKING_SUCCESS: "BOOKING_SUCCESS",
  BOOKING_CANCEL: "BOOKING_CANCEL",
  DOCTOR_CANCEL: "DOCTOR_CANCEL",
};

export const checkNotificationType = (type: string) => {
  if (type?.toLowerCase()?.match(/success/)) {
    return "success";
  }

  return "unknown";
};

export const isBooking = (type: string) => {
  if (type?.toLowerCase()?.match(/bookings/)) {
    return true;
  }

  return false;
};
