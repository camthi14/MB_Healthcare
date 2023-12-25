import { appActions } from "@/features/app";
import { useAuth } from "@/features/auth";
import { useNotification } from "@/features/notification/notificationSelector";
import { notificationActions } from "@/features/notification/notificationSlice";
import { NotificationType } from "@/models/notification.model";
import { useAppDispatch } from "@/stores/hooks";
import { scale } from "@/utils/scale";
import React, { FC, useCallback } from "react";
import { FlatList, RefreshControl, SectionListRenderItemInfo, View } from "react-native";
import NotificationItem from "../NotificationItem";
import Alert from "@/components/ui/Alert";

const ListNotifications: FC = () => {
  const { userId } = useAuth();
  const dispatch = useAppDispatch();
  const { data } = useNotification();

  const renderItem = useCallback(
    ({ item }: SectionListRenderItemInfo<NotificationType>) => <NotificationItem row={item} />,
    []
  );

  const keyExtractor = useCallback((item: NotificationType, index: number) => {
    return `${item.id}-${index}`;
  }, []);

  const NotNotification = () => {
    if (data.length > 0) return null;

    return (
      <View style={{ padding: 10 }}>
        <Alert background="white" text="Không có thông báo" />
      </View>
    );
  };

  const handleRefreshing = useCallback(() => {
    if (!userId) return;

    dispatch(appActions.setLoading(true));
    dispatch(notificationActions.getNotificationStart(`${userId}`));
  }, [userId]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefreshing} tintColor="#F8852D" />
        }
        refreshing={false}
        onRefresh={handleRefreshing}
        data={data}
        ListHeaderComponent={NotNotification}
        renderItem={renderItem as any}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ margin: scale(4) }} />}
      />
    </View>
  );
};

export default ListNotifications;
