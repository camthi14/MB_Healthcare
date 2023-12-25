import Container from "@/components/shared/Container";
import { ColorSchemas } from "@/constants/colors";
import { SocketEventsName } from "@/constants/socket";
import { appActions } from "@/features/app";
import { useAuth } from "@/features/auth";
import { useNotification } from "@/features/notification/notificationSelector";
import { notificationActions } from "@/features/notification/notificationSlice";
import useGoBack from "@/hooks/useGoBack";
import { NotificationType } from "@/models/notification.model";
import { socket } from "@/services/socket";
import { useAppDispatch } from "@/stores/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { FC, useCallback, useEffect } from "react";
import { Appbar } from "react-native-paper";
import ListNotifications from "./components/ListNotifications";

type Props = {};

const NotificationsScreen: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { onGoBack } = useGoBack();
  const { userId } = useAuth();
  const { data } = useNotification();

  useEffect(() => {
    socket.on(SocketEventsName.NOTIFICATION, (response: NotificationType) => {
      dispatch(notificationActions.getNotificationSuccess([...data, response]));
    });
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;

      dispatch(appActions.setLoading(true));
      dispatch(notificationActions.getNotificationStart(userId));
    }, [userId])
  );

  return (
    <Container style={{ backgroundColor: ColorSchemas.greyLighter }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title="Thông báo" />
        {/* <Appbar.Action
          icon={() => (
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={24}
              color={ColorSchemas.black}
            />
          )}
        /> */}
      </Appbar.Header>

      <ListNotifications />
    </Container>
  );
};

export default NotificationsScreen;
