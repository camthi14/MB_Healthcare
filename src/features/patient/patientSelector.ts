import { useAppSelector } from "@/stores/hooks";

export const usePatient = () => useAppSelector((state) => state.patient);
