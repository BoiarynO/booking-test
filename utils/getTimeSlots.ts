import { format, isBefore } from "date-fns";

export type TimeSlot = {
  label: string; // "09:15 AM"
  value: string; // "2025-11-20T09:15:00.000Z"
  disabled: boolean; // true/false
  timestamp: number;
};

export const getTimeSlots = (
  date: Date,
  startHour = 9,
  endHour = 17,
  intervalMinutes = 15
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const now = new Date();

  // початок робочого дня
  const start = new Date(date);
  start.setHours(startHour, 0, 0, 0);

  // кінець робочого дня
  const end = new Date(date);
  end.setHours(endHour, 0, 0, 0);

  let current = start;

  while (current <= end) {
    const disabled = isBefore(current, now);

    slots.push({
      label: format(current, "hh:mm a"),
      value: current.toISOString(),
      disabled,
      timestamp: current.getTime(),
    });

    // додаємо інтервал
    current = new Date(current.getTime() + intervalMinutes * 60000);
  }

  return slots;
};
