import { useAppSelector } from "@/stores/hooks";

export const useBooking = () => useAppSelector((state) => state.booking);
