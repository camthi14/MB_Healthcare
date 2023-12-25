import { useAppSelector } from "@/stores/hooks";

export const useSpecialty = () => useAppSelector((state) => state.specialty);
