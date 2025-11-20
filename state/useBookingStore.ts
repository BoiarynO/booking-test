import { create } from "zustand";

export type BookingState = {
  selectedDateId: number | null;
  selectedTime: number | null;
  setSelectedDate: (id: number | null) => void;
  setSelectedTime: (time: number | null) => void;
  reset: () => void;
};

const useBookingStore = create<BookingState>((set) => ({
  selectedDateId: null,
  selectedTime: null,
  setSelectedDate: (id) => set(() => ({ selectedDateId: id })),
  setSelectedTime: (time) => set(() => ({ selectedTime: time })),
  reset: () => set(() => ({ selectedDateId: null, selectedTime: null })),
}));

export default useBookingStore;
