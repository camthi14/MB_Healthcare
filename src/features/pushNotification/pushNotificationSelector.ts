import { useAppSelector } from "@/stores/hooks";

export const useSelectorPushNotifications = () =>
  useAppSelector((state) => state.pushNotifications);
