import { useAppSelector } from "@/stores/hooks";

export const useExaminationCard = () => useAppSelector((state) => state.examinationCard);
