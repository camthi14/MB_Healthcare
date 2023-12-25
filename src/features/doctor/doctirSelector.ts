import { useAppSelector } from "@/stores/hooks";

export const useDoctor = () => useAppSelector((state) => state.doctor);
