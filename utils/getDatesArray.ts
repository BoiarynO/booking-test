import { addDays, format } from "date-fns";

export type DateItem = {
  month: string;
  weekDay: string;
  day: string;
  timestamp: number;
};

export const getDatesArray = (datesCount: number = 42): DateItem[] => {
  const today = new Date();
  const endDate = addDays(today, datesCount);
  const dates: Date[] = [];
  let current = today;

  while (current <= endDate) {
    dates.push(current);
    current = addDays(current, 1);
  }
  return dates.map((date) => ({
    month: format(date, "MMM"),
    weekDay: format(date, "EEE"),
    day: format(date, "d"),
    timestamp: date.getTime(),
  }));
};
