import { ColorSchemas } from "@/constants/colors";
import { checkNotificationType, isBooking } from "@/constants/notification";
import { appActions } from "@/features/app";
import { notificationActions } from "@/features/notification/notificationSlice";
import { NotificationType } from "@/models/notification.model";
import { navigate } from "@/services/navigation";
import { useAppDispatch } from "@/stores/hooks";
import { fToNow } from "@/utils/formatTime";
import { AntDesign } from "@expo/vector-icons";
import { isNumber } from "lodash";
import React, { FC, useCallback, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useStyles from "./NotificationItemStyles";

export type NotificationItemProps = {
  row: NotificationType;
};

const NotificationItem: FC<NotificationItemProps> = ({ row }) => {
  const dispatch = useAppDispatch();

  const styles = useStyles(isNumber(row?.is_read) ? Boolean(row?.is_read === 1) : row?.is_read);

  const handleUpdateIsRead = useCallback(() => {
    if (!row.id) return;

    if (!row.is_read) {
      dispatch(appActions.setLoading(true));
      dispatch(notificationActions.updateIsReadStart(`${row.id}`));
    }

    console.log(row);

    if (isBooking(row.entity_name)) {
      navigate("DetailsExamination", { bookingId: row.entity_id });
    }
  }, [row]);

  const Icon = useMemo(() => {
    const type = checkNotificationType(row.notification_type || "");

    if (type === "success") {
      return <AntDesign name="checkcircle" size={24} color={ColorSchemas.green} />;
    }

    return <AntDesign name="unknowfile1" size={24} color="black" />;
  }, [row.notification_type]);

  return (
    <TouchableOpacity
      onPress={handleUpdateIsRead}
      activeOpacity={0.65}
      style={styles.wrapperCardItem}
    >
      <View>{Icon}</View>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{row.title}</Text>
        <Text style={styles.content}>{row.body}</Text>
        <Text style={styles.content}>{fToNow(row.created_at || "")}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;
