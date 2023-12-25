import { useAuth } from "@/features/auth";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import usePushNotifications from "@/hooks/usePushNotification";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { socket } from "@/services/socket";
import { useAppDispatch } from "@/stores/hooks";
import { pushNotificationsActions } from "@/features/pushNotification/pushNotificationSlice";

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { accessToken, userId } = useAuth();
  const { expoPushToken } = usePushNotifications();

  useFocusEffect(
    useCallback(() => {
      if (!expoPushToken) return;
      socket.connect();

      socket.auth = {
        userId,
      };

      dispatch(pushNotificationsActions.setExpoPushToken(expoPushToken.data));

      return () => {
        socket.off("connect_error");
      };
    }, [expoPushToken, userId])
  );

  return accessToken ? <MainStack /> : <AuthStack />;
};

export default Navigation;
