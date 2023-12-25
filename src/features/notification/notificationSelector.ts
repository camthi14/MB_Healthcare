import { useAppSelector } from "@/stores/hooks";

export const useNotification = () => useAppSelector((state) => state.notification);
